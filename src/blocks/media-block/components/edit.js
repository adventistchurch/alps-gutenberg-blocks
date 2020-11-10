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
         if ( url === undefined || url === null || url === "" ) {
             this.props.setAttributes({ url: url, buttonText: "" })
         } else {
             this.props.setAttributes({ url: url, buttonText: "START THIS LESSON" });
         }
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
            <div className={attributes.alignment === "left" ? "upload-image-block__left" : "upload-image-block__center"}>
                <Button
                    className={attributes.imageID ? "image-button" : "button button-large"}
                    onClick={openEvent}
                >
                    {!attributes.imageID ? __("Upload/Edit Image") : <img src={attributes.imageURL} />}
                </Button>
            </div>
        );
    }

    render () {
        const { attributes, className, isSelected } = this.props;

        const isButtonAvailable = attributes.buttonText !== undefined && attributes.alignment === "center";

        const styles = cls(
            'main',
            { "main__left" :attributes.alignment === "left" },
            { "main main__center" :attributes.alignment === "center" },
        );

        return ([
                <InspectorControls>
                    Just for next options
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
                        <div className={"text-block"}>
                            <div className={"text-block__wrap"}>
                                <div className={"text-block__first"}>
                                    <RichText
                                        className={"title"}
                                        tagName={"div"}
                                        placeholder={ __("Enter your title here...") }
                                        value={ attributes.title }
                                        onChange={ this.onChangeTitle }
                                    />
                                    <RichText
                                        className={"description"}
                                        placeholder={ __("Enter your Description here...") }
                                        value={ attributes.description }
                                        onChange={ this.onChangeDescription }
                                    />
                                </div>

                                <div className={"meta-block"}>
                                    <RichText
                                        className={"meta-block__category"}
                                        tagName={"div"}
                                        placeholder={ __("Category") }
                                        value={ attributes.category }
                                        onChange={ this.onChangeCategory }
                                    />
                                    <RichText
                                        className={"meta-block__date"}
                                        tagName={"div"}
                                        placeholder={"Date"}
                                        value={ attributes.date }
                                        onChange={ this.onChangeDate }
                                    />
                                </div>
                            </div>
                            { isButtonAvailable &&
                                <a href={ attributes.url }
                                   className="button">
                                    { attributes.buttonText }
                                    <span className="button__icon">
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

                    <div className={"settings"}>
                        <RichText
                            tagName={"div"}
                            placeholder={ __("Title Link. If link is empty title will be just text.") }
                            value={ attributes.url }
                            onChange={ this.onChangeUrl }
                        />
                        { isButtonAvailable &&
                            <RichText
                                tagName={"div"}
                                placeholder={ __("Text button.") }
                                value={ attributes.buttonText }
                                onChange={ this.onChangeButtonText }
                            />
                        }
                    </div>

                </div>
            ]
        );
    }
}
