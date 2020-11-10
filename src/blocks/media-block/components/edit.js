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
             this.props.setAttributes({ url: url, buttonText: 'START THIS LESSON' });
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
        this.props.setAttribute({ buttonText });
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
                        <div>
                            <RichText
                                tagName={"div"}
                                placeholder={ __("Enter your title here...") }
                                value={ attributes.title }
                                onChange={ this.onChangeTitle }
                            />
                            <RichText
                                placeholder={ __("Enter your Description here...") }
                                value={ attributes.description }
                                onChange={ this.onChangeDescription }
                            />
                            <RichText
                                tagName={"div"}
                                placeholder={ __("Enter your Category here...") }
                                value={ attributes.category }
                                onChange={ this.onChangeCategory }
                            />
                            <RichText
                                tagName={"div"}
                                placeholder={"Date"}
                                value={ attributes.date }
                                onChange={ this.onChangeDate }
                            />
                        </div>
                    </div>
                    <RichText
                        tagName={"div"}
                        placeholder={ __("Title Link. If link is empty title will be just text.") }
                        value={ attributes.url }
                        onChange={ this.onChangeUrl }
                    />
                    { ( attributes.buttonText !== undefined && attributes.buttonText !== "" && attributes.alignment === "center") &&
                        <RichText
                            tagName={"div"}
                            placeholder={ __("Text button.") }
                            value={ attributes.buttonText }
                            onChange={ this.onChangeButtonText }
                        />
                    }
                </div>
            ]
        );
    }
}
