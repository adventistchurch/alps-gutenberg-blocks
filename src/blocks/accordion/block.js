/**
 * BLOCK: Accordion
 */

import './style.scss';
import './editor.scss';

( function( blocks, components, i18n, element, editor ) {
  var __ = wp.i18n.__;
  var el = element.createElement;
  var registerBlockType = wp.blocks.registerBlockType;
  var RichText = wp.blockEditor.RichText;
  var BlockControls = wp.blockEditor.BlockControls;
  var AlignmentToolbar = wp.blockEditor.AlignmentToolbar;
  var TextControl = wp.components.TextControl;

  registerBlockType( 'alps-gutenberg-blocks/accordion', {
    title: __('ALPS Accordion'),
    icon: 'welcome-add-page',
    description: 'Add heading and basic text.',
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

    edit: function( props ) {
      var attributes = props.attributes;

      function onChangeAlignment( newAlignment ) {
        props.setAttributes( { alignment: newAlignment === undefined ? 'left' : newAlignment } );
      }

      return [
        el( BlockControls, { key: 'controls' },
          el( AlignmentToolbar, {
            value: attributes.alignment,
            onChange: onChangeAlignment,
          } )
        ),
        el( 'div', { className: props.className },
          el( TextControl, {
            placeholder: 'Title',
            keepPlaceholderOnFocus: true,
            value: attributes.title,
            onChange: function( newTitle ) {
              props.setAttributes( { title: newTitle } );
            }
          } ),
          el( RichText, {
            tagName: 'p',
            className: 'o-paragraph',
            placeholder: 'Body',
            keepPlaceholderOnFocus: true,
            style: { textAlign: attributes.alignment },
            value: attributes.body,
            onChange: function( newBody ) {
              props.setAttributes( { body: newBody } );
            }
          } )
        )
      ];
    },

    save: function( props ) {
      var attributes = props.attributes;

      return (
        <div>
          <div className="c-accordion u-position--relative u-spacing">
            <div className="c-accordion__item u-spacing--half u-border--left u-padding--half--left">
              <div className="c-accordion__heading js-toggle-parent u-font--primary--m u-theme--color--darker"><span className="u-icon u-icon--m c-accordion__arrow u-space--half--right u-theme--path-fill--darker"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><title>Artboard 1</title><path d="M6.75,3.59,3.25.09,1.84,1.5,5.34,5,1.84,8.5,3.25,9.91l3.5-3.5L8.16,5Z" fill="#9b9b9b"/></svg></span><strong className="o-title">{ attributes.title }</strong></div>
              <div className="c-accordion__content u-padding--half--left"><p className="o-body" style={ { textAlign: attributes.alignment } }>{ attributes.body }</p></div>
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
