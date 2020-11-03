/**
 * BLOCK: Media Block
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import edit from './components/edit';
import save from './components/save';
// import './style.scss';

registerBlockType('alps-gutenberg-blocks/media-block', {
  title: __('ALPS Media Block', 'alps-gutenberg-blocks'),
  description: __('Flexible media content.', 'alps-gutenberg-blocks'),
  icon: 'format-image',
  category: 'common',
  attributes: {
    title: {
      type: 'string',
    },
  },
  edit,
  save,
});
