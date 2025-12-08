const navItems = [
  { text: 'Home', url: 'index.html', icon: 'images/icons/home.ico' },
  { text: 'Gallery', url: 'pages/artgallery.html', icon: 'images/icons/gallery.ico' },
  { text: 'Featured Artist', url: 'pages/featuredartist.html', icon: 'images/icons/featuredartist.ico' },
  { text: 'Buy Artwork', url: 'pages/buy-artwork.html', icon: 'images/icons/gallery.ico' },
  { text: 'Car Registration', url: 'pages/car-registration.html', icon: 'images/icons/home.ico' },
  { text: 'Garage Inventory', url: 'pages/garage.html', icon: 'images/icons/featuredartist.ico' },
];

function createNavBar(location = 'root') {
  const nav = document.createElement('nav');
  nav.className = 'main-navigation';
  const ul = document.createElement('ul');

  navItems.forEach(item => {
    const li = document.createElement('li');
    const a = document.createElement('a');

    if (location === 'pages') {
      a.href = item.url === 'index.html'
        ? '../' + item.url
        : item.url.replace('pages/', '');
    } else {
      a.href = item.url;
    }

    if (item.icon) {
      const iconPath = location === 'pages' && !item.icon.startsWith('http') ? '../' + item.icon : item.icon;
      const img = document.createElement('img');
      img.src = iconPath;
      img.alt = item.text + " icon";
      img.className = 'nav-icon';
      a.appendChild(img);
    }

    a.appendChild(document.createTextNode(item.text));
    li.appendChild(a);
    ul.appendChild(li);
  });

  nav.appendChild(ul);
  return nav;
}

function createMobileMenu(location = 'root') {
  const menu = document.createElement('div');
  menu.className = 'mobile-menu';
  const ul = document.createElement('ul');

  navItems.forEach(item => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    if (location === 'pages') {
      a.href = item.url === 'index.html'
        ? '../' + item.url
        : item.url.replace('pages/', '');
    } else {
      a.href = item.url;
    }
    a.textContent = item.text;
    li.appendChild(a);
    ul.appendChild(li);
  });

  menu.appendChild(ul);
  return menu;
}

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const location = window.location.pathname.includes('/pages/') ? 'pages' : 'root';

  header.appendChild(createNavBar(location));

  const burger = document.createElement('div');
  burger.className = 'hamburger';
  burger.innerHTML = `<div></div><div></div><div></div>`;
  document.body.appendChild(burger);

  const mobileMenu = createMobileMenu(location);
  document.body.appendChild(mobileMenu);

  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    mobileMenu.classList.toggle('show');
  });

  function handleResize() {
    if (window.innerWidth > 650) {
      burger.classList.remove('active');
      mobileMenu.classList.remove('show');
      burger.style.display = 'none';
    } else {
      burger.style.display = 'flex';
    }
  }

  window.addEventListener('resize', handleResize);
  handleResize();
});
