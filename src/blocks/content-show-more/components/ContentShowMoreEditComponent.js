import {Component} from "@wordpress/element";
import { BlockControls, MediaUpload, AlignmentToolbar, RichText } from "@wordpress/block-editor";
import {Button} from "@wordpress/components";
import { __ } from '@wordpress/i18n';

export class ContentShowMoreEditComponent extends Component {

    constructor() {
        super(...arguments);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeBody = this.onChangeBody.bind(this);
        this.onChangeAlignment = this.onChangeAlignment.bind(this);
        this.onSelectImage = this.onSelectImage.bind(this);
    }

    onChangeTitle(title) {
        this.props.setAttributes({ title });
    }

    onChangeDescription(description) {
        this.props.setAttributes({ description });
    }

    onChangeBody(body) {
        this.props.setAttributes({ body });
    }

    onChangeAlignment( newAlignment ) {
        this.props.setAttributes( { alignment: newAlignment === undefined ? 'left' : newAlignment } );
    }

    onSelectImage(media) {
        this.props.setAttributes({
            imageURL: media.sizes.large.url,
            imageID: media.id
        });
    }

    getImageButton(openEvent) {

        const { attributes } = this.props;

        return (
            <Button
                className={attributes.imageID ? 'image-button' : 'button button-large'}
                onClick={openEvent}
            >
                {!attributes.imageID ?
                    __( 'Upload Image', 'alps-gutenberg-blocks' ) :
                    <img src={attributes.imageURL} />
                }
            </Button>
        );
    }

    render () {

        const { attributes, className } =  this.props;

        return ([
            <BlockControls>
                <AlignmentToolbar
                    value={ attributes.alignment }
                    onChange={ nextAlign => this.onChangeAlignment(nextAlign) }
                />
            </BlockControls>,
            <div className={ className }>
                <div className={'o-image ' + 'o-image--' + attributes.imageID}>
                    <MediaUpload
                        onSelect={ this.onSelectImage }
                        type={'image'}
                        value={ attributes.imageID }
                        render={ ({open}) => this.getImageButton(open)}
                    />
                </div>
                <RichText
                    tagName={'strong'}
                    className={'o-heading--l'}
                    placeholder={ __('Title', 'alps-gutenberg-blocks') }
                    keepPlaceholderOnFocus={ true }
                    value={ attributes.title }
                    onChange={ this.onChangeTitle }
                />
                <RichText
                    tagName={'p'}
                    className={'o-description'}
                    placeholder={ __('Description', 'alps-gutenberg-blocks') }
                    keepPlaceholderOnFocus={ true }
                    style={ {textAlign: attributes.alignment} }
                    value={ attributes.description }
                    onChange={ this.onChangeDescription }
                />
                <RichText
                    tagName={'p'}
                    className={'o-paragraph'}
                    placeholder={ __('Body (Display on click of show more button)', 'alps-gutenberg-blocks') }
                    keepPlaceholderOnFocus={ true }
                    style={ {textAlign: attributes.alignment} }
                    value={ attributes.body }
                    onChange={ this.onChangeBody }
                />
            </div>
        ]);
    }
}