/**
 * BLOCK: Blockquote
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

import './style.scss';
import './editor.scss';
import {BlockquoteSaveComponent} from "./components/BlockquoteSaveComponent";
import {BlockquoteEditComponent} from "./components/BlockquoteEditComponent";

registerBlockType( 'alps-gutenberg-blocks/blockquote', {
  title: __('ALPS Blockquote', 'alps-gutenberg-blocks'),
  icon: 'format-quote',
  category: 'common',
  html: false,

  attributes: {
    body: {
      type: 'array',
      source: 'children',
      selector: '.o-paragraph',
    },
    citation: {
      type: 'array',
      source: 'children',
      selector: '.o-citation',
    },
    isExtendQuote: {
      type: 'boolean',
      default: false,
    },
    isStrong: {
      type: 'boolean',
      default: false,
    },
  },

  edit: BlockquoteEditComponent,
  save: BlockquoteSaveComponent,

});
