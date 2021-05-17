import {Component} from "@wordpress/element";
import {RichText, MediaUpload} from "@wordpress/block-editor";
import {Button, Icon, TextControl} from "@wordpress/components";
import { __ } from '@wordpress/i18n';
import icons from "../../../icons/icons";
import ScaledImage from "../../media-block/components/image-editor";

export class MediaTestimonyEditComponent extends Component {

    constructor() {
        super(...arguments);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeWatchVideoLink = this.onChangeWatchVideoLink.bind(this);
        this.onChangeQuote = this.onChangeQuote.bind(this);
        this.onChangeReadMoreLink = this.onChangeReadMoreLink.bind(this);
        this.onSelectImage = this.onSelectImage.bind(this);
        this.onRemoveImage = this.onRemoveImage.bind(this);
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

    onRemoveImage(media) {
        this.props.setAttributes({
            media: null,
            imageURL: null,
            imageID: null
        });
    }

    getImageButton(obj) {

        const { attributes } = this.props;

        return (
            <div className={attributes.alignment === "left" ? "alps__media-block__upload-image-section-left" : "alps__media-block__upload-image-section-center"}>
                <Button
                    className={attributes.imageID ? 'image-button' : 'button button-large'}
                    onClick={!attributes.imageID ? obj.open : obj.close}
                >
                    { !attributes.imageID ?
                        <div>
                            <Icon style={{"margin-right": "8px"}} className={"icon"} icon={icons.upload} />
                            { __( 'Upload Image', 'alps-gutenberg-blocks' ) }
                        </div>
                        :
                        <ScaledImage
                            url={attributes.imageURL}
                            id={attributes.imageID}
                            onRemove={this.onRemoveImage}
                            setAttributes={this.props.setAttributes}
                        />
                    }
                </Button>
            </div>
        );
    }

    render() {

        const { attributes, className } = this.props;

        return(
            <div className={className}>
                <div className={'contentCard'}>
                    <fieldset>
                        <legend>{ __("Quote") }</legend>
                        <RichText
                            tagName={'h4'}
                            className={"contentCard__input"}
                            placeholder={ __('Enter your Quote...', 'alps-gutenberg-blocks')}
                            keepPlaceholderOnFocus={true}
                            value={attributes.quote}
                            onChange={this.onChangeQuote}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>{__( 'Read More Link', 'alps-gutenberg-blocks' )}</legend>
                        <div style={{"width": "100%"}}>
                            <TextControl
                                type={'url'}
                                value={attributes.readMoreLink}
                                placeholder={'http://'}
                                keepPlaceholderOnFocus={true}
                                onChange={this.onChangeReadMoreLink}
                            />
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>{__( 'Video', 'alps-gutenberg-blocks' )}</legend>
                        <div style={{"display": "flex", "width": "100%"}}>
                            <div style={{"width": "50%", "padding-right": "10px"}}>
                                <RichText
                                    placeholder={ __('Enter your Video title...', 'alps-gutenberg-blocks')}
                                    className={'o-heading--l contentCard__input'}
                                    keepPlaceholderOnFocus={true}
                                    value={attributes.title}
                                    onChange={this.onChangeTitle}
                                />
                            </div>
                            <div style={{"width": "50%", "padding-left": "10px"}}>
                                <TextControl
                                    type={'url'}
                                    value={attributes.watchVideoLink}
                                    placeholder={'http://'}
                                    keepPlaceholderOnFocus={true}
                                    onChange={this.onChangeWatchVideoLink}
                                />
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>{__( 'Image', 'alps-gutenberg-blocks' )}</legend>
                        <div className={`o-image--${attributes.imageID} o-image`}>
                            <MediaUpload
                                onSelect={this.onSelectImage}
                                type={'image'}
                                value={attributes.imageID}
                                render={(obj) => this.getImageButton(obj)}
                            />
                        </div>
                    </fieldset>
                </div>


            </div>
        );
    }
}