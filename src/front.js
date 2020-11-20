jQuery(function($){
    var sidebarIsActive = $( ".c-sidebar" ).length === 1;
    var mediaBlockIsActive = $( ".wp-block-alps-gutenberg-blocks-media-block").length === 1;

    if ( mediaBlockIsActive ) {
        if ( sidebarIsActive) {
            $( ".c-block__image" ).addClass("l-grid-item l-grid-item--s--1-col");
            $( ".c-block__content" ).addClass("l-grid--7-col l-grid-wrap--2-of-7");
        } else {
            $( ".c-block__image" ).addClass("l-grid-item l-grid-item--s--2-col");
            $( ".c-block__content" ).addClass("l-grid--7-col l-grid-wrap--3-of-7");
        }
    }
});