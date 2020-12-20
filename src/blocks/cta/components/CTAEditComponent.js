import {Component} from "@wordpress/element";
import {AlignmentToolbar, BlockControls, InspectorControls, MediaUpload, RichText} from "@wordpress/block-editor";
import {Button, CheckboxControl, TextControl, ToggleControl} from "@wordpress/components";
import {__} from '@wordpress/i18n';

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
                    __('Upload Image', 'alps-gutenberg-blocks') :
                    <div className={'o-image--edit'}>
                        <Button
                            icon={'no-alt'}
                            onClick={this.onRemoveImage}
                            className={'blocks-gallery-item__remove'}
                            label={__('Remove Image', 'alps-gutenberg-blocks')}
                        />
                        <img src={attributes.imageUrl}/>
                    </div>
                }

            </Button>
        );
    }

    render() {

        const {attributes, className} = this.props;

        return ([
            <InspectorControls key={'inspector'}>
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
            </InspectorControls>,
            <BlockControls key={'controls'}>
                <AlignmentToolbar
                    value={attributes.alignment}
                    onChange={(nextAction) => this.onChangeAlignment(nextAction)}
                />
            </BlockControls>,
            <div className={className}>
                <MediaUpload
                    onSelect={this.onSelectImage}
                    type={'image'}
                    value={attributes.imageId}
                    render={(obj) => this.getImageButton(obj)}
                />
                <RichText
                    className={'o-heading--l'}
                    tagName={'h3'}
                    placeholder={__('Title', 'alps-gutenberg-blocks')}
                    keepPlaceholderOnFocus={true}
                    value={attributes.title}
                    onChange={this.onChangeTitle}
                />
                <RichText
                    className={'o-description'}
                    style={{textAlign: attributes.alignment}}
                    tagName={'p'}
                    placeholder={__('Description', 'alps-gutenberg-blocks')}
                    keepPlaceholderOnFocus={true}
                    value={attributes.description}
                    onChange={this.onChangeDescription}
                />
                <div className={'o-buttons'}>
                    <div className={'o-button--1'}>
                        <TextControl
                            type={'url'}
                            lable={__('Button 1 Url', 'alps-gutenberg-blocks')}
                            value={attributes.button1Url}
                            placeholder={'https://'}
                            keepPlaceholderOnFocus={true}
                            onChange={this.onChangeButton1Url}
                        />
                        <TextControl
                            lable={__('Button 1 Text', 'alps-gutenberg-blocks')}
                            value={attributes.button1Text}
                            placeholder={'Learn more'}
                            keepPlaceholderOnFocus={true}
                            onChange={this.onChangeButton1Text}
                        />
                        <CheckboxControl
                            label={__('Open in new window', 'alps-gutenberg-blocks')}
                            checked={attributes.button1NewWindow}
                            onChange={this.onChangeButton1NewWindow}
                        />
                    </div>
                    <div className={'o-button--2'}>
                        <TextControl
                            type={'url'}
                            lable={__('Button 2 Url', 'alps-gutenberg-blocks')}
                            value={attributes.button2Url}
                            placeholder={'https://'}
                            keepPlaceholderOnFocus={true}
                            onChange={this.onChangeButton2Url}
                        />
                        <TextControl
                            lable={__('Button 2 Text', 'alps-gutenberg-blocks')}
                            value={attributes.button2Text}
                            placeholder={'Learn more'}
                            keepPlaceholderOnFocus={true}
                            onChange={this.onChangeButton2Text}
                        />
                        <CheckboxControl
                            label={__('Open in new window', 'alps-gutenberg-blocks')}
                            checked={attributes.button2NewWindow}
                            onChange={this.onChangeButton2NewWindow}
                        />
                    </div>
                </div>
            </div>
        ]);
    }
}
