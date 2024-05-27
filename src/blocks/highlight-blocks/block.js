/**
 * BLOCK: Highlight Blocks
 */

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";

import "./style.scss";
import "./editor.scss";

import { HighlightBlocksSaveComponent } from "./components/HighlightBlocksSaveComponent";
import { HighlightBlocksEditComponent } from "./components/HighlightBlocksEditComponent";

registerBlockType("alps-gutenberg-blocks/highlight-blocks", {
	title: __("ALPS Higlight Blocks", "alps-gutenberg-blocks"),
	icon: "columns",
	description: __(
		"Content block that is full width that can have up to 3 text blocks within it.",
		"alps-gutenberg-blocks"
	),
	category: "common",
	html: false,

	attributes: {
		body1: {
			type: "string",
		},
		body2: {
			type: "string",
		},
		body3: {
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

	edit: HighlightBlocksEditComponent,
	save: HighlightBlocksSaveComponent,
});
