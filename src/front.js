jQuery(function($){
    const sidebarIsActive = $( ".c-sidebar" ).length === 1;
    const mediaBlockIsActive = $( ".wp-block-alps-gutenberg-blocks-media-block").length > 0;

    if ( mediaBlockIsActive ) {
        if ( !sidebarIsActive) {
            $(".c-media-block").removeClass("l-grid-wrap--3-of-7").addClass("l-grid-wrap--4-of-7")

            const image = $(".c-block__image");
            const content = $(".c-block__content");

            if(image.hasClass("l-grid-item--s--1-col")) {
                image.removeClass("l-grid-item--s--1-col").addClass("l-grid-item--s--2-col");
            }
            if(content.hasClass("l-grid-item--m--2-col")) {
                content.removeClass("l-grid-item--m--2-col").addClass("l-grid-item--m--3-col");
            }
        }
    }
});