/**
 * BLOCK: Highlighted Paragraph
 */

import './style.scss';
import './editor.scss';

( function( blocks, components, i18n, element ) {
  var __ = wp.i18n.__;
  var el = element.createElement;
  var registerBlockType = wp.blocks.registerBlockType;
  var RichText = wp.editor.RichText;
  var AlignmentToolbar = wp.editor.AlignmentToolbar;
  var BlockControls = wp.editor.BlockControls;

  registerBlockType( 'alps-gutenberg-blocks/highlighted-paragraph', {
    title: __('ALPS Highlighted Paragraph'),
    icon: 'media-text',
    description: 'Highlight a block of text.',
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

    edit: function( props ) {
      var attributes = props.attributes;

      function onChangeContent( newContent ) {
        props.setAttributes( { content: newContent } );
      }
      function onChangeAlignment( newAlignment ) {
        props.setAttributes( { alignment: newAlignment === undefined ? 'left' : newAlignment } );
      }

      return [
        el(
          BlockControls,
          { key: 'controls' },
          el(
              AlignmentToolbar,
              {
                  value: attributes.alignment,
                  onChange: onChangeAlignment,
              }
          )
        ),
        el( 'div', {
          className: props.className
        },
          el( RichText, {
            tagName: 'p',
            placeholder: 'Content goes here...',
            style: { textAlign: attributes.alignment },
            keepPlaceholderOnFocus: true,
            value: attributes.content,
            onChange: onChangeContent,
          } )
        )
      ];
    },

    save: function( props ) {
      var attributes = props.attributes;

      return (
        el( 'div', {
          className: props.className
        },
          el( RichText.Content, {
            tagName: 'p',
            className: 'o-highlight u-padding u-background-color--gray--light can-be--dark-dark has-text-align-' + attributes.alignment,
            value: attributes.content
          } )
        )
      );
    }

  } );

} )(
  window.wp.blocks,
  window.wp.components,
  window.wp.i18n,
  window.wp.element,
);
