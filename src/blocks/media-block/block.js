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
import './style.scss';
import './editor.scss';
import { MediaBlockEditComponent } from './components/MediaBlockEditComponent';
import { MediaBlockSaveComponent } from './components/MediaBlockSaveComponent';

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
    title: {
      type: 'string',
    },
    url: {
      type: 'string'
    },
    description: {
      type: 'array',
      source: 'children',
      selector: '.c-block__description',
    },
    category: {
      type: 'string'
    },
    date: {
      type: 'string'
    },
    buttonIsActive: {
      type: 'boolean',
      default: false
    },
    buttonText: {
      type: 'string'
    }
  },
  edit: MediaBlockEditComponent,
  save: MediaBlockSaveComponent,
});