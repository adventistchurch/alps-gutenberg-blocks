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
            <div className={ className }>
                <div className={"inline-sidebar"}>
                    <fieldset>
                        <legend>{ __("Author") }</legend>
                        <RichText
                            className={"inline-sidebar__input"}
                            placeholder={ __("Martin Luther King Jr.") }
                            value={ attributes.author }
                            onChange={ this.onChangeAuthor }
                        />
                    </fieldset>

                    <fieldset>
                        <legend>{ __("Title") }</legend>
                        <RichText
                            className={"inline-sidebar__input"}
                            placeholder={ __("The Autobiography of Martin Luther King, Jr.") }
                            value={ attributes.title }
                            onChange={ this.onChangeTitle }
                        />
                    </fieldset>

                    <fieldset>
                        <legend>{ __("Description") }</legend>
                        <RichText
                            className={"inline-sidebar__input"}
                            placeholder={ __("Enter your Description...") }
                            value={ attributes.description }
                            onChange={ this.onChangeDescription }
                        />
                    </fieldset>
                </div>
            </div>
        );
    }
}