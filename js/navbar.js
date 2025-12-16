const navItems = [
  { text: 'Home', url: 'index.html', icon: 'images/icons/home.ico' }, // Root-relative URL
  { text: 'Gallery', url: 'pages/artgallery.html', icon: 'images/icons/gallery.ico' }, // Pages-relative URL
  { text: 'Featured Artist', url: 'pages/featuredartist.html', icon: 'images/icons/featuredartist.ico' }, // Pages-relative URL
  { text: 'Buy Artwork', url: 'pages/buy-artwork.html', icon: 'images/icons/gallery.ico' }, // Pages-relative URL
  { text: 'Car Registration', url: 'pages/car-registration.html', icon: 'images/icons/home.ico' }, // Pages-relative URL
  { text: 'Garage Inventory', url: 'pages/garage.html', icon: 'images/icons/featuredartist.ico' }, // Pages-relative URL
];

function createNavBar(location = 'root') { // location: 'root' or 'pages'
  const nav = document.createElement('nav'); // Create the nav element
  nav.className = 'main-navigation'; // Set class name
  const ul = document.createElement('ul'); // Create the ul element

  navItems.forEach(item => { // Create each nav item
    const li = document.createElement('li'); // Create the li element
    const a = document.createElement('a'); // Create the a element

    if (location === 'pages') { // Adjust href for pages location
      a.href = item.url === 'index.html' // Check if the URL is the index page
        ? '../' + item.url // Root-relative link from pages
        : item.url.replace('pages/', ''); // Remove 'pages/' from URL
    } else {
      a.href = item.url; // Use the URL as is for root location
    }

    if (item.icon) { // If the nav item has an icon
      const iconPath = location === 'pages' && !item.icon.startsWith('http') ? '../' + item.icon : item.icon; // Adjust icon path for pages location
      const img = document.createElement('img'); // Create img element for icon
      img.src = iconPath; // Set the source of the icon image
      img.alt = item.text + " icon"; // Set alt text for accessibility
      img.className = 'nav-icon'; // Set class name for styling
      a.appendChild(img); // Append icon image to the anchor
    }

    a.appendChild(document.createTextNode(item.text)); // Add the text to the anchor
    li.appendChild(a); // Append anchor to the list item
    ul.appendChild(li); // Append list item to the unordered list
  });

  nav.appendChild(ul); // Append the unordered list to the nav element
  return nav;
}

function createMobileMenu(location = 'root') { // location: 'root' or 'pages'
  const menu = document.createElement('div'); // Create the mobile menu container
  menu.className = 'mobile-menu'; // Set class name for styling
  const ul = document.createElement('ul'); // Create the unordered list for menu items

  navItems.forEach(item => { // Create each mobile menu item
    const li = document.createElement('li'); // Create the list item element
    const a = document.createElement('a'); // Create the anchor element
    if (location === 'pages') { // Adjust href for pages location
      a.href = item.url === 'index.html' // Check if the URL is the index page
        ? '../' + item.url // Root-relative link from pages
        : item.url.replace('pages/', ''); // Remove 'pages/' from URL
    } else {
      a.href = item.url; // Use the URL as is for root location
    }
    a.textContent = item.text; // Set the text content of the anchor
    li.appendChild(a); // Append anchor to the list item
    ul.appendChild(li); // Append list item to the unordered list
  });

  menu.appendChild(ul); // Append the unordered list to the mobile menu container
  return menu;
}

document.addEventListener('DOMContentLoaded', () => { // Wait for the DOM to fully load
  const header = document.querySelector('header'); // Get the header element
  const location = window.location.pathname.includes('/pages/') ? 'pages' : 'root'; // Determine current location

  header.appendChild(createNavBar(location)); // Append the navigation bar to the header

  const burger = document.createElement('div'); // Create the hamburger menu button
  burger.className = 'hamburger'; // Set class name for styling
  burger.innerHTML = `<div></div><div></div><div></div>`; // Create the three lines of the hamburger icon
  document.body.appendChild(burger); // Append the hamburger button to the body

  const mobileMenu = createMobileMenu(location); // Create the mobile menu
  document.body.appendChild(mobileMenu); // Append the mobile menu to the body

  burger.addEventListener('click', () => { // Toggle mobile menu on hamburger click
    burger.classList.toggle('active'); // Toggle active class on burger
    mobileMenu.classList.toggle('show'); // Toggle show class on mobile menu
  });

  function handleResize() { // Show/hide burger based on window width
    if (window.innerWidth > 650) { // If window width is greater than 650px
      burger.classList.remove('active'); // Remove active class from burger
      mobileMenu.classList.remove('show'); // Remove show class from mobile menu
      burger.style.display = 'none'; // Hide the burger button
    } else {
      burger.style.display = 'flex'; // Show the burger button
    }
  }

  window.addEventListener('resize', handleResize); // Handle window resize events
  handleResize(); // Initial check on page load
});
