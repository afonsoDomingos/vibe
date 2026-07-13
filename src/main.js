import * as THREE from 'three';
import { gsap } from 'gsap';
import Lenis from 'lenis';

// Translations Dictionary
const TRANSLATIONS = {
  pt: {
    doc_title: "VIBE — Portfólio de Desenvolvedor Criativo",
    preload_subtitle: "INICIALIZANDO ESPAÇO DE TRABALHO",
    preload_status: "CARREGANDO COMPONENTES_SISTEMA",
    cursor_label: "VER",
    nav_works: "Trabalhos em Destaque",
    nav_archive: "Arquivo",
    nav_services: "Serviços",
    nav_about: "Sobre",
    nav_admin: "Admin",
    btn_dimensions: "Dimensões",
    badge_available: "Disponível Set. 2026",
    email_tooltip: "Clique para copiar o email",
    sidebar_creator: "CRIADOR",
    sidebar_role: "Desenvolvedor Criativo",
    sidebar_collection: "COLEÇÃO",
    sidebar_issue: "Edição N°003 / Col. 2026",
    canvas_instruction: "ARRASTE PARA ROTACIONAR • CLIQUE NAS IMAGENS PARA EXPLORAR",
    status_loading: "Carregando...",
    archive_title: "ARQUIVO",
    table_year: "ANO",
    table_project: "PROJETO",
    table_role: "FUNÇÃO",
    table_tech: "TECNOLOGIA",
    table_link: "LINK",
    table_link_text: "Explorar ↗",
    status_loading_projects: "Carregando projetos...",
    about_subtitle: "SOBRE O CRIATIVO",
    about_tagline: "Criando experiências interativas de alta fidelidade e focadas em animação.",
    about_bio_1: "Como desenvolvedor criativo independente, foco em aproximar o design e a engenharia. Ao utilizar animações avançadas, cenas 3D em WebGL e layouts rígidos no estilo suíço, crio experiências digitais que deixam uma marca duradoura.",
    about_bio_2: "Através de grelhas disciplinadas, hierarquia tipográfica e interações físicas responsivas, o meu trabalho procura ser premium, leve e interativo.",
    about_expertise_title: "ESPECIALIDADES",
    about_exp_1: "Desenvolvimento Criativo",
    about_exp_2: "Animações Avançadas de CSS e GSAP",
    about_exp_3: "Design de Experiência Interativa",
    about_awards_title: "PRÊMIOS & RECONHECIMENTOS",
    about_award_1: "Awwwards Site do Dia (2026)",
    about_award_2: "Prêmio de Desenvolvedor (Nota 7.53)",
    about_contact_label: "ENTRE EM CONTATO",
    admin_login_title: "AUTENTICAR SISTEMA",
    admin_login_subtitle: "Acesso ao Espaço de Trabalho do Administrador VIBE",
    admin_login_user_label: "ID DO SISTEMA",
    admin_login_pass_label: "SENHA DE ACESSO",
    admin_login_error: "Credenciais do Sistema Inválidas.",
    admin_login_btn: "INICIALIZAR ACESSO",
    admin_dash_title: "CONTROLE DO SISTEMA",
    admin_dash_subtitle: "Configurar banco de dados dos projetos do portfólio",
    admin_dash_logout: "TERMINAR ACESSO",
    admin_form_title_add: "ADICIONAR NOVO PORTFÓLIO",
    admin_form_title_edit: "EDITAR PORTFÓLIO",
    admin_form_name: "NOME DO PROJETO",
    admin_form_slug: "SLUG DA URL",
    admin_form_year: "ANO",
    admin_form_color: "COR DE DESTAQUE",
    admin_form_role: "FUNÇÃO DE DESENVOLVIMENTO",
    admin_form_tech: "TECNOLOGIAS USADAS",
    admin_form_description: "DESCRIÇÃO DO PROJETO",
    admin_form_link: "LINK EXTERNO",
    admin_form_image: "ARQUIVO DE IMAGEM DE CAPA (MÁX 5MB)",
    admin_form_image_help: "Selecione uma imagem de capa JPG/PNG",
    admin_form_btn_commit: "SALVAR NA BASE DE DADOS",
    admin_form_btn_update: "ATUALIZAR BASE DE DADOS",
    admin_form_btn_cancel: "CANCELAR EDIÇÃO",
    admin_table_title: "PROJETOS NA BASE DE DADOS",
    admin_table_header_name: "NOME",
    admin_table_header_year: "ANO",
    admin_table_header_actions: "AÇÕES",
    admin_form_error_generic: "Ocorreu um erro.",
    admin_form_success_generic: "Projeto salvo com sucesso!",
    email_copied_msg: "Email copiado!",
    click_copy_msg: "Clique para copiar o email",
    btn_open_project: "ABRIR PROJETO",
    overlay_project_details: "DETALHES DO PROJETO",
    overlay_title: "TRABALHOS SELECIONADOS",
    btn_discover_more: "DESCOBRIR MAIS"
  },
  en: {
    doc_title: "VIBE — Creative Developer Portfolio",
    preload_subtitle: "INITIALIZING WORKSPACE",
    preload_status: "LOADING SYSTEM_ASSETS",
    cursor_label: "VIEW",
    nav_works: "Featured Works",
    nav_archive: "Archive",
    nav_services: "Services",
    nav_about: "About",
    nav_admin: "Admin",
    btn_dimensions: "Dimensions",
    badge_available: "Available Sept. 2026",
    email_tooltip: "Click to copy email",
    sidebar_creator: "CREATOR",
    sidebar_role: "Creative Developer",
    sidebar_collection: "COLLECTION",
    sidebar_issue: "Issue N°003 / Coll. 2026",
    canvas_instruction: "DRAG TO ROTATE • CLICK IMAGES TO EXPLORE",
    status_loading: "Loading...",
    archive_title: "ARCHIVE",
    table_year: "YEAR",
    table_project: "PROJECT",
    table_role: "ROLE",
    table_tech: "TECHNOLOGY",
    table_link: "LINK",
    table_link_text: "Explore ↗",
    status_loading_projects: "Loading projects...",
    about_subtitle: "ABOUT THE CREATIVE",
    about_tagline: "Crafting high-fidelity, animation-driven interactive experiences.",
    about_bio_1: "As an independent creative developer, I focus on bridging the gap between design and engineering. By utilizing advanced animations, 3D WebGL scenes, and strict Swiss layouts, I create digital experiences that leave a lasting impression.",
    about_bio_2: "Through disciplined grids, typographic hierarchy, and responsive physical interactions, my work aims to feel premium, lightweight, and interactive.",
    about_expertise_title: "EXPERTISE",
    about_exp_1: "Creative Development",
    about_exp_2: "Advanced CSS & GSAP Animations",
    about_exp_3: "Interactive Experience Design",
    about_awards_title: "AWARDS & RECOGNITIONS",
    about_award_1: "Awwwards Site of the Day (2026)",
    about_award_2: "Developer Award (Score 7.53)",
    about_contact_label: "GET IN TOUCH",
    admin_login_title: "AUTHENTICATE SYSTEM",
    admin_login_subtitle: "VIBE Admin Workspace Access",
    admin_login_user_label: "SYSTEM ID",
    admin_login_pass_label: "ACCESS PASSWORD",
    admin_login_error: "Invalid System Credentials.",
    admin_login_btn: "INITIALIZE ACCESS",
    admin_dash_title: "SYSTEM CONTROL",
    admin_dash_subtitle: "Configure portfolio projects databases",
    admin_dash_logout: "TERMINATE ACCESS",
    admin_form_title_add: "ADD NEW PORTFOLIO",
    admin_form_title_edit: "EDIT PORTFOLIO",
    admin_form_name: "PROJECT NAME",
    admin_form_slug: "URL SLUG",
    admin_form_year: "YEAR",
    admin_form_color: "ACCENT COLOR",
    admin_form_role: "DEVELOPMENT ROLE",
    admin_form_tech: "TECHNOLOGY STACK",
    admin_form_description: "PROJECT DESCRIPTION",
    admin_form_link: "EXTERNAL LINK",
    admin_form_image: "IMAGE COVER FILE (MAX 5MB)",
    admin_form_image_help: "Select a JPG/PNG image cover",
    admin_form_btn_commit: "COMMIT TO DATABASE",
    admin_form_btn_update: "UPDATE DATABASE",
    admin_form_btn_cancel: "CANCEL EDIT",
    admin_table_title: "DATABASE PROJECTS",
    admin_table_header_name: "NAME",
    admin_table_header_year: "YEAR",
    admin_table_header_actions: "ACTIONS",
    admin_form_error_generic: "An error occurred.",
    admin_form_success_generic: "Project saved successfully!",
    email_copied_msg: "Email copied!",
    click_copy_msg: "Click to copy email",
    btn_open_project: "OPEN PROJECT",
    overlay_project_details: "PROJECT DETAILS",
    overlay_title: "SELECTED WORKS",
    btn_discover_more: "DISCOVER MORE"
  }
};

// Global Data variables
let projectsData = [];
let servicesData = [];
let currentLang = 'pt';
const DEFAULT_COLOR = '#ff3a00';
let editServiceId = null;
const getBaseCameraZ = () => window.innerWidth <= 768 ? 4.3 : 5.2;

// Zoom timers and active selections
let zoomTimeout = null;
let activeProject = null;

// fallback local mock data in case API fails
const FALLBACK_PROJECTS = [
  { id: 0, name: 'Moving Portraits', slug: 'moving-portraits', image: '/images/moving-portraits.png', color: '#ff3a00', year: '2026', role: 'Creative Director & WebGL', technology: 'Three.js, GLSL, GSAP', description: 'Um projeto experimental de WebGL que explora a interatividade com retratos tridimensionais físicos, integrando shaders personalizados e ScrollTrigger.', link: '#' },
  { id: 1, name: 'Issey Miyake SS25', slug: 'issey-miyake-ss25', image: '/images/issey-miyake.png', color: '#ff3a00', year: '2025', role: 'Interactive Engineer', technology: 'WebGL, Vanilla JS, CSS3D', description: 'Desenvolvimento de uma vitrine digital 3D imersiva para a coleção de primavera/verão 2025 da Issey Miyake, com transições físicas interativas.', link: '#' },
  { id: 2, name: 'Studies in Motion', slug: 'studies-in-motion', image: '/images/studies-in-motion.png', color: '#ff3a00', year: '2025', role: 'Motion Lead', technology: 'GSAP ScrollTrigger, Lenis', description: 'Uma exploração detalhada sobre os princípios de animação web contemporâneos utilizando rolagem suave Lenis e timelines avançadas do GSAP.', link: '#' },
  { id: 3, name: 'Ruby Campbell', slug: 'ruby-campbell', image: '/images/ruby-campbell.png', color: '#ff3a00', year: '2024', role: 'Fullstack Developer', technology: 'SvelteKit, Node.js, GSAP', description: 'Plataforma de portfólio de alta fidelidade desenvolvida para a modelo britânica Ruby Campbell, focando em performance impecável e design editorial.', link: '#' },
  { id: 4, name: 'Shaped by Earth', slug: 'shaped-by-earth', image: '/images/shaped-by-earth.png', color: '#ff3a00', year: '2024', role: '3D Developer', technology: 'Three.js, Blender, GSAP', description: 'Uma jornada visual e interativa em 3D sobre a erosão natural da terra, combinando modelos otimizados no Blender e interações em tempo real com Three.js.', link: '#' },
  { id: 5, name: 'Echoes in Light', slug: 'echoes-in-light', image: '/images/echoes-in-light.png', color: '#ff3a00', year: '2023', role: 'Creative Technologist', technology: 'Canvas2D, Custom WebAudio', description: 'Uma instalação interativa audiovisual gerada em tempo real no Canvas 2D utilizando dados de frequência da Web Audio API.', link: '#' }
];

// App State
let lenis;
let activeSection = 'works';
let isGridActive = false;

// Custom Cursor Setup
const cursor = document.getElementById('custom-cursor');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (!isTouchDevice) {
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    const ease = 0.15;
    cursorX += (mouseX - cursorX) * ease;
    cursorY += (mouseY - cursorY) * ease;
    
    if (cursor) {
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    }
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
} else {
  if (cursor) cursor.style.display = 'none';
}

function setupCursorHovers() {
  if (isTouchDevice) return;
  const clickables = document.querySelectorAll('a, button, .availability, .nav-link, .marquee-link, input, select');
  clickables.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
  });
}

// Fetch Projects from API
async function fetchProjects() {
  try {
    const response = await fetch('/api/projects');
    if (!response.ok) throw new Error('API server unreachable');
    projectsData = await response.json();
    if (projectsData.length === 0) {
      projectsData = FALLBACK_PROJECTS;
    }
  } catch (err) {
    console.warn('API error, falling back to local projects data:', err.message);
    projectsData = FALLBACK_PROJECTS;
  }
}

// Fetch Services from API
async function fetchServices() {
  try {
    const response = await fetch('/api/services');
    if (!response.ok) throw new Error('API server unreachable');
    servicesData = await response.json();
  } catch (err) {
    console.warn('API error, falling back to local services data:', err.message);
    servicesData = [];
  }
}

// Populate Services in About page
function populateServicesUI() {
  const list = document.getElementById('about-services-list');
  if (!list) return;

  list.innerHTML = '';
  if (servicesData.length === 0) {
    list.innerHTML = `
      <li data-i18n="about_exp_1">${TRANSLATIONS[currentLang].about_exp_1 || 'Desenvolvimento Criativo'}</li>
      <li>WebGL / Three.js / GLSL</li>
      <li data-i18n="about_exp_2">${TRANSLATIONS[currentLang].about_exp_2 || 'Animações Avançadas de CSS e GSAP'}</li>
      <li data-i18n="about_exp_3">${TRANSLATIONS[currentLang].about_exp_3 || 'Design de Experiência Interativa'}</li>
    `;
    return;
  }

  servicesData.forEach(service => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${service.title}</strong>${service.description ? ` — ${service.description}` : ''}`;
    list.appendChild(li);
  });
  setupCursorHovers();
}

// Populate UI (Marquee list & Archive Table)
function populateUI() {
  // 1. Works Marquee
  const worksListUl = document.getElementById('works-list-ul');
  if (worksListUl) {
    worksListUl.innerHTML = '';
    const repeatCount = projectsData.length < 4 ? 3 : 2;
    for (let loop = 0; loop < repeatCount; loop++) {
      projectsData.forEach((project, index) => {
        const li = document.createElement('li');
        li.className = 'marquee-item';
        li.setAttribute('data-index', index);
        
        const a = document.createElement('a');
        a.href = project.link || '#';
        a.className = 'marquee-link';
        
        const pascalName = project.name
          .replace(/[^a-zA-Z0-9\s-]/g, '')
          .split(/[\s-]+/)
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join('');
        a.innerHTML = `<span class="code-punct">&lt;</span><span class="code-component">${pascalName}</span> <span class="code-attr">status</span><span class="code-punct">=</span><span class="code-string">"active"</span><span class="code-punct"> /&gt;</span>`;
        
        li.appendChild(a);
        worksListUl.appendChild(li);
      });
    }
  }

  // 2. Archive Table
  const archiveTableBody = document.getElementById('archive-table-body');
  if (archiveTableBody) {
    archiveTableBody.innerHTML = '';
    projectsData.forEach((project) => {
      const tr = document.createElement('tr');
      tr.className = 'archive-row';
      tr.setAttribute('data-image', project.image);
      
      tr.innerHTML = `
        <td>${project.year}</td>
        <td class="project-name">
          ${project.name}
          <div class="project-mobile-details">
            <span>${project.role}</span>
            <span class="divider-dot">•</span>
            <span>${project.technology}</span>
          </div>
        </td>
        <td class="desktop-only">${project.role}</td>
        <td class="desktop-only">${project.technology}</td>
        <td><a href="${project.link}" target="_blank" class="archive-link">${TRANSLATIONS[currentLang].table_link_text}</a></td>
      `;
      archiveTableBody.appendChild(tr);
    });
  }

  setupCursorHovers();
}

// Language Switcher Logic
function initTranslationEngine() {
  const langToggle = document.getElementById('lang-toggle');

  currentLang = localStorage.getItem('vibe_lang') || 'pt';
  updateTranslations();

  if (langToggle) {
    langToggle.addEventListener('click', () => {
      currentLang = currentLang === 'pt' ? 'en' : 'pt';
      localStorage.setItem('vibe_lang', currentLang);
      updateTranslations();
      populateUI(); // Refresh static text links generated in tables
      populateServicesUI();
      setupMarqueeHoverTriggers();
    });
  }
}

function updateTranslations() {
  const langToggleText = document.getElementById('lang-toggle-text');
  if (langToggleText) {
    langToggleText.textContent = currentLang === 'pt' ? 'EN' : 'PT';
  }

  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = TRANSLATIONS[currentLang][key];
    
    if (translation) {
      if (el.tagName === 'TITLE') {
        document.title = translation;
      } else {
        el.textContent = translation;
      }
    }
  });
}

// Preloader Progress
function initPreloader() {
  const progressBar = document.getElementById('preloader-bar');
  const percentageText = document.getElementById('preloader-percentage');
  const preloader = document.getElementById('preloader');
  const logText = document.getElementById('preloader-log');
  
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 5) + 1;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      
      if (logText) {
        logText.textContent = currentLang === 'pt' ? '> SISTEMA PRONTO.' : '> SYSTEM READY.';
      }
      
      gsap.to(preloader, {
        opacity: 0,
        duration: 1.0,
        ease: 'power3.inOut',
        onComplete: () => {
          preloader.classList.add('fade-out');
          revealHero();
        }
      });
    }
    
    if (progressBar) progressBar.style.width = `${progress}%`;
    if (percentageText) {
      percentageText.textContent = progress.toString().padStart(3, '0');
    }
    
    // Dynamically update terminal-style logs in current language
    if (logText && progress < 100) {
      if (currentLang === 'pt') {
        if (progress < 15) logText.textContent = '> INICIALIZANDO NÚCLEO...';
        else if (progress < 35) logText.textContent = '> CONECTANDO AO BANCO DE DADOS...';
        else if (progress < 55) logText.textContent = '> CARREGANDO ELEMENTOS WebGL...';
        else if (progress < 75) logText.textContent = '> IMPORTANDO TEXTURAS sRGB...';
        else if (progress < 90) logText.textContent = '> CALIBRANDO RENDERIZADOR 3D...';
        else logText.textContent = '> SINCRONIZANDO ANIMAÇÕES...';
      } else {
        if (progress < 15) logText.textContent = '> INITIALIZING CORE ENGINE...';
        else if (progress < 35) logText.textContent = '> CONNECTING TO DATABASE...';
        else if (progress < 55) logText.textContent = '> LOADING WebGL ELEMENTS...';
        else if (progress < 75) logText.textContent = '> IMPORTING sRGB TEXTURES...';
        else if (progress < 90) logText.textContent = '> CALIBRATING 3D RENDERER...';
        else logText.textContent = '> SYNCHRONIZING TIMELINES...';
      }
    }
  }, 40);
}

function revealHero() {
  gsap.fromTo('#bg-lettering', 
    { opacity: 0, y: 100, scale: 0.9 },
    { opacity: 0.15, y: 0, scale: 1, duration: 1.5, ease: 'power4.out' }
  );

  gsap.from('.works-sidebar > *', {
    opacity: 0,
    y: 30,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out'
  });

  gsap.from('.marquee-item', {
    opacity: 0,
    x: 50,
    duration: 1,
    stagger: 0.03,
    ease: 'power3.out',
    delay: 0.2
  });

  gsap.from('#canvas-container', {
    opacity: 0,
    scale: 0.95,
    duration: 1.5,
    ease: 'power3.out',
    delay: 0.4
  });
}

// SPA Section Routing
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link, .logo__link');
  const sections = document.querySelectorAll('.section-view');
  const bgLettering = document.getElementById('bg-lettering');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-section');
      
      if (target === 'services') {
        const overlay = document.getElementById('request-overlay');
        const form = document.getElementById('client-request-form');
        const errorText = document.getElementById('req-form-error');
        const successText = document.getElementById('req-form-success');
        const domainPricing = document.getElementById('domain-pricing-container');
        
        if (overlay) {
          overlay.classList.remove('hidden');
          populateRequestServiceDropdown();
          if (errorText) errorText.style.display = 'none';
          if (successText) successText.style.display = 'none';
          if (form) form.reset();
          if (domainPricing) domainPricing.classList.add('hidden');
        }
        return;
      }

      const sectionToActivate = target;

      if (sectionToActivate === activeSection) {
        return;
      }

      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      const activeNav = document.querySelector(`.nav-link[data-section="${target}"]`);
      if (activeNav) activeNav.classList.add('active');

      let letteringText = 'FW';
      if (sectionToActivate === 'archive') letteringText = 'AR';
      if (sectionToActivate === 'about') letteringText = 'AB';
      if (sectionToActivate === 'admin') letteringText = 'AD';

      gsap.to(bgLettering, {
        opacity: 0,
        y: -50,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          bgLettering.textContent = letteringText;
          gsap.to(bgLettering, {
            opacity: 0.15,
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
          });
        }
      });

      const currentSec = document.querySelector(`.section-view.active`);
      const targetSec = document.getElementById(`section-${sectionToActivate}`);

      gsap.to(currentSec, {
        opacity: 0,
        scale: 0.97,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          currentSec.classList.remove('active');
          targetSec.classList.add('active');
          
          gsap.fromTo(targetSec, 
            { opacity: 0, scale: 1.03 },
            { 
              opacity: 1, 
              scale: 1, 
              duration: 0.8, 
              ease: 'power3.out',
              onComplete: () => {
                if (isServicesLink) {
                  const servicesList = document.getElementById('about-services-list');
                  const aboutSection = document.getElementById('section-about');
                  if (aboutSection && servicesList) {
                    aboutSection.scrollTo({
                      top: servicesList.getBoundingClientRect().top + aboutSection.scrollTop - 140,
                      behavior: 'smooth'
                    });
                  }
                }
              }
            }
          );
        }
      });

      activeSection = sectionToActivate;
      
      if (sectionToActivate === 'admin') {
        checkAdminSession();
      }
    });
  });
}

// Dimensions Helper (Alt+G)
function initGridHelper() {
  const gridHelper = document.getElementById('grid-helper');
  const gridToggleBtn = document.getElementById('grid-toggle');
  const dimensionsDisplay = document.getElementById('screen-dimensions-display');

  function toggleGrid() {
    isGridActive = !isGridActive;
    gridHelper.classList.toggle('active', isGridActive);
    gridToggleBtn.classList.toggle('active', isGridActive);
  }

  if (gridToggleBtn) {
    gridToggleBtn.addEventListener('click', toggleGrid);
  }
  
  window.addEventListener('keydown', (e) => {
    if (e.altKey && (e.key === 'g' || e.key === 'G')) {
      e.preventDefault();
      toggleGrid();
    }
  });

  function updateDimensions() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    if (dimensionsDisplay) {
      dimensionsDisplay.textContent = `${width}px × ${height}px`;
    }
    
    const maxCoord = document.querySelector('.grid-coordinate.bottom-right');
    if (maxCoord) {
      maxCoord.textContent = `${width},${height}`;
    }
  }

  updateDimensions();
  window.addEventListener('resize', updateDimensions);
}

// Copy Availability Email
function initAvailability() {
  const badge = document.getElementById('availability-badge');
  const tooltip = document.getElementById('email-tooltip');
  const email = 'hello@vibe.dev';

  if (badge) {
    badge.addEventListener('click', () => {
      navigator.clipboard.writeText(email).then(() => {
        badge.classList.add('copied');
        tooltip.textContent = TRANSLATIONS[currentLang].email_copied_msg;
        
        setTimeout(() => {
          badge.classList.remove('copied');
          tooltip.textContent = TRANSLATIONS[currentLang].click_copy_msg;
        }, 2000);
      });
    });
  }
}

// Three.js Scene globals
let scene, camera, renderer;
let cubeGroup;
let panels = [];
let textures = [];
let maxAnisotropy = 1;
const textureLoader = new THREE.TextureLoader();

// THREE.JS 3D CANVAS BUILDER
function initThreeCanvas() {
  const container = document.getElementById('canvas-container');
  const canvas = document.getElementById('cube-canvas');
  if (!container || !canvas) return;

  scene = new THREE.Scene();
  
  camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.z = getBaseCameraZ();

  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  // Read GPU max anisotropy for high-quality texture filtering
  maxAnisotropy = renderer.capabilities.getMaxAnisotropy();

  buildThreeCubeGroup();

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  let targetRotationX = -0.3;
  let targetRotationY = 0.5;

  let autoRotateSpeedX = 0.002;
  let autoRotateSpeedY = 0.003;

  const onPointerDown = (e) => {
    isDragging = true;
    previousMousePosition = { x: e.clientX, y: e.clientY };
  };

  const onPointerMove = (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    if (isDragging) {
      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y
      };

      const sensitivity = 0.005;
      targetRotationY += deltaMove.x * sensitivity;
      targetRotationX += deltaMove.y * sensitivity;

      previousMousePosition = { x: e.clientX, y: e.clientY };
      autoRotateSpeedX = 0;
      autoRotateSpeedY = 0;
    }
  };

  const onPointerUp = () => {
    isDragging = false;
    gsap.to({ val: 0 }, {
      val: 1,
      duration: 2,
      onUpdate: function() {
        autoRotateSpeedX = 0.001 * this.targets()[0].val;
        autoRotateSpeedY = 0.002 * this.targets()[0].val;
      }
    });
  };

  canvas.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('mouseup', onPointerUp);

  canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) onPointerDown(e.touches[0]);
  }, { passive: true });
  window.addEventListener('touchmove', (e) => {
    if (e.touches.length === 1) onPointerMove(e.touches[0]);
  }, { passive: true });
  window.addEventListener('touchend', onPointerUp);

  // Click handler (Raycast Zoom & Show Open Button)
  canvas.addEventListener('click', () => {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(panels);

    if (intersects.length > 0) {
      const clickedPanel = intersects[0].object;
      const project = clickedPanel.userData.project;
      
      // Cancel any active timeouts/zooms
      if (zoomTimeout) clearTimeout(zoomTimeout);
      activeProject = project;

      // Hide open button while zooming
      const openBtn = document.getElementById('canvas-open-btn');
      openBtn.classList.add('hidden');

      gsap.to(camera.position, {
        z: 2.8,
        duration: 0.8,
        ease: 'power3.inOut',
        onComplete: () => {
          highlightMarqueeItem(project.id);
          
          // Show the open button in the center
          openBtn.classList.remove('hidden');

          // Auto-zoom out if no action taken in 5 seconds
          zoomTimeout = setTimeout(() => {
            openBtn.classList.add('hidden');
            gsap.to(camera.position, {
              z: getBaseCameraZ(),
              duration: 1,
              ease: 'power2.out'
            });
            activeProject = null;
          }, 5000);
        }
      });
    }
  });

  function highlightMarqueeItem(index) {
    const items = document.querySelectorAll('.marquee-item');
    items.forEach(item => {
      const itemIdx = parseInt(item.getAttribute('data-index'), 10);
      if (itemIdx === index) {
        item.classList.add('active');
        item.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        item.classList.remove('active');
      }
    });
  }

  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    if (!activeProject) {
      camera.position.z = getBaseCameraZ();
    }
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  let currentHoveredPanel = null;

  function animate() {
    requestAnimationFrame(animate);

    if (!isDragging) {
      targetRotationY += autoRotateSpeedY;
      targetRotationX += autoRotateSpeedX;
    }

    if (cubeGroup) {
      cubeGroup.rotation.y += (targetRotationY - cubeGroup.rotation.y) * 0.1;
      cubeGroup.rotation.x += (targetRotationX - cubeGroup.rotation.x) * 0.1;
    }

    targetRotationX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, targetRotationX));

    if (activeSection === 'works') {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(panels);

      if (intersects.length > 0) {
        cursor.classList.add('viewing');
        const hovered = intersects[0].object;
        
        if (currentHoveredPanel !== hovered) {
          if (currentHoveredPanel) {
            gsap.to(currentHoveredPanel.material, { opacity: 1.0, duration: 0.2 });
            gsap.to(currentHoveredPanel.position, {
              x: currentHoveredPanel.userData.basePos.x,
              y: currentHoveredPanel.userData.basePos.y,
              z: currentHoveredPanel.userData.basePos.z,
              duration: 0.3,
              ease: 'power2.out'
            });
          }

          currentHoveredPanel = hovered;
          gsap.to(hovered.material, { opacity: 1, duration: 0.2 });
          const pushOut = hovered.userData.basePos.clone().addScaledVector(hovered.userData.normal, 0.12);
          gsap.to(hovered.position, {
            x: pushOut.x,
            y: pushOut.y,
            z: pushOut.z,
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      } else {
        cursor.classList.remove('viewing');
        if (currentHoveredPanel) {
          gsap.to(currentHoveredPanel.material, { opacity: 1.0, duration: 0.3 });
          gsap.to(currentHoveredPanel.position, {
            x: currentHoveredPanel.userData.basePos.x,
            y: currentHoveredPanel.userData.basePos.y,
            z: currentHoveredPanel.userData.basePos.z,
            duration: 0.4,
            ease: 'power2.out'
          });
          currentHoveredPanel = null;
        }
      }
    } else {
      cursor.classList.remove('viewing');
    }

    const worksSecElement = document.getElementById('section-works');
    const isWorksActive = worksSecElement && (activeSection === 'works' || parseFloat(window.getComputedStyle(worksSecElement).opacity) > 0.05);

    if (isWorksActive) {
      renderer.render(scene, camera);
    }
  }

  animate();
}

// REBUILD THREE CUBE BASED ON CURRENT DB LIST
function buildThreeCubeGroup() {
  if (!scene) return;

  if (cubeGroup) {
    scene.remove(cubeGroup);
    panels.forEach(p => {
      p.geometry.dispose();
      p.material.dispose();
    });
    panels = [];
    
    // Dispose of all old textures to prevent memory leaks
    textures.forEach(t => t.dispose());
    textures = [];
  }

  textures = projectsData.map(p => {
    const tex = textureLoader.load(p.image);
    tex.colorSpace = THREE.SRGBColorSpace;
    // Sharper filtering: trilinear + max anisotropy
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.anisotropy = maxAnisotropy;
    tex.needsUpdate = true;
    return tex;
  });

  cubeGroup = new THREE.Group();
  const cubeScale = window.innerWidth <= 768 ? 1.1 : 1.35;
  cubeGroup.scale.set(cubeScale, cubeScale, cubeScale);
  scene.add(cubeGroup);

  const faceConfig = [
    { dir: new THREE.Vector3(0, 0, 1), rot: new THREE.Euler(0, 0, 0) }, // Front
    { dir: new THREE.Vector3(0, 0, -1), rot: new THREE.Euler(0, Math.PI, 0) }, // Back
    { dir: new THREE.Vector3(1, 0, 0), rot: new THREE.Euler(0, Math.PI / 2, 0) }, // Right
    { dir: new THREE.Vector3(-1, 0, 0), rot: new THREE.Euler(0, -Math.PI / 2, 0) }, // Left
    { dir: new THREE.Vector3(0, 1, 0), rot: new THREE.Euler(-Math.PI / 2, 0, 0) }, // Top
    { dir: new THREE.Vector3(0, -1, 0), rot: new THREE.Euler(Math.PI / 2, 0, 0) } // Bottom
  ];

  const panelGeom = new THREE.PlaneGeometry(0.55, 0.55);

  faceConfig.forEach((face, faceIndex) => {
    for (let r = -1; r <= 1; r++) {
      for (let c = -1; c <= 1; c++) {
        const xLocal = c * 0.62;
        const yLocal = r * 0.62;
        const zLocal = 0.95;

        const projectIndex = Math.abs((faceIndex * 3 + r + c + 10) % projectsData.length);
        const texture = textures[projectIndex];

        const material = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 1.0
        });

        const panelMesh = new THREE.Mesh(panelGeom, material);
        const localPos = new THREE.Vector3(xLocal, yLocal, zLocal);
        
        localPos.applyEuler(face.rot);
        panelMesh.position.copy(localPos);
        panelMesh.rotation.copy(face.rot);

        panelMesh.userData = {
          projectIndex: projectIndex,
          project: projectsData[projectIndex],
          basePos: localPos.clone(),
          normal: face.dir.clone()
        };

        cubeGroup.add(panelMesh);
        panels.push(panelMesh);
      }
    }
  });

  setupMarqueeHoverTriggers();
}

function setupMarqueeHoverTriggers() {
  const marqueeLinks = document.querySelectorAll('.marquee-link');
  marqueeLinks.forEach(link => {
    const item = link.closest('.marquee-item');
    if (!item) return;
    const index = parseInt(item.getAttribute('data-index'), 10);

    link.addEventListener('mouseenter', () => {
      panels.forEach(p => {
        if (p.userData.projectIndex === index) {
          gsap.to(p.material, { opacity: 1, duration: 0.3 });
          const pushTarget = p.userData.basePos.clone().addScaledVector(p.userData.normal, 0.15);
          gsap.to(p.position, { x: pushTarget.x, y: pushTarget.y, z: pushTarget.z, duration: 0.4, ease: 'back.out(1.7)' });
        } else {
          gsap.to(p.material, { opacity: 0.25, duration: 0.3 });
        }
      });
    });

    link.addEventListener('mouseleave', () => {
      panels.forEach(p => {
        gsap.to(p.material, { opacity: 1.0, duration: 0.3 });
        gsap.to(p.position, { x: p.userData.basePos.x, y: p.userData.basePos.y, z: p.userData.basePos.z, duration: 0.4, ease: 'power2.out' });
      });
    });
  });
}

// Detailed Project Overlay controller
function initOverlayControls() {
  const openBtn = document.getElementById('canvas-open-btn');
  const overlay = document.getElementById('project-overlay');
  const closeBtn = document.getElementById('project-overlay-close');

  if (openBtn && overlay && closeBtn) {
    openBtn.addEventListener('click', () => {
      if (!activeProject) return;

      // Cancel auto-zoom timeout
      if (zoomTimeout) clearTimeout(zoomTimeout);

      // Hide the open button
      openBtn.classList.add('hidden');

      // Populate elements
      document.getElementById('overlay-number').textContent = (activeProject.id + 1).toString().padStart(2, '0');
      document.getElementById('overlay-image').src = activeProject.image;
      document.getElementById('overlay-title').textContent = activeProject.name;
      document.getElementById('overlay-tech').textContent = activeProject.technology;
      document.getElementById('overlay-year').textContent = activeProject.year;
      
      const fallbackPtDesc = `Projeto de desenvolvimento interativo focado em design de alto impacto. Desenvolvido para a função de ${activeProject.role} utilizando a tecnologia ${activeProject.technology}.`;
      const fallbackEnDesc = `An interactive development project focusing on high-impact experience design. Crafted for the role of ${activeProject.role} utilizing ${activeProject.technology} tech.`;
      
      document.getElementById('overlay-desc').textContent = activeProject.description || (currentLang === 'pt' ? fallbackPtDesc : fallbackEnDesc);
      document.getElementById('overlay-link').href = activeProject.link || '#';

      // Open detailed modal overlay
      overlay.classList.remove('hidden');
      gsap.fromTo(overlay,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' }
      );
    });

    closeBtn.addEventListener('click', () => {
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          overlay.classList.add('hidden');
          
          // Revert camera zoom
          gsap.to(camera.position, {
            z: getBaseCameraZ(),
            duration: 1,
            ease: 'power2.out'
          });
          activeProject = null;
        }
      });
    });
  }
}


/* ==========================================
   ADMIN PANEL BACKEND LOGIC & ACTIONS
   ========================================== */

let editProjectId = null;

async function checkAdminSession() {
  const token = localStorage.getItem('vibe_jwt');
  const loginCard = document.getElementById('admin-login-card');
  const dashboardCard = document.getElementById('admin-dashboard-card');

  if (!token) {
    showCard(loginCard);
    return;
  }

  try {
    const res = await fetch('/api/auth/verify', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (res.ok) {
      showCard(dashboardCard);
      loadAdminProjectsList();
      loadAdminServicesList();
      loadAdminRequestsList();
    } else {
      localStorage.removeItem('vibe_jwt');
      showCard(loginCard);
    }
  } catch (err) {
    showCard(loginCard);
  }
}

function showCard(cardElement) {
  const cards = document.querySelectorAll('.admin-card');
  cards.forEach(c => c.classList.remove('active'));
  cardElement.classList.add('active');
  setupCursorHovers();
}

function initAdminAuth() {
  const loginForm = document.getElementById('admin-login-form');
  const errorText = document.getElementById('login-error');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorText.style.display = 'none';

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem('vibe_jwt', data.token);
        loginForm.reset();
        checkAdminSession();
      } else {
        errorText.textContent = TRANSLATIONS[currentLang].admin_login_error;
        errorText.style.display = 'block';
      }
    } catch (err) {
      errorText.textContent = 'Server connection failed.';
      errorText.style.display = 'block';
    }
  });

  const logoutBtn = document.getElementById('admin-logout-btn');
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('vibe_jwt');
    checkAdminSession();
  });
}

async function loadAdminProjectsList() {
  const container = document.getElementById('admin-projects-list');
  if (!container) return;

  try {
    const res = await fetch('/api/projects');
    const projects = await res.json();
    
    container.innerHTML = '';
    if (projects.length === 0) {
      container.innerHTML = `<tr><td colspan="3" style="text-align:center;color:var(--text-muted);">No projects in database.</td></tr>`;
      return;
    }

    projects.forEach(p => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="font-weight: 700;">${p.name}</td>
        <td>${p.year}</td>
        <td>
          <div class="table-actions">
            <button class="btn-table-edit" data-id="${p._id}">Edit</button>
            <button class="btn-table-delete" data-id="${p._id}">Delete</button>
          </div>
        </td>
      `;
      container.appendChild(tr);
    });

    setupCursorHovers();
    setupAdminActionListeners(projects);
  } catch (err) {
    container.innerHTML = `<tr><td colspan="3" style="text-align:center;color:#ff3333;">Failed to load projects.</td></tr>`;
  }
}

function setupAdminActionListeners(projects) {
  const editBtns = document.querySelectorAll('.btn-table-edit');
  editBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const project = projects.find(p => p._id === id);
      if (project) {
        startEditMode(project);
      }
    });
  });

  const deleteBtns = document.querySelectorAll('.btn-table-delete');
  deleteBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      if (confirm('Are you sure you want to delete this project?')) {
        const token = localStorage.getItem('vibe_jwt');
        try {
          const res = await fetch(`/api/projects/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (res.ok) {
            await fetchProjects();
            populateUI();
            buildThreeCubeGroup();
            loadAdminProjectsList();
          } else {
            const data = await res.json();
            alert('Failed to delete: ' + data.message);
          }
        } catch (err) {
          alert('Error communicating with server.');
        }
      }
    });
  });
}

function startEditMode(project) {
  editProjectId = project._id;
  
  document.getElementById('form-action-title').textContent = TRANSLATIONS[currentLang].admin_form_title_edit;
  document.getElementById('btn-project-save').textContent = TRANSLATIONS[currentLang].admin_form_btn_update;
  document.getElementById('btn-project-cancel').textContent = TRANSLATIONS[currentLang].admin_form_btn_cancel;
  document.getElementById('btn-project-cancel').classList.remove('hidden');
  document.getElementById('image-input-label').textContent = currentLang === 'pt' ? 'ALTERAR IMAGEM DE CAPA (OPCIONAL)' : 'CHANGE IMAGE COVER (OPTIONAL)';
  document.getElementById('file-help-text').textContent = currentLang === 'pt' ? 'Deixe vazio para manter a imagem atual' : 'Leave empty to keep current image';

  document.getElementById('project-db-id').value = project._id;
  document.getElementById('project-name').value = project.name;
  document.getElementById('project-slug').value = project.slug;
  document.getElementById('project-year').value = project.year;
  document.getElementById('project-color').value = project.color;
  document.getElementById('project-color-text').value = project.color;
  document.getElementById('project-role').value = project.role;
  document.getElementById('project-tech').value = project.technology;
  document.getElementById('project-description').value = project.description || '';
  document.getElementById('project-link').value = project.link;
}

function stopEditMode() {
  editProjectId = null;
  
  document.getElementById('form-action-title').textContent = TRANSLATIONS[currentLang].admin_form_title_add;
  document.getElementById('btn-project-save').textContent = TRANSLATIONS[currentLang].admin_form_btn_commit;
  document.getElementById('btn-project-cancel').classList.add('hidden');
  document.getElementById('image-input-label').textContent = TRANSLATIONS[currentLang].admin_form_image;
  document.getElementById('file-help-text').textContent = TRANSLATIONS[currentLang].admin_form_image_help;

  document.getElementById('project-form').reset();
  document.getElementById('project-db-id').value = '';
  document.getElementById('project-color').value = DEFAULT_COLOR;
  document.getElementById('project-color-text').value = DEFAULT_COLOR;
}

function initProjectForm() {
  const form = document.getElementById('project-form');
  const cancelBtn = document.getElementById('btn-project-cancel');
  const errorText = document.getElementById('project-form-error');
  const successText = document.getElementById('project-form-success');
  const nameInput = document.getElementById('project-name');
  const slugInput = document.getElementById('project-slug');
  const colorPicker = document.getElementById('project-color');
  const colorText = document.getElementById('project-color-text');

  cancelBtn.addEventListener('click', stopEditMode);

  colorPicker.addEventListener('input', () => {
    colorText.value = colorPicker.value;
  });
  colorText.addEventListener('input', () => {
    if (colorText.value.match(/^#[0-9A-Fa-f]{6}$/)) {
      colorPicker.value = colorText.value;
    }
  });

  nameInput.addEventListener('input', () => {
    if (!editProjectId) {
      slugInput.value = nameInput.value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorText.style.display = 'none';
    successText.style.display = 'none';

    const token = localStorage.getItem('vibe_jwt');
    if (!token) {
      errorText.textContent = 'Unauthorized access. Please log in again.';
      errorText.style.display = 'block';
      return;
    }

    const formData = new FormData();
    formData.append('name', document.getElementById('project-name').value);
    formData.append('slug', document.getElementById('project-slug').value);
    formData.append('year', document.getElementById('project-year').value);
    formData.append('color', colorText.value);
    formData.append('role', document.getElementById('project-role').value);
    formData.append('technology', document.getElementById('project-tech').value);
    formData.append('description', document.getElementById('project-description').value);
    formData.append('link', document.getElementById('project-link').value);

    const imageFile = document.getElementById('project-image').files[0];
    if (imageFile) {
      formData.append('image', imageFile);
    } else if (!editProjectId) {
      errorText.textContent = 'Image file is required for new projects.';
      errorText.style.display = 'block';
      return;
    }

    const method = editProjectId ? 'PUT' : 'POST';
    const endpoint = editProjectId ? `/api/projects/${editProjectId}` : '/api/projects';

    const submitBtn = document.getElementById('btn-project-save');
    const originalBtnText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = editProjectId ? 'UPDATING...' : 'UPLOADING...';

    try {
      const res = await fetch(endpoint, {
        method: method,
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      const data = await res.json();

      if (res.ok) {
        successText.textContent = TRANSLATIONS[currentLang].admin_form_success_generic;
        successText.style.display = 'block';
        
        stopEditMode();
        
        await fetchProjects();
        populateUI();
        buildThreeCubeGroup();
        loadAdminProjectsList();
      } else {
        errorText.textContent = data.message || 'Error occurred during submit.';
        errorText.style.display = 'block';
      }
    } catch (err) {
      errorText.textContent = 'Network communication error.';
      errorText.style.display = 'block';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  });
}

// SERVICES ADMIN SECTION

async function loadAdminServicesList() {
  const container = document.getElementById('admin-services-list');
  if (!container) return;

  try {
    const res = await fetch('/api/services');
    const services = await res.json();
    
    container.innerHTML = '';
    if (services.length === 0) {
      container.innerHTML = `<tr><td colspan="4" style="text-align:center;color:var(--text-muted);padding:20px;">No services in database.</td></tr>`;
      return;
    }

    services.forEach(s => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="font-family: var(--font-mono);">${s.order}</td>
        <td style="font-weight: 700;">${s.title}</td>
        <td>${s.description || '-'}</td>
        <td>
          <div class="table-actions">
            <button class="btn-service-edit btn-table-edit" data-id="${s._id}">Edit</button>
            <button class="btn-service-delete btn-table-delete" data-id="${s._id}">Delete</button>
          </div>
        </td>
      `;
      container.appendChild(tr);
    });

    setupCursorHovers();
    setupAdminServicesActionListeners(services);
  } catch (err) {
    container.innerHTML = `<tr><td colspan="4" style="text-align:center;color:#ff3333;padding:20px;">Failed to load services.</td></tr>`;
  }
}

function setupAdminServicesActionListeners(services) {
  const editBtns = document.querySelectorAll('.btn-service-edit');
  editBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const service = services.find(s => s._id === id);
      if (service) {
        startServiceEditMode(service);
      }
    });
  });

  const deleteBtns = document.querySelectorAll('.btn-service-delete');
  deleteBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      if (confirm('Are you sure you want to delete this service?')) {
        const token = localStorage.getItem('vibe_jwt');
        try {
          const res = await fetch(`/api/services/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (res.ok) {
            await fetchServices();
            populateServicesUI();
            loadAdminServicesList();
          } else {
            const data = await res.json();
            alert('Failed to delete: ' + data.message);
          }
        } catch (err) {
          alert('Error communicating with server.');
        }
      }
    });
  });
}

function startServiceEditMode(service) {
  editServiceId = service._id;
  
  document.getElementById('service-form-action-title').textContent = 'EDITAR SERVIÇO';
  document.getElementById('btn-service-save').textContent = 'ATUALIZAR BASE DE DADOS';
  document.getElementById('btn-service-cancel').classList.remove('hidden');

  document.getElementById('service-db-id').value = service._id;
  document.getElementById('service-title').value = service.title;
  document.getElementById('service-desc').value = service.description || '';
  document.getElementById('service-order').value = service.order !== undefined ? service.order : 0;
}

function stopServiceEditMode() {
  editServiceId = null;
  
  document.getElementById('service-form-action-title').textContent = 'ADICIONAR NOVO SERVIÇO';
  document.getElementById('btn-service-save').textContent = 'SALVAR NA BASE DE DADOS';
  document.getElementById('btn-service-cancel').classList.add('hidden');

  document.getElementById('service-form').reset();
  document.getElementById('service-db-id').value = '';
  document.getElementById('service-order').value = '0';
}

function initServiceForm() {
  const form = document.getElementById('service-form');
  const cancelBtn = document.getElementById('btn-service-cancel');
  const errorText = document.getElementById('service-form-error');
  const successText = document.getElementById('service-form-success');

  if (!form) return;

  cancelBtn.addEventListener('click', stopServiceEditMode);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorText.style.display = 'none';
    successText.style.display = 'none';

    const token = localStorage.getItem('vibe_jwt');
    if (!token) {
      errorText.textContent = 'Unauthorized access. Please log in again.';
      errorText.style.display = 'block';
      return;
    }

    const payload = {
      title: document.getElementById('service-title').value,
      description: document.getElementById('service-desc').value,
      order: parseInt(document.getElementById('service-order').value, 10) || 0
    };

    const method = editServiceId ? 'PUT' : 'POST';
    const endpoint = editServiceId ? `/api/services/${editServiceId}` : '/api/services';

    const submitBtn = document.getElementById('btn-service-save');
    const originalBtnText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'SAVING...';

    try {
      const res = await fetch(endpoint, {
        method: method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
        successText.textContent = 'Serviço salvo com sucesso!';
        successText.style.display = 'block';
        
        stopServiceEditMode();
        
        await fetchServices();
        populateServicesUI();
        loadAdminServicesList();
      } else {
        errorText.textContent = data.message || 'Error occurred during submit.';
        errorText.style.display = 'block';
      }
    } catch (err) {
      errorText.textContent = 'Network communication error.';
      errorText.style.display = 'block';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  });
}

function initAdminTabs() {
  const projBtn = document.getElementById('tab-projects-btn');
  const servBtn = document.getElementById('tab-services-btn');
  const reqBtn = document.getElementById('tab-requests-btn');
  const projContent = document.getElementById('tab-projects-content');
  const servContent = document.getElementById('tab-services-content');
  const reqContent = document.getElementById('tab-requests-content');

  if (!projBtn || !servBtn || !reqBtn) return;

  projBtn.addEventListener('click', () => {
    projBtn.classList.add('active');
    servBtn.classList.remove('active');
    reqBtn.classList.remove('active');
    projContent.classList.add('active');
    servContent.classList.remove('active');
    reqContent.classList.remove('active');
    loadAdminProjectsList();
    setupCursorHovers();
  });

  servBtn.addEventListener('click', () => {
    servBtn.classList.add('active');
    projBtn.classList.remove('active');
    reqBtn.classList.remove('active');
    servContent.classList.add('active');
    projContent.classList.remove('active');
    reqContent.classList.remove('active');
    loadAdminServicesList();
    setupCursorHovers();
  });

  reqBtn.addEventListener('click', () => {
    reqBtn.classList.add('active');
    projBtn.classList.remove('active');
    servBtn.classList.remove('active');
    reqContent.classList.add('active');
    projContent.classList.remove('active');
    servContent.classList.remove('active');
    loadAdminRequestsList();
    setupCursorHovers();
  });
}

// CLIENT-SIDE SERVICE REQUESTS MODAL

function populateRequestServiceDropdown() {
  const select = document.getElementById('req-service-select');
  if (!select) return;

  select.innerHTML = '<option value="" disabled selected>Selecione um serviço...</option>';

  if (servicesData.length === 0) {
    const fallbacks = [
      'Desenvolvimento Web',
      'Emails Corporativos',
      'Criativos de Oferta',
      'Tráfego Pago',
      'Gestão de Conteúdos',
      'SaaS (Software as a Service)',
      'Registo de Domínio',
      'Suporte Técnico em TI'
    ];
    fallbacks.forEach(opt => {
      const option = document.createElement('option');
      option.value = opt;
      option.textContent = opt;
      select.appendChild(option);
    });
    return;
  }

  servicesData.forEach(service => {
    const option = document.createElement('option');
    option.value = service.title;
    option.textContent = service.title;
    select.appendChild(option);
  });
}

function initClientRequestModal() {
  const openBtn = document.getElementById('open-request-modal-btn');
  const overlay = document.getElementById('request-overlay');
  const closeBtn = document.getElementById('request-overlay-close');
  const form = document.getElementById('client-request-form');
  const errorText = document.getElementById('req-form-error');
  const successText = document.getElementById('req-form-success');
  const domainPricing = document.getElementById('domain-pricing-container');
  const serviceSelect = document.getElementById('req-service-select');

  if (!overlay || !openBtn || !closeBtn) return;

  openBtn.addEventListener('click', () => {
    overlay.classList.remove('hidden');
    populateRequestServiceDropdown();
    errorText.style.display = 'none';
    successText.style.display = 'none';
    form.reset();
    if (domainPricing) {
      domainPricing.classList.add('hidden');
    }
  });

  if (serviceSelect && domainPricing) {
    serviceSelect.addEventListener('change', () => {
      if (serviceSelect.value === 'Emails Corporativos') {
        domainPricing.classList.remove('hidden');
      } else {
        domainPricing.classList.add('hidden');
      }
    });
  }

  closeBtn.addEventListener('click', () => {
    overlay.classList.add('hidden');
  });

  // Mobile: ← Voltar top bar button
  const backBtn = document.getElementById('request-back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      overlay.classList.add('hidden');
    });
  }

  // Mobile: ✕ Fechar bottom button
  const closeBtnBottom = document.getElementById('btn-request-close-bottom');
  if (closeBtnBottom) {
    closeBtnBottom.addEventListener('click', () => {
      overlay.classList.add('hidden');
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      overlay.classList.add('hidden');
    }
  });

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorText.style.display = 'none';
    successText.style.display = 'none';

    const payload = {
      clientName: document.getElementById('req-client-name').value,
      clientEmail: document.getElementById('req-client-email').value,
      clientPhone: document.getElementById('req-client-phone').value,
      service: document.getElementById('req-service-select').value,
      message: document.getElementById('req-message').value
    };

    const submitBtn = document.getElementById('btn-request-submit');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'ENVIANDO...';

    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
        successText.style.display = 'block';
        form.reset();
        
        setTimeout(() => {
          overlay.classList.add('hidden');
        }, 2500);
      } else {
        errorText.textContent = data.message || 'Erro ao enviar a proposta.';
        errorText.style.display = 'block';
      }
    } catch (err) {
      errorText.textContent = 'Erro de rede. Verifique sua conexão.';
      errorText.style.display = 'block';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}

// ADMIN PANEL REQUESTS LIST

async function loadAdminRequestsList() {
  const container = document.getElementById('admin-requests-list');
  if (!container) return;

  try {
    const token = localStorage.getItem('vibe_jwt');
    const res = await fetch('/api/requests', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const requests = await res.json();
    
    container.innerHTML = '';
    if (requests.length === 0) {
      container.innerHTML = `<tr><td colspan="6" style="text-align:center;color:var(--text-muted);padding:20px;">Nenhuma solicitação encontrada no banco de dados.</td></tr>`;
      return;
    }

    requests.forEach(r => {
      const date = new Date(r.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      const tr = document.createElement('tr');
      const cleanPhone = r.clientPhone.replace(/[^0-9+]/g, '');

      tr.innerHTML = `
        <td style="font-family: var(--font-mono); font-size: 11px;">${date}</td>
        <td>
          <div style="font-weight: 700;">${r.clientName}</div>
          <div style="font-size: 11px; color: var(--text-muted);">${r.clientEmail}</div>
          <div style="font-size: 11px; color: var(--text-muted); font-family: var(--font-mono);">${r.clientPhone}</div>
        </td>
        <td><span style="font-weight: 700; color: var(--accent-color);">${r.service}</span></td>
        <td style="max-width: 300px; word-break: break-word; font-size: 12px; color: var(--text-muted);">${r.message}</td>
        <td>
          <select class="admin-select select-status-update" data-id="${r._id}" style="padding: 4px 8px; font-size: 11px; width: auto; height: auto;">
            <option value="Pendente" ${r.status === 'Pendente' ? 'selected' : ''}>Pendente</option>
            <option value="Lido" ${r.status === 'Lido' ? 'selected' : ''}>Lido</option>
            <option value="Respondido" ${r.status === 'Respondido' ? 'selected' : ''}>Respondido</option>
          </select>
        </td>
        <td>
          <div class="table-actions" style="flex-direction: column; gap: 6px;">
            <button class="btn-table-whatsapp" data-phone="${cleanPhone}" data-name="${r.clientName}" data-service="${r.service}">Contatar ↗</button>
            <button class="btn-table-delete btn-request-delete" data-id="${r._id}">Excluir</button>
          </div>
        </td>
      `;
      container.appendChild(tr);
    });

    setupCursorHovers();
    setupAdminRequestsActionListeners(requests);
  } catch (err) {
    container.innerHTML = `<tr><td colspan="6" style="text-align:center;color:#ff3333;padding:20px;">Falha ao carregar as solicitações.</td></tr>`;
  }
}

function setupAdminRequestsActionListeners(requests) {
  const statusSelects = document.querySelectorAll('.select-status-update');
  statusSelects.forEach(select => {
    select.addEventListener('change', async () => {
      const id = select.getAttribute('data-id');
      const newStatus = select.value;
      const token = localStorage.getItem('vibe_jwt');

      try {
        const res = await fetch(`/api/requests/${id}`, {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          },
          body: JSON.stringify({ status: newStatus })
        });
        
        if (!res.ok) {
          alert('Erro ao atualizar status.');
          loadAdminRequestsList();
        }
      } catch (err) {
        alert('Erro de comunicação.');
        loadAdminRequestsList();
      }
    });
  });

  const deleteBtns = document.querySelectorAll('.btn-request-delete');
  deleteBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      if (confirm('Deseja realmente excluir esta solicitação?')) {
        const token = localStorage.getItem('vibe_jwt');
        try {
          const res = await fetch(`/api/requests/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (res.ok) {
            loadAdminRequestsList();
          } else {
            alert('Falha ao excluir.');
          }
        } catch (err) {
          alert('Erro de comunicação.');
        }
      }
    });
  });

  const whatsappBtns = document.querySelectorAll('.btn-table-whatsapp');
  whatsappBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const phone = btn.getAttribute('data-phone');
      const name = btn.getAttribute('data-name');
      const service = btn.getAttribute('data-service');

      const baseMsg = `Olá ${name}, recebi sua solicitação para o serviço de "${service}" no meu portfólio Vibe. Como posso te ajudar hoje?`;
      const encodedMsg = encodeURIComponent(baseMsg);

      window.open(`https://wa.me/${phone}?text=${encodedMsg}`, '_blank');
    });
  });
}

function initMobileMenu() {
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const header = document.querySelector('.header');
  const navLinks = document.querySelectorAll('.nav-link, .logo__link');

  if (!hamburgerBtn || !header) return;

  hamburgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburgerBtn.classList.toggle('active');
    header.classList.toggle('menu-active');
  });

  // Close menu when clicking a nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburgerBtn.classList.remove('active');
      header.classList.remove('menu-active');
    });
  });

  // Close menu when clicking outside of header
  document.addEventListener('click', (e) => {
    if (header.classList.contains('menu-active') && !header.contains(e.target) && !hamburgerBtn.contains(e.target)) {
      hamburgerBtn.classList.remove('active');
      header.classList.remove('menu-active');
    }
  });
}

/* ==========================================
   INITIALIZATION
   ========================================== */

window.addEventListener('DOMContentLoaded', async () => {
  initTranslationEngine();

  await fetchProjects();
  await fetchServices();
  populateUI();
  populateServicesUI();

  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Initialize UI features
  initPreloader();
  initNavigation();
  initMobileMenu();
  initGridHelper();
  initAvailability();
  
  // Admin logic
  initAdminAuth();
  initAdminTabs();
  initProjectForm();
  initServiceForm();

  // Client requests modal
  initClientRequestModal();

  // Overlay controller logic
  initOverlayControls();

  // Setup cursor
  setupCursorHovers();

  // Initialize Three.js canvas cube
  initThreeCanvas();
});
