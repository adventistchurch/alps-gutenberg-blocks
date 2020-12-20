import {Component} from "@wordpress/element";
import icons from "../../../icons/icons";
import {Icon} from "@wordpress/components";

export class CTASaveComponent extends Component {

    render() {

        const { attributes } = this.props;

        const image = attributes.imageUrl ?
            <style type="text/css">.o-background-image--{ attributes.imageId } { `{ background-image: url('${ attributes.imageUrl }') }` }</style>:
            '';

        // Background condition
        let backgroundImageClass = '';
        let picture = '';

        if (attributes.imageUrl) {
            backgroundImageClass = attributes.hasBackgroundImage ?
                ' o-background-image--'+ attributes.imageId :
                ' has-image';
            if (attributes.hasBackgroundImage) {
                picture = <div className={'c-cta-block__image c-block__image o-background-image--' + attributes.imageId + ' u-background--cover'}/>;
            }
        }

        // General Conditions
        const isTitleAvailable = attributes.title !== "" && attributes.title.length > 0;
        const isDescriptionAvailable = attributes.description !== "" && attributes.description.length > 0;
        const isTitleAndDescriptionAvailable = isTitleAvailable && isDescriptionAvailable;

        const titleClass = isTitleAndDescriptionAvailable ?
            ' u-font--primary--l' :
            ' u-font--primary--xl';

        const title = isTitleAvailable ?
            <h3 className={ 'c-cta-block__title c-block__title u-theme--color--darker' + titleClass }>{ attributes.title }</h3> :
            attributes.title;

        const descriptionClass = isTitleAndDescriptionAvailable ?
            ' u-font--secondary' :
            ' u-font--secondary--m';

        const description = isDescriptionAvailable ?
            <p className={ 'c-cta-block__description c-block__description u-font--secondary' + descriptionClass } style={ { textAlign: attributes.alignment } }>{ attributes.description }</p> :
            attributes.description;

        // Buttons Conditions
        let buttons = '';
        let button1 = '';
        let button2 = '';

        if ( attributes.button1Url || attributes.button2Url ) {
            if ( attributes.button1Url ) {
                const target1 = attributes.button1NewWindow ? '_blank' : '_self';
                button1 = <a href={ attributes.button1Url }
                                 className={"c-block__button o-button o-button--outline"}
                                 target={ target1 }
                                 rel={"noopener noreferrer"}>{ attributes.button1Text }
                                    <span className={"u-icon u-icon--m u-path-fill--base u-space--half--left"}>
                                        <Icon className={"icon"} icon={ icons.arrowLong } />
                                    </span></a>;
            }

            if ( attributes.button2Url ) {
                const target2 = attributes.button2NewWindow ? '_blank' : '_self';
                button2 = <a href={ attributes.button2Url }
                             className={"c-block__button o-button o-button--simple"}
                             target={ target2 }
                             rel="noopener noreferrer">{ attributes.button2Text }</a>;
            }
            buttons = <div className={"c-cta-block__buttons c-block__buttons"}>{ button1 }{ button2 }</div>;
        }

        return (
            <div>
                { image }
                <div className={'c-cta-block c-block u-border--left u-theme--border-color--darker--left can-be--dark-dark' + attributes.blockClass + attributes.themeClass + backgroundImageClass}>
                    <div className={"c-cta-block__content c-block__content u-spacing"}>
                        <div className={"c-cta-block__group c-block__group u-spacing"}>
                            { title }
                            { description }
                        </div>
                        { buttons }
                    </div>
                    { picture }
                </div>
            </div>
        );
    }
}

