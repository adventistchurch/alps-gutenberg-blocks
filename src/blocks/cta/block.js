/**
 * BLOCK: CTA
 */

import './style.scss';
import './editor.scss';

( function( blocks, components, i18n, element ) {
  var __ = wp.i18n.__;
  var el = element.createElement;
  var registerBlockType = wp.blocks.registerBlockType;
  var RichText = wp.editor.RichText;
  var TextControl = wp.components.TextControl;
  var InspectorControls = wp.editor.InspectorControls;
  var ToggleControl = wp.components.ToggleControl;
  var MediaUpload = wp.editor.MediaUpload;
  var IconButton = wp.components.IconButton;

  registerBlockType( 'alps-gutenberg-blocks/cta', {
    title: __('CTA'),
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
      button2Url: {
        type: 'string',
      },
      button2Text: {
        type: 'string',
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

      return [
        el(
          InspectorControls, {
            key: 'inspector'
          },
          el(
            ToggleControl, {
              label: 'Dark Background',
              help: 'Makes the CTA background dark.',
              checked: attributes.isDark,
              onChange: updateBackgroundColor
            }
          ),
          el(
            ToggleControl, {
              label: 'Background Image',
              help: 'Sets the image as a background image.',
              checked: attributes.hasBackgroundImage,
              onChange: updateBackgroundImage
            }
          ),
        ),
        el( 'div', {
          className: props.className
        },
          el( MediaUpload, {
            onSelect: onSelectImage,
            type: 'image',
            value: attributes.imageId,
            render: function( obj ) {
              return el( components.Button, {
                className: attributes.imageId ? 'image-button' : 'button button-large',
                onClick: ! attributes.imageId ? obj.open : obj.close
                },
                ! attributes.imageId ? __( 'Upload Image' ) :
                el( 'div', {
                  className: 'o-image--edit',
                },
                  el( IconButton, {
                    icon: 'no-alt',
                    onClick: onRemoveImage,
                    className: 'blocks-gallery-item__remove',
                    label: 'Remove Image',
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
            placeholder: 'Title',
            className: 'o-heading--l',
            keepPlaceholderOnFocus: true,
            isSelected: false,
            value: attributes.title,
            onChange: function( newTitle ) {
              props.setAttributes( { title: newTitle } );
            }
          } ),
          el( RichText, {
            tagName: 'p',
            placeholder: 'Description',
            className: 'o-description',
            keepPlaceholderOnFocus: true,
            isSelected: false,
            value: attributes.description,
            onChange: function( newDescription ) {
              props.setAttributes( { description: newDescription } );
            }
          } ),
          el ( 'div', {
            className: 'o-buttons',
          },
            el ( 'div', {
              className: 'o-button--1',
            },
              el( TextControl, {
                type: 'url',
                label: __( 'Button 1 Url' ),
                value: attributes.button1Url,
                placeholder: 'http://',
                keepPlaceholderOnFocus: true,
                isSelected: false,
                onChange: function( newButton1Url ) {
                  props.setAttributes( { button1Url: newButton1Url } );
                }
              } ),
              el( TextControl, {
                label: __( 'Button 1 Text' ),
                value: attributes.button1Text,
                isSelected: false,
                onChange: function( newButton1Text ) {
                  props.setAttributes( { button1Text: newButton1Text } );
                }
              } ),
            ),
            el ( 'div', {
              className: 'o-button--2',
            },
              el( TextControl, {
                type: 'url',
                label: __( 'Button 2 Url' ),
                value: attributes.button2Url,
                placeholder: 'http://',
                keepPlaceholderOnFocus: true,
                isSelected: false,
                onChange: function( newButton2Url ) {
                  props.setAttributes( { button2Url: newButton2Url } );
                }
              } ),
              el( TextControl, {
                label: __( 'Button 2 Text' ),
                value: attributes.button2Text,
                isSelected: false,
                onChange: function( newButton2Text ) {
                  props.setAttributes( { button2Text: newButton2Text } );
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
        var description = <p class={ 'c-cta-block__description c-block__description u-font--secondary' + descriptionClass }>{ attributes.description }</p>;
      } else {
        var description = attributes.description;
      }

      if ( attributes.button1Url || attributes.button2Url ) {
        if ( attributes.button1Url ) {
          var button1 = <a href={ attributes.button1Url } class="c-block__button o-button o-button--outline">{ attributes.button1Text }<span class="u-icon u-icon--m u-path-fill--base u-space--half--left"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M18.29,8.59l-3.5-3.5L13.38,6.5,15.88,9H.29v2H15.88l-2.5,2.5,1.41,1.41,3.5-3.5L19.71,10Z" fill="#9b9b9b"/></svg></span></a>;
        } else {
          var button1 = '';
        }
        if ( attributes.button2Url ) {
          var button2 = <a href={ attributes.button2Url } class="c-block__button o-button o-button--simple">{ attributes.button2Text }</a>;
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
