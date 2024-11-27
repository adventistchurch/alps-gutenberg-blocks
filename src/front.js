jQuery(function($){
    const sidebarIsActive = $( ".c-sidebar" ).length === 1;
    const mediaBlockIsActive = $( ".wp-block-alps-gutenberg-blocks-media-block").length > 0;

    if ( mediaBlockIsActive ) {
        if ( sidebarIsActive) {

            const content = $(".c-block__content");

            if(content.length > 0) {
                content.addClass("l-grid-item--xxl--2-col");
            }
        }
    }

    const columns = $( ".wp-block-columns").length > 0;

    if (columns) {
        $(".wp-block-column .c-media-block").css("width", "auto");
        $(".wp-block-column .c-block__image").css("width", "auto");
        $(".wp-block-column .c-block__content").css("width", "auto");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const toggleButtons = document.querySelectorAll(".js-toggle-button");

    toggleButtons.forEach((button) => {
        const showMore = button.querySelector('.o-button-show-more');
        const showLess = button.querySelector('.o-button-show-less');

        showMore.style.display = 'block';
        showLess.style.display = 'none';

        button.addEventListener("click", (event) => {
            event.preventDefault();

            const isExpanded = showMore.style.display === 'none';
            if (isExpanded) {
                showMore.style.display = 'block';
                showLess.style.display = 'none';
            } else {
                showMore.style.display = 'none';
                showLess.style.display = 'block';
            }
        });
    });
});