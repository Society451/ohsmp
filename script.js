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
});
