document.addEventListener("DOMContentLoaded", () => {
    const inventoryBody = document.getElementById("inventoryBody");
    if (!inventoryBody) return; // only run on garage.html

    const countDisplay = document.getElementById("car-count");
    const filterSelect = document.getElementById("filter-category");
    const sortBtn = document.getElementById("sort-year");
    const clearBtn = document.getElementById("clearInventory");

    let allTickets = JSON.parse(localStorage.getItem("garage")) || [];
    allTickets = allTickets.map(t => {
        if (t.catagory) { t.category = t.catagory; delete t.catagory; }
        return t;
    });

    let displayedTickets = [...allTickets];
    let ascending = true;

    function loadTable(tickets) {
        inventoryBody.innerHTML = "";
        if (tickets.length === 0) {
            inventoryBody.innerHTML = `<tr><td colspan="8" style="text-align:center">No cars found</td></tr>`;
        } else {
            tickets.forEach(t => {
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
                `;
            });
        }
        if (countDisplay) countDisplay.textContent = tickets.length;
    }

    loadTable(displayedTickets);

    if (filterSelect) {
        filterSelect.addEventListener("change", () => {
            const val = filterSelect.value.toLowerCase();
            displayedTickets = val
                ? allTickets.filter(t => t.category.toLowerCase() === val)
                : [...allTickets];
            loadTable(displayedTickets);
        });
    }

    if (sortBtn) {
        sortBtn.addEventListener("click", () => {
            displayedTickets.sort((a, b) =>
                ascending ? a.carYear - b.carYear : b.carYear - a.carYear
            );
            ascending = !ascending;
            loadTable(displayedTickets);
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            console.log("Clear inventory clicked");
            if (!confirm("Are you sure you want to delete all cars?")) return;
            localStorage.removeItem("garage");
            allTickets = [];
            displayedTickets = [];
            if (filterSelect) filterSelect.value = "";
            loadTable(displayedTickets);
        });
    }
});
