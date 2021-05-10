import {Component} from "@wordpress/element";
import {AlignmentToolbar, BlockControls, InspectorControls, MediaUpload, RichText} from "@wordpress/block-editor";
import {Button, CheckboxControl, Icon, TextControl, ToggleControl} from "@wordpress/components";
import {__} from '@wordpress/i18n';
import {DescCard} from "../../global-components/DescCard";
import icons from "../../../icons/icons";

export class CTAEditComponent extends Component {

    constructor() {
        super(...arguments);

        // General Section
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeAlignment = this.onChangeAlignment.bind(this);

        // Media Section
        this.onSelectImage = this.onSelectImage.bind(this);
        this.onRemoveImage = this.onRemoveImage.bind(this);
        this.updateBackgroundColor = this.updateBackgroundColor.bind(this);
        this.updateBackgroundImage = this.updateBackgroundImage.bind(this);

        // Button 1 Section
        this.onChangeButton1Url = this.onChangeButton1Url.bind(this);
        this.onChangeButton1Text = this.onChangeButton1Text.bind(this);
        this.onChangeButton1NewWindow = this.onChangeButton1NewWindow.bind(this);

        // Button 2 Section
        this.onChangeButton2Url = this.onChangeButton2Url.bind(this);
        this.onChangeButton2Text = this.onChangeButton2Text.bind(this);
        this.onChangeButton2NewWindow = this.onChangeButton2NewWindow.bind(this);
    }

    // General Section
    onChangeTitle(title) {
        this.props.setAttributes({title});
    }

    onChangeDescription(description) {
        this.props.setAttributes({description});
    }

    onChangeAlignment(newAlignment) {
        this.props.setAttributes({alignment: newAlignment === undefined ? 'left' : newAlignment});
    }

    // Button 1 Section
    onChangeButton1Url(button1Url) {
        this.props.setAttributes({button1Url});
    }

    onChangeButton1Text(button1Text) {
        this.props.setAttributes({button1Text});
    }

    onChangeButton1NewWindow(button1NewWindow) {
        this.props.setAttributes({button1NewWindow});
    }

    // Button 2 Section
    onChangeButton2Url(button2Url) {
        this.props.setAttributes({button2Url});
    }

    onChangeButton2Text(button2Text) {
        this.props.setAttributes({button2Text});
    }

    onChangeButton2NewWindow(button2NewWindow) {
        this.props.setAttributes({button2NewWindow});
    }

    // Media Section
    onSelectImage(media) {
        this.props.setAttributes({
            imageUrl: media.sizes.large.url,
            imageId: media.id,
            blockClass: ' has-image'
        });
    }

    onRemoveImage(media) {
        this.props.setAttributes({
            media: null,
            imageUrl: null,
            imageId: null,
            blockClass: '',
            hasBackgroundImage: false
        });
    }

    updateBackgroundColor(updateBackColor) {
        this.props.setAttributes({
            isDark: updateBackColor,
            themeClass: updateBackColor ? ' u-theme--dark u-theme--background-color--darker' : ' u-background-color--gray--light'
        });
    }

    updateBackgroundImage(updateBackImage) {
        this.props.setAttributes({
            hasBackgroundImage: updateBackImage,
            blockClass: updateBackImage ? ' has-background-image u-background--cover u-theme--gradient--bottom': ''
        });
    }

    getImageButton(obj) {

        const {attributes} = this.props;

        return (
            <Button
                className={attributes.imageId ? 'image-button' : 'button button-large'}
                onClick={!attributes.imageId ? obj.open : obj.close}
            >
                { !attributes.imageId ?
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
                        <img className={"contentCard__image"} src={attributes.imageUrl}/>
                    </div>
                }

            </Button>
        );
    }

    render() {

        const {attributes, className} = this.props;

        return ([
            <InspectorControls key={'inspector'}>
                <div className={ className + "__settings"}>
                    <ToggleControl
                        label={__('Dark Background', 'alps-gutenberg-blocks')}
                        help={__('Makes the CTA background dark.', 'alps-gutenberg-blocks')}
                        checked={attributes.isDark}
                        onChange={this.updateBackgroundColor}
                    />
                    <ToggleControl
                        label={__('Background Image', 'alps-gutenberg-blocks')}
                        help={__('Sets the image as a background image.', 'alps-gutenberg-blocks')}
                        checked={attributes.hasBackgroundImage}
                        onChange={this.updateBackgroundImage}
                    />
                </div>
            </InspectorControls>,
            <BlockControls key={'controls'}>
                <AlignmentToolbar
                    value={attributes.alignment}
                    onChange={(nextAction) => this.onChangeAlignment(nextAction)}
                />
            </BlockControls>,
            <div className={className}>
                <DescCard
                    title={"Call to Action (CTA)"}
                    hasText={true}
                    hasImage={true}
                    hasImages={false}
                />
                <div className={'contentCard'}>
                    <fieldset>
                        <legend>{ __("Title") }</legend>
                        <RichText
                            className={'o-heading--l contentCard__input'}
                            placeholder={__('Enter your Title...', 'alps-gutenberg-blocks')}
                            keepPlaceholderOnFocus={true}
                            value={attributes.title}
                            onChange={this.onChangeTitle}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>{ __("Description") }</legend>
                        <RichText
                            className={'o-description contentCard__input'}
                            style={{textAlign: attributes.alignment}}
                            placeholder={__('Enter your Description...', 'alps-gutenberg-blocks')}
                            keepPlaceholderOnFocus={true}
                            value={attributes.description}
                            onChange={this.onChangeDescription}
                        />
                    </fieldset>

                    <div className={"o-buttons"}>
                        <div className={'o-button--1'}>
                            <fieldset>
                                <legend>{ __("Primary Button") }</legend>
                                <div style={{"width": "100%"}}>
                                    <TextControl
                                        type={'url'}
                                        value={attributes.button1Url}
                                        placeholder={__('https://...', 'alps-gutenberg-blocks')}
                                        keepPlaceholderOnFocus={true}
                                        onChange={this.onChangeButton1Url}
                                    />
                                    <TextControl
                                        value={attributes.button1Text}
                                        placeholder={__('Button Label', 'alps-gutenberg-blocks')}
                                        keepPlaceholderOnFocus={true}
                                        onChange={this.onChangeButton1Text}
                                    />
                                    <div className={"contentCard__checkbox"}>
                                        <CheckboxControl
                                            label={__('Open link in a new window', 'alps-gutenberg-blocks')}
                                            checked={attributes.button1NewWindow}
                                            onChange={this.onChangeButton1NewWindow}
                                        />
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        <div className={'o-button--2'} >
                            <fieldset>
                                <legend>{ __("Secondary Button") }</legend>
                                <div style={{"width": "100%"}}>
                                    <TextControl
                                        type={'url'}
                                        value={attributes.button2Url}
                                        placeholder={ __('https://...', 'alps-gutenberg-blocks')}
                                        keepPlaceholderOnFocus={true}
                                        onChange={this.onChangeButton2Url}
                                    />
                                    <TextControl
                                        value={attributes.button2Text}
                                        placeholder={__('Button Label', 'alps-gutenberg-blocks')}
                                        keepPlaceholderOnFocus={true}
                                        onChange={this.onChangeButton2Text}
                                    />
                                    <div className={"contentCard__checkbox"}>
                                        <CheckboxControl
                                            label={__('Open link in a new window', 'alps-gutenberg-blocks')}
                                            checked={attributes.button2NewWindow}
                                            onChange={this.onChangeButton2NewWindow}
                                        />
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>

                    <fieldset>
                        <legend>{ __("Image") }</legend>
                        <div className={'o-image ' + 'o-image--' + attributes.imageID}>
                            <MediaUpload
                                onSelect={this.onSelectImage}
                                type={'image'}
                                value={attributes.imageId}
                                render={(obj) => this.getImageButton(obj)}
                            />
                        </div>
                    </fieldset>
                </div>
            </div>
        ]);
    }
}
