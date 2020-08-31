import { Component } from '@wordpress/element';

export class AccordionSave extends Component {
    render() {
        const { attributes } = this.props;

        return (
            <div>
                <div className="c-accordion u-position--relative u-spacing">
                    <div className="c-accordion__item u-spacing--half u-border--left u-padding--half--left">
                        <div className="c-accordion__heading js-toggle-parent u-font--primary--m u-theme--color--darker">
                            <span className="u-icon u-icon--m c-accordion__arrow u-space--half--right u-theme--path-fill--darker">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><title>Artboard 1</title><path d="M6.75,3.59,3.25.09,1.84,1.5,5.34,5,1.84,8.5,3.25,9.91l3.5-3.5L8.16,5Z" fill="#9b9b9b"/></svg>
                            </span>
                            <strong className="o-title">{ attributes.title }</strong>
                        </div>
                        <div className="c-accordion__content u-padding--half--left">
                            <p className="o-body" style={ { textAlign: attributes.alignment } }>{ attributes.body }</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
