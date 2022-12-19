import {Component} from "@wordpress/element";
import cls from 'classnames';

export class BlockquoteSaveComponent extends Component {

    render () {

        const { attributes } = this.props;

        const styles = cls(
            'pullquote u-theme--border-color--darker--left u-theme--color--base u-padding--right',
            {'o-pullquote--extended': attributes.isExtendQuote},
            {'o-pullquote--strong': attributes.isStrong},
        );

        const citation = attributes.citation ?
            <cite className="o-citation u-theme--color--base">{ attributes.citation }</cite> :
            '';

        return (
            <blockquote className={ styles }>
                <p className="o-paragraph">{ attributes.body }</p>
                { citation }
            </blockquote>
        );
    }
}
