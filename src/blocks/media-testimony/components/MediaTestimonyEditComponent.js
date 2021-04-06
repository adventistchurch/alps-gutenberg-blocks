import {Component} from "@wordpress/element";
import {RichText, MediaUpload} from "@wordpress/block-editor";
import {Button, TextControl} from "@wordpress/components";
import { __ } from '@wordpress/i18n';

export class MediaTestimonyEditComponent extends Component {

    constructor() {
        super(...arguments);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeWatchVideoLink = this.onChangeWatchVideoLink.bind(this);
        this.onChangeQuote = this.onChangeQuote.bind(this);
        this.onChangeReadMoreLink = this.onChangeReadMoreLink.bind(this);
        this.onSelectImage = this.onSelectImage.bind(this);
    }

    onChangeTitle(title) {
        this.props.setAttributes({ title });
    }

    onChangeWatchVideoLink(watchVideoLink) {
        this.props.setAttributes({ watchVideoLink })
    }

    onChangeQuote(quote) {
        this.props.setAttributes({ quote });
    }

    onChangeReadMoreLink(readMoreLink) {
        this.props.setAttributes({ readMoreLink });
    }

    onSelectImage(media) {
        this.props.setAttributes({
            imageURL: media.sizes["horiz__16x9--m"].url,
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

    render() {

        const { attributes, className } = this.props;

        return(
            <div className={className}>
                <div className={'o-editor-block--left'}>
                    <RichText
                        tagName={'h4'}
                        placeholder={ __('Enter Quote', 'alps-gutenberg-blocks')}
                        keepPlaceholderOnFocus={true}
                        value={attributes.quote}
                        onChange={this.onChangeQuote}
                    />
                    <TextControl
                        type={'url'}
                        label={__( 'Read More Link', 'alps-gutenberg-blocks' )}
                        value={attributes.readMoreLink}
                        placeholder={'http://'}
                        keepPlaceholderOnFocus={true}
                        onChange={this.onChangeReadMoreLink}
                    />
                </div>
                <div className={'o-editor-block--right'}>
                    <div className={`o-image--${attributes.imageID} o-image`}>
                        <MediaUpload
                            onSelect={this.onSelectImage}
                            type={'image'}
                            value={attributes.imageID}
                            render={ ({open}) => this.getImageButton(open)}
                        />
                    </div>
                    <RichText
                        tagName={'strong'}
                        placeholder={ __('Enter Video Title', 'alps-gutenberg-blocks')}
                        className={'o-heading--l'}
                        keepPlaceholderOnFocus={true}
                        value={attributes.title}
                        onChange={this.onChangeTitle}
                    />
                    <TextControl
                        type={'url'}
                        label={__( 'Watch Video Link', 'alps-gutenberg-blocks' )}
                        value={attributes.watchVideoLink}
                        placeholder={'http://'}
                        keepPlaceholderOnFocus={true}
                        onChange={this.onChangeWatchVideoLink}
                    />
                </div>
            </div>
        );
    }
}