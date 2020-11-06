import { Component } from "@wordpress/element";
import cls from 'classnames';

export class MediaBlockSaveComponent extends Component{

    render () {

        const { attributes } = this.props;

        const styles = cls(
            'c-media-block c-block',
            {'c-block__row': attributes.alignment === "left"},
            {'c-block__stacked': attributes.alignment === "center"}
        );

        return (
            <div className={styles}>
                <div className={"c-block__image"}>
                    <div className="c-block__image-outer-wrap">
                        <div className="c-block__image-wrap">
                            <img src={ attributes.imageURL } />
                        </div>
                    </div>
                </div>
                <div className={"c-block__content u-spacing u-color--gray"}>
                    <div className={"u-spacing c-block__group"}>
                        <div className={"u-width--100p u-spacing"}>
                            <h3 className={"c-block__title u-theme--color--darker"}>
                                <a href="" className={"c-block__title-link u-theme--link-hover--dark"}>
                                    { attributes.title }
                                </a>
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
                    </div>
                </div>
            </div>
        );
    }
}
