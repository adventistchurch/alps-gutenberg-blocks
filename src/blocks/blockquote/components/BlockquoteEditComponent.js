import {Component} from "@wordpress/element";
import { InspectorControls, RichText } from "@wordpress/block-editor";
import { ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

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
                <RichText
                    className={'o-paragraph'}
                    tagName={'p'}
                    placeholder={ __('Write a quote...', 'alps-gutenberg-blocks') }
                    keepPlaceholderOnFocus={true}
                    value={ attributes.body }
                    onChange={ this.onChangeBody }
                />
                <RichText
                    className={'o-citation'}
                    tagName={'cite'}
                    placeholder={ __('Citation', 'alps-gutenberg-blocks') }
                    keepPlaceholderOnFocus={ true }
                    value={ attributes.citation }
                    onChange={ this.onChangeCitation}
                />
            </blockquote>
        ]);
    }
}