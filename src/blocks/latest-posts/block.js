/**
 * BLOCK: Latest Posts
 */

/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import './style.scss';
import edit from './edit';

registerBlockType('alps-gutenberg-blocks/latest-posts', {
    title: __('ALPS Latest Posts', 'alps-gutenberg-blocks'),
    description: __('Display a list of your most recent posts.', 'alps-gutenberg-blocks'),
    icon: 'megaphone',
    category: 'widgets',
    keywords: [__('latest posts', 'alps-gutenberg-blocks')],
    supports: {
        html: false,
    },
    attributes: {
        categories: {
            type: 'string',
        },
        tags: {
            type: 'string',
        },
        postsToShow: {
            type: 'number',
            default: 4,
        },
        hideExcerpt: {
            type: 'boolean',
            default: false,
        },
        hidePostDate: {
            type: 'boolean',
            default: false,
        },
        hideCategoryName: {
            type: 'boolean',
            default: false,
        },
        hideButton: {
            type: 'boolean',
            default: false,
        },
        hideImage: {
            type: 'boolean',
            default: false,
        },
        alignRight: {
            type: 'boolean',
            default: false,
        },
        postLayout: {
            type: 'string',
            default: 'list',
        },
        order: {
            type: 'string',
            default: 'desc',
        },
        orderBy: {
            type: 'string',
            default: 'date',
        },
        title: {
            type: 'string',
            default: '',
        },
        linkLabel: {
            type: 'string',
            default: '',
        },
        linkUrl: {
            type: 'string',
            default: '',
        },
    },

    edit,

    save: () => {
        // Rendering in PHP
        return null;
    },
});
