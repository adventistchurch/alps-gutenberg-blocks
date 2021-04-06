/**
 * BLOCK: Media Testimonies
 */

import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

import './style.scss';
import './editor.scss';

import {MediaTestimoniesSaveComponent} from "./components/MediaTestimoniesSaveComponent";
import {MediaTestimoniesEditComponent} from "./components/MediaTestimoniesEditComponent";

registerBlockType( 'alps-gutenberg-blocks/media-testimonies', {
    title: __('ALPS Media Testimonies', 'alps-gutenberg-blocks'),
    description: __('Display your media testimonies.', 'alps-gutenberg-blocks'),
    icon: 'format-chat',
    category: 'widgets',
    html: false,

    attributes: {
      title: {
        type: 'array',
        source: 'children',
        selector: 'h3',
      },
      link: {
        type: 'url',
      },
    },

    edit: MediaTestimoniesEditComponent,
    save: MediaTestimoniesSaveComponent
});
