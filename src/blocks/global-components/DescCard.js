import {Component} from "@wordpress/element";
import icons from "../../icons/icons";
import {Icon} from "@wordpress/components";

export class DescCard extends Component {

    render() {
        return (
            <div className={'descCard'}>
                <div className={"descCard__title-box"}>
                    <Icon className={"icon"} icon={icons.ALPSLogo} />
                    <div className={"descCard__title"}>
                        {this.props.title}
                    </div>
                </div>
                <div className={"descCard__info-icon-box"}>
                    {this.props.hasText &&
                    <div className={"descCard__info-icon"}>
                        <Icon className={"icon"} icon={ icons.text } />
                    </div>
                    }

                    {this.props.hasImage &&
                    <div className={"descCard__info-icon"}>
                        <Icon className={"icon"} icon={ icons.image } />
                    </div>
                    }
                    {this.props.hasImages &&
                    <div className={"descCard__info-icon"}>
                        <Icon className={"icon"} icon={ icons.images } />
                    </div>
                    }
                </div>
            </div>
        );
    }
}