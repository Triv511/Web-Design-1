// =============================
// Field Focus Styling (Registration Page)
// =============================
document.querySelectorAll("input, select, textarea").forEach(field => {
    field.addEventListener("focus", () => {
        field.classList.add("touched");
    });
});
// =============================
// Character Counter (Registration Page)
// =============================
const notesField = document.getElementById("optional-notes");
const countDisplay = document.getElementById("optional-count");

if (notesField && countDisplay) {
    notesField.addEventListener("input", () => {
        countDisplay.textContent = notesField.value.length;
    });
}

// =============================
// Form Submit + Validation (Registration Page)
// =============================

const form = document.getElementById("carForm");

if (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // --- Required field validation ---
        const owner = document.getElementById("owner-name").value.trim();
        const email = document.getElementById("email").value.trim();
        const year = parseInt(document.getElementById("car-year").value);
        const make = document.getElementById("car-make").value.trim();
        const model = document.getElementById("car-model").value.trim();
        const plate = document.getElementById("license-plate").value.trim();
        const category = document.getElementById("category").value;
        const color = document.querySelector("input[name='color']:checked");

        if (!owner || !email || !make || !model || !plate || !category || !color) {
            alert("Please fill in all required fields.");
            return;
        }

        // --- Email validation ---
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // --- Year validation ---
        if (year < 1950 || year > 2025) {
            alert("Car year must be between 1950 and 2025.");
            return;
        }

        let ticket = {
            ownerName: owner,
            email: email,
            carYear: year,
            carMake: make,
            carModel: model,
            licensePlate: plate,
            catagory: category,
            color: color.value,
            notes: notesField ? notesField.value : ""
        };

        // Load from storage
        let allTickets = JSON.parse(localStorage.getItem("garage")) || [];

        // Add new ticket
        allTickets.push(ticket);

        // Save to localStorage
        localStorage.setItem("garage", JSON.stringify(allTickets));

        // Redirect to garage page
        window.location.href = "garage.html";
    });
}

// =============================
// Garage Page Inventory Loader
// =============================
let inventoryBody = document.getElementById("inventoryBody");
let countDisplayGarage = document.getElementById("car-count");

if (inventoryBody) {
    let allTickets = JSON.parse(localStorage.getItem("garage")) || [];

    // Display total cars
    if (countDisplayGarage) {
        countDisplayGarage.textContent = allTickets.length;
    }

    // Generate rows
    function loadTable(tickets) {
        inventoryBody.innerHTML = "";

        tickets.forEach(ticket => {
            let row = `
                <tr>
                    <td>${ticket.ownerName}</td>
                    <td>${ticket.email}</td>
                    <td>${ticket.carYear}</td>
                    <td>${ticket.carMake}</td>
                    <td>${ticket.carModel}</td>
                    <td>${ticket.color}</td>
                    <td>${ticket.catagory}</td>
                    <td>${ticket.licensePlate}</td>
                </tr>
            `;
            inventoryBody.innerHTML += row;
        });
    }

    loadTable(allTickets);

    // =============================
    // INTERACTIVE FEATURE #1: Category Filter
    // =============================
    const filterSelect = document.getElementById("filter-category");
    if (filterSelect) {
        filterSelect.addEventListener("change", () => {
            let value = filterSelect.value;

            if (!value) {
                loadTable(allTickets);
            } else {
                loadTable(allTickets.filter(c => c.catagory === value));
            }
        });
    }

    // =============================
    // INTERACTIVE FEATURE #2: Sort by Year
    // =============================
    const sortBtn = document.getElementById("sort-year");
    if (sortBtn) {
        sortBtn.addEventListener("click", () => {
            let sorted = [...allTickets].sort((a, b) => a.carYear - b.carYear);
            loadTable(sorted);
        });
    }
}