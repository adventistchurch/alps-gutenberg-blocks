/**
 * Internal dependencies
 */
const {
	TreeSelect,
} = wp.components;

export default function TagSelect( { label, noOptionLabel, tagsList, selectedTagId, onChange } ) {
	return (
		<TreeSelect
			{ ...{ label, noOptionLabel, onChange } }
			tree={ tagsList }
			selectedId={ selectedTagId }
		/>
	);
}