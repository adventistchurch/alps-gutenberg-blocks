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
import { InlineSidebarEditComponent } from './components/edit';
import { InlineSidebarSaveComponent } from './components/save';
import './editor.scss';
import './style.scss';

registerBlockType('alps-gutenberg-blocks/inline-sidebar', {
    title: __('ALPS Inline Sidebar', 'alps-gutenberg-blocks'),
    description: __('Flexible media content.', 'alps-gutenberg-blocks'),
    icon: 'format-image',
    category: 'common',
    attributes: {
        author: {
            type: 'string',
        },
        title: {
            type: 'string',
        },
        description: {
            type: 'string'
        }
    },
    edit: InlineSidebarEditComponent,
    save: InlineSidebarSaveComponent,
});