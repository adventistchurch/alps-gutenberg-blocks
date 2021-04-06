import {Component} from "@wordpress/element";

export class Image2UpSaveComponent extends Component {

    render() {

        const { attributes } = this.props;

        return(
            <div>
                <section className={"l-grid l-grid--7-col l-grid-wrap l-grid-wrap--6-of-7"}>
                    {attributes.images.map((image) =>
                        <div className={"l-grid-item--m--3-col u-padding--zero--left"}>
                            <figure key={image.id || image.url} className={"o-figure"}>
                                <div className={"o-figure__image"}>
                                    <picture className={"picture"}>
                                        <img className={'wp-image-' + image.id + ' size-large'} itemProp="image"
                                             src={image.url} alt={image.alt} data-id={image.id}/>
                                    </picture>
                                </div>
                                <div className={"o-figure__caption"}>
                                    <figcaption className={"o-figcaption"}>
                                        <p className={"o-caption u-color--gray u-font--secondary--s"}>{[image.caption]}</p>
                                    </figcaption>
                                </div>
                            </figure>
                        </div>
                    )}
                </section>
            </div>
        );
    }
}