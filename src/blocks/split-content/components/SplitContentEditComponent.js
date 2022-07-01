import { Component } from "@wordpress/element";
import { RichText } from "@wordpress/block-editor";
import { TextControl, CheckboxControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import cls from "classnames";
import { DescCard } from "../../global-components/DescCard";

export class SplitContentEditComponent extends Component {
	constructor() {
		super(...arguments);

		this.onChangeBodyLeft = this.onChangeBodyLeft.bind(this);
		this.onChangeBodyRight = this.onChangeBodyRight.bind(this);

		// Button 1 Section
		this.onChangeButtonUrl = this.onChangeButtonUrl.bind(this);
		this.onChangeButtonText = this.onChangeButtonText.bind(this);
		this.onChangeButtonNewWindow = this.onChangeButtonNewWindow.bind(this);
	}

	onChangeBodyLeft(bodyLeft) {
		this.props.setAttributes({ bodyLeft });
	}

	onChangeBodyRight(bodyRight) {
		this.props.setAttributes({ bodyRight });
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

		const styles = cls("o-paragraph contentCard__input");

		return [
			<div className={className}>
				<div className={className}>
					<DescCard
						title={"Split-block"}
						hasText={true}
						hasImage={true}
						hasImages={false}
					/>
					<div className={"contentCard"}>
						<fieldset>
							<legend>{__("Left Block Content")}</legend>
							<RichText
								className={styles}
								placeholder={__(
									"Write a description...",
									"alps-gutenberg-blocks"
								)}
								value={attributes.bodyLeft}
								onChange={this.onChangeBodyLeft}
							/>
						</fieldset>
						<fieldset>
							<legend>{__("Right Block Content")}</legend>
							<RichText
								className={styles}
								placeholder={__(
									"Write a description...",
									"alps-gutenberg-blocks"
								)}
								value={attributes.bodyRight}
								onChange={this.onChangeBodyRight}
							/>
						</fieldset>
						<fieldset>
							<legend>{__("Right Block Button")}</legend>
							<div style={{ width: "100%" }}>
								<TextControl
									value={attributes.buttonText}
									placeholder={__("Learn More", "alps-gutenberg-blocks")}
									keepPlaceholderOnFocus={true}
									onChange={this.onChangeButtonText}
								/>
								<TextControl
									type={"url"}
									value={attributes.buttonUrl}
									placeholder={__("https://...", "alps-gutenberg-blocks")}
									keepPlaceholderOnFocus={true}
									onChange={this.onChangeButtonUrl}
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
