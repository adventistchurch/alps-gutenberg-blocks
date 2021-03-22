import {Component} from "@wordpress/element";
import { __ } from '@wordpress/i18n';

export class ContentBlockSaveComponent extends Component {
    render() {

        const { attributes } = this.props;

        let title = '';
        let button = '';

        if (attributes.link) {
            title =
                <h3 className="u-theme--color--darker u-font--primary--m">
                    <a href={ `${ attributes.link }` } className="c-block__title-link u-theme--link-hover--dark">
                        <strong>{ attributes.title }</strong>
                    </a>
                </h3>;
            button =
                <a href={ `${ attributes.link }` } className="c-block__button o-button o-button--outline">{ __(attributes.readMoreButton, 'alps-gutenberg-blocks') }
                    <span className="u-icon u-icon--m u-path-fill--base u-space--half--left">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M18.29,8.59l-3.5-3.5L13.38,6.5,15.88,9H.29v2H15.88l-2.5,2.5,1.41,1.41,3.5-3.5L19.71,10Z"></path>
                        </svg>
                    </span>
                </a>;
        } else {
            title =
                <h3 className="u-theme--color--darker u-font--secondary--m u-text-transform--upper">
                    <strong>{ attributes.title }</strong>
                </h3>;
        }

        return (
            <div>
                <div className="c-block c-block__text u-theme--border-color--darker u-border--left u-spacing--half">
                    { title }
                    <p className="c-block__body text" style={ { textAlign: attributes.alignment } }>{ attributes.body }</p>
                    { button }
                </div>
            </div>
        );
    }
}