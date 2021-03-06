import {Component} from "@wordpress/element";
import cls from 'classnames';

export class BlockquoteSaveComponent extends Component {

    render () {

        const { attributes } = this.props;

        const styles = cls(
            'pullquote u-theme--border-color--darker--left u-theme--color--darker u-padding--right',
            {'o-pullquote--extended': attributes.isExtendQuote},
            {'o-pullquote--strong': attributes.isStrong},
        );

        return (
            <blockquote className={ styles }>
                <p className="o-paragraph">{ attributes.body }</p>
                <cite className="o-citation u-theme--color--base">{ attributes.citation }</cite>
            </blockquote>
        );
    }
}