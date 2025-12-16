function updateClock() { // Function to update the clock display
    const clock = document.getElementById("clock"); // Get the clock element
    const now = new Date(); // Get the current date and time

    const hours = now.getHours(); // Get current hours
    const minutes = now.getMinutes().toString().padStart(2, "0"); // Get current minutes, padded to 2 digits
    const seconds = now.getSeconds().toString().padStart(2, "0"); // Get current seconds, padded to 2 digits

    clock.textContent = `${hours}:${minutes}:${seconds}`; // Update clock display
}

// Update immediately once on load
updateClock();

// Then update every 1 second
setInterval(updateClock, 1000);