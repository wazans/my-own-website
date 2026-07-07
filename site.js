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

    var href = document.body.getAttribute('data-register-href') || '/registration/';
    var link = document.createElement('a');
    link.className = 'floating-register';
    link.href = href;
    link.textContent = 'Register';
    link.setAttribute('data-testid', 'floating-register-btn');
    link.setAttribute('data-form-type', 'register');
    link.setAttribute('data-course-interest', 'General Inquiry');
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

  function setupAnchorLandingOffsets() {
    var ignoredHashes = {
      '#registration-modal': true,
      '#exit-intent-modal': true
    };

    function samePageUrl(url) {
      return url.origin === window.location.origin &&
        url.pathname.replace(/\/$/, '') === window.location.pathname.replace(/\/$/, '');
    }

    function targetFromHash(hash) {
      if (!hash || ignoredHashes[hash]) return null;

      try {
        return document.getElementById(decodeURIComponent(hash.slice(1)));
      } catch (error) {
        return document.querySelector(hash);
      }
    }

    function scrollToHashTarget(hash, behavior) {
      var target = targetFromHash(hash);
      if (!target || target.closest('.modal')) return false;

      var topbar = document.querySelector('.topbar');
      var topbarOffset = topbar ? topbar.getBoundingClientRect().height : 0;
      var targetTop = target.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: Math.max(targetTop - topbarOffset - 18, 0),
        behavior: behavior || 'smooth'
      });
      return true;
    }

    document.addEventListener('click', function(event) {
      if (event.defaultPrevented) return;
      var link = event.target.closest ? event.target.closest('a[href*="#"]') : null;
      if (!link) return;

      var href = link.getAttribute('href');
      if (!href || href === '#') return;

      var url;
      try {
        url = new URL(href, window.location.href);
      } catch (error) {
        return;
      }

      if (!samePageUrl(url) || !url.hash || ignoredHashes[url.hash]) return;
      if (!scrollToHashTarget(url.hash, 'smooth')) return;

      event.preventDefault();
      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', url.hash);
      }
    });

    function correctInitialHash() {
      if (window.location.hash) {
        scrollToHashTarget(window.location.hash, 'auto');
      }
    }

    window.addEventListener('hashchange', function() {
      window.setTimeout(function() {
        scrollToHashTarget(window.location.hash, 'smooth');
      }, 0);
    });

    window.requestAnimationFrame(correctInitialHash);
    window.setTimeout(correctInitialHash, 120);
    window.addEventListener('load', function() {
      window.setTimeout(correctInitialHash, 0);
    });
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
    var modalContainer = modal.querySelector('.modal-container');
    var modalOverlay = modal.querySelector('.modal-overlay');
    var modalTriggers = document.querySelectorAll('a[href="#' + modalId + '"]');
    var closeButtons = modal.querySelectorAll('.modal-close, [data-modal-close]');

    if (modalContainer && !modalContainer.dataset.modalEventsContained) {
      modalContainer.dataset.modalEventsContained = 'true';
      [
        'click',
        'mousedown',
        'mouseup',
        'pointerdown',
        'pointerup',
        'touchstart',
        'touchend',
        'input',
        'change',
        'focusin',
        'focusout'
      ].forEach(function(eventName) {
        modalContainer.addEventListener(eventName, function(event) {
          event.stopPropagation();
        });
      });

      modalContainer.addEventListener('keydown', function(event) {
        if (event.key !== 'Escape') {
          event.stopPropagation();
        }
      });
    }

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
      button.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        closeModal();
      });
    });

    modal.addEventListener('click', function(event) {
      if (modalOverlay && event.target === modalOverlay) {
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
      title: 'AI Learning Hub',
      url: 'ai-emerging-technologies.html',
      description: 'Choose between AI for Everyone and AI Engineers, each with focused reader pages, progress, and editable lessons.',
      courses: [
        { title: 'AI for Everyone', url: 'ai-for-everyone.html', difficulty: 'Beginner', summary: 'AI basics, ChatGPT, LLMs, prompts, embeddings, fine tuning, RAG, and agentic AI.' },
        { title: 'AI Engineers', url: 'ai-engineers.html', difficulty: 'Intermediate', summary: 'AI implementation workflows, model APIs, structured output, RAG systems, agents, evaluation, and automation.' },
        { title: 'AI for Beginners', url: 'ai-for-beginners.html', difficulty: 'Beginner', summary: 'AI concepts, practical usage, limitations, and everyday productivity workflows.' },
        { title: 'Prompt Engineering', url: 'prompt-engineering.html', difficulty: 'Beginner', summary: 'Prompt structure, context, iteration, evaluation, and reusable prompt systems.' },
        { title: 'AI Agents & Automation', url: 'ai-agents-automation.html', difficulty: 'Intermediate', summary: 'Agent workflows, tool use, automation patterns, and practical AI systems.' }
      ]
    }
  ];

  var AI_LEARNING_TRACKS = [
    {
      id: 'ai-for-everyone',
      tree: 'everyone',
      title: 'AI for Everyone',
      eyebrow: 'Beginner AI track',
      description: 'Foundational AI literacy, tools, prompts, automation, local AI, and practical projects for any learner.',
      modules: [
        {
          title: 'Introduction to AI',
          intro: 'Build the base vocabulary first: AI, ML, deep learning, generative AI, LLMs, prompts, embeddings, fine tuning, RAG, and agentic AI. These notes are intentionally editable so the team can refine examples, add screenshots, and attach exercises later.',
          topics: [
            {
              title: 'Generative AI - Introduction',
              summary: 'Generative AI creates new content from learned patterns. It can draft text, summarize documents, write code, generate images, build test ideas, and transform raw information into useful formats.',
              bullets: [
                'Traditional software follows explicit rules; generative AI predicts useful outputs from patterns learned during training.',
                'Common outputs include text, code, images, audio, video, test cases, documentation, and structured JSON.',
                'The user guides the model with a prompt, context, examples, constraints, and feedback.'
              ],
              practice: 'Try asking an AI assistant to explain one QA concept to a beginner, then ask it to rewrite the same answer for a senior automation engineer.'
            },
            {
              title: 'Artificial Intelligence, Machine Learning & Deep Learning',
              summary: 'AI is the broad goal of making machines perform tasks that usually need human intelligence. Machine learning is a major AI approach where systems learn patterns from data. Deep learning is a machine learning approach that uses neural networks with many layers.',
              bullets: [
                'AI includes reasoning, planning, language understanding, perception, and decision support.',
                'Machine learning improves from examples instead of relying only on hand-written rules.',
                'Deep learning is especially strong for language, image, speech, and pattern-heavy tasks.'
              ],
              practice: 'Map one real feature you use daily, such as search suggestions or spam detection, to AI, ML, and deep learning.'
            },
            {
              title: 'Generative AI - Recap',
              summary: 'Generative AI is useful when the task needs creation, transformation, summarization, or ideation. It is not a database and should be checked when accuracy matters.',
              bullets: [
                'Good use cases: first drafts, explanations, brainstorming, code assistance, test design, and documentation support.',
                'Risk areas: hallucinated facts, missing context, biased data, outdated knowledge, and overconfident answers.',
                'Best practice: provide context, specify the output format, verify important claims, and iterate.'
              ],
              practice: 'Take a vague prompt and improve it by adding role, task, context, constraints, and output format.'
            },
            {
              title: 'Explore ChatGPT: Features & Capabilities - Introduction',
              summary: 'ChatGPT can act as a learning assistant, writing partner, coding helper, analysis tool, brainstorming partner, and workflow assistant. Its quality depends heavily on the context and instructions supplied by the user.',
              bullets: [
                'Use it to explain concepts, compare options, draft documents, review code, design tests, and summarize long material.',
                'For better results, provide source material, examples, audience level, and the expected format.',
                'For professional work, treat the output as a strong draft that still needs human review.'
              ],
              practice: 'Ask ChatGPT for a study plan on AI basics, then ask it to convert the plan into a checklist and a quiz.'
            },
            {
              title: 'LLM (Large Language Model)',
              summary: 'An LLM is a model trained on large volumes of text and code to predict and generate language. It does not understand like a human, but it can produce highly useful language and reasoning-like outputs when prompted well.',
              bullets: [
                'LLMs process input as tokens, which are chunks of text such as words, word pieces, or symbols.',
                'Context window means how much information the model can consider at one time.',
                'LLMs are strong at language patterns, summarization, classification, extraction, and code assistance.'
              ],
              practice: 'Give an LLM a short bug report and ask it to extract severity, steps, expected result, actual result, and missing information.'
            },
            {
              title: 'Prompt Engineering',
              summary: 'Prompt engineering is the practice of giving clear instructions, context, examples, and constraints so the model can produce the desired output consistently.',
              bullets: [
                'A strong prompt defines role, goal, context, input data, constraints, output format, and quality criteria.',
                'Few-shot prompting uses examples to show the model what good output looks like.',
                'Prompt iteration is normal: inspect the first answer, identify what is missing, then refine.'
              ],
              practice: 'Write a prompt that turns a user story into positive, negative, boundary, and edge test cases.'
            },
            {
              title: 'Embeddings',
              summary: 'Embeddings convert text into numeric vectors that capture meaning. They make semantic search possible, which means finding related content by meaning instead of only matching exact keywords.',
              bullets: [
                'Similar ideas are placed near each other in vector space.',
                'Embeddings are commonly used for search, recommendations, clustering, duplicate detection, and RAG.',
                'For learning platforms, embeddings can help retrieve the right lesson, note, or FAQ for a user question.'
              ],
              practice: 'Compare keyword search and semantic search by searching for "login fails" versus "user cannot access account."'
            },
            {
              title: 'Fine Tuning',
              summary: 'Fine tuning adapts a model using additional examples so it follows a specific style, domain, or task pattern more reliably. It is useful when prompts and retrieval are not enough.',
              bullets: [
                'Fine tuning changes model behavior; RAG supplies external knowledge at answer time.',
                'Use fine tuning for repeated output style, classification patterns, or domain-specific response formats.',
                'Use clean, representative examples. Poor training examples create poor model behavior.'
              ],
              practice: 'List three situations where prompt templates are enough and one situation where fine tuning might be justified.'
            },
            {
              title: 'Recap - Summary View',
              summary: 'AI is the broad field, ML learns from data, deep learning uses neural networks, generative AI creates new outputs, and LLMs are language-focused generative models.',
              bullets: [
                'Prompts control the task and output.',
                'Embeddings help retrieve meaning-based matches.',
                'Fine tuning changes model behavior for repeated patterns.',
                'RAG combines retrieval with generation to reduce missing context.'
              ],
              practice: 'Explain AI, ML, deep learning, generative AI, LLM, embeddings, fine tuning, and RAG in one sentence each.'
            },
            {
              title: 'Retrieval Augmented Generation (RAG)',
              summary: 'RAG connects a model to external knowledge. The system retrieves relevant content from documents, notes, databases, or websites, then asks the model to answer using that context.',
              bullets: [
                'RAG helps when answers need private, current, or domain-specific information.',
                'A typical flow is: user question, retrieve relevant chunks, pass chunks to the model, generate grounded answer.',
                'Quality depends on document preparation, chunking, embeddings, retrieval ranking, and answer instructions.'
              ],
              practice: 'Design a simple RAG flow for a TestNova FAQ bot that answers questions from course notes.'
            },
            {
              title: 'Agentic AI - Building Our Own Chat Bot',
              summary: 'Agentic AI uses a model plus tools, memory, planning, and workflow steps to complete tasks. A chatbot becomes more useful when it can retrieve content, call tools, remember context, and guide the user through a process.',
              bullets: [
                'A basic chatbot answers from the model and supplied context.',
                'An agent can decide when to search notes, call an API, create a ticket, draft a file, or ask a follow-up question.',
                'Start simple: define the bot purpose, knowledge source, allowed actions, guardrails, and handoff path.'
              ],
              practice: 'Sketch a chatbot for AI learners: welcome message, knowledge source, three allowed actions, and one fallback when it is unsure.'
            }
          ]
        },
        { title: 'ChatGPT & LLM Fundamentals', topics: ['ChatGPT Basics', 'GPT Models', 'Claude', 'Gemini', 'Grok', 'Perplexity', 'NotebookLM', 'Comparing AI Models'] },
        { title: 'Prompt Engineering', topics: ['Writing Effective Prompts', 'Role Prompting', 'Zero Shot', 'Few Shot', 'Chain of Thought', 'Prompt Chaining', 'Image Prompts', 'Prompt Templates'] },
        { title: 'AI Productivity', topics: ['Resume', 'Email Writing', 'Presentation', 'Excel', 'Documentation', 'Research', 'Translation', 'Learning Assistant'] },
        { title: 'AI Image, Video & Content', topics: ['ChatGPT Images', 'Canva AI', 'Adobe Express AI', 'Midjourney', 'Leonardo AI', 'ElevenLabs', 'HeyGen', 'Content Creation'] },
        { title: 'AI Automation', topics: ['AI Agents', 'MCP Basics', 'n8n', 'Zapier', 'Make.com', 'Simple Workflows', 'Business Automation'] },
        { title: 'Local AI', topics: ['Ollama', 'Llama', 'Gemma', 'Running AI Offline', 'Local Models', 'Privacy & Security'] },
        { title: 'Real Projects', topics: ['Personal Assistant', 'Resume Builder', 'Study Assistant', 'Content Generator', 'AI Chatbot', 'Business Assistant'] }
      ]
    },
    {
      id: 'ai-engineers',
      tree: 'qa',
      title: 'AI Engineers',
      eyebrow: 'Builder AI track',
      description: 'Practical AI implementation workflows for model APIs, RAG, agents, automation, evaluation, and production readiness.',
      modules: [
        { title: 'AI for Manual Testing', topics: ['Requirement Analysis', 'Test Scenarios', 'Test Cases', 'Test Data', 'BDD Scenarios', 'Bug Reports', 'Exploratory Testing', 'Test Documentation'] },
        { title: 'AI for Selenium', topics: ['Generate Automation Scripts', 'Explain Existing Code', 'Debug Selenium Scripts', 'Self-Healing Concepts', 'Smart Locators', 'Framework Assistance'] },
        { title: 'AI for Playwright', topics: ['Generate Playwright Tests', 'Smart Locators', 'Complex Workflows', 'Code Explanation', 'Framework Support', 'Debugging'] },
        { title: 'AI for API Testing', topics: ['Postman', 'REST Assured', 'API Test Generation', 'JSON Validation', 'Mock APIs', 'API Documentation'] },
        { title: 'AI with OpenAI API', topics: ['API Keys', 'Models', 'Sending Requests', 'Reading Responses', 'JSON Output', 'Structured Output', 'Error Handling'] },
        { title: 'Vision AI for Testing', topics: ['Image Comparison', 'Visual Testing', 'OCR Basics', 'Screenshot Validation', 'UI Verification'] },
        { title: 'Local LLM for Testing', topics: ['Ollama Integration', 'Local AI API', 'Local Prompting', 'Selenium + Local AI', 'Playwright + Local AI'] },
        { title: 'AI Coding Assistants', topics: ['ChatGPT', 'Codex', 'GitHub Copilot', 'Gemini Code Assist', 'Cursor', 'Windsurf', 'Claude Code'] },
        { title: 'AI Framework Development', topics: ['Framework Design', 'POM', 'Utilities', 'Reporting', 'Data Driven', 'CI/CD', 'Git Integration'] },
        { title: 'AI Interview Preparation', topics: ['Resume Review', 'Mock Interviews', 'Selenium Questions', 'Playwright Questions', 'API Questions', 'AI Questions', 'Coding Questions'] },
        { title: 'End-to-End Projects', topics: ['OrangeHRM Automation', 'SauceDemo Automation', 'Playwright Framework', 'Selenium Framework', 'API Automation Framework', 'AI Powered Test Generator', 'CI/CD Project'] }
      ]
    }
  ];

  function currentPageName() {
    var pathname = window.location.pathname.toLowerCase();
    if (/\/registration\/?$/.test(pathname)) return 'registration';
    return (pathname.split('/').pop() || 'index.html').toLowerCase();
  }

  function aiEmergingCategory() {
    return LEARNING_CATEGORIES.find(function(category) {
      return category.id === 'ai-emerging-technologies';
    });
  }

  function isUnlockedAiCourseUrl(url) {
    var category = aiEmergingCategory();
    if (!category || !url) return false;
    if (['ai-emerging-technologies.html', '/ai-emerging-technologies.html', 'ai-for-everyone.html', '/ai-for-everyone.html', 'ai-engineers.html', '/ai-engineers.html'].indexOf(url) !== -1) return true;
    return category.courses.some(function(course) {
      return course.url === url;
    });
  }

  function isAiEmergingPage() {
    return ['ai-emerging-technologies.html', 'ai-for-everyone.html', 'ai-engineers.html'].indexOf(currentPageName()) !== -1;
  }

  function renderLearningNav() {
    var siteNavs = document.querySelectorAll('.site-nav');
    if (!siteNavs.length) return;

    var page = currentPageName();
    var isLearning = ['learning-hub.html', 'qa-engineering.html', 'development-technologies.html', 'ai-emerging-technologies.html', 'ai-for-everyone.html', 'ai-engineers.html', 'tech-courses.html', 'ai-courses.html'].indexOf(page) !== -1 || document.body.classList.contains('learning-page');
    var navHtml = [
      '<a' + (page === 'index.html' ? ' class="active"' : '') + ' href="/index.html">Home</a>',
      '<div class="has-mega-menu learning-dropdown">',
      '<a' + (isLearning ? ' class="active"' : '') + ' href="/learning-hub.html">Learning Hub</a>',
      '<div class="mega-menu compact-learning-menu">',
      '<a href="/qa-engineering.html">QA Engineering</a>',
      '<a href="/development-technologies.html">Development Technologies</a>',
      '<a href="/ai-emerging-technologies.html">AI Learning Hub</a>',
      '</div>',
      '</div>',
      '<a' + (page === 'career-services.html' ? ' class="active"' : '') + ' href="/career-services.html">Career Services</a>',
      '<a' + (page === 'corporate-training.html' ? ' class="active"' : '') + ' href="/corporate-training.html">Corporate Training</a>',
      '<a' + (page === 'about.html' ? ' class="active"' : '') + ' href="/about.html">About</a>',
      '<a' + (page === 'contact.html' ? ' class="active"' : '') + ' href="/contact.html">Contact</a>',
      '<a class="nav-register' + (page === 'registration' || page === 'register.html' ? ' active' : '') + '" href="/registration/">Register</a>'
    ].join('');

    siteNavs.forEach(function(nav) {
      nav.innerHTML = navHtml;
    });
  }

  function courseCardHtml(course, unlocked) {
    var accessBadge = unlocked ? '<span class="access-badge open-access-badge">Open Access</span>' : '<span class="access-badge">Access Required</span>';
    var action = unlocked
      ? '<a href="' + course.url + '" class="primary-btn">View Course</a>'
      : '<a href="#registration-modal" class="primary-btn gated-action" data-course-interest="' + course.title + '" data-access-url="' + course.url + '">View Course</a>';

    return [
      '<article class="glass-card course-discovery-card invite-card">',
      '<div class="course-card-top">',
      '<span class="difficulty-badge">' + course.difficulty + '</span>',
      accessBadge,
      '</div>',
      '<h3>' + course.title + '</h3>',
      '<p>' + course.summary + '</p>',
      action,
      '</article>'
    ].join('');
  }

  function slugify(value) {
    return String(value || '')
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function topicTitle(topic) {
    return typeof topic === 'string' ? topic : topic.title;
  }

  function topicContentHtml(topic) {
    if (typeof topic === 'string') return '';

    return [
      topic.summary ? '<p class="ai-topic-summary">' + escapeHtml(topic.summary) + '</p>' : '',
      topic.bullets && topic.bullets.length ? '<ul class="ai-topic-bullets">' + topic.bullets.map(function(item) {
        return '<li>' + escapeHtml(item) + '</li>';
      }).join('') + '</ul>' : '',
      topic.practice ? '<div class="ai-topic-practice"><strong>Try this:</strong><span>' + escapeHtml(topic.practice) + '</span></div>' : '',
      '<div class="ai-edit-placeholder"><strong>Editing placeholder:</strong><span>Add screenshots, examples, transcript notes, quiz questions, or trainer comments here.</span></div>'
    ].join('');
  }

  function renderAiLearningHub() {
    var container = document.querySelector('[data-ai-learning-hub]');
    if (!container) return;

    var totalModules = 0;
    var totalTopics = 0;
    var numberNavItems = [];

    container.innerHTML = AI_LEARNING_TRACKS.map(function(track) {
      totalModules += track.modules.length;
      return [
        '<section class="ai-track" id="' + track.id + '">',
        '<div class="ai-track-header">',
        '<span class="section-tag">' + track.eyebrow + '</span>',
        '<h2>' + track.title + '</h2>',
        '<p>' + track.description + '</p>',
        '</div>',
        '<div class="ai-module-grid">',
        track.modules.map(function(module, moduleIndex) {
          var moduleId = track.id + '-' + slugify(module.title);
          totalTopics += module.topics.length;
          numberNavItems.push({
            number: numberNavItems.length + 1,
            title: module.title,
            track: track.title,
            id: moduleId
          });
          return [
            '<article class="glass-card ai-module-card" id="' + moduleId + '">',
            '<div class="ai-module-heading">',
            '<span>Module ' + (moduleIndex + 1) + '</span>',
            '<h3>' + module.title + '</h3>',
            '</div>',
            module.intro ? '<p class="ai-module-intro">' + escapeHtml(module.intro) + '</p>' : '',
            '<div class="ai-topic-list">',
            module.topics.map(function(topic) {
              var title = topicTitle(topic);
              var topicId = moduleId + '-' + slugify(title);
              return [
                '<section class="progress-item ai-topic-item" id="' + topicId + '">',
                '<h4>' + escapeHtml(title) + '</h4>',
                topicContentHtml(topic),
                '</section>'
              ].join('');
            }).join(''),
            '</div>',
            '<a class="text-link ai-module-anchor" href="#' + moduleId + '">' + module.topics.length + ' topics</a>',
            '</article>'
          ].join('');
        }).join(''),
        '</div>',
        '</section>'
      ].join('');
    }).join('');

    var moduleCounter = document.querySelector('[data-ai-total-modules]');
    if (moduleCounter) moduleCounter.textContent = String(totalModules);

    var topicCounter = document.querySelector('[data-ai-total-topics]');
    if (topicCounter) topicCounter.textContent = String(totalTopics);

    var numberNav = document.querySelector('[data-ai-number-nav]');
    if (numberNav) {
      numberNav.innerHTML = numberNavItems.map(function(item) {
        return [
          '<a href="#' + item.id + '">',
          '<span>' + item.number + '</span>',
          '<strong>' + escapeHtml(item.title) + '</strong>',
          '<small>' + escapeHtml(item.track) + '</small>',
          '</a>'
        ].join('');
      }).join('');
    }

    AI_LEARNING_TRACKS.forEach(function(track) {
      var tree = document.querySelector('[data-ai-tree="' + track.tree + '"]');
      if (!tree) return;
      tree.innerHTML = track.modules.map(function(module) {
        return '<li><a href="#' + track.id + '-' + slugify(module.title) + '">' + module.title + '</a></li>';
      }).join('');
    });
  }

  function renderCategoryCards() {
    var containers = document.querySelectorAll('[data-learning-category]');
    containers.forEach(function(container) {
      var category = LEARNING_CATEGORIES.find(function(item) {
        return item.id === container.getAttribute('data-learning-category');
      });
      if (!category) return;

      var unlocked = category.id === 'ai-emerging-technologies';
      container.innerHTML = category.courses.map(function(course) {
        return courseCardHtml(course, unlocked);
      }).join('');
    });

    var hubContainer = document.querySelector('[data-learning-hub-categories]');
    if (hubContainer) {
      hubContainer.innerHTML = LEARNING_CATEGORIES.map(function(category) {
        var unlocked = category.id === 'ai-emerging-technologies';
        return [
          '<article class="glass-card category-discovery-card invite-card">',
          unlocked ? '<span class="access-badge open-access-badge">Open Access</span>' : '<span class="access-badge">Invite Only</span>',
          '<h3>' + category.title + '</h3>',
          '<p>' + category.description + '</p>',
          '<div class="pill-row">',
          category.courses.slice(0, 4).map(function(course) { return '<span class="topic-pill">' + course.title + '</span>'; }).join(''),
          '</div>',
          unlocked
            ? '<a class="primary-btn" href="' + category.url + '">Browse Topics</a>'
            : '<a class="primary-btn gated-action" href="#registration-modal" data-form-type="learning" data-course-interest="' + category.title + '" data-access-url="' + category.url + '">Browse Topics</a>',
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
      if (isAiEmergingPage()) {
        if (existingAccessUrl && link.matches('a')) link.setAttribute('href', existingAccessUrl);
        link.classList.remove('gated-action');
        link.removeAttribute('data-access-url');
        return;
      }
      if (link.matches('a') && isUnlockedAiCourseUrl(directCourseUrl)) return;
      if (existingAccessUrl && isUnlockedAiCourseUrl(existingAccessUrl)) {
        if (link.matches('a')) link.setAttribute('href', existingAccessUrl);
        link.classList.remove('gated-action');
        link.removeAttribute('data-access-url');
        return;
      }

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
    var actionPattern = /^(Register|Register Now|Register Interest|Register Your Interest|Register Interest for Updates|Request Access|Book Consultation|Send an Inquiry|Send Message|Schedule Now|Contact Sales|Free AI Kit|Download Free AI Kit|Download FREE Cheat Sheet|Download FREE Guide|Download FREE Roadmap|Get Roadmap|Grab Cheat Sheet|Download Template|Download Now)$/i;
    var page = currentPageName();
    var hasRegistrationModal = !!document.getElementById('registration-modal');

    document.querySelectorAll('a, button').forEach(function(action) {
      var label = normalizedText(action);
      var href = action.matches('a') ? (action.getAttribute('href') || '') : '';
      var isNavLink = action.closest('.site-nav') && !action.classList.contains('nav-register');
      var isFooterLink = action.closest('.site-footer') && !action.classList.contains('primary-btn') && !action.classList.contains('secondary-btn');
      var hasLeadHref = href === '#registration-modal';
      var isLeadLabel = actionPattern.test(label);
      var isContextButton = action.classList.contains('primary-btn') || action.classList.contains('secondary-btn') || action.classList.contains('nav-register') || action.classList.contains('floating-register');
      var isDirectRegisterAction = /^(Register|Register Now)$/i.test(label) || action.classList.contains('nav-register') || action.classList.contains('floating-register');

      if (isNavLink || isFooterLink) return;
      if (isDirectRegisterAction && action.matches('a')) {
        action.setAttribute('href', '/registration/');
        return;
      }
      if (!hasLeadHref && (!isLeadLabel || !isContextButton)) return;

      if (!hasRegistrationModal) {
        if (action.matches('a') && href === '#registration-modal') {
          action.setAttribute('href', '/registration/');
        }
        return;
      }

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
    if (isUnlockedAiCourseUrl(page)) return;
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
      '<span class="access-badge">Access Required</span>',
      '<h2>Unlock ' + title + '</h2>',
      '<p>Submit the access form to view lessons, notes, and downloads.</p>',
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
    renderAiLearningHub();
    renderCategoryCards();
    setupGatedActions();
    setupContextualLeadActions();
    setupLearningContentGate();
    setupAnchorLandingOffsets();
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
