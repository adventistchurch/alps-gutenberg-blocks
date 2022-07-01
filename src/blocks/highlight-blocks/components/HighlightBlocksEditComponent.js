import { Component } from "@wordpress/element";
import { RichText } from "@wordpress/block-editor";
import { TextControl, CheckboxControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { DescCard } from "../../global-components/DescCard";

export class HighlightBlocksEditComponent extends Component {
	constructor() {
		super(...arguments);

		this.onChangeBody1 = this.onChangeBody1.bind(this);
		this.onChangeBody2 = this.onChangeBody2.bind(this);
		this.onChangeBody3 = this.onChangeBody3.bind(this);

		// Button 1 Section
		this.onChangeButtonUrl = this.onChangeButtonUrl.bind(this);
		this.onChangeButtonText = this.onChangeButtonText.bind(this);
		this.onChangeButtonNewWindow = this.onChangeButtonNewWindow.bind(this);
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

	// Button  Section
	onChangeButtonUrl(buttonUrl) {
		this.props.setAttributes({ buttonUrl });
	}

	onChangeButtonText(buttonText) {
		this.props.setAttributes({ buttonText });
	}

	onChangeButtonNewWindow(buttonNewWindow) {
		this.props.setAttributes({ buttonNewWindow });
	}

	render() {
		const { attributes, className } = this.props;

		return [
			<div className={className}>
				<DescCard
					title={"Highlight Blocks"}
					hasText={true}
					hasImage={false}
					hasImages={false}
				/>
				<div className={"contentCard"}>
					<fieldset>
						<legend>{__("Highlight Block 1")}</legend>
						<RichText
							className={"o-paragraph contentCard__input"}
							placeholder={__(
								"Enter your Body Text for Highlight Block 1",
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
								"Enter your Body Text for Highlight Block 2 (Optional)",
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
								"Enter your Body Text for Highlight Block 3 (Optional)",
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
									value={attributes.buttonUrl}
									placeholder={__("https://...", "alps-gutenberg-blocks")}
									keepPlaceholderOnFocus={true}
									onChange={this.onChangeButtonUrl}
								/>
								<TextControl
									value={attributes.buttonText}
									placeholder={__("Button Label", "alps-gutenberg-blocks")}
									keepPlaceholderOnFocus={true}
									onChange={this.onChangeButtonText}
								/>
								<div className={"contentCard__checkbox"}>
									<CheckboxControl
										label={__(
											"Open link in a new window",
											"alps-gutenberg-blocks"
										)}
										checked={attributes.buttonNewWindow}
										onChange={this.onChangeButtonNewWindow}
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
