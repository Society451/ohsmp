document.addEventListener('DOMContentLoaded', function() {
    var video = document.getElementById('backgroundVideo');
    if (video) {
        // Set playback rate
        video.playbackRate = 0.65;

        // Restore video time from session storage
        var savedTime = sessionStorage.getItem('videoTime');
        if (savedTime) {
            video.currentTime = parseFloat(savedTime);
        }

        // Play the video after setting currentTime
        video.play();

        // Save video time to session storage before unloading the page
        window.addEventListener('beforeunload', function() {
            sessionStorage.setItem('videoTime', video.currentTime);
        });

        video.addEventListener('error', function() {
            console.error('Error loading the video.');
        });
    } else {
        console.error('Video element not found.');
    }
    
    // Load and animate markdown content if we're on the rules page
    if (window.location.href.includes('rules.html')) {
        loadAndAnimateMarkdown();
    }
});

// Function to fetch, parse and animate markdown content
function loadAndAnimateMarkdown() {
    const markdownContainer = document.getElementById('markdown-container');
    if (!markdownContainer) return;
    
    fetch('/assets/rules.md')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load rules markdown');
            }
            return response.text();
        })
        .then(markdown => {
            // Parse markdown to HTML if marked library is available
            if (typeof marked !== 'undefined') {
                const htmlContent = marked.parse(markdown);
                animateMarkdownContent(markdownContainer, htmlContent);
            } else {
                console.error('Marked library not available');
                markdownContainer.textContent = 'Error loading rules. Please try again later.';
            }
        })
        .catch(error => {
            console.error('Error loading markdown:', error);
            markdownContainer.textContent = 'Error loading rules. Please try again later.';
        });
}

// Function to animate the markdown content
function animateMarkdownContent(container, htmlContent) {
    // Set the HTML content first
    container.innerHTML = htmlContent;
    
    // Get all elements to animate
    const elementsToAnimate = container.querySelectorAll('h1, h2, h3, p, ul, ol, li, pre, blockquote');
    
    // Hide all elements initially
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
    });
    
    // Animate elements one by one with a delay
    let delay = 100;
    elementsToAnimate.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('animated-element');
        }, delay * index);
    });
}
