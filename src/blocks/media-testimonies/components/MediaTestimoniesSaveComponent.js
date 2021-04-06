import {Component} from "@wordpress/element";
import icons from "../../../icons/icons";
import {InnerBlocks} from "@wordpress/block-editor";
import {Icon} from "@wordpress/components";

export class MediaTestimoniesSaveComponent extends Component {

    render() {

        const { attributes } = this.props;

        const seeAll = attributes.link ?
            <a href={ `${ attributes.link }` } className="c-block__heading-link u-theme--color--light u-theme--link-hover--lighter o-link">See All</a> :
            '';
        const seeAllStories = attributes.link ?
            <a href={ `${ attributes.link }` } className="o-button o-button--outline--white">See all Stories<span className="u-icon u-icon--m u-space--half--left"><Icon className="icon" icon={ icons.arrowLong } /></span></a> :
            '';

        return(
            <div>
                <section className={"c-testimonies-media u-spacing u-position--relative u-theme--background-color--darker u-color--white"}>
                    <div className={"c-testimonies-media--inner u-spacing--double"}>
                        <div className={"c-testimonies-media__heading"}>
                            <div className={"c-block__heading u-theme--border-color--base"}>
                                <h3 className={"c-block__heading-title"}>{ attributes.title }</h3>{ seeAll }
                            </div>
                            <div className={"o-dots"}/>
                        </div>
                        <div className={"c-testimonies-media__blocks js-carousel__testimonies-media u-theme--gradient--right u-theme--gradient--left"}>
                            <InnerBlocks.Content />
                        </div>
                        <div className={"c-testimonies-media__buttons u-spacing--left--half"}>
                            <button className={"o-button o-button--outline--white o-arrow o-arrow--prev"}>
                              <span className={"u-icon u-icon--s u-path-fill--white"}>
                                <Icon className={"icon"} icon={ icons.arrowPrevious } />
                              </span>
                            </button>
                            <button className={"o-button o-button--outline--white o-arrow o-arrow--next"}>
                              <span className={"u-icon u-icon--s u-path-fill--white"}>
                                <Icon className={"icon"} icon={ icons.arrowNext } />
                              </span>
                            </button>
                            { seeAllStories }
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}