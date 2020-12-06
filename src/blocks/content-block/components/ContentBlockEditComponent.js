import {Component} from "@wordpress/element";
import {BlockControls, AlignmentToolbar, RichText} from "@wordpress/block-editor";
import { __ } from '@wordpress/i18n';
import cls from 'classnames';

export class ContentBlockEditComponent extends Component {

    constructor() {
        super(...arguments);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeBody = this.onChangeBody.bind(this);
        this.onChangeLink = this.onChangeLink.bind(this);
        this.onChangeAlignment = this.onChangeAlignment.bind(this);
    }

    onChangeTitle(title) {
        this.props.setAttributes({ title });
    }

    onChangeBody(body) {
        this.props.setAttributes({ body });
    }

    onChangeLink(link) {
        this.props.setAttributes({ link });
    }

    onChangeAlignment(nextAction) {
        this.props.setAttributes({ alignment: nextAction === undefined ? "left" : nextAction});
    }

    render() {

        const { attributes, className } =  this.props;

        const styles = cls(
            'o-paragraph',
            {'alps__content-block__left': attributes.alignment === 'left'},
            {'alps__content-block__center': attributes.alignment === 'center'}
    )

        return ([
            <BlockControls>
                <AlignmentToolbar
                    value={ attributes.alignment }
                    onChange={ this.onChangeAlignment }
                />
            </BlockControls>,
            <div className={ className }>
                <RichText
                    className={'o-heading--l'}
                    tagName={'strong'}
                    placeholder={ __('Title', 'alps-gutenberg-blocks') }
                    keepPlaceholderOnFocus={ true }
                    value={ attributes.title }
                    onChange={ this.onChangeTitle }
                />
                <RichText
                    className={ styles }
                    tagName={'p'}
                    placeholder={ __('Write a description...', 'alps-gutenberg-blocks') }
                    keepPlaceholderOnFocus={ true }
                    value={ attributes.body }
                    onChange={ this.onChangeBody }
                />
                <RichText
                    className={'o-link'}
                    type={'url'}
                    placeholder={ 'http://' }
                    label={ __('Link Url', 'alps-gutenberg-blocks') }
                    keepPlaceholderOnFocus={ true }
                    value={ attributes.link }
                    onChange={ this.onChangeLink }
                />
            </div>
        ]);
    }
}