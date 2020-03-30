/**
 * BLOCK: Media Testimonies
 */

import './style.scss';
import './editor.scss';
import icons from '../../icons/icons.js'

( function( blocks, components, i18n, element, editor, blockEditor ) {
  var __ = wp.i18n.__;
  var el = element.createElement;
  var registerBlockType = wp.blocks.registerBlockType;
  var RichText = wp.blockEditor.RichText;
  var TextControl = wp.components.TextControl;
  var InnerBlocks = wp.blockEditor.InnerBlocks;
  var { Icon } = wp.components;

  registerBlockType( 'alps-gutenberg-blocks/media-testimonies', {
    title: __('ALPS Media Testimonies'),
    description: __('Display your media testimonies.'),
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

    edit: function( props ) {
      var attributes = props.attributes;

      return [
        el( 'div', {
          className: props.className
        },
          el( 'div', {
            className: 'o-editor-heading',
          },
            el( RichText, {
              tagName: 'h3',
              placeholder: 'Enter Section Title',
              className: 'o-heading--l',
              keepPlaceholderOnFocus: true,
              isSelected: false,
              value: attributes.title,
              onChange: function( newTitle ) {
                props.setAttributes( { title: newTitle } );
              }
            } ),
            el( TextControl, {
              type: 'url',
              label: __( 'See All Link Url' ),
              value: attributes.link,
              placeholder: 'http://',
              className: 'o-link',
              keepPlaceholderOnFocus: true,
              isSelected: false,
              onChange: function( newLink ) {
                props.setAttributes( { link: newLink } );
              }
            } ),
          ),
          el( InnerBlocks, {
            template: [
              [ 'alps-gutenberg-blocks/media-testimony' ],
            ],
          } )
        )
      ];
    },

    save: function( props ) {
      var attributes = props.attributes;

      if ( attributes.link ) {
        var seeAll = <a href={ `${ attributes.link }` } className="c-block__heading-link u-theme--color--light u-theme--link-hover--lighter o-link">See All</a>;
        var seeAllStories = <a href={ `${ attributes.link }` } className="o-button o-button--outline--white">See all Stories<span className="u-icon u-icon--m u-space--half--left"><Icon className="icon" icon={ icons.arrowLong } /></span></a>;
      } else {
        var seeAll = '';
        var seeAllStories = '';
      }

      return (
        <div>
          <section className="c-testimonies-media u-spacing u-posititon--relative u-theme--background-color--darker u-color--white">
            <div className="c-testimonies-media--inner u-spacing--double">
              <div className="c-testimonies-media__heading">
                <div className="c-block__heading u-theme--border-color--base">
                  <h3 className="c-block__heading-title">{ attributes.title }</h3>{ seeAll }
                </div>
                <div className="o-dots"></div>
              </div>
              <div className="c-testimonies-media__blocks js-carousel__testimonies-media u-theme--gradient--right u-theme--gradient--left">
                <InnerBlocks.Content />
              </div>
              <div className="c-testimonies-media__buttons u-spacing--left--half">
                <button className="o-button o-button--outline--white o-arrow o-arrow--prev">
                  <span className="u-icon u-icon--s u-path-fill--white">
                    <Icon className="icon" icon={ icons.arrowPrevious } />
                  </span>
                </button>
                <button className="o-button o-button--outline--white o-arrow o-arrow--next">
                  <span className="u-icon u-icon--s u-path-fill--white">
                    <Icon className="icon" icon={ icons.arrowNext } />
                  </span>
                </button>
                { seeAllStories }
              </div>
            </div>
          </section>
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
  window.wp.blockEditor,
);
