/**
 * BLOCK: Latest Posts
 */

 /**
  * WordPress dependencies
  */
const { __ } = wp.i18n;
const { Path, Rect, SVG } = wp.components;
const { registerBlockType } = wp.blocks;

/**
 * Internal dependencies
 */
import Edit from './edit';
const name = 'core/latest-posts';

registerBlockType( 'alps-gutenberg-blocks/latest-posts', {
	title: __( 'Latest Posts' ),
	description: __( 'Display a list of your most recent posts.' ),
	icon: 'megaphone',
	category: 'widgets',
	keywords: [ __( 'recent posts' ) ],
	supports: {
		html: false,
	},

	getEditWrapperProps( attributes ) {
		const { align } = attributes;
		if ( [ 'left', 'center', 'right', 'wide', 'full' ].includes( align ) ) {
			return { 'data-align': align };
		}
	},

	edit: function( props ) {
  	return <Edit {...props} />
  },

  save: function() {
		return null;
  },
});
