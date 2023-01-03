import { Component } from "@wordpress/element";
import {
	InspectorControls,
	BlockControls,
	MediaUpload,
	RichText,
} from "@wordpress/block-editor";
import {
	Icon,
	ToggleControl,
	TextControl,
	CheckboxControl,
} from "@wordpress/components";
import { Button } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import cls from "classnames";

import ScaledImage from "./image-editor";
import { DescCard } from "../../global-components/DescCard";
import icons from "../../../icons/icons";

export class ContentStepEditComponent extends Component {
	constructor() {
		super(...arguments);

		this.onSelectImage = this.onSelectImage.bind(this);
		this.onRemoveImage = this.onRemoveImage.bind(this);

		this.onChangeBody = this.onChangeBody.bind(this);

		// Step
		this.onChangeStepText = this.onChangeStepText.bind(this);
		this.onChangeStepKicker = this.onChangeStepKicker.bind(this);
		this.onChangeStepText2 = this.onChangeStepText2.bind(this);
		this.onChangeStepKicker2 = this.onChangeStepKicker2.bind(this);
		this.onChangeStepText3 = this.onChangeStepText3.bind(this);
		this.onChangeStepKicker3 = this.onChangeStepKicker3.bind(this);

		// Button 1 Section
		this.onChangeButtonUrl = this.onChangeButtonUrl.bind(this);
		this.onChangeButtonText = this.onChangeButtonText.bind(this);
		this.onChangeButtonNewWindow = this.onChangeButtonNewWindow.bind(this);
	}

	onChangeBody(body) {
		this.props.setAttributes({ body });
	}

	// Step
	onChangeStepText(stepText) {
		this.props.setAttributes({ stepText });
	}

	onChangeStepKicker(stepKicker) {
		this.props.setAttributes({ stepKicker });
	}

	onChangeStepText2(stepText2) {
		this.props.setAttributes({ stepText2 });
	}

	onChangeStepKicker2(stepKicker2) {
		this.props.setAttributes({ stepKicker2 });
	}

	onChangeStepText3(stepText3) {
		this.props.setAttributes({ stepText3 });
	}

	onChangeStepKicker3(stepKicker3) {
		this.props.setAttributes({ stepKicker3 });
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

	// Image
	onSelectImage(media) {
		this.props.setAttributes({ imageURL: media.url, imageID: media.id });
	}

	onRemoveImage(media) {
		this.props.setAttributes({
			media: null,
			imageURL: null,
			imageID: null,
		});
	}

	getImageButton(obj) {
		const { attributes } = this.props;

		return (
			<div>
				<Button
					className={
						attributes.imageID ? "image-button" : "button button-large"
					}
					onClick={!attributes.imageID ? obj.open : obj.close}
				>
					{!attributes.imageID ? (
						<div>
							<Icon
								style={{ "margin-right": "8px" }}
								className={"icon"}
								icon={icons.upload}
							/>
							{__("Upload Image", "alps-gutenberg-blocks")}
						</div>
					) : (
						<ScaledImage
							url={attributes.imageURL}
							id={attributes.imageID}
							onRemove={this.onRemoveImage}
							setAttributes={this.props.setAttributes}
						/>
					)}
				</Button>
			</div>
		);
	}

	render() {
		const { attributes, className, isSelected } = this.props;

		const styles = cls("alps__content-step o-paragraph contentCard__input");

		return [
			<div className={className}>
				<DescCard
					title={"Content Step Block"}
					hasText={true}
					hasImage={true}
					hasImages={false}
				/>
				<div className={"contentCard"}>
					<fieldset class="content-step__content">
						<legend>{__("Body")}</legend>
						<div class="content-step__content__image">
							<MediaUpload
								onSelect={this.onSelectImage}
								type={"image"}
								value={attributes.imageID}
								render={(obj) => this.getImageButton(obj)}
							/>
						</div>
						<RichText
							className={styles}
							placeholder={__(
								"Write a description...",
								"alps-gutenberg-blocks"
							)}
							value={attributes.body}
							onChange={this.onChangeBody}
						/>
					</fieldset>
					<fieldset className="content-step__steps">
						<legend>{__("Blocks")}</legend>
						<div className="content-step__step">
							<TextControl
								value={attributes.stepKicker}
								placeholder={__("Kicker 1 (Optional)", "alps-gutenberg-blocks")}
								keepPlaceholderOnFocus={true}
								onChange={this.onChangeStepKicker}
							/>
							<TextControl
								value={attributes.stepText}
								placeholder={__("Text 1 (Optional)", "alps-gutenberg-blocks")}
								keepPlaceholderOnFocus={true}
								onChange={this.onChangeStepText}
							/>
						</div>
						<div className="content-step__step">
							<TextControl
								value={attributes.stepKicker2}
								placeholder={__("Kicker 2 (Optional)", "alps-gutenberg-blocks")}
								keepPlaceholderOnFocus={true}
								onChange={this.onChangeStepKicker2}
							/>
							<TextControl
								value={attributes.stepText2}
								placeholder={__("Text 2 (Optional)", "alps-gutenberg-blocks")}
								keepPlaceholderOnFocus={true}
								onChange={this.onChangeStepText2}
							/>
						</div>
						<div className="content-step__step">
							<TextControl
								value={attributes.stepKicker3}
								placeholder={__("Kicker 3 (Optional)", "alps-gutenberg-blocks")}
								keepPlaceholderOnFocus={true}
								onChange={this.onChangeStepKicker3}
							/>
							<TextControl
								value={attributes.stepText3}
								placeholder={__("Text 3 (Optional)", "alps-gutenberg-blocks")}
								keepPlaceholderOnFocus={true}
								onChange={this.onChangeStepText3}
							/>
						</div>
					</fieldset>
					<fieldset>
						<legend>{__("Button")}</legend>
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
			</div>,
		];
	}
}
