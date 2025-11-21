// ========================================
// main.js – Portfolio Omar Guennouni
// ========================================

// 1. Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  // Change l'icône selon le thème
  const isDark = document.body.classList.contains('dark');
  themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// 2. Modal pour les projets
const projectCards = document.querySelectorAll('.project-card');
const modal = document.getElementById('projectModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalGithub = document.getElementById('modalGithub');
const modalDemo = document.getElementById('modalDemo');
const closeModal = document.querySelector('.close-modal');

projectCards.forEach(card => {
  card.addEventListener('click', () => {
    modalImg.src = card.dataset.img || 'img/placeholder.jpg';
    modalTitle.textContent = card.dataset.title || 'Projet';
    modalDesc.textContent = card.dataset.desc || 'Aucune description.';

    // GitHub
    if (card.dataset.github && card.dataset.github.trim() !== '') {
      modalGithub.href = card.dataset.github;
      modalGithub.style.display = 'inline-flex';
    } else {
      modalGithub.style.display = 'none';
    }

    // Démo
    if (card.dataset.demo && card.dataset.demo.trim() !== '') {
      modalDemo.href = card.dataset.demo;
      modalDemo.style.display = 'inline-flex';
    } else {
      modalDemo.style.display = 'none';
    }

    modal.style.display = 'flex';
  });
});

// Fermer le modal
closeModal.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', e => {
  if (e.target === modal) modal.style.display = 'none';
});

// 3. Animation au scroll (fade-in + barres de compétences)
const fadeElements = document.querySelectorAll('.fade-in');
const skillBars = document.querySelectorAll('.progress');

function animateOnScroll() {
  const triggerBottom = window.innerHeight - 100;

  fadeElements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < triggerBottom) el.classList.add('visible');
  });

  skillBars.forEach(bar => {
    const top = bar.getBoundingClientRect().top;
    if (top < triggerBottom && !bar.classList.contains('animated')) {
      bar.style.width = bar.dataset.width;
      bar.classList.add('animated');
    }
  });
}
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// 4. Toggle détails expérience
document.querySelectorAll('.toggle-details').forEach(button => {
  button.addEventListener('click', () => {
    const details = button.closest('.experience-item').querySelector('.experience-details');
    const isOpen = details.style.display === 'block';
    details.style.display = isOpen ? 'none' : 'block';
    button.textContent = isOpen ? '+' : '−';
    button.classList.toggle('active', !isOpen);
  });
});

// 5. Menu burger (mobile)
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Change l'icône burger ↔ croix
    menuToggle.innerHTML = navLinks.classList.contains('active') 
      ? '<i class="fas fa-times"></i>' 
      : '<i class="fas fa-bars"></i>';
  });
}

// 6. Téléchargement du CV → FORCÉ EN .PDF (même en file://)
document.querySelectorAll('a[download]').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && href.endsWith('.pdf')) {
      e.preventDefault(); // Empêche le comportement par défaut foireux

      const a = document.createElement('a');
      a.href = href;
      a.download = 'CV_Omar_Guennouni.pdf'; // Nom final du fichier
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  });
});

// 7. EmailJS – Envoi du formulaire de contact
emailjs.init("a8NxwS2i4RqYZc0rv"); // ← Ta clé publique (c’est bon)

const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Optionnel : petit feedback
    const btn = this.querySelector('button');
    const originalText = btn.textContent;
    btn.textContent = 'Envoi...';
    btn.disabled = true;

    emailjs.sendForm('service_ehu42pn', 'template_a843tzh', this)
      .then(() => {
        alert('Message envoyé avec succès ! Je te répondrai très vite');
        contactForm.reset();
      })
      .catch(err => {
        console.error('Erreur EmailJS:', err);
        alert('Oups, erreur d\'envoi. Tu peux m\'écrire directement : omar.guennouni@outlook.fr');
      })
      .finally(() => {
        btn.textContent = originalText;
        btn.disabled = false;
      });
  });
}