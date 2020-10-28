/**
 * BLOCK: Blockquote
 */

import './style.scss';
import './editor.scss';

( function( blocks, components, i18n, element ) {
  var __ = wp.i18n.__;
  var el = element.createElement;
  var registerBlockType = wp.blocks.registerBlockType;
  var RichText = wp.blockEditor.RichText;
  var InspectorControls = wp.blockEditor.InspectorControls;
  var ToggleControl = wp.components.ToggleControl;

  registerBlockType( 'alps-gutenberg-blocks/blockquote', {
    title: __('ALPS Blockquote', 'alps-gutenberg-blocks'),
    icon: 'format-quote',
    category: 'common',
    html: false,

    attributes: {
      body: {
        type: 'array',
        source: 'children',
        selector: '.o-paragraph',
      },
      citation: {
        type: 'array',
        source: 'children',
        selector: '.o-citation',
      },
      applyStyles: {
        type: 'string',
        default: '',
      },
      isStrong: {
        type: 'boolean',
        default: false,
      },
    },

    edit: function( props ) {
      var attributes = props.attributes;

      function updateStyles() {
        if (attributes.applyStyles) {
          props.setAttributes( { applyStyles: '' } );
        } else {
          props.setAttributes( { applyStyles: 'o-pullquote--extended' } );
        }
      }
      function setStrong() {
        props.setAttributes( { isStrong: !attributes.isStrong } );
      }

      return [
        el( InspectorControls, { key: 'inspector' },
          el(
            ToggleControl, {
              label: __('Extend Quote', 'alps-gutenberg-blocks'),
              help: __('Extends the quote outside the page content.', 'alps-gutenberg-blocks'),
              checked: attributes.applyStyles,
              onChange: updateStyles
            }
          ),
          el(
            ToggleControl, {
              label: __('Strong Quote', 'alps-gutenberg-blocks'),
              help: __('Set strong style for the quote content.', 'alps-gutenberg-blocks'),
              checked: attributes.isStrong,
              onChange: setStrong
            }
          ),
        ),
        el ( 'blockquote', { className: props.className },
          el ( 'blockquote', {},
            el( RichText, {
              tagName: 'p',
              className: 'o-paragraph',
              placeholder: __('Write a quote...', 'alps-gutenberg-blocks'),
              keepPlaceholderOnFocus: true,
              value: attributes.body,
              onChange: function( newBody ) {
                props.setAttributes( { body: newBody } );
              }
            } ),
            el( RichText, {
              tagName: 'cite',
              className: 'o-citation',
              placeholder: __('Citation', 'alps-gutenberg-blocks'),
              keepPlaceholderOnFocus: true,
              value: attributes.citation,
              onChange: function( newCitation ) {
                props.setAttributes( { citation: newCitation } );
              }
            } ),
          ),
        )
      ];
    },

    save: function( props ) {
      var attributes = props.attributes;
      var classes = [
        'pullquote',
        'u-theme--border-color--darker--left',
        'u-theme--color--darker',
        'u-padding--right',
        attributes.applyStyles,
      ];
      if (attributes.isStrong) {
        classes.push('o-pullquote--strong');
      }

      return (
        <blockquote className={ classes.join(' ') }>
          <p className="o-paragraph">{ attributes.body }</p>
          <cite className="o-citation u-theme--color--base">{ attributes.citation }</cite>
        </blockquote>
      );
    }

  });

} )(
  window.wp.blocks,
  window.wp.components,
  window.wp.i18n,
  window.wp.element,
);
