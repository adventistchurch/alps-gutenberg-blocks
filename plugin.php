<?php
/**
 * Plugin Name: ALPS Gutenberg Blocks
 * Plugin URI: https://adventist.io/themes
 * Description: Creates custom blocks in Gutenberg specific to the ALPS v3 theme.
 * Author: Seventh-day Adventist Church and SouthLeft
 * Author URI: https://adventist.io/themes
 * Version: 1.0.1
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
