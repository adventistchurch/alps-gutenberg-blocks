/**
 * BLOCK: Media Testimony
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

import './style.scss';
import './editor.scss';

import {MediaTestimonySaveComponent} from "./components/MediaTestimonySaveComponent";
import {MediaTestimonyEditComponent} from "./components/MediaTestimonyEditComponent";

registerBlockType( 'alps-gutenberg-blocks/media-testimony', {
    title: __('ALPS Media Testimony Block', 'alps-gutenberg-blocks'),
    description: __('Single media testimony.', 'alps-gutenberg-blocks'),
    icon: 'format-chat',
    category: 'widgets',
    parent: [ 'alps-gutenberg-blocks/media-testimonies' ],
    supports: {
  		reusable: true,
  	},
    html: false,

    attributes: {
      title: {
        type: 'array',
        source: 'children',
        selector: 'strong',
      },
      quote: {
        type: 'string',
        source: 'html',
        selector: 'p',
      },
      readMoreLink: {
        type: 'url',
        selector: '.o-read-more',
      },
      watchVideoLink: {
        type: 'url',
        selector: '.o-watch-video',
      },
      imageID: {
        type: 'number',
      },
      imageURL: {
        type: 'string',
        source: 'attribute',
        attribute: 'src',
        selector: 'img',
      },
    },

    edit: MediaTestimonyEditComponent,
    save: MediaTestimonySaveComponent
});
