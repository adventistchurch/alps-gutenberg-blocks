/**
 * BLOCK: CTA
 */

import './style.scss';
import './editor.scss';
import icons from '../../icons/icons.js'

( function( blocks, components, i18n, element ) {
  var __ = wp.i18n.__;
  var el = element.createElement;
  var registerBlockType = wp.blocks.registerBlockType;
  var RichText = wp.blockEditor.RichText;
  var TextControl = wp.components.TextControl;
  var CheckboxControl = wp.components.CheckboxControl;
  var InspectorControls = wp.blockEditor.InspectorControls;
  var ToggleControl = wp.components.ToggleControl;
  var MediaUpload = wp.blockEditor.MediaUpload;
  var Button = wp.components.Button;
  var BlockControls = wp.blockEditor.BlockControls;
  var AlignmentToolbar = wp.blockEditor.AlignmentToolbar;
  var { Icon } = wp.components;

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

    edit: function( props ) {
      var attributes = props.attributes;

      var onSelectImage = function( media ) {
        return props.setAttributes( {
          imageUrl: media.sizes.large.url,
          imageId: media.id,
          blockClass: ' has-image',
        } );
      };

      var onRemoveImage = function( media ) {
        return props.setAttributes( {
          media: null,
          imageUrl: null,
          imageId: null,
          blockClass: '',
        } );
      };

      function updateBackgroundColor() {
        if (attributes.isDark) {
          props.setAttributes( { isDark: false } );
          props.setAttributes( { themeClass: ' u-background-color--gray--light' } );
        } else {
          props.setAttributes( { isDark: true } );
          props.setAttributes( { themeClass: ' u-theme--dark u-theme--background-color--darker' } );
        }
      }

      function updateBackgroundImage() {
        if (attributes.hasBackgroundImage) {
          props.setAttributes( { hasBackgroundImage: false } );
          props.setAttributes( { blockClass: '' } );
        } else {
          props.setAttributes( { hasBackgroundImage: true } );
          props.setAttributes( { blockClass: ' has-background-image u-background--cover u-theme--gradient--bottom' } );
        }
      }

      function onChangeAlignment( newAlignment ) {
        props.setAttributes( { alignment: newAlignment === undefined ? 'left' : newAlignment } );
      }

      return [
        el( InspectorControls, { key: 'inspector' },
          el( ToggleControl, {
            label: __('Dark Background', 'alps-gutenberg-blocks'),
            help: __('Makes the CTA background dark.', 'alps-gutenberg-blocks'),
            checked: attributes.isDark,
            onChange: updateBackgroundColor
          } ),
          el( ToggleControl, {
            label: __('Background Image', 'alps-gutenberg-blocks'),
            help: __('Sets the image as a background image.', 'alps-gutenberg-blocks'),
            checked: attributes.hasBackgroundImage,
            onChange: updateBackgroundImage
          } ),
        ),
        el( BlockControls, { key: 'controls' },
          el( AlignmentToolbar, {
            value: attributes.alignment,
            onChange: onChangeAlignment,
          } )
        ),
        el( 'div', { className: props.className },
          el( MediaUpload, {
            onSelect: onSelectImage,
            type: 'image',
            value: attributes.imageId,
            render: function( obj ) {
              return el( components.Button, {
                className: attributes.imageId ? 'image-button' : 'button button-large',
                onClick: ! attributes.imageId ? obj.open : obj.close
                },
                ! attributes.imageId ? __( 'Upload Image', 'alps-gutenberg-blocks' ) :
                el( 'div', { className: 'o-image--edit', },
                  el( Button, {
                    icon: 'no-alt',
                    onClick: onRemoveImage,
                    className: 'blocks-gallery-item__remove',
                    label: __('Remove Image', 'alps-gutenberg-blocks'),
                  } ),
                  el( 'img', {
                    src: attributes.imageUrl
                  } ),
                ),
              );
            }
          } ),
          el( RichText, {
            tagName: 'h3',
            placeholder: __('Title', 'alps-gutenberg-blocks'),
            className: 'o-heading--l',
            keepPlaceholderOnFocus: true,
            value: attributes.title,
            onChange: function( newTitle ) {
              props.setAttributes( { title: newTitle } );
            }
          } ),
          el( RichText, {
            tagName: 'p',
            placeholder: __('Description', 'alps-gutenberg-blocks'),
            className: 'o-description',
            keepPlaceholderOnFocus: true,
            style: { textAlign: attributes.alignment },
            value: attributes.description,
            onChange: function( newDescription ) {
              props.setAttributes( { description: newDescription } );
            }
          } ),
          el ( 'div', { className: 'o-buttons', },
            el ( 'div', { className: 'o-button--1', },
              el( TextControl, {
                type: 'url',
                label: __( 'Button 1 Url', 'alps-gutenberg-blocks' ),
                value: attributes.button1Url,
                placeholder: 'http://',
                keepPlaceholderOnFocus: true,
                onChange: function( newButton1Url ) {
                  props.setAttributes( { button1Url: newButton1Url } );
                }
              } ),
              el( TextControl, {
                label: __( 'Button 1 Text', 'alps-gutenberg-blocks' ),
                placeholder: 'Learn more',
                keepPlaceholderOnFocus: true,
                value: attributes.button1Text,
                onChange: function( newButton1Text ) {
                  props.setAttributes( { button1Text: newButton1Text } );
                }
              } ),
              el( CheckboxControl, {
                label: __( 'Open in new window', 'alps-gutenberg-blocks' ),
                checked: attributes.button1NewWindow,
                onChange: function() {
                  props.setAttributes( { button1NewWindow: !attributes.button1NewWindow } );
                }
              } ),
            ),
            el ( 'div', { className: 'o-button--2', },
              el( TextControl, {
                type: 'url',
                label: __( 'Button 2 Url', 'alps-gutenberg-blocks' ),
                value: attributes.button2Url,
                placeholder: 'http://',
                keepPlaceholderOnFocus: true,
                onChange: function( newButton2Url ) {
                  props.setAttributes( { button2Url: newButton2Url } );
                }
              } ),
              el( TextControl, {
                label: __( 'Button 2 Text', 'alps-gutenberg-blocks' ),
                placeholder: 'Learn more',
                keepPlaceholderOnFocus: true,
                value: attributes.button2Text,
                onChange: function( newButton2Text ) {
                  props.setAttributes( { button2Text: newButton2Text } );
                }
              } ),
              el( CheckboxControl, {
                label: __( 'Open in new window', 'alps-gutenberg-blocks' ),
                checked: attributes.button2NewWindow,
                onChange: function() {
                  props.setAttributes( { button2NewWindow: !attributes.button2NewWindow } );
                }
              } ),
            ),
          ),
        )
      ];
    },

    save: function( props ) {
      var attributes = props.attributes;
      var image = '';
      var backgroundImageClass = '';
      var buttons = '';

      if (attributes.imageUrl) {
        var image = <style type="text/css">.o-background-image--{ attributes.imageId } { `{ background-image: url('${ attributes.imageUrl }') }` }</style>;
        if (attributes.hasBackgroundImage) {
          var backgroundImageClass = ' o-background-image--'+ attributes.imageId;
          var picture = '';
        } else {
          var backgroundImageClass = ' has-image';
          var picture = <div class={ 'c-cta-block__image c-block__image o-background-image--' + attributes.imageId + ' u-background--cover' }></div>;
        }
      }

      if ( ( attributes.title != "" && attributes.title.length > 0 ) && ( attributes.description != "" && attributes.description.length > 0 ) ) {
        var titleClass = ' u-font--primary--l';
        var descriptionClass = ' u-font--secondary';
      } else {
        var titleClass = ' u-font--primary--xl';
        var descriptionClass = ' u-font--secondary--m';
      }

      if ( attributes.title != "" && attributes.title.length > 0 ) {
        var title = <h3 class={ 'c-cta-block__title c-block__title u-theme--color--darker' + titleClass }>{ attributes.title }</h3>;
      } else {
        var title = attributes.title;
      }

      if ( attributes.description != "" && attributes.description.length > 0 ) {
        var description = <p class={ 'c-cta-block__description c-block__description u-font--secondary' + descriptionClass } style={ { textAlign: attributes.alignment } }>{ attributes.description }</p>;
      } else {
        var description = attributes.description;
      }

      if ( attributes.button1Url || attributes.button2Url ) {
        if ( attributes.button1Url ) {
          var target1 = attributes.button1NewWindow ? '_blank' : '_self';
          var button1 = <a href={ attributes.button1Url } class="c-block__button o-button o-button--outline" target={ target1 } rel="noopener noreferrer">{ attributes.button1Text }<span class="u-icon u-icon--m u-path-fill--base u-space--half--left"><Icon className="icon" icon={ icons.arrowLong } /></span></a>;
        } else {
          var button1 = '';
        }
        if ( attributes.button2Url ) {
          var target2 = attributes.button2NewWindow ? '_blank' : '_self';
          var button2 = <a href={ attributes.button2Url } class="c-block__button o-button o-button--simple" target={ target2 } rel="noopener noreferrer">{ attributes.button2Text }</a>;
        } else {
          var button2 = '';
        }
        var buttons = <div class="c-cta-block__buttons c-block__buttons">{ button1 }{ button2 }</div>;
      }

      return (
        <div>
          { image }
          <div class={'c-cta-block c-block u-border--left u-theme--border-color--darker--left can-be--dark-dark' + attributes.blockClass + attributes.themeClass + backgroundImageClass}>
            <div class="c-cta-block__content c-block__content u-spacing">
              <div class="c-cta-block__group c-block__group u-spacing">
                { title }
                { description }
              </div>
              { buttons }
            </div>
            { picture }
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
);
