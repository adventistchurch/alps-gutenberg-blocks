<?php
namespace ALPS\Gutenberg;

/**
 * Self-hosted updates for ALPS Gutenberg Blocks.
 *
 * The metadata JSON on the CDN is requested only while WordPress runs its own
 * update check (pre_set_site_transient_update_plugins: wp-cron twice a day, the
 * twice-daily admin check, or "Check again"), never on ordinary page loads.
 * Both outcomes are cached, so an unreachable CDN costs one short request per
 * hour at most instead of several 10-second requests on every admin page.
 */
class PluginUpdater
{
    private $name;
    private $version;
    private $metaUrl;
    private $cacheKey = 'alps_gutenberg_blocks_update_meta';
    private $lockKey = 'alps_gutenberg_blocks_update_lock';
    private $cacheTtl = 43200; // 12 hours, same as core's own update checks
    private $errorCacheTtl = 3600; // failed checks are cached too
    private $lockTtl = 30;
    private $timeout = 5;

    public function __construct($name, $version, $metaUrl)
    {
        $this->name    = $name;
        $this->version = $version;
        $this->metaUrl = $metaUrl;
    }

    public function init()
    {
        add_filter('pre_set_site_transient_update_plugins', [$this, 'checkUpdate']);
        add_filter('plugins_api', [$this, 'pluginInfo'], 20, 3);
        add_action('upgrader_process_complete', [$this, 'afterUpdate'], 10, 2);
    }

    private function pluginFile()
    {
        return $this->name . '/plugin.php';
    }

    /**
     * Adds this plugin to the update list while WordPress is saving a fresh check.
     */
    public function checkUpdate($transient)
    {
        if (!is_object($transient) || empty($transient->checked)) {
            return $transient;
        }

        $remote = $this->getRemoteData();

        if (!$remote) {
            return $transient;
        }

        $file = $this->pluginFile();
        $item = (object) [
            'id'           => $file,
            'slug'         => $this->name,
            'plugin'       => $file,
            'new_version'  => $remote['version'],
            'url'          => $this->metaUrl,
            'package'      => $remote['download_url'],
            'tested'       => $remote['tested'],
            'requires'     => $remote['requires'],
            'requires_php' => $remote['requires_php'],
        ];

        $wpOk = $remote['requires'] === '' || version_compare(get_bloginfo('version'), $remote['requires'], '>=');

        if (version_compare($this->version, $remote['version'], '<') && $wpOk) {
            $transient->response[$file] = $item;
            unset($transient->no_update[$file]);
        } else {
            $transient->no_update[$file] = $item;
            unset($transient->response[$file]);
        }

        return $transient;
    }

    /**
     * "View details" in the plugin list. Must return $res unchanged for other plugins.
     */
    public function pluginInfo($res, $action, $args)
    {
        if ('plugin_information' !== $action || empty($args->slug) || $this->name !== $args->slug) {
            return $res;
        }

        $remote = $this->getRemoteData();

        if (!$remote) {
            return $res;
        }

        return (object) [
            'name'          => $remote['name'],
            'slug'          => $this->name,
            'version'       => $remote['version'],
            'tested'        => $remote['tested'],
            'requires'      => $remote['requires'],
            'requires_php'  => $remote['requires_php'],
            'last_updated'  => $remote['last_updated'],
            'download_link' => $remote['download_url'],
            'trunk'         => $remote['download_url'],
            'sections'      => [
                'description' => $remote['description'],
            ],
        ];
    }

    public function afterUpdate($upgrader, $options)
    {
        if (($options['action'] ?? '') !== 'update' || ($options['type'] ?? '') !== 'plugin') {
            return;
        }

        $plugins = (array) ($options['plugins'] ?? []);

        if (empty($plugins) || in_array($this->pluginFile(), $plugins, true)) {
            delete_transient($this->cacheKey);
        }
    }

    /**
     * Plugin metadata from the CDN, cached. Returns null when it is unavailable or invalid.
     */
    private function getRemoteData()
    {
        $cached = get_transient($this->cacheKey);

        if (is_array($cached)) {
            return empty($cached['error']) ? $cached : null;
        }

        // Another request is already checking: don't stack a second request on top.
        if (get_transient($this->lockKey)) {
            return null;
        }

        set_transient($this->lockKey, 1, $this->lockTtl);

        $remote   = null;
        $response = wp_remote_get($this->metaUrl, [
            'timeout' => $this->timeout,
            'headers' => [
                'Accept' => 'application/json',
            ],
        ]);

        if (!is_wp_error($response) && wp_remote_retrieve_response_code($response) === 200) {
            $body = json_decode(wp_remote_retrieve_body($response), true);

            if (
                is_array($body)
                && !empty($body['version']) && is_string($body['version'])
                && !empty($body['download_url']) && is_string($body['download_url'])
                && strpos($body['download_url'], 'https://') === 0
            ) {
                $str = function ($value) {
                    return is_string($value) ? $value : '';
                };

                $remote = [
                    'name'          => $str($body['name'] ?? 'ALPS Gutenberg Blocks'),
                    'version'       => $body['version'],
                    'download_url'  => $body['download_url'],
                    'tested'        => $str($body['tested'] ?? ''),
                    'requires'      => $str($body['requires'] ?? ''),
                    'requires_php'  => $str($body['requires_php'] ?? ''),
                    'last_updated'  => $str($body['last_updated'] ?? ''),
                    'description'   => $str($body['sections']['description'] ?? ''),
                ];
            }
        }

        set_transient($this->cacheKey, $remote ?: ['error' => true], $remote ? $this->cacheTtl : $this->errorCacheTtl);
        delete_transient($this->lockKey);

        return $remote;
    }
}
