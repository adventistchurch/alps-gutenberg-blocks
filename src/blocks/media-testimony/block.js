/**
 * BLOCK: Media Testimony
 */

import './style.scss';
import './editor.scss';
import icons from '../../icons/icons.js'

( function( blocks, components, i18n, element, editor ) {
  var __ = wp.i18n.__;
  var el = element.createElement;
  var registerBlockType = wp.blocks.registerBlockType;
  var RichText = wp.blockEditor.RichText;
	var TextControl = wp.components.TextControl;
  var MediaUpload = wp.blockEditor.MediaUpload;
  var { Icon } = wp.components;

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

    edit: function( props ) {
      var attributes = props.attributes;

      var onSelectImage = function( media ) {
        return props.setAttributes( {
          imageURL: media.sizes["horiz__16x9--m"].url,
          imageID: media.id,
        } );
      };

      return [
        el( 'div', { className: props.className },
          el( 'div', { className: 'o-editor-block--left' },
            el( RichText, {
              tagName: 'h4',
              placeholder: __('Enter Quote', 'alps-gutenberg-blocks'),
              keepPlaceholderOnFocus: true,
              value: attributes.quote,
              onChange: function( newQuote ) {
                props.setAttributes( { quote: newQuote } );
              }
            } ),
            el( TextControl, {
              type: 'url',
              label: __( 'Read More Link', 'alps-gutenberg-blocks' ),
              value: attributes.readMoreLink,
              placeholder: 'http://',
              keepPlaceholderOnFocus: true,
              onChange: function( newReadMoreLink ) {
                props.setAttributes( { readMoreLink: newReadMoreLink } );
              }
            } ),
          ),
          el( 'div', { className: 'o-editor-block--right' },
            el( 'div', { className: 'o-image--' + attributes.imageID + ' o-image' },
              el( MediaUpload, {
                onSelect: onSelectImage,
                type: 'image',
                value: attributes.imageID,
                render: function( obj ) {
                  return el( components.Button, {
                    className: attributes.imageID ? 'image-button' : 'button button-large',
                    onClick: obj.open
                    },
                    ! attributes.imageID ? __( 'Upload Image', 'alps-gutenberg-blocks' ) : el( 'img', { src: attributes.imageURL } )
                  );
                }
              } )
            ),
            el( RichText, {
              tagName: 'strong',
              placeholder: __('Enter Video Title', 'alps-gutenberg-blocks'),
              className: 'o-heading--l',
              keepPlaceholderOnFocus: true,
              value: attributes.title,
              onChange: function( newTitle ) {
                props.setAttributes( { title: newTitle } );
              }
            } ),
            el( TextControl, {
              type: 'url',
              label: __( 'Watch Video Link', 'alps-gutenberg-blocks' ),
              value: attributes.watchVideoLink,
              placeholder: 'http://',
              keepPlaceholderOnFocus: true,
              onChange: function( newWatchVideoLink ) {
                props.setAttributes( { watchVideoLink: newWatchVideoLink } );
              }
            } )
          )
        )
      ];
    },

    save: function( props ) {
      var attributes = props.attributes;

      if (attributes.readMoreLink) {
        var readMoreButton = <a href={ `${ attributes.readMoreLink }` } className="c-block__button o-button o-button--outline--white o-read-more" tabindex="0">
          <span className="u-icon u-icon--xs u-path-fill--base u-space--half--right">
            <Icon className="icon" icon={ icons.readMore } />
          </span>
          Read more
        </a>;
      }

      if (attributes.watchVideoLink) {
        var watchVideoButton = <a href={ `${ attributes.watchVideoLink }` } className="o-button o-button--outline o-button--outline--white o-watch-video"><span className="u-icon u-icon--xs u-space--half--right"><Icon className="icon" icon={ icons.play } /></span>{ __('Watch Video', 'alps-gutenberg-blocks') }</a>;
      }

      if (attributes.imageURL) {
        var image = <div className="c-media-block__image c-block__image">
          <div className="c-block__image-wrap">
            <img className="c-block__image" src={ `${ attributes.imageURL }` } />
            <div className="c-media-block__image-video c-block__image-video u-spacing--half u-padding u-color--white u-gradient--bottom">
              <strong className="c-media-block__title c-block__title">{ attributes.title }</strong>
              { watchVideoButton }
            </div>
          </div>
        </div>;
      }

      return (
        <div>
          <div className="c-testimonies-media__block">
            <div className="c-media-block c-block c-block c-media-block u-color--white">
              { image }
              <div className="c-media-block__content c-block__content u-spacing u-border--left u-theme--border-color--base">
                <div className="u-spacing c-block__group c-media-block__group u-flex--justify-start">
                  <div className="u-width--100p u-spacing">
                    <p className="c-media-block__description c-block__description">{ attributes.quote }</p>
                  </div>
                  { readMoreButton }
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

  });

} )(
  window.wp.blocks,
  window.wp.components,
  window.wp.i18n,
  window.wp.element,
  window.wp.editor,
);
