import {Component} from "@wordpress/element";
import { BlockControls, MediaUpload, AlignmentToolbar, RichText } from "@wordpress/block-editor";
import {Button, Icon} from "@wordpress/components";
import { __ } from '@wordpress/i18n';
import {DescCard} from "../../global-components/DescCard";
import icons from "../../../icons/icons";

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

        //TODO add styles

        return (
            <Button
                className={attributes.imageID ? 'image-button' : 'button button-large'}
                onClick={openEvent}
            >
                {!attributes.imageID ?
                    <div>
                        <Icon style={{"margin-right": "8px"}} className={"icon"} icon={icons.upload} />
                        { __( 'Upload Image', 'alps-gutenberg-blocks' ) }
                    </div>
                    :
                    <img className={'contentCard__image'} src={attributes.imageURL} />
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
                <DescCard
                    title={"Content Show More"}
                    hasText={true}
                    hasImage={true}
                    hasImages={false}
                />
                <div className={'contentCard'}>
                    <fieldset>
                        <legend>{ __("Title") }</legend>
                        <RichText
                            tagName={'strong'}
                            className={'o-heading--l contentCard__input'}
                            placeholder={ __('Enter your Title...', 'alps-gutenberg-blocks') }
                            keepPlaceholderOnFocus={ true }
                            value={ attributes.title }
                            onChange={ this.onChangeTitle }
                        />
                    </fieldset>
                    <fieldset>
                        <legend>{ __("Description") }</legend>
                        <RichText
                            className={'contentCard__input'}
                            placeholder={ __('Enter your Description...', 'alps-gutenberg-blocks') }
                            keepPlaceholderOnFocus={ true }
                            style={ {textAlign: attributes.alignment} }
                            value={ attributes.description }
                            onChange={ this.onChangeDescription }
                        />
                    </fieldset>
                    <fieldset>
                        <legend>{ __("Body") }</legend>
                        <RichText
                            className={'o-paragraph contentCard__input'}
                            placeholder={ __('Enter your Body Text... (Displays on click for Show More button)', 'alps-gutenberg-blocks') }
                            keepPlaceholderOnFocus={ true }
                            style={ {textAlign: attributes.alignment} }
                            value={ attributes.body }
                            onChange={ this.onChangeBody }
                        />
                    </fieldset>
                    <fieldset>
                        <legend>{ __("Image") }</legend>
                        <div className={'o-image ' + 'o-image--' + attributes.imageID}>
                            <MediaUpload
                                onSelect={ this.onSelectImage }
                                type={'image'}
                                value={ attributes.imageID }
                                render={ ({open}) => this.getImageButton(open)}
                            />
                        </div>
                    </fieldset>
                </div>
            </div>
        ]);
    }
}