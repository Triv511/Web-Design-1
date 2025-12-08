// =============================
// COMMON UTILITY
// =============================
function safeGet(id) {
    return document.getElementById(id);
}

// =============================
// FIELD FOCUS STYLING (REGISTRATION)
// =============================
document.querySelectorAll("input, select, textarea").forEach(field => {
    field.addEventListener("focus", () => field.classList.add("touched"));
});

// =============================
// REGISTRATION PAGE LOGIC
// =============================
const form = safeGet("carForm");

if (form) {
    const ownerField = safeGet("owner-name");
    const emailField = safeGet("email");
    const notesField = safeGet("optional-notes");
    const countDisplay = safeGet("optional-count");

    // Owner field error span
    const ownerErrorId = "ownerError";
    let ownerError = safeGet(ownerErrorId);
    if (!ownerError) {
        ownerError = document.createElement("span");
        ownerError.id = ownerErrorId;
        ownerError.style.color = "yellow";
        ownerError.style.display = "block";
        ownerError.style.fontSize = "0.9rem";
        ownerField.insertAdjacentElement("afterend", ownerError);
    }

    ownerField.addEventListener("input", () => {
        const parts = ownerField.value.trim().split(" ");
        let message = "";

        let firstRemaining = 3 - (parts[0]?.length || 0);
        if (firstRemaining > 0) {
            message = `${firstRemaining} character${firstRemaining === 1 ? "" : "s"}`;
            ownerField.setCustomValidity("First name incomplete");
            ownerError.textContent = message;
            return;
        }

        if (parts.length < 2) {
            ownerField.setCustomValidity("Waiting for space");
            ownerError.textContent = "space";
            return;
        }

        let secondRemaining = 3 - (parts[1].length);
        if (secondRemaining > 0) {
            ownerField.setCustomValidity("Last name incomplete");
            ownerError.textContent = `${secondRemaining} character${secondRemaining === 1 ? "" : "s"}`;
            return;
        }

        ownerField.setCustomValidity("");
        ownerError.textContent = "";
    });

    // Email field error span
    const emailErrorId = "emailError";
    let emailError = safeGet(emailErrorId);
    if (!emailError) {
        emailError = document.createElement("span");
        emailError.id = emailErrorId;
        emailError.style.color = "yellow";
        emailError.style.display = "block";
        emailError.style.fontSize = "0.9rem";
        emailField.insertAdjacentElement("afterend", emailError);
    }

    emailField.addEventListener("input", () => {
        const value = emailField.value;
        let messages = [];

        let remainingChars = Math.max(0, 8 - value.length);
        if (remainingChars > 0) messages.push(`${remainingChars} character${remainingChars === 1 ? "" : "s"}`);
        if (!value.includes("@")) messages.push("Must include '@'");
        if (!value.endsWith(".com")) messages.push("Must end with '.com'");

        emailError.textContent = messages.length ? messages.join(" • ") : "";
        emailField.setCustomValidity(messages.length ? "Email incomplete" : "");
    });

    // Character counter for notes
    if (notesField && countDisplay) {
        notesField.addEventListener("input", () => {
            countDisplay.textContent = notesField.value.length;
        });
    }

    // Form submission
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const owner = ownerField.value.trim();
        const email = emailField.value.trim();
        const year = parseInt(safeGet("car-year").value);
        const make = safeGet("car-make").value.trim();
        const model = safeGet("car-model").value.trim();
        const plate = safeGet("license-plate").value.trim();
        const category = safeGet("category").value;
        const colorInput = document.querySelector("input[name='color']:checked");

        if (!owner || !email || !make || !model || !plate || !category || !colorInput) {
            alert("Please fill in all required fields.");
            return;
        }

        const nameParts = owner.split(" ");
        if (nameParts.length < 2 || nameParts[0].length < 3 || nameParts[1].length < 3) {
            alert("Owner's name must be at least 3 characters, a space, then at least 3 characters for last name.");
            return;
        }

        if (email.length < 8 || !email.includes("@") || !email.endsWith(".com")) {
            alert("Email must be at least 8 characters, include '@', and end with '.com'.");
            return;
        }

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
            category: category,
            color: colorInput.value,
            notes: notesField ? notesField.value : ""
        };

        // Load and migrate old tickets
        let allTickets = JSON.parse(localStorage.getItem("garage")) || [];
        allTickets = allTickets.map(t => {
            if (t.catagory) { t.category = t.catagory; delete t.catagory; }
            return t;
        });

        allTickets.push(ticket);
        localStorage.setItem("garage", JSON.stringify(allTickets));

        alert("Car registered successfully!");
        window.location.href = "garage.html";
    });
}


