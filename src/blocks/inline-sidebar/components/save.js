import {Component} from "@wordpress/element";

export class InlineSidebarSaveComponent extends Component {

    render () {

        const { attributes } = this.props;

        return (
            <div className="js-this c-inline-sidebar-block c-block u-background-color--gray--light u-border--left u-theme--border-color--darker--left can-be--dark-dark">
                <div className="c-inline-sidebar-block__header u-padding">
                    <h2 className="c-inline-sidebar-block__title u-theme--color--darker">
                        <span className="u-theme--color--base">
                            <em>{ attributes.author }</em>
                        </span>
                        { " " + attributes.title }
                    </h2>
                    <button className="c-inline-sidebar-block__toggle js-toggle o-button o-button--outline o-button--toggle o-button--small" data-toggled="this" data-prefix="this">
                        <span className="u-icon u-icon--xs u-path-fill--white">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
                                <title>o-icon__plus</title>
                                <path d="M10,4H6V0H4V4H0V6H4v4H6V6h4Z" fill="#9b9b9b"></path>
                            </svg>
                        </span>
                    </button>
                </div>
                <div className="c-inline-sidebar-block__body u-padding u-padding--zero--top">
                    <p>
                        { attributes.description }
                    </p>
                </div>
            </div>
        );
    }
}