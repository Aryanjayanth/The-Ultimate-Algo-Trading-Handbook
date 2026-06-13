/* Core UI Controls - The Ultimate Algo Trading Handbook */

document.addEventListener('DOMContentLoaded', () => {
  // Theme Management
  initTheme();
  
  // Mobile Drawer Toggle
  initMobileDrawer();
  
  // Scroll Progress Indicator
  initScrollProgress();
  
  // Section Auto-Highlight (TOC)
  initSectionObserver();
  
  // Interactive Checklist (Completion status)
  initSectionCompletionChecklist();
  
  // Interactive Flow Nodes (Workflow Diagram)
  initFlowchartNodes();
  
  // Interactive Strategy Tabs
  initStrategyTabs();

  // Animated Hero Particle Backdrop
  initHeroParticles();

  // Collapsible Code Blocks
  initCollapsibleCode();

  // Google Analytics Tracking
  initGoogleAnalytics();

  // Mobile Experience Notice
  initMobileExperienceNotice();
});

/* ── Theme management ── */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  if (!toggleBtn) return;
  
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Dispatch custom event to notify charts or simulators
    window.dispatchEvent(new CustomEvent('themechanged', { detail: { theme: newTheme } }));
  });
}

/* ── Sidebar Toggle Drawer (Mobile & Desktop) ── */
function initMobileDrawer() {
  const trigger = document.getElementById('menu-trigger');
  const sidebar = document.getElementById('sidebar');
  
  if (!trigger || !sidebar) return;
  
  // Create backdrop if not exists
  let backdrop = document.getElementById('drawer-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.id = 'drawer-backdrop';
    backdrop.className = 'drawer-backdrop';
    document.body.appendChild(backdrop);
  }
  
  function toggleDrawer(open) {
    sidebar.classList.toggle('open', open);
    backdrop.classList.toggle('active', open);
  }
  
  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    if (window.innerWidth <= 1024) {
      const isOpen = sidebar.classList.contains('open');
      toggleDrawer(!isOpen);
    } else {
      document.body.classList.toggle('sidebar-collapsed');
    }
  });
  
  backdrop.addEventListener('click', () => {
    toggleDrawer(false);
  });
  
  // Close drawer when sidebar link clicked (mobile only)
  sidebar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1024) {
        toggleDrawer(false);
      }
    });
  });
}

/* ── Scroll Progress Bar ── */
function initScrollProgress() {
  const progressBar = document.getElementById('reading-progress-bar');
  if (!progressBar) return;
  
  window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    
    if (documentHeight > 0) {
      const percentage = (scrolled / documentHeight) * 100;
      progressBar.style.width = `${percentage}%`;
    }
  }, { passive: true });
}

/* ── Active Section Sidebar Observer ── */
function initSectionObserver() {
  const sections = document.querySelectorAll('section.section');
  const navLinks = document.querySelectorAll('.sidebar .nav-link');
  
  if (sections.length === 0 || navLinks.length === 0) return;
  
  const options = {
    root: null,
    rootMargin: '-20% 0px -70% 0px', // Trigger near top of viewport
    threshold: 0
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${activeId}`) {
            link.classList.add('active');
            // Smooth scroll sidebar container to center active link
            link.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, options);
  
  sections.forEach(section => observer.observe(section));
}

/* ── Section Completion Checklist ── */
function initSectionCompletionChecklist() {
  const checkboxes = document.querySelectorAll('.section-complete-checkbox');
  
  checkboxes.forEach(cb => {
    const sectionId = cb.getAttribute('data-section');
    const savedState = localStorage.getItem(`section-complete-${sectionId}`);
    
    if (savedState === 'true') {
      cb.checked = true;
    }
    
    cb.addEventListener('change', () => {
      localStorage.setItem(`section-complete-${sectionId}`, cb.checked);
      updateSectionIndicator(sectionId, cb.checked);
    });
    
    updateSectionIndicator(sectionId, cb.checked);
  });
}

function updateSectionIndicator(sectionId, isComplete) {
  // Can be expanded to display badge icons or checkmarks in table of contents
  const sidebarLink = document.querySelector(`.sidebar a[href="#${sectionId}"]`);
  if (!sidebarLink) return;
  
  let checkmark = sidebarLink.querySelector('.toc-checkmark');
  if (isComplete) {
    if (!checkmark) {
      checkmark = document.createElement('span');
      checkmark.className = 'toc-checkmark';
      checkmark.innerHTML = ' ✓';
      checkmark.style.color = 'var(--green-accent)';
      checkmark.style.fontSize = '0.75rem';
      checkmark.style.fontWeight = 'bold';
      sidebarLink.appendChild(checkmark);
    }
  } else {
    if (checkmark) {
      checkmark.remove();
    }
  }
}

/* ── Interactive Workflow Diagram ── */
function initFlowchartNodes() {
  const nodes = document.querySelectorAll('.flow-node');
  const panes = document.querySelectorAll('.flow-details-pane');
  
  if (nodes.length === 0) return;
  
  nodes.forEach(node => {
    node.addEventListener('click', () => {
      const idx = node.getAttribute('data-index');
      
      nodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');
      
      panes.forEach(p => p.classList.remove('active'));
      const activePane = document.getElementById(`flow-details-${idx}`);
      if (activePane) {
        activePane.classList.add('active');
      }
    });
  });
}

/* ── Interactive Strategy Selector ── */
function initStrategyTabs() {
  const tabs = document.querySelectorAll('.strat-tab');
  const panels = document.querySelectorAll('.strat-panel');
  
  if (tabs.length === 0) return;
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const panelId = tab.getAttribute('data-target');
      
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      panels.forEach(p => p.classList.remove('active'));
      const activePanel = document.getElementById(panelId);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    });
  });
}

/* ── Interactive Particle Background ── */
function initHeroParticles() {
  const canvas = document.getElementById('hero-canvas-bg');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;

  let width = canvas.offsetWidth;
  let height = canvas.offsetHeight;
  canvas.width = width * window.devicePixelRatio;
  canvas.height = height * window.devicePixelRatio;
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

  const particles = [];
  const particleCount = 45;

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.radius = Math.random() * 2 + 1;
      this.color = Math.random() > 0.5 ? 'rgba(34, 211, 238, 0.4)' : 'rgba(167, 139, 250, 0.4)';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx = -this.vx;
      if (this.y < 0 || this.y > height) this.vy = -this.vy;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw grid lines drift subtly
    ctx.strokeStyle = document.documentElement.getAttribute('data-theme') === 'dark' 
      ? 'rgba(255, 255, 255, 0.015)' 
      : 'rgba(0, 0, 0, 0.015)';
    ctx.lineWidth = 1;
    const spacing = 40;
    for (let x = 0; x < width; x += spacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += spacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    // Connect particles
    ctx.lineWidth = 0.5;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 90) {
          const alpha = (1 - dist / 90) * 0.15;
          ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('resize', () => {
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  });
}

/* ── Collapsible Code Blocks ── */
function initCollapsibleCode() {
  const containers = document.querySelectorAll('.code-container');
  containers.forEach(container => {
    const pre = container.querySelector('pre');
    if (!pre) return;
    
    // Count the number of lines
    const lines = pre.innerText.split('\n').length;
    
    // If code has more than 12 lines, make it collapsible
    if (lines > 12) {
      container.classList.add('collapsible');
      
      const header = container.querySelector('.code-header');
      if (header) {
        const langLabel = header.querySelector('.code-lang-label');
        
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'code-toggle-btn';
        toggleBtn.innerText = 'Expand';
        toggleBtn.setAttribute('aria-label', 'Toggle code visibility');
        
        if (langLabel) {
          header.insertBefore(toggleBtn, langLabel);
        } else {
          header.appendChild(toggleBtn);
        }
        
        const expandOverlayBtn = document.createElement('button');
        expandOverlayBtn.className = 'code-expand-overlay-btn';
        expandOverlayBtn.innerHTML = `
          <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" style="margin-right: 4px; display: inline-block; vertical-align: middle;"><path d="m19 9-7 7-7-7"/></svg>
          Expand Code
        `;
        container.appendChild(expandOverlayBtn);
        
        const toggleCode = () => {
          const isExpanded = container.classList.toggle('expanded');
          toggleBtn.innerText = isExpanded ? 'Collapse' : 'Expand';
          
          if (!isExpanded) {
            container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        };
        
        toggleBtn.addEventListener('click', toggleCode);
        expandOverlayBtn.addEventListener('click', toggleCode);
      }
    }
  });
}

/* ── Google Analytics Integration ── */
function initGoogleAnalytics() {
  const GA_MEASUREMENT_ID = 'G-DBEQ8SHZD7'; // Replace with your Google Analytics Measurement ID (e.g. G-74XG6K5T8W)
  
  if (GA_MEASUREMENT_ID === 'G-XXXXXXXXXX' || !GA_MEASUREMENT_ID) {
    console.log('Google Analytics: Tracker initialized in debug mode. Replace G-XXXXXXXXXX in assets/js/core.js to track pages.');
    return;
  }
  
  // Inject the Google Tag Manager script tag
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
  
  // Initialize dataLayer and the gtag function
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    dataLayer.push(arguments);
  };
  
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);
}

/* ── Mobile Experience Notice ── */
function initMobileExperienceNotice() {
  if (window.innerWidth > 768) return;
  
  const isDismissed = localStorage.getItem('mobile-notice-dismissed');
  if (isDismissed === 'true') return;
  
  const noticeOverlay = document.createElement('div');
  noticeOverlay.id = 'mobile-notice-overlay';
  noticeOverlay.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(3, 7, 18, 0.95);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    transition: opacity var(--transition-normal);
  `;
  
  const noticeCard = document.createElement('div');
  noticeCard.className = 'card';
  noticeCard.style.cssText = `
    max-width: 400px;
    width: 100%;
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    padding: 2rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `;
  
  noticeCard.innerHTML = `
    <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">💻</div>
    <h3 style="font-size: 1.35rem; font-weight: 800; margin: 0; display: inline-block;">Optimal Experience Notice</h3>
    <p style="font-size: 0.88rem; color: var(--text-secondary); margin: 0; line-height: 1.5; font-family: var(--font-sans);">
      This handbook and its interactive calculators are highly optimized for **laptops, desktops, and tablets**. For the best learning and layout experience, we recommend opening it on a larger screen.
    </p>
    <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-top: 1rem;">
      <button id="mobile-notice-continue" class="btn btn-secondary" style="width: 100%; padding: 0.65rem; font-size: 0.88rem; border-color: var(--border-secondary);">
        Continue on Mobile
      </button>
    </div>
  `;
  
  noticeOverlay.appendChild(noticeCard);
  document.body.appendChild(noticeOverlay);
  
  const originalOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  
  const dismissBtn = noticeCard.querySelector('#mobile-notice-continue');
  dismissBtn.addEventListener('click', () => {
    localStorage.setItem('mobile-notice-dismissed', 'true');
    noticeOverlay.style.opacity = '0';
    setTimeout(() => {
      noticeOverlay.remove();
      document.body.style.overflow = originalOverflow;
    }, 300);
  });
}
