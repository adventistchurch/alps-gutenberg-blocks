import { Component } from "@wordpress/element";
import { __ } from '@wordpress/i18n';

export class GallerySaveComponent extends Component {

    render() {

        const { attributes } = this.props;

        return(
            <div className={"c-gallery-block__image"}>
                <div className={"js-this c-gallery-block c-block u-background-color--gray--light u-border--left u-theme--border-color--darker--left can-be--dark-dark"}>
                    <div className={"c-gallery-block__header"}>
                        <div className={"c-gallery-block__title u-padding u-spacing--half"}>
                            <h2 className={"u-font--primary--s u-theme--color--darker"}>
                                <span className={"u-theme--color--base"}>
                                    <em>{__('Gallery', 'alps-gutenberg-blocks')}</em>
                                </span>
                                <span className={"o-title"}>{attributes.title}</span>
                            </h2>
                            <button
                                className={"c-gallery-block__toggle js-toggle o-button o-button--outline o-button--toggle o-button--small"}
                                data-toggled="this" data-prefix="this">
                                <span className={"u-icon u-icon--xs u-path-fill--white"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
                                        <title>o-icon__plus</title>
                                        <path d="M10,4H6V0H4V4H0V6H4v4H6V6h4Z" fill="#9b9b9b"/>
                                    </svg>
                                </span>
                            </button>
                        </div>
                        <div className={"c-gallery-block__thumb u-background--contain"}
                             style={{backgroundImage: `url('${attributes.images.map((image, index) => image.url)[0]}');`}}>
                        </div>
                    </div>

                    <div className={"c-gallery-block__body"}>
                        {attributes.images.map((image) =>
                            <div key={image.id || image.url} className="c-gallery-block__image">
                                <img src={image.url} alt={image.alt} data-id={image.id}/>
                                <div
                                    className={"c-gallery-block__caption u-font--secondary--s u-color--gray u-padding u-padding--double--bottom"}>
                                    {image.caption}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}