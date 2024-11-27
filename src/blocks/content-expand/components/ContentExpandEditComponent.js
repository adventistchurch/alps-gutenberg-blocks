import {Component} from "@wordpress/element";
import {AlignmentToolbar, BlockControls, RichText} from "@wordpress/block-editor";
import { __ } from '@wordpress/i18n';
import {DescCard} from "../../global-components/DescCard";

export class ContentExpandEditComponent extends Component {
    constructor() {
        super(...arguments);

        this.props.setAttributes({
            showMoreButton: __('Show More', 'alps-gutenberg-blocks'),
            showLessButton: __('Show Less', 'alps-gutenberg-blocks')
        })

        this.onChangeKicker = this.onChangeKicker.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeBody = this.onChangeBody.bind(this);
    }

    onChangeKicker(kicker) {
        this.props.setAttributes({ kicker });
    }

    onChangeTitle(title) {
        this.props.setAttributes({ title });
    }

    onChangeBody(body) {
        this.props.setAttributes({ body });
    }

    onChangeAlignment( newAlignment ) {
        this.props.setAttributes( { alignment: newAlignment === undefined ? 'left' : newAlignment } );
    }

    render() {

        const { attributes, className } =  this.props;

        return ([
            <BlockControls>
                <AlignmentToolbar
                    value={ attributes.alignment }
                    onChange={ nextAlign => this.onChangeAlignment(nextAlign) }
                />
            </BlockControls>,
            <div className={className}>
                <DescCard
                    title={"Content Expand"}
                    hasText={true}
                    hasImage={false}
                    hasImages={false}
                />
                <div className={'contentCard'}>
                    <fieldset>
                        <legend>{ __("Kicker") }</legend>
                        <RichText
                            placeholder = { __('Kicker', 'alps-gutenberg-blocks')}
                            className = {'o-kicker contentCard__input'}
                            keepPlaceholderOnFocus={true}
                            value={attributes.kicker}
                            onChange={this.onChangeKicker}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>{ __("Title") }</legend>
                        <RichText
                            className={'o-heading--l contentCard__input'}
                            placeholder={ __('Title', 'alps-gutenberg-blocks')}
                            keepPlaceholderOnFocus={true}
                            value={attributes.title}
                            onChange={ this.onChangeTitle}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>{ __("Body") }</legend>
                        <RichText
                            className={'o-paragraph contentCard__input'}
                            placeholder={__('Body', 'alps-gutenberg-blocks')}
                            keepPlaceholderOnFocus={true}
                            style={{ textAlign: attributes.alignment }}
                            value={ attributes.body}
                            onChange={ this.onChangeBody}
                        />
                    </fieldset>
                </div>
            </div>
        ]);
    }
}