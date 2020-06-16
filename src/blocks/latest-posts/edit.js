/**
 * External dependencies
 */
const { isUndefined, pickBy } = require('lodash');
const classnames = require('classnames');
import './editor.scss';
import TagSelect from './tag-select';

/**
 * WordPress dependencies
 */
const { Component, Fragment } = wp.element;
const {
	PanelBody,
	Placeholder,
	QueryControls,
	RangeControl,
	Spinner,
	ToggleControl,
	Toolbar,
	TextControl,
} = wp.components;
const apiFetch = wp.apiFetch;
const { addQueryArgs } = wp.url;
const { __ } = wp.i18n;
const { dateI18n, format, __experimentalGetSettings } = wp.date;
const { decodeEntities } = wp.htmlEntities;
const {
	InspectorControls,
	BlockControls,
	RichText,
} = wp.blockEditor;
const { withSelect } = wp.data;

/**
 * Module Constants
 */
// per_page CAN ONLY GO AS HIGH AS 100 WITHOUT REQUIRING A CUSTOM END POINT
// PASSING -1 GENERATES AN ERROR
const CATEGORIES_LIST_QUERY = {
	per_page: 100,
};
const TAGS_LIST_QUERY = {
	per_page: 100,
}
const MAX_POSTS_COLUMNS = 3;

class LatestPostsEdit extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			categoriesList: [],
			tagsList: [],
		};
		this.toggleHideExcerpt = this.toggleHideExcerpt.bind( this );
		this.toggleHidePostDate = this.toggleHidePostDate.bind( this );
		this.toggleHideCategoryName = this.toggleHideCategoryName.bind( this );
		this.toggleHideButton = this.toggleHideButton.bind( this );
		this.toggleAlignRight = this.toggleAlignRight.bind( this );
		this.toggleImage = this.toggleImage.bind( this );
	}

	componentWillMount() {
		this.isStillMounted = true;
		this.fetchCategories = apiFetch( {
			path: addQueryArgs( `/wp/v2/categories`, CATEGORIES_LIST_QUERY ),
		} ).then(
			( categoriesList ) => {
				if ( this.isStillMounted ) {
					this.setState( { categoriesList } );
				}
			}
		).catch(
			() => {
				if ( this.isStillMounted ) {
					this.setState( { categoriesList: [] } );
				}
			}
		);
		this.fetchTags = apiFetch( {
			path: addQueryArgs( `/wp/v2/tags`, TAGS_LIST_QUERY ),
		}).then(
			( tagsList ) => {
				if ( this.isStillMounted ) {
					this.setState( { tagsList } );
				}
			}
		).catch(
			() => {
				if ( this.isStillMounted ) {
					this.setState( { tagsList: [] } );
				}
			}
		);
	}

	componentWillUnmount() {
		this.isStillMounted = false;
	}

	toggleHideExcerpt() {
		const { hideExcerpt } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes( { hideExcerpt: ! hideExcerpt } );
	}

	toggleHidePostDate() {
		const { hidePostDate } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes( { hidePostDate: ! hidePostDate } );
	}

	toggleHideCategoryName() {
		const { hideCategoryName } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes( { hideCategoryName: ! hideCategoryName } );
	}

	toggleHideButton() {
		const { hideButton } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes( { hideButton: ! hideButton } );
	}

	toggleAlignRight() {
		const { alignRight } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes( { alignRight: ! alignRight } );
	}

	toggleImage() {
		const { hideImage } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes( { hideImage: ! hideImage } );
	}

	render() {
		const { attributes, setAttributes, latestPosts } = this.props;
		const { categoriesList, tagsList } = this.state;
		const { hideExcerpt, hidePostDate, hideCategoryName, alignRight, hideButton, hideImage, postLayout, order, orderBy, categories, tags, postsToShow } = attributes;

		const inspectorControls = (
			<InspectorControls>
				<PanelBody title={ __( 'Latest Posts Settings' ) }>
					<QueryControls
						{ ...{ order, orderBy } }
						numberOfItems={ postsToShow }
						categoriesList={ categoriesList }
						selectedCategoryId={ categories }
						tagsList={ tagsList }
						selectedTagId={ tags }
						onOrderChange={ ( value ) => setAttributes( { order: value } ) }
						onOrderByChange={ ( value ) => setAttributes( { orderBy: value } ) }
						onCategoryChange={ ( value ) => setAttributes( { categories: '' !== value ? value : undefined } ) }
						onTagChange={ ( value ) => setAttributes( { tags: '' !== value ? value : undefined } ) }
						onNumberOfItemsChange={ ( value ) => setAttributes( { postsToShow: value } ) }
					/>
					<TagSelect
						key="query-controls-tag-select"
						tagsList={ tagsList }
						label={ __( 'Tag' ) }
						noOptionLabel={ __( 'All' ) }
						selectedTagId={ tags }
						onChange={ ( value ) => setAttributes( { tags: '' !== value ? value : undefined } ) }
					/>
					<ToggleControl
						label={ __( 'Hide excerpt' ) }
						checked={ hideExcerpt }
						onChange={ this.toggleHideExcerpt }
					/>
					<ToggleControl
						label={ __( 'Hide post date' ) }
						checked={ hidePostDate }
						onChange={ this.toggleHidePostDate }
					/>
					<ToggleControl
						label={ __( 'Hide category name' ) }
						checked={ hideCategoryName }
						onChange={ this.toggleHideCategoryName }
					/>
					<ToggleControl
						label={ __( 'Hide button' ) }
						checked={ hideButton }
						onChange={ this.toggleHideButton }
					/>
					<ToggleControl
						label={ __( 'Hide image' ) }
						checked={ hideImage }
						onChange={ this.toggleImage }
					/>
					<ToggleControl
						label={ __( 'Align the image right' ) }
						checked={ alignRight }
						onChange={ this.toggleAlignRight }
					/>
				</PanelBody>
			</InspectorControls>
		);

		const hasPosts = Array.isArray( latestPosts ) && latestPosts.length;
		if ( ! hasPosts ) {
			return (
				<Fragment>
					{ inspectorControls }
					<Placeholder
						icon="admin-post"
						label={ __( 'Latest Posts' ) }
					>
						{ ! Array.isArray( latestPosts ) ?
							<Spinner /> :
							__( 'No posts found.' )
						}
					</Placeholder>
				</Fragment>
			);
		}

		// Removing posts from display should be instant.
		const displayPosts = latestPosts.length > postsToShow ?
			latestPosts.slice( 0, postsToShow ) :
			latestPosts;

		const layoutControls = [
			{
				icon: 'list-view',
				title: __( 'List View' ),
				onClick: () => setAttributes( { postLayout: 'list' } ),
				isActive: postLayout === 'list',
			},
			{
				icon: 'grid-view',
				title: __( 'Grid View' ),
				onClick: () => setAttributes( { postLayout: 'grid' } ),
				isActive: postLayout === 'grid',
			},
		];

		const dateFormat = __experimentalGetSettings().formats.date;

		return (
			<Fragment>
				{ inspectorControls }
				<BlockControls>
					<Toolbar controls={ layoutControls } />
				</BlockControls>
				<div className="c-block__heading u-theme--border-color--darker">
					<RichText
						tagName="h3"
						className="c-block__heading-title u-theme--color--darker"
						placeholder="Enter a block title"
						value={ attributes.title }
						formattingControls={ [] }
						onChange={ (title) => setAttributes({ title }) }
					/>
					<RichText
						tagName="a"
						className="c-block__heading-link u-theme--color--base u-theme--link-hover--dark"
						placeholder="Enter a link label"
						value={ attributes.linkLabel }
						formattingControls={ [] }
						onChange={ (linkLabel) => setAttributes({ linkLabel }) }
					/>
					<TextControl
						label="See All URL"
						placeholder="Enter url here"
						keepPlaceholderOnFocus={ true }
						value={ attributes.linkUrl }
						onChange={ (linkUrl) => setAttributes({ linkUrl }) }
					/>
				</div>
				<ul
					className={ classnames( this.props.className, {
						'l-grid l-grid--3-col': postLayout === 'grid',
						'u-align--right': alignRight,
						'u-hide--image': hideImage,
						'u-hide--excerpt': hideExcerpt,
						'u-hide--date': hidePostDate,
						'u-hide--category': hideCategoryName,
						'u-hide--button': hideButton,
					} ) }
				>
					{ displayPosts.map( ( post, i ) =>
						<li key={ i }>
							<div class="wp-block-alps-gutenberg-blocks-latest-posts__content">
								<a href={ post.link } class="wp-block-alps-gutenberg-blocks-latest-posts__title" target="_blank">{ decodeEntities( post.title.rendered.trim() ) || __( '(Untitled)' ) }</a>
								{ !hideExcerpt &&
									<div className="wp-block-alps-gutenberg-blocks-latest-posts__excerpt">
										[Post excerpt is visible]
									</div>
								}
								<div class="wp-block-alps-gutenberg-blocks-latest-posts__meta">
									{ !hidePostDate &&
										<span className="wp-block-alps-gutenberg-blocks-latest-posts__date">
											{ dateI18n( dateFormat, post.date_gmt ) }
										</span>
									}
									{ !hideCategoryName &&
										<span className="wp-block-alps-gutenberg-blocks-latest-posts__category">
										  [Category name is visible]
										</span>
									}
								</div>
								{ !hideButton &&
									<button className="wp-block-alps-gutenberg-blocks-latest-posts__button">
										Read More
									</button>
								}
							</div>
						</li>
					) }
				</ul>
			</Fragment>
		);
	}
}

export default withSelect( ( select, props ) => {
	const { postsToShow, order, orderBy, categories, tags } = props.attributes;
	const { getEntityRecords } = select( 'core' );
	const latestPostsQuery = pickBy( {
		categories,
		tags,
		order,
		orderby: orderBy,
		per_page: postsToShow,
	}, ( value ) => ! isUndefined( value ) );
	return {
		latestPosts: getEntityRecords( 'postType', 'post', latestPostsQuery ),
	};
} )( LatestPostsEdit );
