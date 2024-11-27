import {Component} from "@wordpress/element";

export class ContentExpandSaveComponent extends Component {
    render () {

        const { attributes } = this.props;

        return (
            <div>
                <div className="js-this c-block c-block c-block__expand u-background-color--gray--light u-border--left u-theme--border-color--darker--left can-be--dark-dark">
                    <div className="c-block__header">
                        <div className="c-block__title u-padding">
                            <h2 className="u-font--primary--s u-theme--color--darker">
                                <span className="u-theme--color--base"><em>{ attributes.kicker }</em> </span><font>{ attributes.title }</font>
                            </h2>
                            <div className="c-block__toggle">
                                <button className="js-toggle o-button o-button--outline o-button--toggle o-button--small js-toggle-button" data-toggled="this" data-prefix="this">
                                    <span className="u-icon u-icon--xs u-path-fill--white">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
                                            <title>o-icon__plus</title>
                                            <path d="M10,4H6V0H4V4H0V6H4v4H6V6h4Z" fill="#9b9b9b"/>
                                        </svg>
                                    </span>
                                    <span className="o-button-show-more">{attributes.showMoreButton}</span>
                                    <span className="o-button-show-less">{attributes.showLessButton}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="c-block__body u-padding u-padding--zero--top u-spacing">
                        <p style={ { textAlign: attributes.alignment } }>{ attributes.body }</p>
                    </div>
                </div>
            </div>
        );
    }
}