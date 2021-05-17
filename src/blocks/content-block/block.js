/**
 * BLOCK: Content Block
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

import './style.scss';
import './editor.scss';
import {ContentBlockEditComponent} from "./components/ContentBlockEditComponent";
import {ContentBlockSaveComponent} from "./components/ContentBlockSaveComponent";

registerBlockType( 'alps-gutenberg-blocks/content-block', {
  title: __('ALPS Content Block', 'alps-gutenberg-blocks'),
  description: __('Content block that highlights a row to text.', 'alps-gutenberg-blocks'),
  icon: 'welcome-write-blog',
  category: 'common',
  html: false,

  attributes: {
    title: {
      type: 'array',
      source: 'children',
      selector: 'strong',
    },
    body: {
      type: 'array',
      source: 'children',
      selector: 'p',
    },
    link: {
      type: 'url',
    },
    readMoreButton: {
      type: 'array',
      source: 'children',
      selector: '.c-block__button',
    },
    alignment: {
      type: 'string',
      default: 'left',
    },
  },

  edit: ContentBlockEditComponent,
  save: ContentBlockSaveComponent,

});

