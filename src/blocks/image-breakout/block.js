/**
 * BLOCK: Image (Breakout)
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

import './style.scss';
import './editor.scss';
import {ImageBreakoutEditComponent} from "./components/ImageBreakoutEditComponent";
import {ImageBreakoutSaveComponent} from "./components/ImageBreakoutSaveComponent";

registerBlockType( 'alps-gutenberg-blocks/image-breakout', {
  title: __('ALPS Image (Breakout)', 'alps-gutenberg-blocks'),
  icon: 'format-image',
  description: __('Image that expands the width of the page.', 'alps-gutenberg-blocks'),
  category: 'common',

  attributes: {
    url: {
      type: 'string',
    },
    caption: {
      type: 'array',
      source: 'children',
      selector: 'p',
    },
    id: {
      type: 'number',
    },
  },

  edit: ImageBreakoutEditComponent,
  save: ImageBreakoutSaveComponent,

});
