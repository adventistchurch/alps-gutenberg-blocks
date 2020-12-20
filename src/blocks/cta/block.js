/**
 * BLOCK: CTA
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

import './style.scss';
import './editor.scss';

import {CTASaveComponent} from "./components/CTASaveComponent";
import {CTAEditComponent} from "./components/CTAEditComponent";

registerBlockType( 'alps-gutenberg-blocks/cta', {
    title: __('ALPS CTA', 'alps-gutenberg-blocks'),
    icon: 'external',
    category: 'common',
    html: false,

    attributes: {
      title: {
        type: 'array',
        source: 'children',
        selector: 'h3',
      },
      description: {
        type: 'array',
        source: 'children',
        selector: 'p',
      },
      button1Url: {
        type: 'string',
      },
      button1Text: {
        type: 'string',
      },
      button1NewWindow: {
        type: 'boolean',
        default: false,
      },
      button2Url: {
        type: 'string',
      },
      button2Text: {
        type: 'string',
      },
      button2NewWindow: {
        type: 'boolean',
        default: false,
      },
      imageId: {
        type: 'number',
      },
      imageUrl: {
        type: 'string',
      },
      isDark: {
        type: 'boolean',
        default: false,
      },
      themeClass: {
        type: 'string',
        default: ' u-background-color--gray--light',
      },
      hasBackgroundImage: {
        type: 'boolean',
        default: false,
      },
      blockClass: {
        type: 'string',
        default: ' ',
      },
      alignment: {
        type: 'string',
      },
    },

    edit: CTAEditComponent,
    save: CTASaveComponent
});