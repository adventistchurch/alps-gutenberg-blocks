<?php
class PluginUpdater
{
    private $name;
    private $metaUrl;
    private $cacheKey;

    public function __construct($name, $metaUrl)
    {
        $this->name     = $name;
        $this->cacheKey = $name . '_updater';
        $this->metaUrl  = $metaUrl;
    }

    public function init()
    {

    }

    public function pluginInfo($res, $action, $args)
    {
        // do nothing if this is not about getting plugin information
        if ('plugin_information' !== $action) {
            return false;
        }

        if ($this->name !== $args->slug) {
            return false;
        }

        if (false == $remote = get_transient( $this->cacheKey )) {
            $remote = wp_remote_get( $this->metaUrl, [
                'timeout' => 10,
                'headers' => [
                    'Accept' => 'application/json',
                ],
            ]);

            if ( !is_wp_error($remote) && isset($remote['response']['code']) && $remote['response']['code'] == 200 && !empty($remote['body'])) {
                set_transient( $this->cacheKey, $remote, 3600 ); // 1 hour cache
            }
        }

        if( !is_wp_error($remote) && isset( $remote['response']['code'] ) && $remote['response']['code'] == 200 && !empty($remote['body'])) {
            $remote = json_decode($remote['body']);
            $res = new stdClass();

            $res->name = $remote->name;
            $res->slug = $this->name;
            $res->version = $remote->version;
            $res->tested = $remote->tested;
            $res->requires = $remote->requires;
            $res->download_link = $remote->download_url;
            $res->trunk = $remote->download_url;
            $res->requires_php = $remote->requires_php;
            $res->last_updated = $remote->last_updated;
            $res->sections = [
                'description' => $remote->sections->description,
            ];

            return $res;
        }

        return false;
    }
}
