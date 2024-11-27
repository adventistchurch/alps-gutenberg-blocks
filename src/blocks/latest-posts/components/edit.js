/**
 * External dependencies
 */
import { isUndefined, pickBy } from 'lodash';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import '../editor.scss';

/**
 * WordPress dependencies
 */
import { Component, Fragment } from '@wordpress/element';
import {
	PanelBody,
	Placeholder,
	QueryControls,
	Spinner,
	ToggleControl,
	Toolbar,
	TextControl,
	FormTokenField,
} from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { __ } from '@wordpress/i18n';
import { dateI18n, format, __experimentalGetSettings } from '@wordpress/date';
import { decodeEntities } from '@wordpress/html-entities';
import {
	InspectorControls,
	BlockControls,
	RichText,
} from '@wordpress/block-editor';
import { withSelect } from '@wordpress/data';
import {DescCard} from "../../global-components/DescCard";

/**
 * Module Constants
 */
// per_page CAN ONLY GO AS HIGH AS 100 WITHOUT REQUIRING A CUSTOM END POINT
// PASSING -1 GENERATES AN ERROR
const CATEGORIES_LIST_QUERY = {
	per_page: 100,
};

class LatestPostsEdit extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			categoriesList: [],
			tagsList: [],
		};

		this.props.setAttributes({
			readMoreLabel: __('Read More', 'alps-gutenberg-blocks')
		})

		this.toggleHideExcerpt = this.toggleHideExcerpt.bind( this );
		this.toggleHidePostDate = this.toggleHidePostDate.bind( this );
		this.toggleHideCategoryName = this.toggleHideCategoryName.bind( this );
		this.toggleHideButton = this.toggleHideButton.bind( this );
		this.toggleAlignRight = this.toggleAlignRight.bind( this );
		this.toggleImage = this.toggleImage.bind( this );
	}

	async componentWillMount() {
		this.isStillMounted = true;

		try {
			const categoriesList = await apiFetch({
				path: addQueryArgs( `/wp/v2/categories`, CATEGORIES_LIST_QUERY ),
			});
			if (this.isStillMounted) {
				this.setState({ categoriesList });
			}
		} catch (err) {
			if (this.isStillMounted) {
				this.setState({ categoriesList: [] });
			}
		}

		try {
			const tagsList = await apiFetch({
				path: '/alps-gutenberg-blocks/latest-posts/tags',
			});
			if (this.isStillMounted) {
				this.setState({ tagsList });
			}
		} catch (err) {
			if (this.isStillMounted) {
				this.setState({ tagsList: [] });
			}
		}
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
		const { attributes, setAttributes, latestPosts, className } = this.props;
		const { categoriesList } = this.state;
		const { hideExcerpt, hidePostDate, hideCategoryName, alignRight, hideButton, hideImage, postLayout, order, orderBy, categories, tags, postsToShow } = attributes;

		const createTagSuggestions = () => {
			const { tagsList } = this.state;

			return Object.values(tagsList);
		}
		const createTagQuery = (selectedTags) => {
			const { tagsList } = this.state;

			const query = [];
			for (const tagName of selectedTags) {
				const tag = Object.entries(tagsList).find((el) => {
					return el[1] === tagName;
				});

				if (tag) {
					query.push(tag[0]);
				}
			}

			return query;
		}
		const createTagValues = () => {
			const { tags } = this.props.attributes;
			const { tagsList } = this.state;

			const values = [];
			if (tags) {
				for (const tagId of tags) {
					if (tagsList[tagId]) {
						values.push(tagsList[tagId]);
					}
				}
			}

			return values;
		}

		const inspectorControls = (
			<InspectorControls>
				<PanelBody title={ __('Latest Posts Settings', 'alps-gutenberg-blocks') }>
					<QueryControls
						{ ...{ order, orderBy } }
						numberOfItems={ postsToShow }
						categoriesList={ categoriesList }
						selectedCategoryId={ categories }
						onOrderChange={ ( value ) => setAttributes( { order: value } ) }
						onOrderByChange={ ( value ) => setAttributes( { orderBy: value } ) }
						onCategoryChange={ ( value ) => setAttributes( { categories: '' !== value ? value : undefined } ) }
						onNumberOfItemsChange={ ( value ) => setAttributes( { postsToShow: value } ) }
					/>
					<FormTokenField
						label={ __('Tags', 'alps-gutenberg-blocks') }
						value={ createTagValues() }
						suggestions={ createTagSuggestions() }
						onChange={ ( value ) => setAttributes( { tags: createTagQuery(value) } ) }
					/>
					<ToggleControl
						label={ __( 'Hide excerpt', 'alps-gutenberg-blocks' ) }
						checked={ hideExcerpt }
						onChange={ this.toggleHideExcerpt }
					/>
					<ToggleControl
						label={ __( 'Hide post date', 'alps-gutenberg-blocks' ) }
						checked={ hidePostDate }
						onChange={ this.toggleHidePostDate }
					/>
					<ToggleControl
						label={ __( 'Hide category name', 'alps-gutenberg-blocks' ) }
						checked={ hideCategoryName }
						onChange={ this.toggleHideCategoryName }
					/>
					<ToggleControl
						label={ __( 'Hide button', 'alps-gutenberg-blocks' ) }
						checked={ hideButton }
						onChange={ this.toggleHideButton }
					/>
					<ToggleControl
						label={ __( 'Hide image', 'alps-gutenberg-blocks' ) }
						checked={ hideImage }
						onChange={ this.toggleImage }
					/>
					<ToggleControl
						label={ __( 'Align the image right', 'alps-gutenberg-blocks' ) }
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
						label={ __( 'Latest Posts', 'alps-gutenberg-blocks' ) }
					>
						{ ! Array.isArray( latestPosts ) ?
							<Spinner /> :
							__( 'No posts found.', 'alps-gutenberg-blocks' )
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
				title: __( 'List View', 'alps-gutenberg-blocks' ),
				onClick: () => setAttributes( { postLayout: 'list' } ),
				isActive: postLayout === 'list',
			},
			{
				icon: 'grid-view',
				title: __( 'Grid View', 'alps-gutenberg-blocks' ),
				onClick: () => setAttributes( { postLayout: 'grid' } ),
				isActive: postLayout === 'grid',
			},
		];

		const dateFormat = __experimentalGetSettings().formats.date;

		return (
			<div className={className}>
				<Fragment>
					{ inspectorControls }
					<BlockControls>
						<Toolbar controls={ layoutControls } />
					</BlockControls>
					<div className="c-block__heading u-theme--border-color--darker">
						<DescCard
							title={"Latest Posts"}
							hasText={true}
							hasImage={false}
							hasImages={false}
						/>
						<div className={'contentCard'}>
							<fieldset>
								<legend>{ __("Title") }</legend>
								<RichText
									tagName="h3"
									className="c-block__heading-title u-theme--color--darker contentCard__input"
									placeholder={ __('Enter your Title...', 'alps-gutenberg-blocks') }
									value={ attributes.title }
									formattingControls={ [] }
									onChange={ (title) => setAttributes({ title }) }
								/>
							</fieldset>
							<fieldset>
								<legend>{ __("See All Link Label") }</legend>
								<RichText
									tagName="a"
									className="c-block__heading-link u-theme--color--base u-theme--link-hover--dark contentCard__input"
									placeholder={ __('Enter your link label...', 'alps-gutenberg-blocks') }
									value={ attributes.linkLabel }
									formattingControls={ [] }
									onChange={ (linkLabel) => setAttributes({ linkLabel }) }
								/>
							</fieldset>
							<fieldset>
								<legend>{ __("See All URL") }</legend>
								<div style={{"width": "100%"}}>
									<TextControl
										type={'url'}
										placeholder={ __('https://...', 'alps-gutenberg-blocks') }
										keepPlaceholderOnFocus={ true }
										value={ attributes.linkUrl }
										onChange={ (linkUrl) => setAttributes({ linkUrl }) }
									/>
								</div>
							</fieldset>
						</div>
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
											[{ __('Post excerpt is visible', 'alps-gutenberg-blocks') }]
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
											  [{ __('Category name is visible', 'alps-gutenberg-blocks') }]
											</span>
										}
									</div>
									{ !hideButton &&
										<button className="wp-block-alps-gutenberg-blocks-latest-posts__button">
											{ __('Read More', 'alps-gutenberg-blocks') }
										</button>
									}
								</div>
							</li>
						) }
					</ul>
				</Fragment>
			</div>
		);
	}
}

export default withSelect( (select, props) => {
	const { postsToShow, order, orderBy, categories, tags } = props.attributes;
	const { getEntityRecords } = select('core');
	const latestPostsQuery = pickBy( {
		categories,
		tags,
		order,
		orderby: orderBy,
		per_page: postsToShow,
	}, ( value ) => ! isUndefined( value ) );
	return {
		latestPosts: getEntityRecords('postType', 'post', latestPostsQuery),
	};
})(LatestPostsEdit);
