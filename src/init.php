<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if (! defined('ABSPATH')) {
	exit;
}

function alps_gutenberg_blocks_init()
{
    $pluginRoot = WP_PLUGIN_DIR . '/' . ALPS_GUTENBERG_NAME . '/plugin.php';

    // Register block styles for both frontend + backend.
    wp_register_style(
        'alps-gb-style',
        plugins_url( 'dist/blocks.style.build.css', $pluginRoot ),
        is_admin() ? [ 'wp-editor' ] : null,
        ALPS_GUTENBERG_VERSION
    );

    // Register block editor script for backend.
    wp_register_script(
        'alps-gb',
        plugins_url( 'dist/blocks.build.js', $pluginRoot ),
        ['wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-data'],
        ALPS_GUTENBERG_VERSION,
        true
    );
    wp_set_script_translations('alps-gb', 'alps-gutenberg-blocks',$pluginRoot . '/languages' );

    // Register block editor styles for backend.
    wp_register_style(
        'alps-gb-editor',
        plugins_url( 'dist/blocks.editor.build.css', $pluginRoot ),
        [ 'wp-edit-blocks' ],
        ALPS_GUTENBERG_VERSION
    );

    // Register blocks
    (new \ALPS\Gutenberg\Blocks\LatestPostsBlock())->init();
}
add_action('init', 'alps_gutenberg_blocks_init');
