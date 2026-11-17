document.addEventListener('DOMContentLoaded', () => {
  // Replace with your actual WhatsApp number (e.g., 94712345678)
  const STUDIO_WHATSAPP = '94763259512';

  // 1. Top Scroll Progress Bar & Shrinking Navbar
  const scrollProgress = document.getElementById('scrollProgress');
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (scrollProgress && docHeight > 0) {
      scrollProgress.style.width = ((scrollTop / docHeight) * 100) + '%';
    }
    if (navbar) {
      if (scrollTop > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });

  // 2. Scroll Reveal Animations (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }

  // 3. Ambient Floating Gold Dust Particles on Hero Section
  const particlesLayer = document.getElementById('particlesLayer');
  if (particlesLayer) {
    for (let i = 0; i < 24; i++) {
      const dot = document.createElement('span');
      dot.className = 'gold-dust';
      dot.style.left = Math.random() * 100 + '%';
      dot.style.top = (30 + Math.random() * 65) + '%';
      dot.style.animationDelay = (Math.random() * 7) + 's';
      dot.style.animationDuration = (6 + Math.random() * 6) + 's';
      const size = (2 + Math.random() * 3) + 'px';
      dot.style.width = size;
      dot.style.height = size;
      particlesLayer.appendChild(dot);
    }
  }

  // 4. Mobile Menu Toggle
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // 5. Animated Counters
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const suffix = counter.textContent.replace(/[0-9]/g, '');
    let current = 0;
    const step = Math.ceil(target / 45);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        counter.textContent = target + suffix;
        clearInterval(timer);
      } else {
        counter.textContent = current + suffix;
      }
    }, 30);
  });

  // 6. Before & After Interactive Slider (Exact Alignment with clip-path)
  const baSlider = document.getElementById('baSlider');
  const baBeforeImg = document.getElementById('baBeforeImg');
  const baHandle = document.getElementById('baHandle');
  const baLine = document.getElementById('baLine');

  if (baSlider && baBeforeImg && baHandle) {
    baSlider.addEventListener('input', (e) => {
      const val = e.target.value;
      baBeforeImg.style.clipPath = `inset(0 ${100 - val}% 0 0)`;
      baHandle.style.left = val + '%';
      if (baLine) baLine.style.left = val + '%';
    });
  }

  // 7. Gallery Filtering & Lightbox Modal (With Full Image Preview)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxClose = document.getElementById('lightboxClose');
  const lbImage = document.getElementById('lbImage');
  const lbTitle = document.getElementById('lbTitle');
  const lbDesc = document.getElementById('lbDesc');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');

        galleryCards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  if (galleryCards.length > 0 && lightboxModal) {
    galleryCards.forEach(card => {
      card.addEventListener('click', () => {
        const imgSrc = card.getAttribute('data-img');
        if (lbImage && imgSrc) {
          lbImage.src = imgSrc;
          lbImage.style.display = 'block';
        }
        lbTitle.textContent = card.getAttribute('data-title') || 'Portrait Artwork';
        lbDesc.textContent = card.getAttribute('data-desc') || '';
        lightboxModal.classList.add('open');
      });
    });

    lightboxClose.addEventListener('click', () => {
      lightboxModal.classList.remove('open');
    });

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('open');
      }
    });
  }

  // 8. FAQ Accordion (About Page)
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(i => i.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });

  // 9. Live Pricing Calculator & WhatsApp Integration (Contacts Page - Unchanged)
  const sizeBoxes = document.querySelectorAll('#sizeOptions .radio-box');
  const facesSelect = document.getElementById('facesSelect');
  const frameCheck = document.getElementById('frameCheck');
  const giftCheck = document.getElementById('giftCheck');
  const deliveryCheck = document.getElementById('deliveryCheck');
  const whatsappBtn = document.getElementById('whatsappOrderBtn');

  if (sizeBoxes.length > 0 && facesSelect && whatsappBtn) {
    let selectedSize = 'A4';
    let basePrice = 3500;

    const sumSize = document.getElementById('sumSize');
    const sumFaces = document.getElementById('sumFaces');
    const sumAddons = document.getElementById('sumAddons');
    const totalPriceEl = document.getElementById('totalPrice');

    function updateCalculator() {
      const selectedOption = facesSelect.options[facesSelect.selectedIndex];
      const extraFacesCost = parseInt(selectedOption.getAttribute('data-extra'), 10);

      let addonsCost = 0;
      let addonsList = [];

      if (frameCheck.checked) {
        addonsCost += parseInt(frameCheck.getAttribute('data-cost'), 10);
        addonsList.push('Frame');
      }
      if (giftCheck.checked) {
        addonsCost += parseInt(giftCheck.getAttribute('data-cost'), 10);
        addonsList.push('Gift Wrap');
      }
      if (deliveryCheck.checked) {
        addonsCost += parseInt(deliveryCheck.getAttribute('data-cost'), 10);
        addonsList.push('Courier');
      }

      const total = basePrice + extraFacesCost + addonsCost;

      sumSize.textContent = selectedSize;
      sumFaces.textContent = selectedOption.text.split('+')[0].trim();
      sumAddons.textContent = addonsList.length > 0 ? addonsList.join(', ') : 'None';
      totalPriceEl.textContent = 'Rs. ' + total.toLocaleString();
      return total;
    }

    sizeBoxes.forEach(box => {
      box.addEventListener('click', () => {
        sizeBoxes.forEach(b => b.classList.remove('selected'));
        box.classList.add('selected');
        selectedSize = box.getAttribute('data-size');
        basePrice = parseInt(box.getAttribute('data-price'), 10);
        updateCalculator();
      });
    });

    [facesSelect, frameCheck, giftCheck, deliveryCheck].forEach(el => {
      el.addEventListener('change', updateCalculator);
    });

    updateCalculator();

    whatsappBtn.addEventListener('click', () => {
      const total = updateCalculator();
      const clientName = document.getElementById('clientName').value.trim() || 'Customer';
      const facesText = facesSelect.options[facesSelect.selectedIndex].text.split('+')[0].trim();
      const addonsText = sumAddons.textContent;

      const message = `ආයුබෝවන්! නිහඬ පන්හිඳ 💛🤍%0A%0Aමට Pencil Portrait එකක් ඇණවුම් කිරීමට අවශ්යයි:%0A• *නම:* ${clientName}%0A• *ප්‍රමාණය (Size):* ${selectedSize}%0A• *පුද්ගලයින්:* ${facesText}%0A• *අමතර සේවා:* ${addonsText}%0A• *ඇස්තමේන්තුගත මිල:* Rs. ${total.toLocaleString()}%0A%0A`;

      window.open(`https://wa.me/${STUDIO_WHATSAPP}?text=${message}`, '_blank');
    });
  }

  // 10. Contact Page Quick Inquiry Form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName').value.trim();
      const subject = document.getElementById('contactSubject').value;
      const msg = document.getElementById('contactMessage').value.trim();

      const waText = `ආයුබෝවන්! නිහඬ පන්හිඳ 💛🤍%0A%0A*නම:* ${name}%0A*කාරණය:* ${subject}%0A*පණිවිඩය:* ${msg}`;
      window.open(`https://wa.me/${STUDIO_WHATSAPP}?text=${waText}`, '_blank');
    });
  }
});
