/**
 * BLOCK: Content Block
 */

import './style.scss';
import './editor.scss';

( function( blocks, components, i18n, element ) {
  var __ = wp.i18n.__;
  var el = element.createElement;
  var registerBlockType = wp.blocks.registerBlockType;
  var RichText = wp.blockEditor.RichText;
  var TextControl = wp.components.TextControl;
  var BlockControls = wp.blockEditor.BlockControls;
  var AlignmentToolbar = wp.blockEditor.AlignmentToolbar;

  registerBlockType( 'alps-gutenberg-blocks/content-block', {
    title: __('ALPS Content Block', 'alps-gutenberg-blocks'),
    description: __('Content block that highlights a row to text.', 'alps-gutenberg-blocks'),
    icon: 'welcome-write-blog',
    category: 'common',
    html: false,

    attributes: {
      title: {
        type: 'array',
        source: 'children',
        selector: 'strong',
      },
      body: {
        type: 'array',
        source: 'children',
        selector: 'p',
      },
      link: {
        type: 'url',
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
        el ( 'div', { className: props.className },
          el( RichText, {
            tagName: 'strong',
            className: 'o-heading--l',
            placeholder: __('Title', 'alps-gutenberg-blocks'),
            keepPlaceholderOnFocus: true,
            value: attributes.title,
            onChange: function( newTitle ) {
              props.setAttributes( { title: newTitle } );
            }
          } ),
          el( RichText, {
            tagName: 'p',
            className: 'o-paragraph',
            placeholder: __('Write a description...', 'alps-gutenberg-blocks'),
            keepPlaceholderOnFocus: true,
            style: { textAlign: attributes.alignment },
            value: attributes.body,
            onChange: function( newBody ) {
              props.setAttributes( { body: newBody } );
            }
          } ),
          el( TextControl, {
            type: 'url',
            label: __('Link Url', 'alps-gutenberg-blocks'),
            className: 'o-link',
            placeholder: 'http://',
            keepPlaceholderOnFocus: true,
            value: attributes.link,
            onChange: function( newLink ) {
              props.setAttributes( { link: newLink } );
            }
          } ),
        )
      ];
    },

    save: function( props ) {
      var attributes = props.attributes;

      if (attributes.link) {
        var title =
        <h3 className="u-theme--color--darker u-font--primary--m">
          <a href={ `${ attributes.link }` } className="c-block__title-link u-theme--link-hover--dark">
            <strong>{ attributes.title }</strong>
          </a>
        </h3>;
        var button =
        <a href={ `${ attributes.link }` } className="c-block__button o-button o-button--outline">{ __('Read More', 'alps-gutenberg-blocks') }<span className="u-icon u-icon--m u-path-fill--base u-space--half--left"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M18.29,8.59l-3.5-3.5L13.38,6.5,15.88,9H.29v2H15.88l-2.5,2.5,1.41,1.41,3.5-3.5L19.71,10Z"></path></svg></span></a>;
      } else {
        var title =
        <h3 className="u-theme--color--darker u-font--secondary--m u-text-transform--upper">
          <strong>{ attributes.title }</strong>
        </h3>;
      }

      return (
        <div>
          <div className="c-block c-block__text u-theme--border-color--darker u-border--left u-spacing--half">
            {title}
            <p className="c-block__body text" style={ { textAlign: attributes.alignment } }>{ attributes.body }</p>
            {button}
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
