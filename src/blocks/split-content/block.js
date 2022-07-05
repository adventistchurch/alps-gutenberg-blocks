/**
 * BLOCK: Split Content Block
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
import { SplitContentEditComponent } from "./components/SplitContentEditComponent";
import { SplitContentSaveComponent } from "./components/SplitContentSaveComponent";

registerBlockType("alps-gutenberg-blocks/split-content", {
	title: __("ALPS Split Content", "alps-gutenberg-blocks"),
	description: __(
		"Split Content block where the right side has a button.",
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
		bodyLeft: {
			type: "array",
			source: "children",
			selector: "p",
		},
		bodyRight: {
			type: "array",
			source: "children",
			selector: "p",
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
	edit: SplitContentEditComponent,
	save: SplitContentSaveComponent,
});
