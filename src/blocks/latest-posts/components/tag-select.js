/**
 * Wordpress dependencies
 */
import {
	TreeSelect,
} from '@wordpress/components';

export const TagSelect = ({ label, noOptionLabel, tagsList, selectedTagId, onChange }) => {
	return (
		<TreeSelect
			{ ...{ label, noOptionLabel, onChange } }
			tree={ tagsList }
			selectedId={ selectedTagId }
		/>
	);
}
