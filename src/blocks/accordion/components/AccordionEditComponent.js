import { Component, Fragment } from '@wordpress/element';
import { RichText, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import {DescCard} from "../../global-components/DescCard";

export class AccordionEdit extends Component {
    constructor() {
        super( ...arguments );

        this.onChangeAlignment = this.onChangeAlignment.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeBody = this.onChangeBody.bind(this);
    }
    onChangeAlignment(newAlignment) {
        const { setAttributes } = this.props;
        setAttributes({ alignment: newAlignment === undefined ? 'left' : newAlignment });
    }
    onChangeTitle(newTitle) {
        const { setAttributes } = this.props;
        setAttributes({ title: newTitle });
    }
    onChangeBody(newBody) {
        const { setAttributes } = this.props;
        setAttributes({ body: newBody });
    }

    render() {
        const { attributes, className } = this.props;

        return (
            <Fragment>
                <BlockControls key="controls">
                    <AlignmentToolbar
                        value={ attributes.alignment }
                        onChange={ this.onChangeAlignment }
                    />
                </BlockControls>
                <div className={ className }>
                    <DescCard
                        title={"Accordion"}
                        hasText={true}
                        hasImage={false}
                        hasImages={false}
                    />
                    <div className={'contentCard'}>
                        <fieldset>
                            <legend>{ __("Title") }</legend>
                            <RichText
                                className={"contentCard__input"}
                                placeholder={ __('Enter your Title...', 'alps-gutenberg-blocks') }
                                keepPlaceholderOnFocus={ true }
                                value={ attributes.title }
                                onChange={ this.onChangeTitle }
                            />
                        </fieldset>
                        <fieldset>
                            <legend>{ __("Body") }</legend>
                            <RichText
                                className={"contentCard__input"}
                                placeholder={ __('Enter your Body Text...', 'alps-gutenberg-blocks') }
                                keepPlaceholderOnFocus={ true }
                                style={{ textAlign: attributes.alignment }}
                                value={ attributes.body }
                                onChange={ this.onChangeBody }
                            />
                        </fieldset>
                    </div>
                </div>
            </Fragment>
        );
    }
}
