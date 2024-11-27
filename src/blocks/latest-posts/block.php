<?php
namespace ALPS\Gutenberg\Blocks;

class LatestPostsBlock
{
    const PACKAGE = 'alps-gutenberg-blocks';
    const NAME = 'latest-posts';

    public function init()
    {
        register_block_type(
            $this->getName(),
            [
                'style'         => 'alps-gb-style',
                'editor_script' => 'alps-gb',
                'editor_style'  => 'alps-gb-editor',

                'attributes' => [
                    'categories' => [
                        'type' => 'string',
                    ],
                    'tags' => [
                        'type' => 'array',
                    ],
                    'className' => [
                        'type' => 'string',
                    ],
                    'postsToShow' => [
                        'type'    => 'number',
                        'default' => 4,
                    ],
                    'hideExcerpt' => [
                        'type'    => 'boolean',
                        'default' => false,
                    ],
                    'hidePostDate' => [
                        'type'    => 'boolean',
                        'default' => false,
                    ],
                    'hideCategoryName' => [
                        'type'    => 'boolean',
                        'default' => false,
                    ],
                    'hideButton' => [
                        'type'    => 'boolean',
                        'default' => false,
                    ],
                    'hideImage' => [
                        'type'    => 'boolean',
                        'default' => false,
                    ],
                    'alignRight' => [
                        'type'    => 'boolean',
                        'default' => false,
                    ],
                    'postLayout' => [
                        'type'    => 'string',
                        'default' => 'list',
                    ],
                    'order' => [
                        'type'    => 'string',
                        'default' => 'desc',
                    ],
                    'orderBy' => [
                        'type'    => 'string',
                        'default' => 'date',
                    ],
                    'title' => [
                        'type' => 'string',
                        'default' => '',
                    ],
                    'linkLabel' => [
                        'type' => 'string',
                        'default' => '',
                    ],
                    'linkUrl' => [
                        'type' => 'string',
                        'default' => '',
                    ],
                    'readMoreLabel' => [
                        'type' => 'string',
                        'default' => '',
                    ],
                ],
                'render_callback' => [$this, 'render'],
            ]
        );

        add_action('rest_api_init', [$this, 'initRoutes']);
    }

    public function initRoutes()
    {
        register_rest_route( 'alps-gutenberg-blocks', '/latest-posts/tags', [
            'methods' => 'GET',
            'callback' => [$this, 'listTags'],
            'permission_callback' => '__return_true',
        ]);
    }

    public function listTags()
    {
        return get_terms([
            'taxonomy'   => 'post_tag',
            'orderby'    => 'name',
            'hide_empty' => false,
            'fields'     => 'id=>name',
        ]);
    }

    /**
     * Renders the block on server.
     *
     * @param array $attributes The block attributes.
     *
     * @return string Returns the post content with latest posts added.
     */
    public function render($attributes)
    {
        global $wp_query;
        $id = $wp_query->get_queried_object_id();

        $args = array(
            'numberposts' => $attributes['postsToShow'],
            'post_status' => 'publish',
            'order'       => $attributes['order'],
            'orderby'     => $attributes['orderBy'],
        );

        if (isset($attributes['categories'])) {
            $args['category'] = $attributes['categories'];
        }

        if (isset($attributes['tags'])) {
            $args['tag__in'] = $attributes['tags'];
        }

        $recent_posts = wp_get_recent_posts($args);

        $list_items_markup = '';
        $theme_options = get_option('alps_theme_settings');
        $hide_sidebar = $theme_options['index_hide_sidebar'];

        // Set block heading
        $headingTitle = $attributes['title'];
        $headingLinkLabel = $attributes['linkLabel'];
        $headingLinkUrl = $attributes['linkUrl'];

        if ($headingTitle) {
            $list_items_markup .= <<<HTML
<div class="c-block__heading u-theme--border-color--darker">
  <h3 class="c-block__heading-title u-theme--color--darker">$headingTitle</h3>
  <a href="$headingLinkUrl" class="c-block__heading-link u-theme--color--base u-theme--link-hover--dark" style="border-bottom: 0">$headingLinkLabel</a>
</div>
HTML;

        }

        foreach ($recent_posts as $post) {
            $post_id = $post['ID'];
            $title = get_the_title($post_id);
            $link = get_permalink($post_id);
            $picture = NULL;
            $category = get_the_category($post_id);

            if ($category) {
                if (class_exists('\WPSEO_Primary_Term')) {
                    $wpseo_primary_term = new \WPSEO_Primary_Term('category', get_the_id());
                    $wpseo_primary_term = $wpseo_primary_term->get_primary_term();
                    $term = get_term($wpseo_primary_term);
                    if (is_wp_error($term)) {
                        $category = $category[0]->name;
                    } else {
                        $category = $term->name;
                    }
                }
                else {
                    $category = $category[0]->name;
                }
            } else {
                $category = '';
            }

            $header_background_image = get_post_meta($post_id, 'header_background_image', true);
            if (!empty($header_background_image)) {
                $thumb_id = $header_background_image;
            } else if (get_post_thumbnail_id($post_id)) {
                $thumb_id = get_post_thumbnail_id($post_id);
            } else {
                $thumb_id = NULL;
            }
            if ($thumb_id && $attributes['hideImage'] != true) {
                $picture = true;
                $thumb_size = 'horiz__16x9';
                $image_s = wp_get_attachment_image_src($thumb_id, $thumb_size . '--s')[0];
                $image_m = wp_get_attachment_image_src($thumb_id, $thumb_size . '--m')[0];
                $image_l = wp_get_attachment_image_src($thumb_id, $thumb_size . '--l')[0];
                $image_break_m = "500";
                $image_break_l = "900";
                $alt = get_post_meta($thumb_id, '_wp_attachment_image_alt', true);
            }
            if (get_post_meta($id, 'hide_sidebar', true) == 'true') {
                // If sidebar is hidden
                if (isset($attributes['postLayout']) && 'grid' === $attributes['postLayout']) {
                    // if is grid
                    $block_class = "c-block__stacked c-media-block__stacked l-grid-wrap l-grid--7-col l-grid-item--3-col l-grid-item--m--2-col l-grid-item--xl--1-col";
                    $block_img_class = "l-grid-item--3-col l-grid-item--m--2-col l-grid-item--xl--1-col u-padding--zero--sides";
                    $block_content_class = "l-grid-item--3-col l-grid-item--m--2-col l-grid-item--xl--1-col u-border--left";
                    $block_img_wrap_class = NULL;
                    $block_group_class = "u-flex--justify-start";
                    $block_title_class = "u-theme--color--dark u-font--primary--s";
                    $block_meta_class = "u-theme--color--base u-font--secondary--xs";

                    if ($thumb_id && $attributes['hideImage'] != true) {
                        // If image is visible
                        $block_content_class .= "";
                    } else {
                        // If image is hidden
                        $block_content_class .= " u-padding--zero--top";
                    }
                } else {
                    // if is list
                    if ($attributes['alignRight']) {
                        // If blocks are aligned right
                        if ($thumb_id && $attributes['hideImage'] != true) {
                            // If image is visible
                            $block_class = "c-block--reversed c-media-block--reversed l-grid-wrap l-grid-wrap--6-of-7 l-grid--7-col";
                            $block_img_class = "l-grid-item l-grid-item--2-col l-grid-item--m--1-col u-padding--zero--sides u-space--zero--right";
                            $block_content_class = "l-grid-item l-grid-item--4-col l-grid-item--m--3-col u-flex--justify-start u-border--left";
                        } else {
                            // If image is hidden
                            $block_class = "c-block--reversed c-media-block--reversed l-grid--7-col l-grid-wrap l-standard-break";
                            $block_img_class = "u-hide";
                            $block_content_class = "l-grid-item l-grid-item--6-col l-grid-item--m--4-col u-flex--justify-start u-border--left";
                        }
                    } else {
                        // If blocks are aligned left
                        $block_class = "c-media-block__row c-block__row l-grid--7-col l-grid-wrap l-large-break";
                        if ($thumb_id && $attributes['hideImage'] != true) {
                            // If image is visible
                            $block_img_class = "l-grid-item l-grid-item--2-col l-grid-item--m--1-col u-padding--zero--sides";
                            $block_content_class = "l-grid-item l-grid-item--4-col l-grid-item--m--3-col u-flex--justify-start";
                        } else {
                            // If image is hidden
                            $block_img_class = "u-hide";
                            $block_content_class = "l-grid-item l-grid-item--6-col l-grid-item--m--4-col u-flex--justify-start u-border--left";
                        }
                    }
                    $block_img_wrap_class = NULL;
                    $block_group_class = "u-flex--justify-start";
                    $block_title_class = "u-theme--color--darker u-font--primary--m";
                    $block_meta_class = "u-theme--color--base";
                }
            } else {
                // if sidebar is visible
                if (isset($attributes['postLayout']) && 'grid' === $attributes['postLayout']) {
                    // if is grid
                    $block_class = "c-block__stacked c-media-block__stacked l-grid-wrap l-grid--7-col l-grid-item--3-col l-grid-item--m--2-col l-grid-item--xl--1-col";
                    $block_img_class = "l-grid-item--3-col l-grid-item--m--2-col l-grid-item--xl--1-col u-padding--zero--sides";
                    $block_content_class = "l-grid-item--3-col l-grid-item--m--2-col l-grid-item--xl--1-col u-border--left";
                    $block_img_wrap_class = NULL;
                    $block_group_class = "u-flex--justify-start";
                    $block_title_class = "u-theme--color--dark u-font--primary--s";
                    $block_meta_class = "u-theme--color--base u-font--secondary--xs";

                    if ($thumb_id && $attributes['hideImage'] != true) {
                        // If image is visible
                        $block_content_class .= "";
                    } else {
                        // If image is hidden
                        $block_content_class .= " u-padding--zero--top";
                    }
                } else {
                    // if is list
                    if ($attributes['alignRight']) {
                        $block_class = "c-block--reversed c-media-block--reversed l-grid--7-col l-grid-wrap l-large-break";
                        if ($thumb_id && $attributes['hideImage'] != true) {
                            $block_img_class = "l-grid-item l-grid-item--2-col l-grid-item--m--1-col u-padding--zero--sides";
                            $block_content_class = "l-grid-item l-grid-item--4-col l-grid-item--m--3-col l-grid-item--xl--2-col u-flex--justify-start u-border--left";
                        } else {
                            $block_img_class = "u-hide";
                            $block_content_class = "l-grid-item l-grid-item--4-col l-grid-item--m--3-col l-grid-item--l--2-col u-flex--justify-start u-border--left";
                        }
                    } else {
                        $block_class = "c-media-block__row c-block__row l-grid--7-col l-grid-wrap l-standard-break";
                        if ($thumb_id && $attributes['hideImage'] != true) {
                            $block_img_class = "l-grid-item l-grid-item--2-col l-grid-item--m--1-col l-grid-item--xl--1-col u-padding--zero--sides u-space--zero--right";
                            $block_content_class = "l-grid-item l-grid-item--4-col l-grid-item--m--3-col l-grid-item--xl--2-col u-flex--justify-start";
                        } else {
                            $block_img_class = "u-hide";
                            $block_content_class = "l-grid-item l-grid-item--6-col l-grid-item--m--4-col l-grid-item--xl--3-col u-flex--justify-start u-border--left";
                        }
                    }
                    $block_img_wrap_class = NULL;
                    $block_group_class = "u-flex--justify-start";
                    $block_title_class = "u-theme--color--darker u-font--primary--m";
                    $block_meta_class = "u-theme--color--base";
                }
            }


            if ($thumb_id && $attributes['hideImage'] != true) {
                // If image is visible
                $excerpt_length = 100;
            } else {
                // If image is hidden
                $excerpt_length = 200;
            }
            if (!empty(get_the_excerpt($post_id))) {
                $excerpt = get_the_excerpt($post_id);
                if (strlen($excerpt) > $excerpt_length) {
                    $excerpt = trim(mb_substr($excerpt, 0, $excerpt_length)) . '&hellip;';
                } else {
                    $excerpt = $excerpt;
                }
            } elseif (!empty(get_the_content($post_id))) {
                $body = get_the_content($post_id);
                if (strlen($body) > $excerpt_length) {
                    $excerpt = trim(mb_substr($body, 0, $excerpt_length)) . '&hellip;';
                } else {
                    $excerpt = $body;
                }
            } else {
                $excerpt = NULL;
            }

            $list_items_markup .= sprintf(
                '<div class="c-media-block c-block %1$s">',
                esc_html($block_class)
            );

            if ($thumb_id && $attributes['hideImage'] != true) {
                $list_items_markup .= sprintf(
                    '<div class="c-media-block__image c-block__image %1$s">
					<div class="c-block__image-wrap %2$s">
						<picture class="picture">
							<source srcset="%7$s" media="(min-width: %8$spx)">
							<source srcset="%5$s" media="(min-width: %6$spx)">
							<img itemprop="image" srcset="%4$s" alt="%3$s">
						</picture>
					</div>
				</div>',
                    esc_html($block_img_class),
                    esc_html($block_img_wrap_class),
                    esc_html($alt),
                    esc_html($image_s),
                    esc_html($image_m),
                    esc_html($image_break_m),
                    esc_html($image_l),
                    esc_html($image_break_l)
                );
            }

            $list_items_markup .= sprintf(
                '<div class="c-media-block__content c-block__content u-spacing %1$s">
				<div class="u-spacing c-block__group c-media-block__group %2$s">
					<div class="u-spacing u-width--100p">
						<h3 class="c-media-block__title c-block__title %3$s">
							<a class="c-block__title-link u-theme--link-hover--dark" href="%4$s">%5$s</a>
						</h3>',
                esc_html($block_content_class),
                esc_html($block_group_class),
                esc_html($block_title_class),
                esc_html($link),
                esc_html($title)
            );

            if ($attributes['hideExcerpt'] != true) {
                $list_items_markup .= sprintf(
                    '<p class="c-block__description">%1$s</p>',
                    esc_html($excerpt)
                );
            }

            if ($attributes['hideButton'] != true) {
                $list_items_markup .= sprintf(
                    '<a href="%1$s" class="c-block__button o-button o-button--outline">%2$s<span class="u-icon u-icon--m u-path-fill--base u-space--half--left"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>o-arrow__long--left</title><path d="M18.29,8.59l-3.5-3.5L13.38,6.5,15.88,9H.29v2H15.88l-2.5,2.5,1.41,1.41,3.5-3.5L19.71,10Z" fill="#9b9b9b"></path></svg></span></a>',
                    esc_html($link),
                    $attributes['readMoreLabel']
                );
            }

            $list_items_markup .= "</div>\n";

            if ($attributes['hideCategoryName'] != true || $attributes['hidePostDate'] != true) {
                $list_items_markup .= sprintf(
                    '<div class="c-media-block__meta c-block__meta %1$s">',
                    esc_html($block_meta_class)
                );

                if ($attributes['hideCategoryName'] != true) {
                    $list_items_markup .= sprintf(
                        '<span class="c-block__category u-text-transform--upper">%1$s</span>',
                        esc_html($category)
                    );
                }

                if ($attributes['hidePostDate'] != true) {
                    $list_items_markup .= sprintf(
                        '<time datetime="%1$s" class="c-block__date u-text-transform--upper">%2$s</time>',
                        esc_attr(get_the_date('c', $post_id)),
                        esc_html(get_the_date('', $post_id))
                    );
                }

                $list_items_markup .= "</div>\n";
            }

            $list_items_markup .= "</div></div>\n";
            $list_items_markup .= "</div>\n";
        }

        $class = NULL;
        if (isset($attributes['className'])) {
            $class .= ' ' . $attributes['className'];
        }

        if (isset($attributes['postLayout']) && 'grid' === $attributes['postLayout']) {
            // If is grid
            $class .= ' is-grid l-section__block-row l-section__block-row--6-col';
            if (get_post_meta($id, 'hide_sidebar', true) == 'true') {
                $class .= ' l-large-break u-shift--left--1-col--medium-xlarge';
            } else {
                $class .= ' l-standard-break u-shift--left--1-col--medium-large';
            }
            $block_content = sprintf(
                '<section class="c-section c-section__blocks%1$s">
				<div class="l-grid-item u-padding--zero--sides u-flex">%2$s</div>
			</section>',
                esc_attr($class),
                $list_items_markup
            );
        } else {
            // If is list
            $class .= 'is-list u-spacing--double';
            $block_content = sprintf(
                '<section class="c-section c-section__blocks %1$s">%2$s</section>',
                esc_attr($class),
                $list_items_markup
            );
        }

        return $block_content;
    }

    public function getName()
    {
        return static::PACKAGE . '/' . static::NAME;
    }
}
