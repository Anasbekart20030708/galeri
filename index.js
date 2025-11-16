/*Name this external file gallery.js*/

let currentIndex = 0;
let images = [];
let initialized = false;

function upDate(previewPic) {
    document.getElementById('image').style.backgroundImage = "url('" + previewPic.src + "')";
    document.getElementById('image').innerHTML = previewPic.alt;
}

function unDo() {
    document.getElementById('image').style.backgroundImage = "url('')";
    document.getElementById('image').innerHTML = "Hover over an image below to display here. Use Tab to navigate.";
}

function initializeGallery() {
    if (initialized) return;

    images = document.querySelectorAll('.preview');
    initialized = true;

    // Add keyboard navigation
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Tab') {
            event.preventDefault();

            // Remove focus from current image
            if (images[currentIndex]) {
                images[currentIndex].blur();
            }

            // Move to next image
            currentIndex = (currentIndex + 1) % images.length;

            // Focus on next image and update display
            images[currentIndex].focus();
            upDate(images[currentIndex]);
        }
    });

    // Add click functionality
    images.forEach((img, index) => {
        img.addEventListener('click', function () {
            currentIndex = index;
            upDate(this);
            this.focus();
        });

        // Update display when image gets focus
        img.addEventListener('focus', function () {
            upDate(this);
        });

        // Reset when image loses focus
        img.addEventListener('blur', function () {
            // Only reset if no other image has focus
            setTimeout(() => {
                const focusedElement = document.activeElement;
                if (!focusedElement || !focusedElement.classList.contains('preview')) {
                    unDo();
                }
            }, 50);
        });
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function () {
    initializeGallery();
});

// Also initialize if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeGallery);
} else {
    initializeGallery();
}