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
    link.textContent = '🎁 FREE AI Kit'; // Changed text
    link.setAttribute('data-testid', 'floating-register-btn');
    // Add data attribute to pre-fill course interest if applicable
    link.setAttribute('data-course-interest', 'FREE AI Starter Kit'); // Default value
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

    if (!sidebar || !sidebarToggle || !sidebarNavContent) return;

    sidebarToggle.addEventListener('click', function() {
      var isOpen = sidebar.classList.toggle('open');
      sidebarToggle.setAttribute('aria-expanded', isOpen);
    });

    sidebarNavContent.addEventListener('click', function(event) {
      var target = event.target;
      if (target && target.tagName === 'A' && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        sidebarToggle.setAttribute('aria-expanded', false);
      }
    });

    document.addEventListener('click', function(event) {
      if (!sidebar.classList.contains('open')) return;
      if (sidebar.contains(event.target)) return;

      sidebar.classList.remove('open');
      sidebarToggle.setAttribute('aria-expanded', false);
    });
  }

  // Generic modal setup function
  function setupModal(modalId, formSource, courseInterestDefault) {
    var modal = document.getElementById(modalId);
    if (!modal) return;

    var modalContentArea = modal.querySelector('.modal-content');
    var modalTriggers = document.querySelectorAll('a[href="#' + modalId + '"]');
    var closeButtons = modal.querySelectorAll('[data-micromodal-close]');
    var isFormLoaded = false; // Flag to prevent multiple loads

    function openModal(courseInterest) {
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open'); // Prevent body scroll

      if (!isFormLoaded) {
        fetch('registration_form_component.html')
          .then(response => response.text())
          .then(html => {
            modalContentArea.innerHTML = html;
            isFormLoaded = true;
            // Set form_source for the dynamically loaded form
            var form = modalContentArea.querySelector('[data-registration-form]');
            if (form) {
              var sourceInput = form.querySelector('input[name="form_source"]');
              if (sourceInput) sourceInput.value = formSource;
            }
            // Re-initialize registration.js if it has an init function
            if (typeof window.initRegistrationForm === 'function') {
              window.initRegistrationForm();
            }
            prefillCourseInterest(courseInterest);
          })
          .catch(error => {
            console.error('Error loading registration form:', error);
            modalContentArea.innerHTML = '<p>Error loading form. Please try again later.</p>';
          });
      } else {
        prefillCourseInterest(courseInterest);
      }
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

    function prefillCourseInterest(courseInterest) {
      var finalCourseInterest = courseInterest || courseInterestDefault;
      if (finalCourseInterest) {
        var courseSelect = modalContentArea.querySelector('#reg-course');
        if (courseSelect) {
          var optionExists = Array.from(courseSelect.options).some(option => option.value === finalCourseInterest);
          if (optionExists) {
            courseSelect.value = finalCourseInterest;
          } else {
            console.warn('Course interest "' + finalCourseInterest + '" not found in dropdown options.');
            courseSelect.value = "General Inquiry";
          }
        }
      }
    }

    modalTriggers.forEach(function(trigger) {
      trigger.addEventListener('click', function(event) {
        event.preventDefault();
        var courseInterest = trigger.getAttribute('data-course-interest');
        openModal(courseInterest);
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

    // Detect mouse leaving viewport
    document.addEventListener('mouseout', function(e) {
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
    injectRegisterButton();
    injectWhatsAppButton();
    setupMobileNav();
    setupMobileSidebar();
    window.registrationModalHandlers = setupModal('registration-modal', 'main-registration', 'General Inquiry'); // Expose handlers if needed
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