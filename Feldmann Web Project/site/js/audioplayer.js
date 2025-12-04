document.addEventListener('DOMContentLoaded', () => { // Ensure the DOM is fully loaded
    const audio = document.getElementById('audio'); // The audio element
    const playBtn = document.getElementById('play'); // The play button
    const pauseBtn = document.getElementById('pause'); // The pause button
    const stopBtn = document.getElementById('stop'); // The stop button
    const progress = document.getElementById('progress'); // The progress bar
    const currentTimeEl = document.getElementById('current-time'); // Current time display
    const durationEl = document.getElementById('duration'); // Duration display
    const volumeContainer = document.querySelector('.volume-container'); // Volume control container
    const volumeIcon = document.querySelector('.volume-icon'); // Volume icon
    const volumeSlider = document.getElementById('volume'); // Volume slider

    // --- Click sound setup ---
    const clickSound = new Audio('../audio/mouseclick.mp3'); // Path to click sound
    clickSound.volume = 0.05; // Adjusted volume for click sound

    function playClickSound() { // Play click sound function
        // Rewind to start each time so it can play again quickly
        clickSound.currentTime = 0; // rewind to start
        clickSound.play().catch(() => {}); // ignore autoplay restrictions
    }

    // --- Button Actions ---
    playBtn.addEventListener('click', () => { // Play button action
        playClickSound(); // Play click sound
        audio.play(); // Play audio
    });

    pauseBtn.addEventListener('click', () => { // Pause button action
        playClickSound(); // Play click sound
        audio.pause(); // Pause audio
    });

    stopBtn.addEventListener('click', () => { // Stop button action
        playClickSound(); // Play click sound
        audio.pause(); // Pause audio
        audio.currentTime = 0; // Reset to start
    });

    // --- Audio Progress ---
    audio.addEventListener('timeupdate', () => { // Update progress bar and time display
        if (!isNaN(audio.duration)) { // Check if duration is available
            const percent = (audio.currentTime / audio.duration) * 100; // Calculate percentage
            progress.style.width = percent + '%'; // Update progress bar width
            currentTimeEl.textContent = formatTime(audio.currentTime); // Update current time display
        }
    });

    audio.addEventListener('loadedmetadata', () => { // When metadata is loaded
        durationEl.textContent = formatTime(audio.duration); // Set duration display
    });

    // --- Volume ---
    volumeSlider.addEventListener('input', () => { // Volume slider action
        audio.volume = volumeSlider.value; // Set audio volume
    });

    volumeIcon.addEventListener('click', () => { // Volume icon action
        playClickSound(); // Play click sound
        volumeContainer.classList.toggle('active'); // Toggle volume control visibility
    });

    audio.volume = volumeSlider.value; // Initialize volume

    function formatTime(time) { // Format time in mm:ss
        const minutes = Math.floor(time / 60); // Get minutes
        const seconds = Math.floor(time % 60); // Get seconds
        return minutes + ':' + (seconds < 10 ? '0' + seconds : seconds); // Return formatted time
    }
});
