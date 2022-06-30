import { Component } from "@wordpress/element";
import {
	BlockControls,
	MediaUpload,
	AlignmentToolbar,
	RichText,
} from "@wordpress/block-editor";
import {
	Button,
	Icon,
	TextControl,
	CheckboxControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { DescCard } from "../../global-components/DescCard";
import icons from "../../../icons/icons";
import ScaledImage from "../../media-block/components/image-editor";

export class HighlightBlocksEditComponent extends Component {
	constructor() {
		super(...arguments);

		this.onChangeBody1 = this.onChangeBody1.bind(this);
		this.onChangeBody2 = this.onChangeBody2.bind(this);
		this.onChangeBody3 = this.onChangeBody3.bind(this);

		// Button 1 Section
		this.onChangeButton1Url = this.onChangeButton1Url.bind(this);
		this.onChangeButton1Text = this.onChangeButton1Text.bind(this);
		this.onChangeButton1NewWindow = this.onChangeButton1NewWindow.bind(this);
	}

	onChangeBody1(body1) {
		this.props.setAttributes({ body1 });
	}

	onChangeBody2(body2) {
		this.props.setAttributes({ body2 });
	}

	onChangeBody3(body3) {
		this.props.setAttributes({ body3 });
	}

	// Button 1 Section
	onChangeButton1Url(button1Url) {
		this.props.setAttributes({ button1Url });
	}

	onChangeButton1Text(button1Text) {
		this.props.setAttributes({ button1Text });
	}

	onChangeButton1NewWindow(button1NewWindow) {
		this.props.setAttributes({ button1NewWindow });
	}

	render() {
		const { attributes, className } = this.props;

		return [
			<div className={className}>
				<DescCard
					title={"Highlight Blocks"}
					hasText={true}
					hasImage={true}
					hasImages={false}
				/>
				<div className={"contentCard"}>
					<fieldset>
						<legend>{__("Highlight Block 1")}</legend>
						<RichText
							className={"o-paragraph contentCard__input"}
							placeholder={__(
								"Enter your Body Text for Highlight Block One",
								"alps-gutenberg-blocks"
							)}
							keepPlaceholderOnFocus={true}
							style={{ textAlign: attributes.alignment }}
							value={attributes.body1}
							onChange={this.onChangeBody1}
						/>
					</fieldset>
					<fieldset>
						<legend>{__("Highlight Block 2")}</legend>
						<RichText
							className={"o-paragraph contentCard__input"}
							placeholder={__(
								"Enter your Body Text for Highlight Block Two",
								"alps-gutenberg-blocks"
							)}
							keepPlaceholderOnFocus={true}
							style={{ textAlign: attributes.alignment }}
							value={attributes.body2}
							onChange={this.onChangeBody2}
						/>
					</fieldset>
					<fieldset>
						<legend>{__("Highlight Block 3")}</legend>
						<RichText
							className={"o-paragraph contentCard__input"}
							placeholder={__(
								"Enter your Body Text for Highlight Block Three",
								"alps-gutenberg-blocks"
							)}
							keepPlaceholderOnFocus={true}
							style={{ textAlign: attributes.alignment }}
							value={attributes.body3}
							onChange={this.onChangeBody3}
						/>
					</fieldset>
				</div>
				<div className={"o-buttons"}>
					<div className={"o-button--1"}>
						<fieldset>
							<legend>{__("Primary Button")}</legend>
							<div style={{ width: "100%" }}>
								<TextControl
									type={"url"}
									value={attributes.button1Url}
									placeholder={__("https://...", "alps-gutenberg-blocks")}
									keepPlaceholderOnFocus={true}
									onChange={this.onChangeButton1Url}
								/>
								<TextControl
									value={attributes.button1Text}
									placeholder={__("Button Label", "alps-gutenberg-blocks")}
									keepPlaceholderOnFocus={true}
									onChange={this.onChangeButton1Text}
								/>
								<div className={"contentCard__checkbox"}>
									<CheckboxControl
										label={__(
											"Open link in a new window",
											"alps-gutenberg-blocks"
										)}
										checked={attributes.button1NewWindow}
										onChange={this.onChangeButton1NewWindow}
									/>
								</div>
							</div>
						</fieldset>
					</div>
				</div>
			</div>,
		];
	}
}
