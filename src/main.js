import * as THREE from 'three';
import { gsap } from 'gsap';
import Lenis from 'lenis';

// Global Data variables
let projectsData = [];
const DEFAULT_COLOR = '#ff3e00';

// fallback local mock data in case API fails
const FALLBACK_PROJECTS = [
  { id: 0, name: 'Moving Portraits', slug: 'moving-portraits', image: '/images/moving-portraits.png', color: '#ff3e00', year: '2026', role: 'Creative Director & WebGL', technology: 'Three.js, GLSL, GSAP', link: '#' },
  { id: 1, name: 'Issey Miyake SS25', slug: 'issey-miyake-ss25', image: '/images/issey-miyake.png', color: '#ff5500', year: '2025', role: 'Interactive Engineer', technology: 'WebGL, Vanilla JS, CSS3D', link: '#' },
  { id: 2, name: 'Studies in Motion', slug: 'studies-in-motion', image: '/images/studies-in-motion.png', color: '#ff6600', year: '2025', role: 'Motion Lead', technology: 'GSAP ScrollTrigger, Lenis', link: '#' },
  { id: 3, name: 'Ruby Campbell', slug: 'ruby-campbell', image: '/images/ruby-campbell.png', color: '#ff7700', year: '2024', role: 'Fullstack Developer', technology: 'SvelteKit, Node.js, GSAP', link: '#' },
  { id: 4, name: 'Shaped by Earth', slug: 'shaped-by-earth', image: '/images/shaped-by-earth.png', color: '#ff8800', year: '2024', role: '3D Developer', technology: 'Three.js, Blender, GSAP', link: '#' },
  { id: 5, name: 'Echoes in Light', slug: 'echoes-in-light', image: '/images/echoes-in-light.png', color: '#ff9900', year: '2023', role: 'Creative Technologist', technology: 'Canvas2D, Custom WebAudio', link: '#' }
];

// App State
let lenis;
let activeSection = 'works';
let isGridActive = false;

// Custom Cursor Setup
const cursor = document.getElementById('custom-cursor');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  const ease = 0.15;
  cursorX += (mouseX - cursorX) * ease;
  cursorY += (mouseY - cursorY) * ease;
  
  cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
  requestAnimationFrame(animateCursor);
}
animateCursor();

function setupCursorHovers() {
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

// Populate UI (Marquee list & Archive Table)
function populateUI() {
  // 1. Works Marquee
  const worksListUl = document.getElementById('works-list-ul');
  if (worksListUl) {
    worksListUl.innerHTML = '';
    // Double list for seamless marquee scroll loop
    const repeatCount = projectsData.length < 4 ? 3 : 2;
    for (let loop = 0; loop < repeatCount; loop++) {
      projectsData.forEach((project, index) => {
        const li = document.createElement('li');
        li.className = 'marquee-item';
        li.setAttribute('data-index', index);
        
        const a = document.createElement('a');
        a.href = project.link || '#';
        a.className = 'marquee-link';
        a.textContent = project.name;
        
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
        <td class="project-name">${project.name}</td>
        <td>${project.role}</td>
        <td>${project.technology}</td>
        <td><a href="${project.link}" target="_blank" class="archive-link">Explore ↗</a></td>
      `;
      archiveTableBody.appendChild(tr);
    });
  }

  setupCursorHovers();
}

// Preloader Progress
function initPreloader() {
  const progressBar = document.getElementById('preloader-bar');
  const percentageText = document.getElementById('preloader-percentage');
  const preloader = document.getElementById('preloader');
  
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 8) + 2;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      
      gsap.to(preloader, {
        opacity: 0,
        duration: 0.8,
        ease: 'power3.inOut',
        onComplete: () => {
          preloader.classList.add('fade-out');
          revealHero();
        }
      });
    }
    
    progressBar.style.width = `${progress}%`;
    percentageText.textContent = `${progress.toString().padStart(2, '0')}%`;
  }, 30);
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
      if (target === activeSection) return;

      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      const activeNav = document.querySelector(`.nav-link[data-section="${target}"]`);
      if (activeNav) activeNav.classList.add('active');

      let letteringText = 'FW';
      if (target === 'archive') letteringText = 'AR';
      if (target === 'about') letteringText = 'AB';
      if (target === 'admin') letteringText = 'AD';

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
      const targetSec = document.getElementById(`section-${target}`);

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
            { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }
          );
        }
      });

      activeSection = target;
      
      // Load admin list if admin section is open
      if (target === 'admin') {
        checkAdminSession();
      }
    });
  });
}

// Dimensions / Composition Grid (Alt+G)
function initGridHelper() {
  const gridHelper = document.getElementById('grid-helper');
  const gridToggleBtn = document.getElementById('grid-toggle');
  const dimensionsDisplay = document.getElementById('screen-dimensions-display');

  function toggleGrid() {
    isGridActive = !isGridActive;
    gridHelper.classList.toggle('active', isGridActive);
    gridToggleBtn.classList.toggle('active', isGridActive);
  }

  gridToggleBtn.addEventListener('click', toggleGrid);
  
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
        tooltip.textContent = 'Email copied!';
        
        setTimeout(() => {
          badge.classList.remove('copied');
          tooltip.textContent = 'Click to copy email';
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
const textureLoader = new THREE.TextureLoader();

// THREE.JS 3D CANVAS BUILDER
function initThreeCanvas() {
  const container = document.getElementById('canvas-container');
  const canvas = document.getElementById('cube-canvas');
  if (!container || !canvas) return;

  // Scene
  scene = new THREE.Scene();
  
  // Camera
  camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.z = 5.2;

  // Renderer
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Build Cube panels
  buildThreeCubeGroup();

  // Mouse Raycaster
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  // Drag controls
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

  // Touch triggers
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

  // Click handler (Raycast Zoom)
  canvas.addEventListener('click', () => {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(panels);

    if (intersects.length > 0) {
      const clickedPanel = intersects[0].object;
      const project = clickedPanel.userData.project;
      
      gsap.to(camera.position, {
        z: 2.8,
        duration: 0.8,
        ease: 'power3.inOut',
        onComplete: () => {
          highlightMarqueeItem(project.id);
          gsap.to(camera.position, { z: 5.2, duration: 1, ease: 'power2.out' });
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

  // Resize handler
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  let currentHoveredPanel = null;

  // Animation ticks
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
            gsap.to(currentHoveredPanel.material, { opacity: 0.85, duration: 0.2 });
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
          gsap.to(currentHoveredPanel.material, { opacity: 0.85, duration: 0.3 });
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

    renderer.render(scene, camera);
  }

  animate();
}

// REBUILD THREE CUBE BASED ON CURRENT DB LIST
function buildThreeCubeGroup() {
  if (!scene) return;

  // Clear previous group
  if (cubeGroup) {
    scene.remove(cubeGroup);
    panels.forEach(p => {
      p.geometry.dispose();
      p.material.dispose();
    });
    panels = [];
  }

  // Pre-load textures for current projects
  textures = projectsData.map(p => textureLoader.load(p.image));

  cubeGroup = new THREE.Group();
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

        // Select texture
        const projectIndex = Math.abs((faceIndex * 3 + r + c + 10) % projectsData.length);
        const texture = textures[projectIndex];

        const material = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.85
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

  // Re-link list hover listeners to the new panels
  setupMarqueeHoverTriggers();
}

// Link list hover triggers to 3D Cube panels
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
        gsap.to(p.material, { opacity: 0.85, duration: 0.3 });
        gsap.to(p.position, { x: p.userData.basePos.x, y: p.userData.basePos.y, z: p.userData.basePos.z, duration: 0.4, ease: 'power2.out' });
      });
    });
  });
}


/* ==========================================
   ADMIN PANEL BACKEND LOGIC & ACTIONS
   ========================================== */

let editProjectId = null; // Track database ID during edits

// Check if JWT session is active
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
    } else {
      localStorage.removeItem('vibe_jwt');
      showCard(loginCard);
    }
  } catch (err) {
    // If API error, fallback to login card
    showCard(loginCard);
  }
}

function showCard(cardElement) {
  const cards = document.querySelectorAll('.admin-card');
  cards.forEach(c => c.classList.remove('active'));
  cardElement.classList.add('active');
  setupCursorHovers();
}

// Handle Admin login form
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
        errorText.textContent = data.message || 'Login failed.';
        errorText.style.display = 'block';
      }
    } catch (err) {
      errorText.textContent = 'Server connection failed.';
      errorText.style.display = 'block';
    }
  });

  // Logout button
  const logoutBtn = document.getElementById('admin-logout-btn');
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('vibe_jwt');
    checkAdminSession();
  });
}

// Load project lists for Admin dashboard
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

// Connect Edit and Delete buttons inside the admin list
function setupAdminActionListeners(projects) {
  // Edit Trigger
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

  // Delete Trigger
  const deleteBtns = document.querySelectorAll('.btn-table-delete');
  deleteBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      if (confirm('Are you sure you want to delete this project? This will delete the metadata from MongoDB and the asset from Cloudinary.')) {
        const token = localStorage.getItem('vibe_jwt');
        try {
          const res = await fetch(`/api/projects/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (res.ok) {
            await fetchProjects(); // refresh global data
            populateUI();          // refresh index views
            buildThreeCubeGroup(); // rebuild cube
            loadAdminProjectsList(); // refresh dashboard table
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

// Start Edit Mode in form
function startEditMode(project) {
  editProjectId = project._id;
  
  document.getElementById('form-action-title').textContent = 'EDIT PORTFOLIO';
  document.getElementById('btn-project-save').textContent = 'UPDATE DATABASE';
  document.getElementById('btn-project-cancel').classList.remove('hidden');
  document.getElementById('image-input-label').textContent = 'CHANGE IMAGE COVER (OPTIONAL)';
  document.getElementById('file-help-text').textContent = 'Leave empty to keep current image';

  // Fill inputs
  document.getElementById('project-db-id').value = project._id;
  document.getElementById('project-name').value = project.name;
  document.getElementById('project-slug').value = project.slug;
  document.getElementById('project-year').value = project.year;
  document.getElementById('project-color').value = project.color;
  document.getElementById('project-color-text').value = project.color;
  document.getElementById('project-role').value = project.role;
  document.getElementById('project-tech').value = project.technology;
  document.getElementById('project-link').value = project.link;
}

// Stop Edit Mode
function stopEditMode() {
  editProjectId = null;
  
  document.getElementById('form-action-title').textContent = 'ADD NEW PORTFOLIO';
  document.getElementById('btn-project-save').textContent = 'COMMIT TO DATABASE';
  document.getElementById('btn-project-cancel').classList.add('hidden');
  document.getElementById('image-input-label').textContent = 'IMAGE COVER FILE (MAX 5MB)';
  document.getElementById('file-help-text').textContent = 'Select a JPG/PNG image cover';

  document.getElementById('project-form').reset();
  document.getElementById('project-db-id').value = '';
  document.getElementById('project-color').value = DEFAULT_COLOR;
  document.getElementById('project-color-text').value = DEFAULT_COLOR;
}

// Setup Project Upload / Edit Form Actions
function initProjectForm() {
  const form = document.getElementById('project-form');
  const cancelBtn = document.getElementById('btn-project-cancel');
  const errorText = document.getElementById('project-form-error');
  const successText = document.getElementById('project-form-success');
  const nameInput = document.getElementById('project-name');
  const slugInput = document.getElementById('project-slug');
  const colorPicker = document.getElementById('project-color');
  const colorText = document.getElementById('project-color-text');

  // Cancel button
  cancelBtn.addEventListener('click', stopEditMode);

  // Sync color picker with text box
  colorPicker.addEventListener('input', () => {
    colorText.value = colorPicker.value;
  });
  colorText.addEventListener('input', () => {
    if (colorText.value.match(/^#[0-9A-Fa-f]{6}$/)) {
      colorPicker.value = colorText.value;
    }
  });

  // Auto-generate slug from project name
  nameInput.addEventListener('input', () => {
    if (!editProjectId) {
      slugInput.value = nameInput.value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
  });

  // Submit Handler (Add / Edit)
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

    // Disable button during submit to prevent multiple clicks
    const submitBtn = document.getElementById('btn-project-save');
    const originalBtnText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = editProjectId ? 'UPDATING CLOUDINARY...' : 'UPLOADING TO DATABASE...';

    try {
      const res = await fetch(endpoint, {
        method: method,
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      const data = await res.json();

      if (res.ok) {
        successText.textContent = editProjectId ? 'Project updated successfully.' : 'Project added to database.';
        successText.style.display = 'block';
        
        stopEditMode();
        
        await fetchProjects();    // refresh global dataset
        populateUI();             // populate front views
        buildThreeCubeGroup();    // rebuild 3D scenes
        loadAdminProjectsList();  // update dashboard list
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

/* ==========================================
   INITIALIZATION
   ========================================== */

window.addEventListener('DOMContentLoaded', async () => {
  // Fetch from DB and build dynamic interface
  await fetchProjects();
  populateUI();

  // Smooth scroll
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
  initGridHelper();
  initAvailability();
  
  // Admin logic
  initAdminAuth();
  initProjectForm();

  // Setup cursor
  setupCursorHovers();

  // Initialize Three.js canvas cube
  initThreeCanvas();
});
