// DOM Elements
const dom = {
  header: document.getElementById('header'),
  navLinks: document.querySelectorAll('.nav-link'),
  menuToggle: document.querySelector('.menu-toggle'),
  navLinksContainer: document.querySelector('.nav-links'),
  themeToggle: document.getElementById('theme-toggle'),
  backToTop: document.querySelector('.back-to-top'),
  skillTabs: document.querySelectorAll('.skill-tab'),
  contactForm: document.getElementById('contactForm'),
  projectsGrid: document.querySelector('.projects-grid'),
  skillsContainer: document.querySelector('.skills-container'),
  contributionCells: document.querySelector('.contribution-cells'),
  socialLinks: document.querySelectorAll('.social-link')
};

// Data
const data = {
  projects: [
    {
      id: 1,
      title: 'Aplikasi Studi Islam',
      description: 'Aplikasi berbasis Java untuk membantu pembelajaran Studi Islam dengan fitur kuis interaktif dan materi pembelajaran. Menggunakan Java Swing untuk antarmuka grafis dan implementasi OOP untuk manajemen data.',
      image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      technologies: ['Java', 'Swing', 'OOP'],
      githubLink: 'https://github.com/IzazTsany14/UTS-Metodologi-Studi-Islam',
    },
    {
      id: 2,
      title: 'Netfast Project',
      description: 'Website statis untuk perusahaan penyedia layanan internet. Menampilkan informasi layanan, paket harga, dan formulir kontak. Dibangun menggunakan HTML, CSS, dan JavaScript untuk pengalaman pengguna yang responsif.',
      image: 'gambar/netfast.png',
      technologies: ['Python', 'Django', 'HTML', 'CSS', 'JavaScript','MySQL'],
      githubLink: 'https://github.com/IzazTsany14/project_Basis_Data',
    },
    {
      id: 3,
      title: 'Sistem Penyewaan Villa',
      description: 'Aplikasi Java untuk mengelola penyewaan villa dengan fitur booking, pembayaran, dan laporan penyewaan. Implementasi konsep OOP untuk manajemen data villa dan transaksi.',
      image: 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      technologies: ['Java', 'OOP', 'File Management'],
      githubLink: 'https://github.com/IzazTsany14/Penyewaan-VIlla',
    },
    {
      id: 4,
      title: 'Cafe Zayyani',
      description: 'Aplikasi berbasis Java untuk manajemen data akademik mahasiswa, termasuk nilai, jadwal, dan administrasi. Menggunakan prinsip OOP dan file handling untuk penyimpanan data.',
      image: 'gambar/cafe.png',
      technologies: ['Java', 'OOP', 'Springboot'],
      githubLink: 'https://github.com/IzazTsany14/UAS-Pemrograman-Berbasis-Objek',
    },
  ],
  skills: [
    { name: 'Java', level: 85, category: 'language' },
    { name: 'Python', level: 75, category: 'language' },
    { name: 'JavaScript', level: 65, category: 'language' },
    { name: 'HTML/CSS', level: 80, category: 'language' },
    { name: 'SQL', level: 60, category: 'language' },
    { name: 'Git', level: 75, category: 'tool' },
    { name: 'VS Code', level: 90, category: 'tool' },
    { name: 'IntelliJ IDEA', level: 65, category: 'tool' },
    { name: 'Figma', level: 50, category: 'tool' },
    { name: 'Object-Oriented Programming', level: 85, category: 'concept' },
    { name: 'Data Structures & Algorithms', level: 70, category: 'concept' },
    { name: 'Database Design', level: 65, category: 'concept' },
    { name: 'UI/UX Principles', level: 55, category: 'concept' },
  ]
};

// Initialize the application
function init() {
  loadThemePreference();
  loadProjects();
  loadSkills('all');
  generateContributionGraph();
  checkScrollPosition();
  updateSocialLinks();
  setupEventListeners();
}

// Theme functions
function loadThemePreference() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
    dom.themeToggle.checked = true;
  }
}

function toggleTheme() {
  if (dom.themeToggle.checked) {
    document.body.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
  }
}

// Project functions
function loadProjects() {
  if (!dom.projectsGrid) return;
  
  dom.projectsGrid.innerHTML = data.projects.map(project => `
    <div class="project-card">
      <div class="project-image">
        <img src="${project.image}" alt="${project.title}" loading="lazy">
      </div>
      <div class="project-content">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-tech">
          ${project.technologies.map(tech => `<span class="project-tech-item">${tech}</span>`).join('')}
        </div>
        <div class="project-links">
          ${project.githubLink ? `<a href="${project.githubLink}" target="_blank" rel="noopener noreferrer" class="project-link"><i class="fab fa-github"></i> GitHub</a>` : ''}
          ${project.demoLink ? `<a href="${project.demoLink}" target="_blank" rel="noopener noreferrer" class="project-link"><i class="fas fa-external-link-alt"></i> Demo</a>` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

// Skill functions
function loadSkills(category) {
  if (!dom.skillsContainer) return;
  
  const filteredSkills = category === 'all' 
    ? data.skills 
    : data.skills.filter(skill => skill.category === category);
  
  dom.skillsContainer.innerHTML = filteredSkills.map(skill => `
    <div class="skill-item ${skill.category}">
      <div class="skill-info">
        <span class="skill-name">${skill.name}</span>
        <span class="skill-level">${skill.level}%</span>
      </div>
      <div class="skill-bar">
        <div class="skill-progress" data-level="${skill.level}"></div>
      </div>
    </div>
  `).join('');
  
  setTimeout(animateSkillBars, 300);
}

function animateSkillBars() {
  document.querySelectorAll('.skill-progress').forEach(bar => {
    bar.style.width = `${bar.dataset.level}%`;
  });
}

function animateSkillBarsOnScroll() {
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;
  
  const sectionPosition = skillsSection.getBoundingClientRect();
  const screenPosition = window.innerHeight;
  
  if (sectionPosition.top < screenPosition && sectionPosition.bottom > 0) {
    animateSkillBars();
  }
}

// Contribution graph functions
function generateContributionGraph() {
  if (!dom.contributionCells) return;
  
  dom.contributionCells.innerHTML = Array.from({ length: 364 }, () => {
    const level = Math.floor(Math.random() * 5);
    return `<div class="contribution-cell level-${level}"></div>`;
  }).join('');
}

// Navigation functions
function toggleMobileMenu() {
  dom.menuToggle.classList.toggle('active');
  dom.navLinksContainer.classList.toggle('active');
}

function closeMobileMenu() {
  dom.menuToggle.classList.remove('active');
  dom.navLinksContainer.classList.remove('active');
}

function checkScrollPosition() {
  const sections = document.querySelectorAll('section');
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    const sectionId = section.getAttribute('id');
    
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = sectionId;
    }
  });
  
  dom.navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
  });
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    window.scrollTo({
      top: section.offsetTop - 80,
      behavior: 'smooth'
    });
  }
}

// Social media functions
function updateSocialLinks() {
  const socialLinks = {
    instagram: 'https://www.instagram.com/sani_rsmawan/',
    linkedin: 'https://www.linkedin.com/in/izaz-tsany-ab4609331/'
  };
  
  dom.socialLinks.forEach(link => {
    if (link.classList.contains('instagram')) {
      link.href = socialLinks.instagram;
    } else if (link.classList.contains('linkedin')) {
      link.href = socialLinks.linkedin;
    }
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });
}

// Form handling
function handleFormSubmit(e) {
  e.preventDefault();
  const formData = new FormData(dom.contactForm);
  const name = formData.get('name');
  
  if (!name || !formData.get('email') || !formData.get('subject') || !formData.get('message')) {
    alert('Mohon isi semua field.');
    return;
  }
  
  alert(`Terima kasih ${name}! Pesan Anda telah terkirim.`);
  dom.contactForm.reset();
}

// Event listeners setup
function setupEventListeners() {
  // Window events
  window.addEventListener('scroll', () => {
    dom.header.classList.toggle('sticky', window.scrollY > 50);
    dom.backToTop.classList.toggle('active', window.scrollY > 500);
    checkScrollPosition();
    animateSkillBarsOnScroll();
  });
  
  // Theme toggle
  dom.themeToggle.addEventListener('change', toggleTheme);
  
  // Mobile menu
  dom.menuToggle.addEventListener('click', toggleMobileMenu);
  dom.navLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
  
  // Skill tabs
  dom.skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      dom.skillTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      loadSkills(tab.dataset.category);
    });
  });
  
  // Back to top
  dom.backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  // Contact form
  if (dom.contactForm) {
    dom.contactForm.addEventListener('submit', handleFormSubmit);
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);