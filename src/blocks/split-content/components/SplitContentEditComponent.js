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

export class SplitContentEditComponent extends Component {
	constructor() {
		super(...arguments);

		this.onSelectImage = this.onSelectImage.bind(this);
		this.onRemoveImage = this.onRemoveImage.bind(this);

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

		const styles = cls("alps__split-content o-paragraph contentCard__input");

		return [
			<div className={className}>
				<DescCard
					title={"Split Content Block"}
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
					<fieldset class="split-content__right-content">
						<legend>{__("Right Block Content")}</legend>
						<div class="split-content__right-content__image">
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
			</div>,
		];
	}
}
