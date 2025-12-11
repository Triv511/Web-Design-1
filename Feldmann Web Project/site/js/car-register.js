// =============================
// COMMON UTILITY
// =============================
function safeGet(id) {
    return document.getElementById(id); // Get element by ID safely
}

// =============================
// FIELD FOCUS STYLING
// =============================
document.querySelectorAll("input, select, textarea").forEach(field => { // Add focus listener to each form field
    field.addEventListener("focus", () => field.classList.add("touched")); // Add 'touched' class on focus
});

// =============================
// REGISTRATION PAGE
// =============================
const form = safeGet("carForm"); // Registration form element

if (form) {
    const ownerField = safeGet("owner-name"); // Owner name input
    const emailField = safeGet("email"); // Email input
    const notesField = safeGet("optional-notes"); // Optional notes textarea
    const countDisplay = safeGet("optional-count"); // Character count display
    
    // Robust audio that works after page navigation
    let clickSound = null; // Click sound audio object
    let audioReady = false; // Flag to track if audio is enabled

    const createFreshAudio = () => { // Create a fresh audio object
        clickSound = new Audio('../audio/mouseclick.mp3'); // Path to click sound
        clickSound.volume = 0.05; // Set click sound volume
        audioReady = false; // Reset audio ready flag
    };

    const enableAudio = () => { // Enable audio on first interaction
        if (!audioReady && clickSound) { // If audio not yet enabled
            clickSound.play().then(() => { // Try to play sound
                clickSound.pause(); // Pause immediately after playing
                clickSound.currentTime = 0; // Reset to start
                audioReady = true; // Mark audio as ready
            }).catch(() => {
                // If it fails, create fresh audio and try again
                createFreshAudio(); // Create fresh audio object
                clickSound.play().then(() => { // Try to play sound
                    clickSound.pause(); // Pause immediately after playing
                    clickSound.currentTime = 0; // Reset to start
                    audioReady = true; // Mark audio as ready
                }).catch(() => { // If it fails again
                    audioReady = true; // Give up but mark ready
                });
            });
        }
    };

    const playClickSound = () => { // Play click sound function
        if (!clickSound || clickSound.error) { // If audio is missing or errored
            createFreshAudio(); // Create fresh audio if missing or errored
        }
        if (clickSound) { // If audio exists
            clickSound.currentTime = 0; // Rewind to start
            clickSound.play().catch(() => { // If play fails
                // If play fails, try with fresh audio
                createFreshAudio(); // Create fresh audio object
                if (clickSound) { // If audio exists
                    clickSound.currentTime = 0; // Rewind to start
                    clickSound.play().catch(() => {}); // Ignore autoplay restrictions
                }
            });
        }
    };

    // Initialize audio
    createFreshAudio(); // Create fresh audio object

    // Enable audio on any interaction
    document.addEventListener('click', enableAudio); // Enable on click
    document.addEventListener('keydown', enableAudio); // Enable on keydown
    document.addEventListener('touchstart', enableAudio); // Enable on touchstart

    // Owner field error span
    const ownerErrorId = "ownerError"; // Owner name error span ID
    let ownerError = safeGet(ownerErrorId); // Get existing owner error span
    if (!ownerError) { // Create if not exists
        ownerError = document.createElement("span"); // Create owner error span
        ownerError.id = ownerErrorId; // Set ID
        ownerError.style.color = "yellow"; // Set text color
        ownerError.style.display = "block"; // Set display to block 
        ownerError.style.fontSize = "0.9rem"; // Set font size
        ownerField.insertAdjacentElement("afterend", ownerError); // Insert after owner field
    }

    ownerField.addEventListener("input", () => { // Validate owner name on input
        const parts = ownerField.value.trim().split(" "); // Split name into parts
        let message = ""; // Initialize message

        let firstRemaining = 3 - (parts[0]?.length || 0); // Calculate remaining chars for first name
        if (firstRemaining > 0) { // If first name incomplete
            message = `${firstRemaining} character${firstRemaining === 1 ? "" : "s"}`; // Set message for remaining characters
            ownerField.setCustomValidity("First name incomplete"); // Set custom validity message
            ownerError.textContent = message; // Update error text
            return;
        }

        if (parts.length < 2) { // If last name missing
            ownerField.setCustomValidity("Waiting for space"); // Set custom validity message
            ownerError.textContent = "space"; // Update error text
            return;
        }

        let secondRemaining = 3 - (parts[1].length); // Calculate remaining chars for last name
        if (secondRemaining > 0) { // If last name incomplete
            ownerField.setCustomValidity("Last name incomplete"); // Set custom validity message
            ownerError.textContent = `${secondRemaining} character${secondRemaining === 1 ? "" : "s"}`; // Update error text
            return;
        }

        ownerField.setCustomValidity(""); // Clear custom validity message
        ownerError.textContent = ""; // Clear error text
    });

    // Email field error span
    const emailErrorId = "emailError"; // Email error span ID
    let emailError = safeGet(emailErrorId); // Get existing email error span
    if (!emailError) { // Create if not exists
        emailError = document.createElement("span"); // Create email error span
        emailError.id = emailErrorId; // Set ID
        emailError.style.color = "yellow"; // Set text color
        emailError.style.display = "block"; // Set display to block
        emailError.style.fontSize = "0.9rem"; // Set font size
        emailField.insertAdjacentElement("afterend", emailError); // Insert after email field
    }

    emailField.addEventListener("input", () => { // Validate email on input
        const value = emailField.value; // Get email field value
        let messages = []; // Initialize messages array

        let remainingChars = Math.max(0, 8 - value.length); // Calculate remaining characters for minimum length
        if (remainingChars > 0) messages.push(`${remainingChars} character${remainingChars === 1 ? "" : "s"}`); // Add message for remaining characters
        if (!value.includes("@")) messages.push("Must include '@'"); // Add message if '@' is missing
        if (!value.endsWith(".com")) messages.push("Must end with '.com'"); // Add message if not ending with '.com'

        emailError.textContent = messages.length ? messages.join(" • ") : ""; // Update error text
        emailField.setCustomValidity(messages.length ? "Email incomplete" : ""); // Set custom validity message
    });

    // Character counter for notes
    if (notesField && countDisplay) { // If notes field and count display exist
        countDisplay.textContent = notesField.value.length; // Initialize count display
        notesField.addEventListener("input", () => { // Update character count on input
            countDisplay.textContent = notesField.value.length; // Update count display
        });
    }

    // Add click sound to submit button directly
    const submitButton = document.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.addEventListener('click', (e) => {
            // Force fresh audio and enable on every click to handle browser suspension
            createFreshAudio();
            enableAudio();
            setTimeout(() => playClickSound(), 20); // Slightly longer delay for suspended contexts
        });
    }



    // Form submission
    form.addEventListener("submit", (event) => { // Handle form submission
        event.preventDefault(); // Prevent default form submission

        const owner = ownerField.value.trim(); // Get trimmed owner name
        const email = emailField.value.trim(); // Get trimmed email
        const year = parseInt(safeGet("car-year").value); // Get car year as integer
        const make = safeGet("car-make").value.trim(); // Get trimmed car make
        const model = safeGet("car-model").value.trim(); // Get trimmed car model
        const plate = safeGet("license-plate").value.trim(); // Get trimmed license plate
        const category = safeGet("category").value; // Get selected category
        const colorInput = document.querySelector("input[name='color']:checked"); // Get selected color input

        if (!owner || !email || !make || !model || !plate || !category || !colorInput) { // Check for required fields
            alert("Please fill in all required fields."); // Alert if any required field is missing
            return;
        }

        const nameParts = owner.split(" ");
        if (nameParts.length < 2 || nameParts[0].length < 3 || nameParts[1].length < 3) { // Validate owner name format
            alert("Owner's name must be at least 3 characters, a space, then at least 3 characters for last name."); // Alert if owner name format is invalid
            return;
        }

        if (email.length < 8 || !email.includes("@") || !email.endsWith(".com")) { // Validate email format
            alert("Email must be at least 8 characters, include '@', and end with '.com'."); // Alert if email format is invalid
            return;
        }

        if (year < 1950 || year > 2025) { // Validate car year range
            alert("Car year must be between 1950 and 2025."); // Alert if car year is out of range
            return;
        }

        let ticket = {
            ownerName: owner, // Owner's full name
            email: email, // Owner's email address
            carYear: year, // Car's manufacturing year
            carMake: make, // Car's make
            carModel: model, // Car's model
            licensePlate: plate, // Car's license plate
            category: category, // Car's category
            color: colorInput.value, // Car's color
            notes: notesField ? notesField.value : "" // Additional notes
        };

        // Load and migrate old tickets
        let allTickets = JSON.parse(localStorage.getItem("garage")) || []; // Load existing tickets from localStorage
        allTickets = allTickets.map(t => { // Migrate old ticket structure if needed
            if (t.catagory) { t.category = t.catagory; delete t.catagory; } // Fix typo in category field
            return t;
        });

        allTickets.push(ticket); // Add new ticket to the list
        localStorage.setItem("garage", JSON.stringify(allTickets)); // Save updated tickets to localStorage

        // Short delay to let sound play, then show success and redirect
        setTimeout(() => { // Delay for click sound
            alert("Car registered successfully!"); // Show success alert
            window.location.href = "garage.html"; // Redirect to garage page
        }, 150); // 150ms delay to allow click sound to play
    });
}