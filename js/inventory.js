

document.addEventListener("DOMContentLoaded", () => {
    const inventoryBody = document.getElementById("inventoryBody"); // Inventory table body element
    if (!inventoryBody) return; // only run on garage.html

    const countDisplay = document.getElementById("car-count"); // Car count display element
    const filterSelect = document.getElementById("filter-category"); // Category filter select element
    const sortBtn = document.getElementById("sort-year"); // Sort by year button element
    const clearBtn = document.getElementById("clearInventory"); // Clear inventory button element

    // Audio setup that works reliably after page navigation
    let audioReady = false; // Flag to track if audio is enabled
    const clickSound = new Audio('../audio/mouseclick.mp3');
    clickSound.volume = 0.05; // Set click sound volume

    const enableAudio = () => { // Enable audio on first interaction
        if (!audioReady) { // If audio not yet enabled
            clickSound.play().then(() => { // Try to play sound
                clickSound.pause(); // Pause immediately after playing
                clickSound.currentTime = 0; // Reset to start
                audioReady = true; // Mark audio as ready
            }).catch(() => { // Handle play failure
                audioReady = true; // Mark ready even if play fails
            });
        }
    };

    // Enable audio immediately on any interaction
    document.addEventListener('click', enableAudio); // Enable on click
    document.addEventListener('keydown', enableAudio); // Enable on keydown
    document.addEventListener('touchstart', enableAudio); // Enable on touchstart

    function playClickSound() { // Play click sound function
        clickSound.currentTime = 0; // Rewind to start
        clickSound.play().catch(() => {}); // Ignore autoplay restrictions
    }

    let allTickets = JSON.parse(localStorage.getItem("garage")) || []; // Load existing tickets from localStorage
    allTickets = allTickets.map(t => { // Migrate old ticket structure if needed
        if (t.catagory) { t.category = t.catagory; delete t.catagory; } // Fix typo in category field
        return t;
    });

    let displayedTickets = [...allTickets]; // Tickets currently displayed in the table
    let ascending = true; // Sort order flag

    function loadTable(tickets) { // Load tickets into the inventory table
        inventoryBody.innerHTML = ""; // Clear existing table rows
        if (tickets.length === 0) { // No tickets to display
            inventoryBody.innerHTML = `<tr><td colspan="8" style="text-align:center">No cars found</td></tr>`; // Display no cars message
        } else {
            tickets.forEach(t => { // Add each ticket as a table row
                inventoryBody.innerHTML += `
                    <tr>
                        <td>${t.ownerName}</td>
                        <td>${t.email}</td>
                        <td>${t.carYear}</td>
                        <td>${t.carMake}</td>
                        <td>${t.carModel}</td>
                        <td>${t.color}</td>
                        <td>${t.category}</td>
                        <td>${t.licensePlate}</td>
                    </tr>
                `; // Append ticket row to table body
            });
        }
        if (countDisplay) countDisplay.textContent = tickets.length; // Update car count display
    }

    loadTable(displayedTickets); // Initial load of the inventory table

    if (filterSelect) { // Category filter select element exists
        filterSelect.addEventListener("change", () => { // Handle category filter change
            const val = filterSelect.value.toLowerCase(); // Get selected category value
            displayedTickets = val // Filter tickets by selected category or show all
                ? allTickets.filter(t => t.category.toLowerCase() === val) // Filter by category
                : [...allTickets]; // Show all tickets if no category selected
            loadTable(displayedTickets); // Reload table with filtered tickets
        });
    }

    if (sortBtn) { // Sort by year button element exists
        sortBtn.addEventListener("click", () => { // Handle sort by year button click
            playClickSound(); // Play click sound on sort button click
            displayedTickets.sort((a, b) => // Sort tickets by car year
                ascending ? a.carYear - b.carYear : b.carYear - a.carYear // Toggle sort order
            );
            ascending = !ascending; // Toggle sort order for next click
            loadTable(displayedTickets); // Reload table with sorted tickets
        });
    }

    if (clearBtn) { // Clear inventory button element exists
        clearBtn.addEventListener("click", () => { // Handle clear inventory button click
            playClickSound(); // Play click sound on clear button click
            if (!confirm("Are you sure you want to delete all cars?")) return; // Confirm before clearing inventory
            localStorage.removeItem("garage"); // Remove garage data from localStorage
            allTickets = []; // Clear all tickets array
            displayedTickets = []; // Clear displayed tickets array
            if (filterSelect) filterSelect.value = ""; // Reset category filter
            loadTable(displayedTickets); // Reload table with cleared tickets
        });
    }
});
