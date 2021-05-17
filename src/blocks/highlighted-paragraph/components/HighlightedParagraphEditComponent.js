import {Component} from "@wordpress/element";
import {AlignmentToolbar, BlockControls, RichText} from "@wordpress/block-editor";
import { __ } from '@wordpress/i18n';
import {DescCard} from "../../global-components/DescCard";

export class HighlightedParagraphEditComponent extends Component {

    constructor() {
        super(...arguments);

        this.onChangeContent = this.onChangeContent.bind(this);
        this.onChangeLayout = this.onChangeLayout.bind(this);
    }

    onChangeContent(content) {
        this.props.setAttributes({ content });
    }

    onChangeLayout(nextAlign){
        this.props.setAttributes({ alignment: nextAlign === undefined ? 'left' : nextAlign });
    }

    render() {

        const { attributes, className } = this.props;

        return ([
            <BlockControls key="controls">
                <AlignmentToolbar
                    value={attributes.alignment}
                    onChange={nextAlign => this.onChangeLayout(nextAlign)}
                />
            </BlockControls>,
            <div className={className}>
                <DescCard
                    title={"Highlighted Paragraph"}
                    hasText={true}
                    hasImage={false}
                    hasImages={false}
                />
                <div className={'contentCard'}>
                    <fieldset>
                        <legend>{ __("Content") }</legend>
                        <RichText
                            className={'o-paragraph contentCard__input'}
                            placeholder={ __('Enter your Content...', 'alps-gutenberg-blocks') }
                            keepPlaceholderOnFocus={true}
                            style={{ textAlign: attributes.alignment }}
                            value={  attributes.content }
                            onChange={ this.onChangeContent }
                        />
                    </fieldset>
                </div>
            </div>
        ]);
    }
}