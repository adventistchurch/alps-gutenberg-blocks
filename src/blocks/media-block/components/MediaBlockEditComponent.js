import { Component } from "@wordpress/element";
import { InspectorControls, BlockControls, MediaUpload, AlignmentToolbar, RichText } from "@wordpress/block-editor";
import {Icon, ToggleControl} from '@wordpress/components';
import {Button} from "@wordpress/components";
import { __ } from '@wordpress/i18n';
import cls from 'classnames';

import {alignLeft, alignCenter} from "../images";
import ScaledImage from "./image-editor";
import {DescCard} from "../../global-components/DescCard";
import icons from "../../../icons/icons";


const ALIGNMENT_CONTROLS = [{
    icon: alignLeft,
    title: __('Align block left'),
    align: 'left',
}, {
    icon: alignCenter,
    title: __('Align block center'),
    align: 'center'
}];

export class MediaBlockEditComponent extends Component {

    constructor() {
        super(...arguments);

        this.onChangeLayout = this.onChangeLayout.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeUrl = this.onChangeUrl.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSelectImage = this.onSelectImage.bind(this);
        this.onChangeButtonText = this.onChangeButtonText.bind(this);
        this.setActiveButton = this.setActiveButton.bind(this);
        this.onRemoveImage = this.onRemoveImage.bind(this);
    }

    onChangeTitle(title) {
        this.props.setAttributes({ title });
    }

    onChangeUrl(url) {
        this.props.setAttributes({ url });
    }

    onChangeDescription(description) {
        this.props.setAttributes({ description });
    }

    onChangeCategory(category) {
        this.props.setAttributes({ category });
    }

    onChangeDate(date) {
        this.props.setAttributes({ date });
    }

    onSelectImage(media) {
        this.props.setAttributes({ imageURL: media.url, imageID: media.id });
    }

    onChangeLayout(nextAction) {
        this.props.setAttributes({ alignment: nextAction === undefined ? "left" : nextAction});
    }

    onChangeButtonText(buttonText) {
        this.props.setAttributes({ buttonText });
    }

    setActiveButton(buttonIsActive) {
        this.props.setAttributes({ buttonIsActive });
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

    render () {

        const { attributes, className, isSelected } = this.props;

        const isButtonAvailable = attributes.url !== undefined && attributes.url !== "";

        const styles = cls(
            "alps__media-block",
            { "alps__media-block__left" :attributes.alignment === "left" },
            { "alps__media-block__center" :attributes.alignment === "center" },
        );

        const textSectionStyles = cls(
            "alps__media-block__text-section",
            { "alps__media-block__text-section-left" :attributes.alignment === "left" },
            { "alps__media-block__text-section-center" :attributes.alignment === "center" },
        );

        return ([
            <InspectorControls>
                <div className={"alps__media-block__settings"}>
                    <p>Provide link to button and Title</p>
                    <RichText
                        className={"alps__media-block__settings__link"}
                        tagName={"div"}
                        placeholder={ __("Enter URL for title and button link here.") }
                        value={ attributes.url }
                        onChange={ this.onChangeUrl }
                    />

                    { isButtonAvailable &&
                        <div>
                            <ToggleControl
                                className={"alps__media-block__settings__toggle"}
                                label={ __("Enable Button.") }
                                help={ __("If the button is enabled don't forget to specify the text for the button!") }
                                checked={ attributes.buttonIsActive }
                                onChange={ this.setActiveButton }
                            />

                            {/*TODO: see disable option for this component (disable, disableEditMenu was not successfully)*/}
                            {   attributes.buttonIsActive &&
                                <div>
                                    <p>Provide Text Button</p>
                                    <RichText
                                        className={"alps__media-block__settings__button-text"}
                                        tagName={"div"}
                                        placeholder={ __("Text button.") }
                                        value={ attributes.buttonText }
                                        onChange={ this.onChangeButtonText }
                                    />
                                </div>
                            }

                        </div>

                    }
                </div>
            </InspectorControls>,

            (isSelected && (
                <BlockControls key="controls">
                    <AlignmentToolbar
                        value={attributes.alignment}
                        alignmentControls={ ALIGNMENT_CONTROLS }
                        onChange={nextAlign => this.onChangeLayout(nextAlign)}
                    />
                </BlockControls>
            )),

            <div className={ className }>
                <DescCard
                    title={"MediaBlock"}
                    hasText={true}
                    hasImage={true}
                    hasImages={false}
                />
                <div>
                    <div className={styles + " contentCard"}>
                        <MediaUpload
                            onSelect={ this.onSelectImage }
                            type={"image"}
                            value={ attributes.imageID }
                            render={(obj) => this.getImageButton(obj)}
                        />
                        <div className={textSectionStyles}>
                            <div className={'contentCard alps__media-block__text-section-wrap'}>
                                <div className={"alps__media-block__text-section-meta__top"}>
                                    <div className={"alps__media-block__text-section-meta__top-title"}>
                                        <fieldset>
                                            <legend>{ __("Title") }</legend>
                                            <RichText
                                                className={" contentCard__input"}
                                                tagName={"div"}
                                                placeholder={ __("Enter your Title...") }
                                                value={ attributes.title }
                                                onChange={ this.onChangeTitle }
                                            />
                                        </fieldset>
                                    </div>
                                    <div className={"alps__media-block__text-section-meta__top-description"}>
                                        <fieldset>
                                            <legend>{ __("Description") }</legend>
                                            <RichText
                                                className={" contentCard__input"}
                                                placeholder={ __("Enter your Description...") }
                                                value={ attributes.description }
                                                onChange={ this.onChangeDescription }
                                            />
                                        </fieldset>
                                    </div>
                                </div>
                                <div className={"alps__media-block__text-section-meta__bottom"}>
                                    <div className={"alps__media-block__text-section-meta__bottom__category"}>
                                        <fieldset>
                                            <legend>{ __("Category") }</legend>
                                            <RichText
                                                className={" contentCard__input"}
                                                tagName={"div"}
                                                placeholder={ __("Enter your Categories...") }
                                                value={ attributes.category }
                                                onChange={ this.onChangeCategory }
                                            />
                                        </fieldset>
                                    </div>
                                    <div className={"alps__media-block__text-section-meta__bottom__date"}>
                                        <fieldset>
                                            <legend>{ __("Date") }</legend>
                                            <RichText
                                                className={" contentCard__input"}
                                                tagName={"div"}
                                                placeholder={"Enter your Date..."}
                                                value={ attributes.date }
                                                onChange={ this.onChangeDate }
                                            />
                                        </fieldset>
                                    </div>
                                </div>
                                { attributes.buttonIsActive &&
                                    <a href={ attributes.url }
                                       className={"alps__media-block__button"}>
                                        { attributes.buttonText }
                                        <span className={"alps__media-block__button__icon"}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <title>Long right arrow</title>
                                                <path d="M18.29,8.59l-3.5-3.5L13.38,6.5,15.88,9H.29v2H15.88l-2.5,2.5,1.41,1.41,3.5-3.5L19.71,10Z" fill="#9b9b9b"></path>
                                            </svg>
                                        </span>
                                    </a>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ]);
    }
}
