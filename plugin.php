<?php
/**
 * Plugin Name: ALPS Gutenberg Blocks
 * Plugin URI: https://adventist.io/themes
 * Description: Creates custom blocks in Gutenberg specific to the ALPS v3 theme.
 * Author: Seventh-day Adventist Church and SouthLeft
 * Author URI: https://adventist.io/themes
 * Version: 1.0.2
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';

/**
 * Update Checker for Krenl.us
 */
require 'plugin_update_check.php';
$MyUpdateChecker = new PluginUpdateChecker_2_0 (
   'https://kernl.us/api/v1/updates/5c13a3859e9cea4aa2fd8fbd/',
   __FILE__,
   'my-plugin-slug',
   1
);
