/**
 * BLOCK: Inline Sidebar
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { InlineSidebarEditComponent } from './components/InlineSidebarEditComponent';
import { InlineSidebarSaveComponent } from './components/InlineSidebarSaveComponent';
import './editor.scss';
import './style.scss';

registerBlockType('alps-gutenberg-blocks/inline-sidebar', {
    title: __('ALPS Inline Sidebar', 'alps-gutenberg-blocks'),
    description: __('Flexible media content.', 'alps-gutenberg-blocks'),
    icon: 'format-image',
    category: 'common',
    attributes: {
        preface: {
            type: 'array',
            source: 'children'
        },
        title: {
            type: 'array',
            source: 'children'
        },
        description: {
            type: 'array',
            source: 'children'
        }
    },
    edit: InlineSidebarEditComponent,
    save: InlineSidebarSaveComponent,
});