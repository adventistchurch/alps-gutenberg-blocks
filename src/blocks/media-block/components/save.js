import { Component } from "@wordpress/element";
import cls from 'classnames';

export class MediaBlockSaveComponent extends Component{

    render () {

        const { attributes } = this.props;

        const isLinkAvailable = attributes.url !== undefined && attributes.url !== "";

        let titleText = isLinkAvailable ?
            <a href={ attributes.url } className={"c-block__title-link u-theme--link-hover--dark"}> {attributes.title} </a> :
            attributes.title;

        const styles = cls(
            'c-media-block c-block l-grid-wrap',
            {'c-block__row l-grid-wrap--5-of-7': attributes.alignment === "left"},
            {'c-block__stacked l-grid-wrap--6-of-7': attributes.alignment === "center"}
        );

        const imageStyles = cls(
            'c-block__image',
            {'l-grid-item--s--1-col l-grid-item--m--1-col u-padding--zero--sides': attributes.alignment === "left"},
            {'l-grid-item--s--6-col l-grid-item--m--4-col l-grid-item--l--3-col': attributes.alignment === "center"}
        )

        const contentStyles = cls(
            'c-block__content l-grid-item u-spacing u-color--gray u-border-left--black--at-large u-theme--border-color--darker--left',
            {'l-grid-item--s--4-col l-grid-item--m--3-col l-grid-item--l--2-col': attributes.alignment === "left"},
            {'l-grid-item--s--6-col l-grid-item--m--4-col l-grid-item--l--3-col': attributes.alignment === "center"}
        )

        return (
            <div className={styles}>
                <div className={imageStyles}>
                    <div className="c-block__image-outer-wrap">
                        <div className="c-block__image-wrap">
                            <img src={ attributes.imageURL } />
                        </div>
                    </div>
                </div>
                <div className={contentStyles}>
                    <div className={"u-spacing c-block__group"}>
                        <div className={"u-width--100p u-spacing"}>
                            <h3 className={"c-block__title u-theme--color--darker"}>
                                { titleText }
                            </h3>
                            <p className={"c-block__description"}>
                                { attributes.description }
                            </p>
                        </div>
                        <div className={"c-block__meta u-theme--color--dark"}>
                            <span className={"c-block__category u-text-transform--upper"}>
                                { attributes.category }
                            </span>
                            <time className={"c-block__date u-text-transform--upper"}>
                                { attributes.date }
                            </time>
                        </div>
                        { attributes.buttonIsActive &&
                            <a href={ attributes.url }
                               className="c-block__button o-button o-button--outline o-button--small">
                                { attributes.buttonText }
                                <span className="u-icon u-icon--m u-path-fill--base u-space--half--left">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <title>Long right arrow</title>
                                        <path d="M18.29,8.59l-3.5-3.5L13.38,6.5,15.88,9H.29v2H15.88l-2.5,2.5,1.41,1.41,3.5-3.5L19.71,10Z" fill="#9b9b9b"></path>
                                    </svg>
                                </span>
                            </a>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
