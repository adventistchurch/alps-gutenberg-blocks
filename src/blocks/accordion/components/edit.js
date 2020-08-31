import { Component, Fragment } from '@wordpress/element';
import { RichText, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';
import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

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
                    <TextControl
                        placeholder={ __('Title', 'alps-gutenberg-blocks') }
                        keepPlaceholderOnFocus={ true }
                        value={ attributes.title }
                        onChange={ this.onChangeTitle }
                    />
                    <RichText
                        tagName="p"
                        className="o-paragraph"
                        placeholder={ __('Body', 'alps-gutenberg-blocks') }
                        keepPlaceholderOnFocus={ true }
                        style={{ textAlign: attributes.alignment }}
                        value={ attributes.body }
                        onChange={ this.onChangeBody }
                    />
                </div>
            </Fragment>
        );
    }
}
