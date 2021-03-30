/**
 * External dependencies
 */

import './style.scss';
import {GallerySaveComponent} from "./components/GallerySaveComponent";
import GalleryEditComponent from "./components/GalleryEditComponent";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

registerBlockType( 'alps-gutenberg-blocks/gallery', {
  title: __('ALPS Gallery', 'alps-gutenberg-blocks'),
  description: __('Display a gallery images in a container that expands on click.', 'alps-gutenberg-blocks'),
  icon: 'format-gallery',
  category: 'common',
  attributes: {
    title: {
      type: 'array',
      source: 'children',
      selector: '.o-title',
    },
    images: {
      type: 'array',
      default: [],
      source: 'query',
      selector: '.wp-block-alps-gutenberg-blocks-gallery .c-gallery-block__image',
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
          default: [],
          selector: '.c-gallery-block__caption',
        },
      },
    },
  },

  edit: GalleryEditComponent,
  save: GallerySaveComponent
} );
