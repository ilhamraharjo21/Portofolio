// Console welcome
console.log("Welcome to my portfolio!");

// Load SVG dynamically on hover
document.querySelectorAll('.menu-container').forEach(container => {
    container.addEventListener('mouseenter', () => loadSVG(container));
    container.addEventListener('mouseleave', () => unloadSVG(container));
});

/**
 * Function to load SVG animation when hovered
 * @param {HTMLElement} container 
 */
function loadSVG(container) {
    const svgPlaceholder = container.querySelector('.svg-placeholder');
    const svgPath = container.getAttribute('data-svg');

    if (!svgPlaceholder.querySelector('object')) {
        const object = document.createElement('object');
        object.type = 'image/svg+xml';
        object.data = svgPath;
        object.width = 80;
        object.height = 40;
        svgPlaceholder.appendChild(object);
    }
}

/** 
 * Function to remove SVG when mouse leaves
 * @param {HTMLElement} container 
 */
function unloadSVG(container) {
    const svgPlaceholder = container.querySelector('.svg-placeholder');
    svgPlaceholder.innerHTML = '';
}

const homeSection = document.getElementById('home');
const homeBackground = document.getElementById('homeBackground');
const homeButton = document.querySelector('a[href="#home"]'); // Tombol Home dari menu
const svgPath = 'assets/svg/animation-home-background.svg';

let svgLoaded = false; // Flag apakah SVG sudah pernah load

// Saat hover pertama kali ke home section
homeSection.addEventListener('mouseenter', () => {
    if (!svgLoaded) {
        homeBackground.setAttribute('data', svgPath);
        svgLoaded = true;
    }
});

// Saat tombol Home diklik
homeButton.addEventListener('click', (e) => {
    e.preventDefault(); // Supaya tidak langsung lompat ke #home tanpa animasi

    // Reload ulang SVG
    homeBackground.removeAttribute('data'); // Hapus dulu
    setTimeout(() => {
        homeBackground.setAttribute('data', svgPath); // Set lagi (memicu reload)
    }, 100); // Delay sedikit supaya browser sempat reset

    // Scroll ke section Home
    document.getElementById('home').scrollIntoView({
        behavior: 'smooth' // Smooth scroll
    });

    svgLoaded = true; // Tetap tandai sudah load
});

const aboutLink = document.querySelector('a[href="#about"]');
const aboutSection = document.getElementById('about');

if (aboutLink && aboutSection) {
  aboutLink.addEventListener('click', function(event) {
    event.preventDefault(); // Stop default jump
    
    const targetPosition = aboutSection.offsetTop - 245; // Scroll ke atas About Me, tapi offset -100px
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  });
}

// Cek apakah elemen sudah masuk ke viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= window.innerHeight * 0.8 // 80% bagian bawah viewport
    );
  }
  
  // Pilih elemen about-text
  const aboutText = document.querySelector('.about-text');
  
  // Event saat scroll
  window.addEventListener('scroll', () => {
    if (isInViewport(aboutText)) {
      aboutText.classList.add('active');
    }
  });
  
  // Fungsi cek apakah about-text di dalam layar
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top <= window.innerHeight * 0.8;
}

// Event scroll biasa
window.addEventListener('scroll', () => {
  if (isInViewport(aboutText)) {
    aboutText.classList.add('active');
  }
});

// Event klik di tombol About Me
aboutLink.addEventListener('click', () => {
  // Hapus class animasi
  aboutText.classList.remove('active');

  // Tunggu sebentar supaya browser reset, lalu jalankan lagi animasi
  setTimeout(() => {
    aboutText.classList.add('active');
  }, 300); // 300ms delay untuk memastikan animasi bisa retrigger
});

const svgWrapper = document.getElementById('svgWrapper');
const svg1 = "assets/svg/sailapp-banner.svg";
const svg2 = "assets/svg/sailapp-banner2.svg";

let currentSvg = svg1;

svgWrapper.addEventListener('click', function() {
  // Toggle file path
  currentSvg = (currentSvg === svg1) ? svg2 : svg1;
  
  // Ganti isi wrapper
  svgWrapper.innerHTML = `
    <object data="${currentSvg}" type="image/svg+xml" class="svg-object"></object>
  `;
});

// Animasi project card saat scroll
const projectCards = document.querySelectorAll('.project-card');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show-card');
    }
  });
}, {
  threshold: 0.3 // Card muncul 30% terlihat
});

// Pasangkan observer ke semua project-card
projectCards.forEach(card => {
  observer.observe(card);
});

function switchSVGforMobile() {
  const isMobile = window.innerWidth <= 1024;

  const fg = document.getElementById("foregroundSVG");
  const bg = document.getElementById("backgroundSVG");

  if (fg && bg) {
    fg.setAttribute("data", isMobile 
      ? "assets/svg/mobile-aboutme-foreground.svg" 
      : "assets/svg/animation-aboutme-foreground.svg");

    bg.setAttribute("data", isMobile 
      ? "assets/svg/mobile-aboutme-background.svg" 
      : "assets/svg/animation-aboutme-background.svg");
  }
}

// Panggil saat halaman load dan saat resize
window.addEventListener("load", switchSVGforMobile);
window.addEventListener("resize", switchSVGforMobile);
