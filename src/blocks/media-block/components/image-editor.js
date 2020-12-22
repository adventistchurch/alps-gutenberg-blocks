const { Component } = wp.element;
const { withSelect } = wp.data;

class ScaledImage extends Component {

    constructor() {
        super( ...arguments );
    }

    componentWillReceiveProps( { isSelected, image, url } ) {
        if ( image && url ) {
            let imageUrl = null;
            if (image.media_details.sizes.large) {
                imageUrl = image.media_details.sizes.large.source_url;
            } else if (image.media_details.sizes.full) {
                imageUrl = image.media_details.sizes.full.source_url;
            } else if (image.media_details.sizes.medium) {
                imageUrl = image.media_details.sizes.medium.source_url;
            }

            this.props.setAttributes( {
                imageURL: imageUrl
            } );
        }
    }

    render() {
        const { url, id } = this.props;

        return (
            <div>
                <img src={ url } data-id={ id } onClick={ this.onImageClick } />
            </div>
        );
    }
}

export default withSelect( ( select, ownProps ) => {
    const { getMedia } = select( 'core' );
    const { id } = ownProps;

    return {
        image: id ? getMedia( id ) : null,
    };
} )( ScaledImage );
