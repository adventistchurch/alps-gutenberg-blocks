/**
 * BLOCK: Latest Posts
 */

 /**
  * WordPress dependencies
  */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Internal dependencies
 */
import './style.scss';
import edit from './edit';

registerBlockType( 'alps-gutenberg-blocks/latest-posts', {
	title: __( 'ALPS Latest Posts' ),
	description: __( 'Display a list of your most recent posts.' ),
	icon: 'megaphone',
	category: 'widgets',
	keywords: [ __( 'latest posts' ) ],
	supports: {
		html: false,
	},
	attributes: {
		categories: {
			type: 'string',
		},
		tags: {
			type: 'string',
		},
		postsToShow: {
			type: 'number',
			default: 4,
		},
		hideExcerpt: {
			type: 'boolean',
			default: false,
		},
		hidePostDate: {
			type: 'boolean',
			default: false,
		},
		hideCategoryName: {
			type: 'boolean',
			default: false,
		},
		hideButton: {
			type: 'boolean',
			default: false,
		},
		hideImage: {
			type: 'boolean',
			default: false,
		},
		alignRight: {
			type: 'boolean',
			default: false,
		},
		postLayout: {
			type: 'string',
			default: 'list',
		},
		order: {
			type: 'string',
			default: 'desc',
		},
		orderBy: {
			type: 'string',
			default: 'date',
		},
		title: {
			type: 'string',
			default: '',
		},
		linkLabel: {
			type: 'string',
			default: '',
		},
		linkUrl: {
			type: 'string',
			default: '',
		},
	},

	edit,

	save: function() {
    // Rendering in PHP
    return null;
  },
});
