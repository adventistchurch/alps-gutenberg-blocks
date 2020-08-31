/**
 * BLOCK: Accordion
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
import { AccordionEdit } from './components/edit';
import { AccordionSave } from './components/save';

registerBlockType( 'alps-gutenberg-blocks/accordion', {
  title: __('ALPS Accordion', 'alps-gutenberg-blocks'),
  icon: 'welcome-add-page',
  description: __('Add heading and basic text.', 'alps-gutenberg-blocks'),
  category: 'common',
  html: false,

  attributes: {
    title: {
      type: 'array',
      source: 'children',
      selector: '.o-title',
    },
    body: {
      type: 'array',
      source: 'children',
      selector: '.o-body',
    },
    alignment: {
      type: 'string',
    },
  },

  edit: AccordionEdit,
  save: AccordionSave,
});
