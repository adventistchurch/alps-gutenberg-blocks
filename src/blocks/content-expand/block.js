/**
 * BLOCK: Content Expand
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

import './style.scss';
import './editor.scss';
import {ContentExpandEditComponent} from "./components/ContentExpandEditComponent";
import {ContentExpandSaveComponent} from "./components/ContentExpandSaveComponent";

registerBlockType( 'alps-gutenberg-blocks/content-expand', {
  title: __('ALPS Content Expand', 'alps-gutenberg-blocks'),
  icon: 'arrow-down-alt',
  description: __('Content block that expands the content on click.', 'alps-gutenberg-blocks'),
  category: 'common',
  html: false,

  attributes: {
    kicker: {
      type: 'array',
      source: 'children',
      selector: 'em',
    },
    title: {
      type: 'array',
      source: 'children',
      selector: 'font',
    },
    body: {
      type: 'array',
      source: 'children',
      selector: 'p',
    },
    alignment: {
      type: 'string',
    },
    showMoreButton: {
      type: 'string',
      selector: 'o-button-show-more'
    },
    showLessButton: {
      type: 'string',
      selector: 'o-button-less-more'
    },
  },

  edit: ContentExpandEditComponent,
  save: ContentExpandSaveComponent,
});
