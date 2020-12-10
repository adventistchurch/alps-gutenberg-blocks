import {Component} from "@wordpress/element";

export class ImageBreakoutSaveComponent extends Component {
    render() {

        const { attributes } = this.props;

        return (
            <div>
                <section className="l-grid l-grid--7-col l-grid-wrap l-grid-wrap--6-of-7">
                    <div className="u-width--100p u-padding--zero--sides">
                        <div className="c-breakout-image">
                            <div className="c-breakout-image__background u-image--breakout u-background--cover" style={{backgroundImage: `url('${attributes.url}');`}}/>
                            <div className="c-breakout-image__caption">
                                <figcaption className="o-figcaption">
                                    <p className="o-caption u-color--gray u-font--secondary--s">{ attributes.caption }</p>
                                </figcaption>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}