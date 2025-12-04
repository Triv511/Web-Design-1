// ========================================
// NAVIGATION BAR CONFIGURATION
// ========================================

const navItems = [
  { text: 'Home', url: 'index.html', icon: 'images/icons/home.ico' },
  { text: 'Gallery', url: 'pages/artgallery.html', icon: 'images/icons/gallery.ico' },
  { text: 'Featured Artist', url: 'pages/featuredartist.html', icon: 'images/icons/featuredartist.ico' },
  { text: 'Buy Artwork', url: 'pages/buy-artwork.html', icon: 'images/icons/gallery.ico' },
  { text: 'Car Registration', url: 'pages/car-registration.html', icon: 'images/icons/home.ico' },
  { text: 'Garage Inventory', url: 'pages/garage.html', icon: 'images/icons/featuredartist.ico' },
];

// ========================================
// CREATE NAVIGATION BAR FUNCTION
// ========================================

function createNavBar(location = 'root') {
  const nav = document.createElement('nav');
  nav.className = 'main-navigation';
  const ul = document.createElement('ul');

  navItems.forEach(item => {
    const li = document.createElement('li');
    const a = document.createElement('a');

    // Adjust page links based on current location
    if (location === 'pages') {
      a.href = item.url === 'index.html'
        ? '../' + item.url
        : item.url.replace('pages/', '');
    } else {
      a.href = item.url;
    }

    // Handle icon path automatically
    let iconPath = item.icon;
    if (location === 'pages' && iconPath && !iconPath.startsWith('http')) {
      // Go up one folder for relative paths like "icons/..."
      iconPath = '../' + iconPath;
    }

    // Add icon if available
    if (iconPath) {
      const iconImg = document.createElement('img');
      iconImg.src = iconPath;
      iconImg.alt = `${item.text} icon`;
      iconImg.className = 'nav-icon';
      a.appendChild(iconImg);
    }

    // Add link text
    const textNode = document.createTextNode(item.text);
    a.appendChild(textNode);

    li.appendChild(a);
    ul.appendChild(li);
  });

  nav.appendChild(ul);
  return nav;
}

// ========================================
// INSERT NAVIGATION INTO PAGE
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('header');
  const location = window.location.pathname.includes('/pages/') ? 'pages' : 'root';
  const navBar = createNavBar(location);
  header.appendChild(navBar);
});