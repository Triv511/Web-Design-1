document.addEventListener("DOMContentLoaded", () => { // Ensure DOM is loaded before running script
    const cards = document.querySelectorAll(".purchase-card"); // Select all artwork cards
    const totalCostDisplay = document.getElementById("total-cost"); // Display for total cost
    const selectedArtworksList = document.getElementById("selected-artworks"); // List for selected artworks

    let total = 0; // keep track of total globally

    const clickSound = new Audio('../audio/mouseclick.mp3'); // Path to click sound
    clickSound.volume = 0.05; // Adjusted volume for click sound

    cards.forEach(card => { // Add click event to each card
        card.addEventListener("click", () => { // Toggle selection on click
            playClickSound(); // Play click sound on card click
            card.classList.toggle("selected"); // Toggle the 'selected' class
            updateTotal(); // Update total cost and selected artworks list
        });
    });

    function playClickSound() { // Play click sound function
        clickSound.currentTime = 0; // rewind to start
        clickSound.play().catch(() => {}); // ignore autoplay restrictions
    }

    function updateTotal() { // Function to update total cost and selected artworks list
        total = 0; // reset total
        selectedArtworksList.innerHTML = ""; // Clear current list

        const selectedCards = document.querySelectorAll(".purchase-card.selected"); // Get all selected cards

        selectedCards.forEach(card => { // Calculate total and update list
            const valueText = card.querySelector(".value").textContent; // Get artwork value text
            const number = parseFloat(valueText.replace(/[$,]/g, "")); // Convert to number /[$,]/g removes $ and , characters globally
            total += number; // Add to total

            // Add artwork title to list
            const title = card.querySelector(".artwork-title").textContent; // Get artwork title
            const li = document.createElement("li"); // Create list item
            li.textContent = title; // Set list item text
            selectedArtworksList.appendChild(li); // Add to selected artworks list
        });

        totalCostDisplay.textContent = "Total: $" + total.toLocaleString(); // Update total cost display
    }

    // Add message display area
    const messageDiv = document.createElement("div"); // Create message display area
    messageDiv.id = "rich-message"; // Set ID for styling or reference
    messageDiv.style.marginTop = "10px"; // Add spacing above message
    totalCostDisplay.insertAdjacentElement("afterend", messageDiv); // Insert message area after total cost display

    // Handle click on total cost
    totalCostDisplay.addEventListener("click", () => { // Show message based on total cost
        playClickSound(); // Play click sound on total cost click
        let message = ""; // Initialize message variable
        if (total === 0) { // No artwork selected
            message = "You haven’t picked anything yet!"; // Set message for no selection
        } else if (total < 10_000_000) { // Total less than $10 million
            message = "Wow, you’re getting started!";
        } else if (total < 100_000_000) { // Total less than $100 million
            message = "You’re so rich!";
        } else if (total < 300_000_000) { // Total less than $300 million
            message = "Money isn’t a problem for you, huh?";
        } else if (total < 500_000_000) { // Total less than $500 million
            message = "Absolute art collector status!";
        } else { // Total $500 million or more
            message = "You must be a billionaire!";
        }

        messageDiv.textContent = message; // Display the message
    });
});