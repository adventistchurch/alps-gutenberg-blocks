import {Component} from "@wordpress/element";
import {InnerBlocks, RichText} from "@wordpress/block-editor";
import {TextControl} from "@wordpress/components";
import { __ } from '@wordpress/i18n';
import {DescCard} from "../../global-components/DescCard";

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
                <DescCard
                    title={"Media Testimonies"}
                    hasText={true}
                    hasImage={true}
                    hasImages={true}
                />
                <div className={'contentCard'}>
                    <fieldset>
                        <legend>{ __("Title") }</legend>
                        <RichText
                            tagName={'h3'}
                            placeholder={ __('Enter your Title...', 'alps-gutenberg-blocks')}
                            className={'o-heading--l contentCard__input'}
                            keepPlaceholderOnFocus={true}
                            value={attributes.title}
                            onChange={this.onChangeTitle}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>{__( 'See All Link Url', 'alps-gutenberg-blocks' )}</legend>
                        <div style={{"width": "100%"}}>
                            <TextControl
                                type={'url'}
                                value={ attributes.link }
                                placeholder={'http://'}
                                className={'o-link'}
                                keepPlaceholderOnFocus={true}
                                onChange={ this.onChangeLink }
                            />
                        </div>
                    </fieldset>
                    <InnerBlocks
                        template={[['alps-gutenberg-blocks/media-testimony', {} ]]}
                        allowedBlocks={['alps-gutenberg-blocks/media-testimony' ]}
                    />
                </div>
            </div>
        ])
    }
}
