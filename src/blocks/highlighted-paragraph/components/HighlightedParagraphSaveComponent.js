import {Component} from "@wordpress/element";

export class HighlightedParagraphSaveComponent extends Component {

    render() {

        const { attributes, className } = this.props;

        return(
            <div className={className}>
                <p className={'o-highlight u-padding u-background-color--gray--light u-text-align--' + attributes.alignment + ' can-be--dark-dark'}>
                    { attributes.content }
                </p>
            </div>
        );
    }
}