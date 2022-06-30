import { Component } from "@wordpress/element";
import {
	BlockControls,
	MediaUpload,
	AlignmentToolbar,
	RichText,
} from "@wordpress/block-editor";
import { Button, Icon } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { DescCard } from "../../global-components/DescCard";
import icons from "../../../icons/icons";
import ScaledImage from "../../media-block/components/image-editor";

export class ContentReadMoreEditComponent extends Component {
	constructor() {
		super(...arguments);

		this.onChangeBody = this.onChangeBody.bind(this);
	}

	onChangeBody(body) {
		this.props.setAttributes({ body });
	}

	render() {
		const { attributes, className } = this.props;

		return [
			<div className={className}>
				<DescCard
					title={"Content Read More"}
					hasText={true}
					hasImage={true}
					hasImages={false}
				/>
				<div className={"contentCard"}>
					<fieldset>
						<legend>{__("Body")}</legend>
						<RichText
							className={"o-paragraph contentCard__input"}
							placeholder={__(
								"Enter your Body Text... (Displays on click for Read More button)",
								"alps-gutenberg-blocks"
							)}
							keepPlaceholderOnFocus={true}
							style={{ textAlign: attributes.alignment }}
							value={attributes.body}
							onChange={this.onChangeBody}
						/>
					</fieldset>
				</div>
			</div>,
		];
	}
}
