/**
 * BLOCK: Content Step Block
 */

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";

/**
 * Internal dependencies
 */
import "./style.scss";
import "./editor.scss";
import { ContentStepEditComponent } from "./components/ContentStepEditComponent";
import { ContentStepSaveComponent } from "./components/ContentStepSaveComponent";

registerBlockType("alps-gutenberg-blocks/content-step", {
	title: __("ALPS Content Step Block", "alps-gutenberg-blocks"),
	description: __(
		"Content Step Block block where the right side has a button.",
		"alps-gutenberg-blocks"
	),
	icon: "welcome-write-blog",
	category: "common",
	attributes: {
		imageID: {
			type: "number",
		},
		imageURL: {
			type: "string",
			source: "attribute",
			attribute: "src",
			selector: "img",
		},
		body: {
			type: "array",
			source: "children",
			selector: "p",
		},
		stepKicker: {
			type: "string",
		},
		stepText: {
			type: "string",
		},
		stepKicker2: {
			type: "string",
		},
		stepText2: {
			type: "string",
		},
		stepKicker3: {
			type: "string",
		},
		stepText3: {
			type: "string",
		},
		buttonUrl: {
			type: "string",
		},
		buttonText: {
			type: "string",
		},
		buttonNewWindow: {
			type: "boolean",
			default: false,
		},
	},
	edit: ContentStepEditComponent,
	save: ContentStepSaveComponent,
});
