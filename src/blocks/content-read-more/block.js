/**
 * BLOCK: Content Read More
 */

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";

import "./style.scss";
import "./editor.scss";
import { ContentReadMoreSaveComponent } from "./components/ContentReadMoreSaveComponent";
import { ContentReadMoreEditComponent } from "./components/ContentReadMoreEditComponent";

registerBlockType("alps-gutenberg-blocks/content-read-more", {
	title: __("ALPS Content Read More", "alps-gutenberg-blocks"),
	icon: "editor-expand",
	description: __(
		"Content block that has a toggle button to read more.",
		"alps-gutenberg-blocks"
	),
	category: "common",
	html: false,

	attributes: {
		body: {
			type: "array",
			source: "children",
			selector: ".o-paragraph",
		},
	},

	edit: ContentReadMoreEditComponent,
	save: ContentReadMoreSaveComponent,
});
