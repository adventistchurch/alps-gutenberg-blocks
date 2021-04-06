/**
 * BLOCK: Image (2up)
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

import './style.scss';
import './editor.scss';

import {Image2UpSaveComponent} from "./components/Image2UpSaveComponent";
import Image2UpEditComponent from "./components/Image2UpEditComponent";

registerBlockType( 'alps-gutenberg-blocks/image-2up', {
  title: __('ALPS Image (2up)', 'alps-gutenberg-blocks'),
  description: __('Two images organized in a two column layout.', 'alps-gutenberg-blocks'),
  icon: 'format-gallery',
  category: 'common',
  attributes: {
    images: {
      type: 'array',
      default: [],
      source: 'query',
      selector: '.wp-block-alps-gutenberg-blocks-image-2up .l-grid-item--m--3-col',
      query: {
        url: {
          source: 'attribute',
          selector: 'img',
          attribute: 'src',
        },
        link: {
          source: 'attribute',
          selector: 'img',
          attribute: 'data-link',
        },
        alt: {
          source: 'attribute',
          selector: 'img',
          attribute: 'alt',
          default: '',
        },
        id: {
          source: 'attribute',
          selector: 'img',
          attribute: 'data-id',
        },
        caption: {
          type: 'array',
          source: 'children',
          selector: '.o-caption',
        },
      },
    },
  },

  edit: Image2UpEditComponent,
  save: Image2UpSaveComponent

})
