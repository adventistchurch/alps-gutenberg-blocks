/**
 * BLOCK: Content Show More
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

import './style.scss';
import './editor.scss';
import {ContentShowMoreSaveComponent} from "./components/ContentShowMoreSaveComponent";
import {ContentShowMoreEditComponent} from "./components/ContentShowMoreEditComponent";

registerBlockType( 'alps-gutenberg-blocks/content-show-more', {
  title: __('ALPS Content Show More', 'alps-gutenberg-blocks'),
  icon: 'editor-expand',
  description: __('Content block that has a toggle button to show more.', 'alps-gutenberg-blocks'),
  category: 'common',
  html: false,

  attributes: {
    title: {
      type: 'array',
      source: 'children',
      selector: 'strong',
    },
    description: {
      type: 'array',
      source: 'children',
      selector: '.o-description',
    },
    body: {
      type: 'array',
      source: 'children',
      selector: '.o-paragraph',
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
    alignment: {
      type: 'string',
    },
  },

  edit: ContentShowMoreEditComponent,
  save: ContentShowMoreSaveComponent,
});
