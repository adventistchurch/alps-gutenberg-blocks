import {Component} from "@wordpress/element";
import icons from "../../../icons/icons";
import {Icon} from "@wordpress/components";
import { __ } from '@wordpress/i18n';

export class MediaTestimonySaveComponent extends Component {

    render() {

        const { attributes } = this.props;

        const readMoreButton = attributes.readMoreLink ?
            <a href={ `${ attributes.readMoreLink }` } className="c-block__button o-button o-button--outline--white o-read-more" tabindex="0">
                <span className="u-icon u-icon--xs u-path-fill--base u-space--half--right">
                    <Icon className="icon" icon={ icons.readMore } />
                </span>
                Read more
            </a> :
            '';

        const watchVideoButton = attributes.watchVideoLink ?
            <a href={ `${ attributes.watchVideoLink }` } className="o-button o-button--outline o-button--outline--white o-watch-video">
                <span className="u-icon u-icon--xs u-space--half--right">
                    <Icon className="icon" icon={ icons.play } />
                </span>{ __('Watch Video', 'alps-gutenberg-blocks') }
            </a> :
            '';

        const image = attributes.imageURL ?
            <div className="c-media-block__image c-block__image">
                <div className="c-block__image-wrap">
                    <img className="c-block__image" src={ `${ attributes.imageURL }` } />
                    <div className="c-media-block__image-video c-block__image-video u-spacing--half u-padding u-color--white u-gradient--bottom">
                        <strong className="c-media-block__title c-block__title">{ attributes.title }</strong>
                        { watchVideoButton }
                    </div>
                </div>
            </div> :
            '';

        return(
            <div>
                <div className="c-testimonies-media__block">
                    <div className="c-media-block c-block c-block c-media-block u-color--white">
                        { image }
                        <div className="c-media-block__content c-block__content u-spacing u-border--left u-theme--border-color--base">
                            <div className="u-spacing c-block__group c-media-block__group u-flex--justify-start">
                                <div className="u-width--100p u-spacing">
                                    <p className="c-media-block__description c-block__description">{ attributes.quote }</p>
                                </div>
                                { readMoreButton }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}