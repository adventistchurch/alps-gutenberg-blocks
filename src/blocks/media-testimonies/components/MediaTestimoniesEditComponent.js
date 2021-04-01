import {Component} from "@wordpress/element";
import {InnerBlocks, RichText} from "@wordpress/block-editor";
import {TextControl} from "@wordpress/components";
import { __ } from '@wordpress/i18n';

export class MediaTestimoniesEditComponent extends Component {

    constructor() {
        super(...arguments);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeLink = this.onChangeLink.bind(this);
    }

    onChangeTitle(title) {
        this.props.setAttributes({ title });
    }

    onChangeLink(link) {
        this.props.setAttributes({ link });
    }

    render() {

        const { attributes, className } = this.props;

        return([
            <div className={className}>
                <div className={'o-editor-heading'}>
                    <RichText
                        tagName={'h3'}
                        placeholder={ __('Enter Section Title', 'alps-gutenberg-blocks')}
                        className={'o-heading--l'}
                        keepPlaceholderOnFocus={true}
                        value={attributes.title}
                        onChange={this.onChangeTitle}
                    />
                    <TextControl
                        type={'url'}
                        label={__( 'See All Link Url', 'alps-gutenberg-blocks' )}
                        value={ attributes.link }
                        placeholder={'http://'}
                        className={'o-link'}
                        keepPlaceholderOnFocus={true}
                        onChange={ this.onChangeLink }
                    />
                </div>
                <InnerBlocks
                    template={[['alps-gutenberg-blocks/media-testimony', {} ]]}
                    allowedBlocks={['alps-gutenberg-blocks/media-testimony' ]}
                />
            </div>
        ])
    }
}
