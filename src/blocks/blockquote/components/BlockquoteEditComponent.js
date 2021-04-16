import {Component} from "@wordpress/element";
import { InspectorControls, RichText } from "@wordpress/block-editor";
import { ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import {DescCard} from "../../global-components/DescCard";

export class BlockquoteEditComponent extends Component {

    constructor() {
        super(...arguments);

        this.onChangeBody = this.onChangeBody.bind(this);
        this.onChangeCitation = this.onChangeCitation.bind(this);
        this.setExtendQuote = this.setExtendQuote.bind(this);
        this.setStrong = this.setStrong.bind(this);
    }

    onChangeBody(body) {
        this.props.setAttributes({ body })
    }

    onChangeCitation(citation) {
        this.props.setAttributes({ citation })
    }

    setExtendQuote(isExtendQuote) {
        this.props.setAttributes({ isExtendQuote });
    }

    setStrong(isStrong) {
        this.props.setAttributes({ isStrong });
    }

    render () {

        const { attributes, className } = this.props;

        return ([
            <InspectorControls>
                <ToggleControl
                    label={ __('Extend Quote', 'alps-gutenberg-blocks') }
                    help={ __('Extends the quote outside the page content.', 'alps-gutenberg-blocks') }
                    checked={ attributes.isExtendQuote }
                    onChange={ this.setExtendQuote }
                />
                <ToggleControl
                    label={ __('Strong Quote', 'alps-gutenberg-blocks') }
                    help={ __('Set strong style for the quote content.', 'alps-gutenberg-blocks') }
                    checked={ attributes.isStrong }
                    onChange={ this.setStrong }
                />
            </InspectorControls>,
            <blockquote className={ className }>
                <DescCard
                    title={"Blockquote"}
                    hasText={true}
                    hasImage={false}
                    hasImages={false}
                />
                <div className={'contentCard'}>
                    <fieldset>
                        <legend>{ __("Quote") }</legend>
                        <RichText
                            className={'o-paragraph contentCard__input'}
                            placeholder={ __('Write a quote...', 'alps-gutenberg-blocks') }
                            keepPlaceholderOnFocus={true}
                            value={ attributes.body }
                            onChange={ this.onChangeBody }
                        />
                    </fieldset>
                    <fieldset>
                        <legend>{ __("Citation") }</legend>
                        <RichText
                            className={'o-citation contentCard__input'}
                            tagName={'cite'}
                            placeholder={ __('Write a citation...', 'alps-gutenberg-blocks') }
                            keepPlaceholderOnFocus={ true }
                            value={ attributes.citation }
                            onChange={ this.onChangeCitation}
                        />
                    </fieldset>
                </div>
            </blockquote>
        ]);
    }
}