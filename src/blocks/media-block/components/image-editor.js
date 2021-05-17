import {Button} from "@wordpress/components";
import icons from "../../../icons/icons";
import {__} from "@wordpress/i18n";

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
        const { url, id, onRemove } = this.props;

        return (
            <div className={'o-image--edit'}>
                <Button
                    icon={icons.remoteGalleryItem}
                    onClick={onRemove}
                    className={'blocks-gallery-item__remove'}
                    label={__('Remove Image', 'alps-gutenberg-blocks')}
                />
                <img className={"contentCard__image"} src={ url } data-id={ id } />
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
