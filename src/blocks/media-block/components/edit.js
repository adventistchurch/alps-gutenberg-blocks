import { Component } from "@wordpress/element";
import { InspectorControls, BlockControls, AlignmentToolbar, MediaUpload, RichText } from "@wordpress/block-editor";
import {Button} from "@wordpress/components";
import { __ } from '@wordpress/i18n';
import cls from 'classnames';

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
        this.props.setAttributes({ alignment: nextAction});
    }

    onChangeButtonText(buttonText) {
        this.props.setAttributes({ buttonText });
    }

    getImageButton(openEvent) {

        const { attributes } = this.props;

        return (
            <div className={attributes.alignment === "left" ? "alps__media-block__upload-image-section-left" : "alps__media-block__upload-image-section-center"}>
                <Button
                    className={attributes.imageID ? "alps__media-block-image-button" : "button button-large"}
                    onClick={openEvent}
                >
                    {!attributes.imageID ? __("Upload/Edit Image") : <img src={attributes.imageURL} />}
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
                        <p className={"alps__media-block__settings__text"}>Provide link to button and Title</p>
                        <RichText
                            className={"alps__media-block__settings__link"}
                            tagName={"div"}
                            placeholder={ __("Title Link. If link is empty title will be just text.") }
                            value={ attributes.url }
                            onChange={ this.onChangeUrl }
                        />
                        { isButtonAvailable &&
                            <div>
                                <p className={"alps__media-block__settings__text"}>Provide Text Button</p>
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
                </InspectorControls>,

                (isSelected && (
                    <BlockControls key="controls">
                        <AlignmentToolbar
                            value={attributes.alignment}
                            onChange={nextAlign => this.onChangeLayout(nextAlign)}
                        />
                    </BlockControls>
                )),

                <div className={ className }>
                    <div className={styles}>
                        <MediaUpload
                            onSelect={ this.onSelectImage }
                            type={"image"}
                            value={ attributes.imageID }
                            render={ ({open}) => this.getImageButton(open)}
                        />
                        <div className={textSectionStyles}>
                            <div className={"alps__media-block__text-section-wrap"}>
                                <div className={"alps__media-block__text-section-meta__top"}>
                                    <RichText
                                        className={"alps__media-block__text-section-meta__top-title"}
                                        tagName={"div"}
                                        placeholder={ __("Enter your title here...") }
                                        value={ attributes.title }
                                        onChange={ this.onChangeTitle }
                                    />
                                    <RichText
                                        className={"alps__media-block__text-section-meta__top-description"}
                                        placeholder={ __("Enter your Description here...") }
                                        value={ attributes.description }
                                        onChange={ this.onChangeDescription }
                                    />
                                </div>

                                <div className={"alps__media-block__text-section-meta__buttom"}>
                                    <RichText
                                        className={"alps__media-block__text-section-meta__buttom__category"}
                                        tagName={"div"}
                                        placeholder={ __("Category") }
                                        value={ attributes.category }
                                        onChange={ this.onChangeCategory }
                                    />
                                    <RichText
                                        className={"alps__media-block__text-section-meta__buttom__date"}
                                        tagName={"div"}
                                        placeholder={"Date"}
                                        value={ attributes.date }
                                        onChange={ this.onChangeDate }
                                    />
                                </div>
                                { isButtonAvailable &&
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
            ]
        );
    }
}
