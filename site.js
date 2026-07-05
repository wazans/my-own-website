/**
 * Shared site helpers:
 * - mobile navigation toggle
 * - sticky mobile register button
 * - floating WhatsApp button
 * - footer year sync
 * - mobile sidebar toggle
 * - registration modal handling
 * - exit intent popup
 */
(function () {
  // Function to inject the floating register button
  function injectRegisterButton() {
    // Check if a floating register button already exists or if it's explicitly hidden
    if (
      document.querySelector('.floating-register') ||
      document.body.classList.contains('hide-floating-register')
    ) {
      return;
    }

    // Get the target href for the register button (now points to the modal)
    var href = document.body.getAttribute('data-register-href') || '#registration-modal';
    var link = document.createElement('a');
    link.className = 'floating-register';
    link.href = href;
    link.textContent = 'Free AI Kit';
    link.setAttribute('data-testid', 'floating-register-btn');
    link.setAttribute('data-form-type', 'free_ai_kit');
    link.setAttribute('data-course-interest', 'Free AI Kit');
    document.body.appendChild(link);
  }

  // Function to inject the floating WhatsApp button
  function injectWhatsAppButton() {
    if (document.querySelector('.floating-whatsapp')) return;

    // Updated WhatsApp number and message as per prompt
    var number = '919641782691'; // +91 9641782691
    var message = "Hi TestNova, I'm interested in learning AI and Technology. Please guide me.";

    var href = 'https://api.whatsapp.com/send?phone=' + encodeURIComponent(number) + '&text=' + encodeURIComponent(message);
    var link = document.createElement('a');
    link.className = 'floating-whatsapp';
    link.href = href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', 'Chat on WhatsApp');
    link.innerHTML = [
      '<svg viewBox="0 0 24 24" aria-hidden="true">',
      '<path d="M20.5 3.5A11 11 0 0 0 3.36 16.8L2 22l5.35-1.33A11 11 0 1 0 20.5 3.5zm-8.54 16a9 9 0 0 1-4.58-1.25l-.33-.19-3.17.79.84-3.09-.21-.32a9 9 0 1 1 7.45 4.06zm4.93-6.72c-.27-.13-1.62-.8-1.87-.89-.25-.09-.43-.13-.61.14-.18.27-.7.89-.85 1.07-.16.18-.31.2-.58.07-.27-.13-1.14-.42-2.16-1.35-.8-.71-1.33-1.6-1.49-1.87-.16-.27-.02-.41.11-.54.12-.12.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.13-.61-1.47-.83-2.01-.22-.54-.45-.47-.61-.48h-.52c-.18 0-.47.07-.72.34s-.94.92-.94 2.25.96 2.62 1.09 2.8c.13.18 1.88 2.87 4.55 4.02.64.28 1.14.45 1.53.57.64.2 1.22.17 1.68.11.51-.08 1.62-.66 1.85-1.3.22-.64.22-1.19.16-1.3-.07-.11-.25-.18-.52-.31z"></path>',
      '</svg>'
    ].join('');
    document.body.appendChild(link);
  }

  // Function to set up mobile navigation toggle
  function setupMobileNav() {
    var navContainer = document.querySelector('.nav-container');
    var siteNav = document.querySelector('.site-nav');
    if (!navContainer || !siteNav) return;

    var existing = navContainer.querySelector('.nav-toggle');
    if (existing) return;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'nav-toggle';
    btn.setAttribute('aria-label', 'Toggle navigation');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('data-testid', 'nav-toggle');
    btn.innerHTML = '<span></span>';
    navContainer.insertBefore(btn, siteNav);

    btn.addEventListener('click', function () {
      var open = siteNav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    siteNav.addEventListener('click', function (event) {
      var target = event.target;
      if (target && target.tagName === 'A' && siteNav.classList.contains('open')) {
        siteNav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('click', function (event) {
      if (!siteNav.classList.contains('open')) return;
      if (navContainer.contains(event.target)) return;

      siteNav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  }

  // Function to set up mobile sidebar toggle for "On this page" sections
  function setupMobileSidebar() {
    var sidebar = document.querySelector('.page-sidebar');
    var sidebarToggle = document.querySelector('.sidebar-toggle');
    var sidebarNavContent = document.querySelector('.sidebar-nav-content');
    var mobileQuery = window.matchMedia('(max-width: 980px)');

    if (!sidebar || !sidebarToggle || !sidebarNavContent) return;

    if (!sidebarNavContent.id) {
      sidebarNavContent.id = 'page-sidebar-nav';
    }
    sidebarToggle.setAttribute('aria-controls', sidebarNavContent.id);

    function setSidebarOpen(isOpen) {
      sidebar.classList.toggle('open', isOpen);
      sidebarToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }

    function syncSidebarForViewport() {
      if (mobileQuery.matches) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    }

    sidebarToggle.addEventListener('click', function() {
      setSidebarOpen(!sidebar.classList.contains('open'));
    });

    sidebarNavContent.addEventListener('click', function(event) {
      var target = event.target;
      if (target && target.tagName === 'A' && sidebar.classList.contains('open') && mobileQuery.matches) {
        setSidebarOpen(false);
      }
    });

    document.addEventListener('click', function(event) {
      if (!mobileQuery.matches || !sidebar.classList.contains('open')) return;
      if (sidebar.contains(event.target)) return;

      setSidebarOpen(false);
    });

    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && mobileQuery.matches && sidebar.classList.contains('open')) {
        setSidebarOpen(false);
        sidebarToggle.focus();
      }
    });

    if (mobileQuery.addEventListener) {
      mobileQuery.addEventListener('change', syncSidebarForViewport);
    } else {
      mobileQuery.addListener(syncSidebarForViewport);
    }

    syncSidebarForViewport();
  }

  // Function to set up active state and offset scrolling for "On this page" links
  function setupPageSidebarLinks() {
    var pageSidebar = document.querySelector('.page-sidebar');
    var topbar = document.querySelector('.topbar');
    var sidebarLinks = Array.prototype.slice.call(document.querySelectorAll('.page-sidebar .sidebar-link[href^="#"]'));
    if (!pageSidebar || !sidebarLinks.length) return;

    var sections = sidebarLinks
      .map(function(link) {
        return document.querySelector(link.getAttribute('href'));
      })
      .filter(Boolean);

    if (!sections.length) return;

    function shouldScrollActiveLinkIntoView() {
      var hasScrollableSidebar = pageSidebar.scrollHeight > pageSidebar.clientHeight + 1;
      var isDesktopSidebar = window.matchMedia('(min-width: 981px)').matches;
      return hasScrollableSidebar && isDesktopSidebar;
    }

    function scrollToSection(target) {
      if (!target) return;

      var topbarOffset = topbar ? topbar.getBoundingClientRect().height : 0;
      var targetTop = target.getBoundingClientRect().top + window.scrollY;
      var scrollTop = Math.max(targetTop - topbarOffset - 16, 0);

      window.scrollTo({
        top: scrollTop,
        behavior: 'smooth'
      });
    }

    function setActive(id) {
      sidebarLinks.forEach(function(link) {
        var isMatch = link.getAttribute('href') === '#' + id;
        link.classList.toggle('active', isMatch);
        if (isMatch) {
          link.setAttribute('aria-current', 'true');
          if (shouldScrollActiveLinkIntoView()) {
            link.scrollIntoView({ block: 'nearest', inline: 'nearest' });
          }
        } else {
          link.removeAttribute('aria-current');
        }
      });
    }

    sidebarLinks.forEach(function(link) {
      link.addEventListener('click', function(event) {
        var href = link.getAttribute('href');
        var id = href.slice(1);
        var target = document.getElementById(id);
        if (!target) return;

        event.preventDefault();
        scrollToSection(target);
        setActive(id);

        if (window.history && window.history.replaceState) {
          window.history.replaceState(null, '', '#' + id);
        }
      });
    });

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(
        function(entries) {
          var visible = entries
            .filter(function(entry) { return entry.isIntersecting; })
            .sort(function(a, b) { return b.intersectionRatio - a.intersectionRatio; });
          if (visible.length) {
            setActive(visible[0].target.id);
          }
        },
        {
          rootMargin: '-20% 0px -65% 0px',
          threshold: [0.05, 0.2, 0.4]
        }
      );

      sections.forEach(function(section) {
        observer.observe(section);
      });
    } else {
      var onScroll = function() {
        var current = sections[0];
        sections.forEach(function(section) {
          if (window.scrollY + 140 >= section.offsetTop) {
            current = section;
          }
        });
        if (current) setActive(current.id);
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    var initialHash = window.location.hash.replace('#', '');
    if (initialHash) {
      setActive(initialHash);
    } else {
      setActive(sections[0].id);
    }
  }

  function normalizedText(node) {
    return (node && node.textContent ? node.textContent : '').replace(/\s+/g, ' ').trim();
  }

  function inferSelectedCategory(value) {
    var text = (value || '').toLowerCase();
    if (/selenium|playwright|api|rest|cucumber|hybrid|jenkins|qa/.test(text)) return 'QA Engineering';
    if (/java|python|javascript|typescript|devops|cloud|sql|git|development/.test(text)) return 'Development Technologies';
    if (/ai|prompt|machine learning|blockchain|web3|iot/.test(text)) return 'AI & Emerging Technologies';
    if (/corporate/.test(text)) return 'Corporate Training';
    if (/resume|linkedin|mock|career|job/.test(text)) return 'Career Services';
    return '';
  }

  function inferFormContext(trigger, fallbackSource, fallbackCourse) {
    var page = currentPageName();
    var label = normalizedText(trigger);
    var courseInterest = trigger ? (trigger.getAttribute('data-course-interest') || fallbackCourse || '') : (fallbackCourse || '');
    var explicitType = trigger ? trigger.getAttribute('data-form-type') : '';
    var selected = courseInterest || (document.querySelector('h1') ? document.querySelector('h1').textContent.trim() : '');
    var combined = [label, courseInterest, page].join(' ').toLowerCase();
    var formType = explicitType || 'register';

    if (!explicitType) {
      if (/free ai kit|free ai starter kit|free ai toolkit|download free|free .*guide|free .*roadmap|free .*template|free .*cheat|free .*checklist|free .*questions|grab cheat|get roadmap|download now/.test(combined)) {
        formType = 'free_ai_kit';
      } else if (/view course|start learning|open topic|learning hub|access content|get access|browse topics|learn more|download notes/.test(combined)) {
        formType = 'learning';
      } else if (/resume review|linkedin optimization|mock interview|career guidance|job assistance|book consultation|free consultation/.test(combined) || page === 'career-services.html') {
        formType = 'career';
      } else if (/corporate training|contact sales|request corporate|team training/.test(combined) || page === 'corporate-training.html') {
        formType = 'corporate';
      } else if (/contact|send an inquiry|send message|schedule now/.test(combined) || page === 'contact.html') {
        formType = 'contact';
      }
    }

    if (formType === 'learning' && !selected) selected = 'Learning Hub Access';
    if (formType === 'free_ai_kit') selected = selected || 'Free AI Kit';

    return {
      formType: formType,
      formSource: fallbackSource || 'website',
      sourceButton: label || 'Register',
      courseInterest: courseInterest,
      selectedCourse: selected,
      selectedTopic: selected,
      selectedCategory: inferSelectedCategory(selected),
      serviceRequired: formType === 'career' ? courseInterest : '',
      enquiryType: formType === 'contact' ? '' : ''
    };
  }

  function renderContextualForm(modal, modalContentArea, context) {
    if (window.testNovaLeadForms && typeof window.testNovaLeadForms.render === 'function') {
      var def = window.testNovaLeadForms.render(modalContentArea, context);
      var title = modal.querySelector('.modal-title');
      if (title && def && def.title) title.textContent = def.title;
      return;
    }

    modalContentArea.innerHTML = '<p>Form is loading. Please try again in a moment.</p>';
  }

  // Generic modal setup function
  function setupModal(modalId, formSource, courseInterestDefault) {
    var modal = document.getElementById(modalId);
    if (!modal) return;

    var modalContentArea = modal.querySelector('.modal-content');
    var modalTriggers = document.querySelectorAll('a[href="#' + modalId + '"]');
    var closeButtons = modal.querySelectorAll('[data-micromodal-close]');

    function openModal(courseInterest, accessUrl, trigger) {
      var context = inferFormContext(trigger || null, formSource, courseInterest || courseInterestDefault);
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open'); // Prevent body scroll
      if (accessUrl) {
        window.testnovaPendingAccessUrl = accessUrl;
        sessionStorage.setItem('testnova-pending-access-url', accessUrl);
      }

      renderContextualForm(modal, modalContentArea, context);
    }

    function closeModal() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
      // Clear form messages if any
      var formMessage = modalContentArea.querySelector('.form-message');
      if (formMessage) {
        formMessage.textContent = '';
        formMessage.classList.remove('success', 'error');
      }
    }

    modalTriggers.forEach(function(trigger) {
      trigger.addEventListener('click', function(event) {
        event.preventDefault();
        var courseInterest = trigger.getAttribute('data-course-interest');
        var accessUrl = trigger.getAttribute('data-access-url');
        openModal(courseInterest, accessUrl, trigger);
      });
    });

    closeButtons.forEach(function(button) {
      button.addEventListener('click', closeModal);
    });

    modal.addEventListener('click', function(event) {
      if (event.target === modal.querySelector('.modal-overlay')) {
        closeModal();
      }
    });

    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && modal.classList.contains('is-open')) {
        closeModal();
      }
    });

    return { openModal: openModal, closeModal: closeModal };
  }

  // Function to handle exit intent popup
  function setupExitIntentPopup() {
    var exitIntentModal = document.getElementById('exit-intent-modal');
    if (!exitIntentModal) return;

    var hasShown = localStorage.getItem('testnova-exit-intent-shown');
    if (hasShown) return; // Don't show if already shown once

    // Set default course interest for exit intent to the FREE AI Starter Kit
    var modalHandlers = setupModal('exit-intent-modal', 'exit-intent-popup', 'FREE AI Starter Kit');

    function showExitIntent() {
      if (!exitIntentModal.classList.contains('is-open')) {
        modalHandlers.openModal('FREE AI Starter Kit'); // Pre-fill with Starter Kit
        localStorage.setItem('testnova-exit-intent-shown', 'true'); // Mark as shown
      }
    }

    function isFormInteraction(target) {
      var active = document.activeElement;
      return Boolean(
        (target && target.closest && target.closest('form, input, select, textarea, button, .modal')) ||
        (active && active.closest && active.closest('form, input, select, textarea, button, .modal'))
      );
    }

    // Detect mouse leaving viewport
    document.addEventListener('mouseout', function(e) {
      if (isFormInteraction(e.target)) return;
      if (e.toElement === null || e.relatedTarget === null) {
        // Mouse is leaving the document
        showExitIntent();
      }
    });

    // Optional: Show after a delay if user hasn't interacted much
    // setTimeout(function() {
    //   if (!localStorage.getItem('testnova-exit-intent-shown')) {
    //     showExitIntent();
    //   }
    // }, 30000); // Show after 30 seconds if not already shown
  }

  function setupInviteOnlyCards() {
    var inviteCards = document.querySelectorAll('.invite-card');
    inviteCards.forEach(function (card) {
      card.addEventListener('click', function (event) {
        if (event.target.closest('a, button, input, select, textarea')) return;
        var accessLink = card.querySelector('a[href="#registration-modal"]');
        if (accessLink) accessLink.click();
      });
    });
  }

  var LEARNING_CATEGORIES = [
    {
      id: 'qa-engineering',
      title: 'QA Engineering',
      url: 'qa-engineering.html',
      description: 'Automation, API testing, BDD, CI, and framework skills for practical QA careers.',
      courses: [
        { title: 'Selenium Basics', url: 'selenium.html', difficulty: 'Beginner', summary: 'Browser automation, locators, waits, actions, tables, and Java examples.' },
        { title: 'Playwright with TypeScript', url: 'playwright.html', difficulty: 'Intermediate', summary: 'Modern end-to-end testing with fixtures, selectors, assertions, and reports.' },
        { title: 'API Basics', url: 'api.html', difficulty: 'Beginner', summary: 'HTTP, requests, responses, status codes, JSON, and API testing foundations.' },
        { title: 'REST Assured', url: 'rest.html', difficulty: 'Intermediate', summary: 'Java API automation with request setup, extraction, validation, and assertions.' },
        { title: 'Cucumber BDD', url: 'cucumber.html', difficulty: 'Intermediate', summary: 'Feature files, step definitions, runners, hooks, and readable scenarios.' },
        { title: 'UI Hybrid Framework', url: 'hybrid.html', difficulty: 'Advanced', summary: 'A structured Selenium Java framework with reusable layers and reporting.' },
        { title: 'Jenkins Automation', url: 'jenkins.html', difficulty: 'Intermediate', summary: 'CI job setup, automation pipelines, reports, and scheduled test runs.' },
        { title: 'Master Doc Notes (Java)', url: 'master.html', difficulty: 'Advanced', summary: 'Curated Java and automation notes for interview and project readiness.' }
      ]
    },
    {
      id: 'development-technologies',
      title: 'Development Technologies',
      url: 'development-technologies.html',
      description: 'Programming, cloud, DevOps, data, and version-control skills for builders.',
      courses: [
        { title: 'Java Programming', url: 'java-programming.html', difficulty: 'Beginner', summary: 'Core Java, OOP, collections, exceptions, and coding fundamentals.' },
        { title: 'Python for Automation', url: 'python-automation.html', difficulty: 'Beginner', summary: 'Python scripting, data handling, automation utilities, and practical workflows.' },
        { title: 'JavaScript & Frontend', url: 'javascript-frontend.html', difficulty: 'Beginner', summary: 'HTML, CSS, JavaScript, UI behavior, and frontend fundamentals.' },
        { title: 'TypeScript Deep Dive', url: 'typescript-deep-dive.html', difficulty: 'Intermediate', summary: 'Type-safe JavaScript patterns for scalable frontend and automation projects.' },
        { title: 'DevOps Fundamentals', url: 'devops-fundamentals.html', difficulty: 'Intermediate', summary: 'CI/CD, Docker, Kubernetes concepts, environments, and release workflows.' },
        { title: 'Cloud Platforms', url: 'cloud-platforms.html', difficulty: 'Intermediate', summary: 'AWS and Azure fundamentals for deployment, scaling, and operations.' },
        { title: 'SQL & Database Management', url: 'sql-database-management.html', difficulty: 'Beginner', summary: 'Queries, joins, constraints, and database concepts for real projects.' },
        { title: 'Git & GitHub Essentials', url: 'git-github-essentials.html', difficulty: 'Beginner', summary: 'Version control, branching, pull requests, and team collaboration basics.' }
      ]
    },
    {
      id: 'ai-emerging-technologies',
      title: 'AI & Emerging Technologies',
      url: 'ai-emerging-technologies.html',
      description: 'AI foundations, prompt workflows, agents, ML, Web3, and IoT discovery tracks.',
      courses: [
        { title: 'AI for Beginners', url: 'ai-for-beginners.html', difficulty: 'Beginner', summary: 'AI concepts, practical usage, limitations, and everyday productivity workflows.' },
        { title: 'Prompt Engineering', url: 'prompt-engineering.html', difficulty: 'Beginner', summary: 'Prompt structure, context, iteration, evaluation, and reusable prompt systems.' },
        { title: 'AI Agents & Automation', url: 'ai-agents-automation.html', difficulty: 'Intermediate', summary: 'Agent workflows, tool use, automation patterns, and practical AI systems.' },
        { title: 'Machine Learning Fundamentals', url: 'machine-learning-fundamentals.html', difficulty: 'Intermediate', summary: 'ML concepts, model thinking, datasets, training, evaluation, and use cases.' },
        { title: 'Blockchain & Web3 Basics', url: 'blockchain-web3-basics.html', difficulty: 'Beginner', summary: 'Blockchain concepts, wallets, smart contracts, and Web3 fundamentals.' },
        { title: 'IoT Essentials', url: 'iot-essentials.html', difficulty: 'Beginner', summary: 'Connected devices, sensors, data flow, protocols, and IoT solution basics.' }
      ]
    }
  ];

  function currentPageName() {
    return (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  }

  function renderLearningNav() {
    var siteNavs = document.querySelectorAll('.site-nav');
    if (!siteNavs.length) return;

    var page = currentPageName();
    var isLearning = ['learning-hub.html', 'qa-engineering.html', 'development-technologies.html', 'ai-emerging-technologies.html', 'tech-courses.html', 'ai-courses.html'].indexOf(page) !== -1 || document.body.classList.contains('learning-page');
    var navHtml = [
      '<a' + (page === 'index.html' ? ' class="active"' : '') + ' href="index.html">Home</a>',
      '<div class="has-mega-menu learning-dropdown">',
      '<a' + (isLearning ? ' class="active"' : '') + ' href="learning-hub.html">Learning Hub</a>',
      '<div class="mega-menu compact-learning-menu">',
      '<a href="qa-engineering.html">QA Engineering</a>',
      '<a href="development-technologies.html">Development Technologies</a>',
      '<a href="ai-emerging-technologies.html">AI &amp; Emerging Technologies</a>',
      '</div>',
      '</div>',
      '<a' + (page === 'career-services.html' ? ' class="active"' : '') + ' href="career-services.html">Career Services</a>',
      '<a' + (page === 'corporate-training.html' ? ' class="active"' : '') + ' href="corporate-training.html">Corporate Training</a>',
      '<a' + (page === 'about.html' ? ' class="active"' : '') + ' href="about.html">About</a>',
      '<a' + (page === 'contact.html' ? ' class="active"' : '') + ' href="contact.html">Contact</a>',
      '<a class="nav-register" href="#registration-modal" data-form-type="register">Register</a>'
    ].join('');

    siteNavs.forEach(function(nav) {
      nav.innerHTML = navHtml;
    });
  }

  function courseCardHtml(course) {
    return [
      '<article class="glass-card course-discovery-card invite-card">',
      '<div class="course-card-top">',
      '<span class="difficulty-badge">' + course.difficulty + '</span>',
      '<span class="access-badge">Invite Only / Access Required</span>',
      '</div>',
      '<h3>' + course.title + '</h3>',
      '<p>' + course.summary + '</p>',
      '<a href="#registration-modal" class="primary-btn gated-action" data-course-interest="' + course.title + '" data-access-url="' + course.url + '">View Course</a>',
      '</article>'
    ].join('');
  }

  function renderCategoryCards() {
    var containers = document.querySelectorAll('[data-learning-category]');
    containers.forEach(function(container) {
      var category = LEARNING_CATEGORIES.find(function(item) {
        return item.id === container.getAttribute('data-learning-category');
      });
      if (!category) return;

      container.innerHTML = category.courses.map(courseCardHtml).join('');
    });

    var hubContainer = document.querySelector('[data-learning-hub-categories]');
    if (hubContainer) {
      hubContainer.innerHTML = LEARNING_CATEGORIES.map(function(category) {
        return [
          '<article class="glass-card category-discovery-card invite-card">',
          '<span class="access-badge">Invite Only</span>',
          '<h3>' + category.title + '</h3>',
          '<p>' + category.description + '</p>',
          '<div class="pill-row">',
          category.courses.slice(0, 4).map(function(course) { return '<span class="topic-pill">' + course.title + '</span>'; }).join(''),
          '</div>',
          '<a class="primary-btn gated-action" href="#registration-modal" data-form-type="learning" data-course-interest="' + category.title + '" data-access-url="' + category.url + '">Browse Topics</a>',
          '</article>'
        ].join('');
      }).join('');
    }
  }

  function setupGatedActions() {
    var gatedLabels = /^(View Course|Start Learning|Open Topic|Download Notes|Access Content|Browse Topics|Learn More)$/i;
    var links = document.querySelectorAll('a, button');
    var hasAccess = sessionStorage.getItem('testnova-learning-access') === 'granted';

    links.forEach(function(link) {
      var label = (link.textContent || '').replace(/\s+/g, ' ').trim();
      var directCourseUrl = link.matches('a') ? link.getAttribute('href') : '';
      var existingAccessUrl = link.getAttribute('data-access-url');
      var isGatedLabel = gatedLabels.test(label);
      var isExplicit = link.classList.contains('gated-action') || link.hasAttribute('data-access-url');

      if (!isGatedLabel && !isExplicit) return;

      if (hasAccess && existingAccessUrl && link.matches('a')) {
        link.setAttribute('href', existingAccessUrl);
        link.classList.remove('gated-action');
        return;
      }

      if (directCourseUrl && directCourseUrl !== '#registration-modal' && !directCourseUrl.startsWith('#')) {
        link.setAttribute('data-access-url', directCourseUrl);
      }

      link.setAttribute('href', '#registration-modal');
      link.classList.add('gated-action');
      if (!link.getAttribute('data-course-interest')) {
        link.setAttribute('data-course-interest', document.querySelector('h1') ? document.querySelector('h1').textContent.trim() : 'Learning Hub Access');
      }
    });
  }

  function setupContextualLeadActions() {
    var actionPattern = /^(Register|Register Interest|Register Your Interest|Register Interest for Updates|Request Access|Book Consultation|Send an Inquiry|Send Message|Schedule Now|Contact Sales|Free AI Kit|Download Free AI Kit|Download FREE Cheat Sheet|Download FREE Guide|Download FREE Roadmap|Get Roadmap|Grab Cheat Sheet|Download Template|Download Now)$/i;
    var page = currentPageName();

    document.querySelectorAll('a, button').forEach(function(action) {
      var label = normalizedText(action);
      var href = action.matches('a') ? (action.getAttribute('href') || '') : '';
      var isNavLink = action.closest('.site-nav') && !action.classList.contains('nav-register');
      var isFooterLink = action.closest('.site-footer') && !action.classList.contains('primary-btn') && !action.classList.contains('secondary-btn');
      var hasLeadHref = href === '#registration-modal';
      var isLeadLabel = actionPattern.test(label);
      var isContextButton = action.classList.contains('primary-btn') || action.classList.contains('secondary-btn') || action.classList.contains('nav-register') || action.classList.contains('floating-register');

      if (isNavLink || isFooterLink) return;
      if (!hasLeadHref && (!isLeadLabel || !isContextButton)) return;

      if (action.matches('a')) {
        if (href && href !== '#registration-modal' && !href.startsWith('#') && !action.getAttribute('data-access-url')) {
          action.setAttribute('data-original-href', href);
        }
        action.setAttribute('href', '#registration-modal');
      }

      if (!action.getAttribute('data-form-type')) {
        var context = inferFormContext(action, 'website', action.getAttribute('data-course-interest') || '');
        action.setAttribute('data-form-type', context.formType);
      }

      if (!action.getAttribute('data-course-interest')) {
        if (page === 'corporate-training.html') {
          action.setAttribute('data-course-interest', 'Corporate Training');
        } else if (page === 'contact.html') {
          action.setAttribute('data-course-interest', 'Contact Page Inquiry');
        } else if (page === 'career-services.html') {
          action.setAttribute('data-course-interest', label);
        }
      }
    });
  }

  function setupLearningContentGate() {
    var gatedPages = LEARNING_CATEGORIES.reduce(function(list, category) {
      category.courses.forEach(function(course) { list.push(course.url); });
      return list;
    }, []);
    var page = currentPageName();
    if (gatedPages.indexOf(page) === -1) return;
    if (sessionStorage.getItem('testnova-learning-access') === 'granted') return;

    var main = document.querySelector('main');
    var hero = main ? main.querySelector('.page-hero-section') : null;
    if (!main || !hero) return;

    document.body.classList.add('content-locked');
    Array.prototype.slice.call(main.children).forEach(function(child) {
      if (child !== hero) child.classList.add('locked-content-hidden');
    });

    var title = document.querySelector('h1') ? document.querySelector('h1').textContent.trim() : 'Selected Course';
    var gate = document.createElement('section');
    gate.className = 'nova-section gated-course-panel';
    gate.innerHTML = [
      '<div class="container">',
      '<article class="glass-card access-required-panel">',
      '<span class="access-badge">Invite Only / Access Required</span>',
      '<h2>Unlock ' + title + '</h2>',
      '<p>This course page is protected. Submit the access form to continue into the full lessons, notes, examples, and downloads.</p>',
      '<div class="hero-actions">',
      '<a href="#registration-modal" class="primary-btn gated-action" data-course-interest="' + title + '" data-access-url="' + page + '">Get Access</a>',
      '<a href="learning-hub.html" class="secondary-btn">Browse Learning Hub</a>',
      '</div>',
      '</article>',
      '</div>'
    ].join('');
    hero.insertAdjacentElement('afterend', gate);
  }

  function removeDocumentationNavigation() {
    document.querySelectorAll('.breadcrumb, .page-sidebar').forEach(function(node) {
      node.remove();
    });
  }

  // Function to sync footer year
  function syncFooterYear() {
    var yearNodes = document.querySelectorAll('[data-year]');
    var year = String(new Date().getFullYear());
    yearNodes.forEach(function (node) {
      node.textContent = year;
    });
  }

  // Initialize all functions
  function init() {
    renderLearningNav();
    removeDocumentationNavigation();
    renderCategoryCards();
    setupGatedActions();
    setupContextualLeadActions();
    setupLearningContentGate();
    injectRegisterButton();
    setupContextualLeadActions();
    injectWhatsAppButton();
    setupMobileNav();
    setupMobileSidebar();
    setupPageSidebarLinks();
    window.registrationModalHandlers = setupModal('registration-modal', 'main-registration', 'General Inquiry'); // Expose handlers if needed
    setupInviteOnlyCards();
    setupExitIntentPopup(); // New exit intent popup setup
    syncFooterYear();
  }

  // Run init when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
