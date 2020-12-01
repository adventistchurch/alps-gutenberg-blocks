import { Component } from "@wordpress/element";
import { RichText } from "@wordpress/block-editor";
import { __ } from '@wordpress/i18n';

export class InlineSidebarEditComponent extends Component {
    constructor() {
        super(...arguments);

        this.onChangeAuthor = this.onChangeAuthor.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
    }

    onChangeAuthor (author) {
        this.props.setAttributes({ author });
    }

    onChangeTitle (title) {
        this.props.setAttributes({ title });
    }

    onChangeDescription (description) {
        this.props.setAttributes({ description });
    }

    render () {

        const { className, attributes } = this.props;

        return (
            <div className={ className}>
                <RichText
                    placeholder={ __("Enter Author...") }
                    value={ attributes.author }
                    onChange={ this.onChangeAuthor }
                />

                <RichText
                    placeholder={ __("Enter your Title...") }
                    value={ attributes.title }
                    onChange={ this.onChangeTitle }
                />

                <RichText
                    placeholder={ __("Enter your Description...") }
                    value={ attributes.description }
                    onChange={ this.onChangeDescription }
                />
            </div>
        );
    }
}