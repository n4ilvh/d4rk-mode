(function(){
    document.querySelector("html").style.filter = "invert(0) hue-rotate(0deg)";

    // Select all media elements (images, pictures, videos) but apply no filter to them
    let mediaItems = document.querySelectorAll("img, picture, video, svg");
    mediaItems.forEach((mediaItem) => {
        // Reset the filter for media elements
        mediaItem.style.filter = "invert(0) hue-rotate(0deg)";
    });
})();

    