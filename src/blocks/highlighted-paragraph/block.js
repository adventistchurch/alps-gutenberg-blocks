/**
 * BLOCK: Highlighted Paragraph
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';


import './style.scss';
import './editor.scss';
import {HighlightedParagraphEditComponent} from "./components/HighlightedParagraphEditComponent";
import {HighlightedParagraphSaveComponent} from "./components/HighlightedParagraphSaveComponent";

registerBlockType( 'alps-gutenberg-blocks/highlighted-paragraph', {
    title: __('ALPS Highlighted Paragraph', 'alps-gutenberg-blocks'),
    icon: 'media-text',
    description: __('Highlight a block of text.', 'alps-gutenberg-blocks'),
    category: 'common',

    attributes: {
      content: {
        type: 'array',
        source: 'children',
        selector: 'p',
      },
      alignment: {
        type: 'string',
        default: 'left',
      },
    },

    edit: HighlightedParagraphEditComponent,
    save: HighlightedParagraphSaveComponent

});
