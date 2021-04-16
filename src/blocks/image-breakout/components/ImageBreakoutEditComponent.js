import {Component} from "@wordpress/element";
import {MediaUpload} from "@wordpress/block-editor";
import {Button, Icon} from "@wordpress/components";
import { __ } from '@wordpress/i18n';
import {RichText} from "@wordpress/block-editor";
import {DescCard} from "../../global-components/DescCard";
import icons from "../../../icons/icons";

export class ImageBreakoutEditComponent extends Component {

    constructor() {
        super(...arguments);

        this.onChangeCaption = this.onChangeCaption.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onRemoveImage = this.onRemoveImage.bind(this);
    }

    onChangeCaption(caption) {
        this.props.setAttributes({ caption });
    }

    onSelect(media) {
        this.props.setAttributes({
            url: media.sizes.large.url,
            id: media.id
        });
    }

    onRemoveImage() {
        this.props.setAttributes({
            url: null,
            id: null
        });
    }

    getImageButton(obj) {

        const {attributes} = this.props;

        return (
            <Button
                className={attributes.id ? 'image-button' : 'button button-large'}
                onClick={!attributes.id ? obj.open : obj.close}
            >
                { !attributes.id ?
                    <div>
                        <Icon style={{"margin-right": "8px"}} className={"icon"} icon={icons.upload} />
                        { __( 'Upload Image', 'alps-gutenberg-blocks' ) }
                    </div>
                    :
                    <div className={'o-image--edit'}>
                        <Button
                            icon={icons.remoteGalleryItem}
                            onClick={this.onRemoveImage}
                            className={'blocks-gallery-item__remove'}
                            label={__('Remove Image', 'alps-gutenberg-blocks')}
                        />
                        <img className={"contentCard__image"} src={attributes.url}/>
                    </div>
                }

            </Button>
        );
    }

    render() {

        const { attributes, className } = this.props;

        return(
            <div className={ className }>
                <DescCard
                    title={"Image Breakout"}
                    hasText={true}
                    hasImage={true}
                    hasImages={false}
                />
                <div className={"contentCard"}>
                    <fieldset>
                        <legend>{ __("Image") }</legend>
                        <div className={'o-image ' + 'o-image--' + attributes.imageID}>
                            <MediaUpload
                                onSelect={this.onSelect}
                                type={'image'}
                                value={attributes.imageId}
                                render={(obj) => this.getImageButton(obj)}
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>{ __("Caption") }</legend>
                        <RichText
                            className={'o-caption contentCard__input'}
                            placeholder={__('Caption', 'alps-gutenberg-blocks')}
                            keepPlaceholderOnFocus={true}
                            value={attributes.caption}
                            onChange={ this.onChangeCaption }
                        />
                    </fieldset>
                </div>
            </div>
        )
    }
}
