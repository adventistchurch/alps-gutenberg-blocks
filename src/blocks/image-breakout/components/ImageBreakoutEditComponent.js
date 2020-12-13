import {Component} from "@wordpress/element";
import {MediaUpload} from "@wordpress/block-editor";
import {Button} from "@wordpress/components";
import { __ } from '@wordpress/i18n';
import {RichText} from "@wordpress/block-editor";

export class ImageBreakoutEditComponent extends Component {

    constructor() {
        super(...arguments);

        this.onChangeCaption = this.onChangeCaption.bind(this);
        this.onSelect = this.onSelect.bind(this);
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

    getImageButton(openEvent) {

        const { attributes } = this.props;

        return (
            <Button
                className={attributes.id ? 'image-button' : 'button button-large'}
                onClick={ openEvent }
            >
                { ! attributes.id ?
                    __( 'Upload Image', 'alps-gutenberg-blocks' ) :
                    <img src={attributes.url}/>
                }
            </Button>
        );
    }

    render() {

        const { attributes } = this.props;

        return([
            <MediaUpload
                onSelect={ this.onSelect }
                type={'image'}
                value={ attributes.id }
                render={ ({open}) => this.getImageButton(open)}
            />,
            <RichText
                tagName={'p'}
                className={'o-caption'}
                placeholder={__('Caption', 'alps-gutenberg-blocks')}
                keepPlaceholderOnFocus={true}
                value={attributes.caption}
                onChange={ this.onChangeCaption }
            />
        ])
    }
}
