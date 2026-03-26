// OC8 Finance | Script

const obs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

const nav = document.querySelector('.site-nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 20 ? '0 2px 20px rgba(25,51,66,.08)' : '';
  }, { passive: true });
}

document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
  dropdown.querySelector('.nav-dropdown-toggle')?.addEventListener('click', event => {
    event.preventDefault();
    const isOpen = dropdown.classList.contains('open');
    document.querySelectorAll('.nav-dropdown').forEach(item => {
      item.classList.remove('open');
      item.querySelector('[aria-expanded]')?.setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      dropdown.classList.add('open');
      dropdown.querySelector('[aria-expanded]')?.setAttribute('aria-expanded', 'true');
    }
  });
});

document.addEventListener('click', event => {
  if (!event.target.closest('.nav-dropdown')) {
    document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
      dropdown.classList.remove('open');
      dropdown.querySelector('[aria-expanded]')?.setAttribute('aria-expanded', 'false');
    });
  }
});

const hamburger = document.querySelector('.nav-hamburger');
const mobileMenu = document.getElementById('nav-mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });
}

const whatsappInput = document.getElementById('whatsapp');
if (whatsappInput) {
  whatsappInput.addEventListener('input', () => {
    const digits = whatsappInput.value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) {
      whatsappInput.value = digits;
      return;
    }
    if (digits.length <= 7) {
      whatsappInput.value = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
      return;
    }
    if (digits.length <= 10) {
      whatsappInput.value = `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
      return;
    }
    whatsappInput.value = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  });
}

const form = document.getElementById('contactForm');
if (form) {
  const submitButton = form.querySelector('button[type="submit"]');
  const formContent = document.getElementById('formContent');
  const formSuccess = document.getElementById('formSuccess');
  const formStatus = document.getElementById('formStatus');
  const defaultButtonText = submitButton ? submitButton.textContent : '';

  const setStatus = (message, type) => {
    if (!formStatus) return;
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';
  };

  const validateForm = () => {
    const requiredFields = Array.from(form.querySelectorAll('[required]'));
    let firstInvalidField = null;

    requiredFields.forEach(field => field.classList.remove('input-error'));

    for (const field of requiredFields) {
      const value = field.value.trim();
      let isValid = Boolean(value);

      if (isValid && field.type === 'email') {
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      }

      if (isValid && field.name === 'whatsapp') {
        isValid = value.replace(/\D/g, '').length >= 10;
      }

      if (!isValid) {
        field.classList.add('input-error');
        if (!firstInvalidField) firstInvalidField = field;
      }
    }

    if (firstInvalidField) {
      firstInvalidField.focus();
      setStatus('Revise os campos obrigatórios antes de enviar.', 'error');
      return false;
    }

    return true;
  };

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!validateForm()) return;

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Enviando...';
    }
    setStatus('Enviando solicitação...', 'pending');

    const formData = new FormData(form);

    try {
      const response = await fetch(window.location.pathname, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      if (formContent) formContent.style.display = 'none';
      if (formSuccess) formSuccess.style.display = 'block';
      if (formStatus) formStatus.style.display = 'none';
      form.reset();
    } catch (error) {
      setStatus('Não foi possível enviar agora. Tente novamente ou chame no WhatsApp.', 'error');
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = defaultButtonText;
      }
    }
  });
}
