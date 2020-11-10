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
// import './style.scss';
import './editor.scss';
import { MediaBlockEditComponent } from './components/edit';
import { MediaBlockSaveComponent } from './components/save';

registerBlockType('alps-gutenberg-blocks/media-block', {
  title: __('ALPS Media Block', 'alps-gutenberg-blocks'),
  description: __('Flexible media content.', 'alps-gutenberg-blocks'),
  icon: 'format-image',
  category: 'common',
  attributes: {
    alignment: {
      type: "string",
      default: "left"
    },
    imageID: {
      type: 'number',
    },
    imageURL: {
      type: 'string',
      source: 'attribute',
      attribute: 'src',
      selector: 'img',
    },
    imageAlt: {
      attribute: 'alt'
    },
    title: {
      type: 'string',
    },
    url: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    category: {
      type: 'string'
    },
    date: {
      type: 'string'
    },
    buttonText: {
      type: 'string'
    }
  },
  edit: MediaBlockEditComponent,
  save: MediaBlockSaveComponent,
});
