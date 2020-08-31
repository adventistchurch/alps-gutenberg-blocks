/**
 * External Dependencies
 */
const classnames = require('classnames');
//const keycodes = require('keycodes');

/**
 * WordPress Dependencies
 */
const { Component } = wp.element;
const { Button, Spinner } = wp.components;
const { __ } = wp.i18n;
const { BACKSPACE, DELETE } = wp.keycodes;
const { withSelect } = wp.data;
const { RichText } = wp.blockEditor;

/**
 * Module constants
 */

class GalleryImage extends Component {
  constructor() {
    super( ...arguments );

    this.onImageClick = this.onImageClick.bind( this );
    this.onSelectCaption = this.onSelectCaption.bind( this );
    this.onKeyDown = this.onKeyDown.bind( this );
    this.bindContainer = this.bindContainer.bind( this );

    this.state = {
      captionSelected: false,
    };
  }

  bindContainer( ref ) {
    this.container = ref;
  }

  onSelectCaption() {
    if ( ! this.state.captionSelected ) {
      this.setState( {
        captionSelected: true,
      } );
    }

    if ( ! this.props.isSelected ) {
      this.props.onSelect();
    }
  }

  onImageClick() {
    if ( ! this.props.isSelected ) {
      this.props.onSelect();
    }

    if ( this.state.captionSelected ) {
      this.setState( {
        captionSelected: false,
      } );
    }
  }

  onKeyDown( event ) {
    if (
      this.container === document.activeElement &&
      this.props.isSelected && [ BACKSPACE, DELETE ].indexOf( event.keyCode ) !== -1
    ) {
      event.stopPropagation();
      event.preventDefault();
      this.props.onRemove();
    }
  }

  componentWillReceiveProps( { isSelected, image, url } ) {
    if ( image && ! url ) {
      let url = null;
      if (image.media_details.sizes.large) {
        url = image.media_details.sizes.large.source_url;
      } else if (image.media_details.sizes.full) {
        url = image.media_details.sizes.full.source_url;
      } else if (image.media_details.sizes.medium) {
        url = image.media_details.sizes.medium.source_url;
      }

      this.props.setAttributes( {
        url: url,
        alt: image.alt_text,
      } );
    }

    // unselect the caption so when the user selects other image and comeback
    // the caption is not immediately selected
    if ( this.state.captionSelected && ! isSelected && this.props.isSelected ) {
      this.setState( {
        captionSelected: false,
      } );
    }
  }

  render() {
    const { url, alt, id, linkTo, link, isSelected, caption, onRemove, setAttributes } = this.props;

    let href;

    switch ( linkTo ) {
      case 'media':
        href = url;
        break;
      case 'attachment':
        href = link;
        break;
    }

    // Disable reason: Image itself is not meant to be
    // interactive, but should direct image selection and unfocus caption fields
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
    const img = url ? <img src={ url } alt={ alt } data-id={ id } onClick={ this.onImageClick } /> : <Spinner />;

    const className = classnames( {
      'is-selected': isSelected,
      'is-transient': url && 0 === url.indexOf( 'blob:' ),
    } );

    // Disable reason: Each block can be selected by clicking on it and we should keep the same saved markup
    /* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events */
    return (
      <figure className={ className } tabIndex="-1" onKeyDown={ this.onKeyDown } ref={ this.bindContainer }>
        { isSelected &&
          <div className="core-blocks-gallery-item__inline-menu">
            <Button
              icon="no-alt"
              onClick={ onRemove }
              className="blocks-gallery-item__remove"
              label={ __( 'Remove Image', 'alps-gutenberg-blocks' ) }
            />
          </div>
        }
        { href ? <a href={ href }>{ img }</a> : img }
        { ( caption && caption.length > 0 ) || isSelected ? (
          <RichText
            tagName="figcaption"
            placeholder={ __( 'Write caption…', 'alps-gutenberg-blocks' ) }
            value={ caption }
            isSelected={ this.state.captionSelected }
            onChange={ ( newCaption ) => setAttributes( { caption: newCaption } ) }
            unstableOnFocus={ this.onSelectCaption }
            inlineToolbar
          />
        ) : null }
      </figure>
    );
    /* eslint-enable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events */
  }
}

export default withSelect( ( select, ownProps ) => {
  const { getMedia } = select( 'core' );
  const { id } = ownProps;

  return {
    image: id ? getMedia( id ) : null,
  };
} )( GalleryImage );
