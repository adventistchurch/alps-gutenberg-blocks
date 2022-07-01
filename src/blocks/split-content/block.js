/**
 * BLOCK: Split Content
 */

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";

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
	html: false,

	attributes: {
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
