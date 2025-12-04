document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.getElementById("inventoryBody");
    const carCount = document.getElementById("car-count");
    const filterSelect = document.getElementById("filter-category");
    const sortButton = document.getElementById("sort-year");

    let inventory = JSON.parse(localStorage.getItem("garageInventory")) || [];
    let sortAscending = true;

    function displayCars(cars) {
        tableBody.innerHTML = "";
        cars.forEach(car => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${car.owner}</td>
                <td>${car.email}</td>
                <td>${car.year}</td>
                <td>${car.make}</td>
                <td>${car.model}</td>
                <td>${car.color}</td>
                <td>${car.category}</td>
                <td>${car.plate}</td>
            `;
            tableBody.appendChild(row);
        });
        carCount.textContent = cars.length;
    }

    // Filter by category
    filterSelect.addEventListener("change", () => {
        const value = filterSelect.value;
        const filtered = value ? inventory.filter(c => c.category === value) : inventory;
        displayCars(filtered);
    });

    // Sort by year
    sortButton.addEventListener("click", () => {
        inventory.sort((a, b) => sortAscending ? a.year - b.year : b.year - a.year);
        sortAscending = !sortAscending;
        displayCars(inventory);
    });

    // Load initial
    displayCars(inventory);
});