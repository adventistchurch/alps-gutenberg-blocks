import {Component} from "@wordpress/element";
import {BlockControls, AlignmentToolbar, RichText} from "@wordpress/block-editor";
import { __ } from '@wordpress/i18n';
import cls from 'classnames';
import {DescCard} from "../../global-components/DescCard";
import {TextControl} from "@wordpress/components";

export class ContentBlockEditComponent extends Component {

    constructor() {
        super(...arguments);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeBody = this.onChangeBody.bind(this);
        this.onChangeLink = this.onChangeLink.bind(this);
        this.onChangeReadMoreButton = this.onChangeReadMoreButton.bind(this);
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

    onChangeReadMoreButton(readMoreButton) {
        this.props.setAttributes({ readMoreButton: readMoreButton ? readMoreButton : 'Read More' });
    }

    onChangeAlignment(nextAction) {
        this.props.setAttributes({ alignment: nextAction === undefined ? "left" : nextAction});
    }

    render() {

        const { attributes, className } =  this.props;

        const styles = cls(
            'o-paragraph contentCard__input',
            {'alps__content-block__left': attributes.alignment === 'left'},
            {'alps__content-block__center': attributes.alignment === 'center'}
        );

        return ([
            <BlockControls>
                <AlignmentToolbar
                    value={ attributes.alignment }
                    onChange={ this.onChangeAlignment }
                />
            </BlockControls>,
            <div className={ className }>
                <div className={ className }>
                    <DescCard
                        title={"Content-block"}
                        hasText={true}
                        hasImage={false}
                        hasImages={false}
                    />
                    <div className={'contentCard'}>
                        <fieldset>
                            <legend>{ __("Title") }</legend>
                            <RichText
                                className={'o-heading--l contentCard__input'}
                                tagName={'strong'}
                                placeholder={ __('Title', 'alps-gutenberg-blocks') }
                                keepPlaceholderOnFocus={ true }
                                value={ attributes.title }
                                onChange={ this.onChangeTitle }
                            />
                        </fieldset>
                        <fieldset>
                            <legend>{ __("Description") }</legend>
                            <RichText
                                className={ styles }
                                placeholder={ __('Write a description...', 'alps-gutenberg-blocks') }
                                value={ attributes.body }
                                onChange={ this.onChangeBody }
                            />
                        </fieldset>
                        <fieldset>
                            <legend>{ __("Link URL") }</legend>
                            <TextControl
                                className={'o-link contentCard__link'}
                                type={'url'}
                                placeholder={ 'http://' }
                                keepPlaceholderOnFocus={ true }
                                value={ attributes.link }
                                onChange={ this.onChangeLink }
                            />
                        </fieldset>
                        <fieldset>
                            <legend>{ __("Read More Button") }</legend>
                            <RichText
                                className={'contentCard__input'}
                                type={'p'}
                                placeholder={ 'Read more button. Default: READ MORE' }
                                label={ __('Read More button', 'alps-gutenberg-blocks') }
                                keepPlaceholderOnFocus={ true }
                                value={ attributes.readMoreButton }
                                onChange={ this.onChangeReadMoreButton }
                            />
                        </fieldset>
                    </div>
                </div>
            </div>
        ]);
    }
}