/* 
  --------------------------------------------
  Site Color Theme Depending On Primary Color
  --------------------------------------------

*/

/* Check Local Storage For Primary Color & Images */

// Get Local Storage Item
let primaryColor = localStorage.getItem('primaryColor');
// Select About Section Image
let aboutSectionImage = document.querySelector('.aboutImage img');
// Select About Section Image
let skillsSectionImage = document.querySelector('.skillsImage img');
// Check If There Is A Color In The Local Storage
if (primaryColor !== null) {
  // Change Main Color To Local Storage Color
  document.documentElement.style.setProperty('--primaryColor', primaryColor);
  // Remove Active Class From All Li
  document.querySelectorAll('.colorsList li').forEach((element) => {
    element.classList.remove('active');
    // Add Class Active To Li Depending On Data Color Attribute
    if (element.dataset.color === primaryColor) {
      element.classList.add('active');
    }
  });
  // Filter Color Name Without '#' From Localstorage
  let colorNameWithoutHash = primaryColor.split('#').pop();
  // Change About Image Src Attribute
  aboutSectionImage.src = 'images/about-' + colorNameWithoutHash + '.png';
  // Change Skills Image Src Attribute
  skillsSectionImage.src = 'images/skill-' + colorNameWithoutHash + '.png';
}

/* Switch Theme Color & Section Images */

// Get Color Option
const color = document.querySelectorAll('.colorsList li');
// For Every Color
color.forEach((li) => {
  // On Click
  li.addEventListener('click', (e) => {
    // Change Main Color Of This Color
    document.documentElement.style.setProperty('--primaryColor', e.target.dataset.color);
    // Set This Color To Local Storage
    localStorage.setItem('primaryColor', e.target.dataset.color);
    // Remove Active Class From All Li
    e.target.parentElement.querySelectorAll('.active').forEach((element) => {
      element.classList.remove('active');
    });
    // Add Active Class To This Li
    e.target.classList.add('active');
    // Filter Color Name Without '#' From Data Color
    let colorNameWithoutHash = e.target.dataset.color.split('#').pop();
    // Change About Image Src Attribute
    aboutSectionImage.src = 'images/about-' + colorNameWithoutHash + '.png';
    // Change Skills Image Src Attribute
    skillsSectionImage.src = 'images/skill-' + colorNameWithoutHash + '.png';
  });
});

// --------------------------------------------------------------------------------------------------

/* 
  ----------------------
  Settings Box Options
  ----------------------

*/

// Select Settings Box Toggler
let toggler = document.querySelector('.toggler');
// Select Settings Box Gear
let gear = document.querySelector('.gear');
// Select Settings Box
let settingsBox = document.querySelector('.settings');
// Add CSS Classes On Gear Click
toggler.onclick = function () {
  // Make Gear Rotate
  gear.classList.toggle('fa-spin');
  // Move Gear Right
  toggler.classList.toggle('toggleGear');
  // Open Settings Box
  settingsBox.classList.toggle('open');
};

/* Reset Button Functionality */

document.querySelector('button.reset').onclick = function () {
  // Clear All In Local Storage
  // localStorage.clear();

  // Remove Local Storage Items
  localStorage.removeItem('bulletsOption');
  localStorage.removeItem('randomBackground');
  localStorage.removeItem('primaryColor');
  window.location.reload();
};

// --------------------------------------------------------------------------------------------------

/* 
  ----------------------------------------------
  Random Header Background Every Period Of Time 
  ----------------------------------------------
*/

/* Check Local Storage For Random Background */

// Get Option Buttons
const randomeBackground = document.querySelectorAll('.option.background button');
// Random Option Is True By Default
let randomBackgroundOption = true;
let randomeBackgroundInterval;
// Get Local Storage Item
let randomBackgroundStorage = localStorage.getItem('randomBackground');
// Check If There IS A Color In The Local Storage
if (randomBackgroundStorage !== null) {
  if (randomBackgroundStorage === 'true') {
    randomBackgroundOption = true;
  } else {
    randomBackgroundOption = false;
  }

  randomeBackground.forEach((button) => {
    button.classList.remove('active');
    if (randomBackgroundStorage === 'true') {
      document.querySelector('.option.background .yes').classList.add('active');
    } else {
      document.querySelector('.option.background .no').classList.add('active');
    }
  });
}

/* Change Header Background */

// Select Header
let header = document.querySelector('.header');
// Images URL
let imagesArr = [
  'header-back-1.jpg',
  'header-back-2.png',
  'header-back-3.jpg',
  'header-back-4.jpg',
  'header-back-5.jpg',
];

// Change Background Function
function randomBackground() {
  if (randomBackgroundOption === true) {
    // Generate Randome Number Every 3 Seconds
    randomeBackgroundInterval = setInterval(() => {
      // Get Randome Number Of Array Index Image
      let randomImage = Math.floor(Math.random() * imagesArr.length);
      // Set Header Background Image Every 4 Secods
      header.style.backgroundImage = 'url(images/' + imagesArr[randomImage] + ')';
    }, 4000);
  }
}

// Trigger The Function
randomBackground();

/* Check Random Background Option */

// For Every Button
randomeBackground.forEach((button) => {
  // On Click
  button.addEventListener('click', (e) => {
    // Remove Active Class From All Buttons
    e.target.parentElement.querySelectorAll('.active').forEach((element) => {
      element.classList.remove('active');
    });
    // Add Active Class To This Button
    e.target.classList.add('active');
    // Check Option Value
    if (e.target.dataset.background === 'yes') {
      randomBackgroundOption = true;
      // Trigger The Function
      randomBackground();
      // Set This Option value To Local Storage
      localStorage.setItem('randomBackground', true);
    } else {
      randomBackgroundOption = false;
      clearInterval(randomeBackgroundInterval);
      // Set This Option value To Local Storage
      localStorage.setItem('randomBackground', false);
    }
  });
});

// --------------------------------------------------------------------------------------------------

/* 
  ----------------------------------
  Control Navigation Bullets Option
  ----------------------------------
*/

/* Check Navigation Bullets Option */

// Get Option Buttons
let navBullets = document.querySelectorAll('.option.bullets button');
let bulletsContainer = document.querySelector('.navbullets');
let bullets = localStorage.getItem('bulletsOption');

if (bullets !== null) {
  navBullets.forEach((button) => {
    button.classList.remove('active');
  });

  if (bullets === 'yes') {
    bulletsContainer.style.display = 'block';
    document.querySelector('.option.bullets .optionBtn.yes').classList.add('active');
  } else {
    bulletsContainer.style.display = 'none';
    document.querySelector('.option.bullets .optionBtn.no').classList.add('active');
  }
}

navBullets.forEach((button) => {
  button.addEventListener('click', (e) => {
    // Remove Active Class From All Buttons
    e.target.parentElement.querySelectorAll('.active').forEach((element) => {
      element.classList.remove('active');
    });
    // Add Active Class To This Button
    e.target.classList.add('active');
    if (button.dataset.bullet === 'yes') {
      bulletsContainer.style.display = 'block';
      localStorage.setItem('bulletsOption', e.target.dataset.bullet);
    } else {
      bulletsContainer.style.display = 'none';
      localStorage.setItem('bulletsOption', e.target.dataset.bullet);
    }
  });
});

/* Scroll To Section With Nav Bullets [jQuery Code] */

// On Click On Any Bullet
$('.navbullets .bullet').on('click', function () {
  // Add Active Class To Current Bullet And Remove It From Its Siblings
  $(this).addClass('active');
  $(this).siblings().removeClass('active');
  // Smooth Scrolling To Sections
  $('html, body').animate(
    {
      scrollTop: $('#' + $(this).data('nav')).offset().top,
    },
    1000
  );
});

// --------------------------------------------------------------------------------------------------

/* 
  ------------------------------------------
  Nav Links Active & Responsive State 
  -------------------------------------------
*/

let toggleNav = document.querySelector('.toggleNav');
let navLink = document.querySelector('.nav-links');
toggleNav.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle('active');
  navLink.classList.toggle('open');
};

navLink.onclick = function (e) {
  e.stopPropagation();
};

document.addEventListener('click', (e) => {
  if (e.target !== toggleNav && e.target !== navLink) {
    if (navLink.classList.contains('open')) {
      toggleNav.classList.toggle('active');
      navLink.classList.toggle('open');
    }
  }
});

/* Scroll To Section With Nav Links [jQuery Code] */

// On Click On Any Nav Link
$('.nav-links .link').on('click', function () {
  // Add Active Class To Current Bullet And Remove It From Its Siblings
  $(this).addClass('active');
  $(this).siblings().removeClass('active');
  // Smooth Scrolling To Sections
  $('html, body').animate(
    {
      scrollTop: $('#' + $(this).data('nav')).offset().top,
    },
    1000
  );
});

// --------------------------------------------------------------------------------------------------

/* 
  -----------------------------
  Animate Skills Progress Bars
  -----------------------------
*/

// Get Skills Container
let skillsSection = document.querySelector('.skills');
// On Windows Scroll
window.onscroll = function () {
  // Get The Top Offset Of Skills Container
  let skillsOffsetTop = skillsSection.offsetTop;
  // Get Outer Height Of Skills Container
  let skillsOuterHeight = skillsSection.offsetHeight;
  // Get Inner Height Of Window
  let windowHeight = this.innerHeight;
  // Get Current Scroll Top Value Of Window
  let windowScrollTop = this.pageYOffset;
  // Check For Reaching Skills Section
  if (windowScrollTop >= (skillsOffsetTop + skillsOuterHeight - windowHeight) / 1.3) {
    // Get Span Of Skills Progress
    let skillProgress = document.querySelectorAll('.skill .skill-progress span');
    // Set Span Width With Data Progress Value
    skillProgress.forEach((progress) => {
      progress.style.width = progress.dataset.progress;
    });
  }
};

// --------------------------------------------------------------------------------------------------

/* 
  ----------------------------
  Create Portfolio Image Popup
  ----------------------------
*/

/* Create PopUp Box With DOM */

// Get Images Gallery
let portfolioGallery = document.querySelectorAll('.portfolioGallery img');
// Loop Through Images
portfolioGallery.forEach((img) => {
  // On This Image Click
  img.addEventListener('click', (e) => {
    // Create Overlay
    let overlay = document.createElement('div');
    // Add Class To Overlay
    overlay.className = 'popupOverlay';
    // Append Overlay To Body
    document.body.appendChild(overlay);
    // Create Popup Box
    let popupBox = document.createElement('div');
    // Add Class To Popup Box
    popupBox.className = 'popupBox';
    // Check If Alt Image Is Not Null
    if (img.alt !== '') {
      // Add Title To This Popup Box
      let popupHeading = document.createElement('h2');
      // Add Class To Popup Heading
      popupHeading.className = 'popupHeading';
      // Add Image Alternative Text To Heading
      popupHeading.appendChild(document.createTextNode(img.alt));
      // Append Heading To Popup Box
      popupBox.appendChild(popupHeading);
    }
    // Create Popup Image
    let popupImage = document.createElement('img');
    // Change Image Source
    popupImage.src = img.src;
    // Append Image To Popup Box
    popupBox.appendChild(popupImage);
    // Append Popup Box To Body
    document.body.appendChild(popupBox);
    // Create Close Popup Box Span
    let popupClose = document.createElement('span');
    // Add Class To Popup Closing Span
    popupClose.className = 'popupClose';
    // Add Close Icon To Span
    popupClose.appendChild(document.createTextNode('x'));
    // Append Close Icon To Popup Box
    popupBox.appendChild(popupClose);
  });
});

/* Close Popup On Close Button Click */

document.addEventListener('click', function (e) {
  // If I Click On Close Button
  if (e.target.className === 'popupClose') {
    // Remove Popup Box
    e.target.parentNode.remove();
    // Remove Overlay
    document.querySelector('.popupOverlay').remove();
  }
});
