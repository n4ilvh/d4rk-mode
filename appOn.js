(function (){
    // Apply the filter to only the background of the page
    document.querySelector("html").style.filter = "invert(1) hue-rotate(180deg)";

    // Select all media elements (images, pictures, videos) but apply no filter to them
    let mediaItems = document.querySelectorAll("img, picture, video, svg");
    mediaItems.forEach((mediaItem) => {
    // Reset the filter for media elements
    mediaItem.style.filter = "invert(1) hue-rotate(180deg)";
});
})();
