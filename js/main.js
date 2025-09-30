// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// Modal pour projets
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
    modalImg.src = card.dataset.img;
    modalTitle.textContent = card.dataset.title;
    modalDesc.textContent = card.dataset.desc;

    // GitHub
    if (card.dataset.github) {
      modalGithub.href = card.dataset.github;
      modalGithub.style.display = "inline-block";
    } else {
      modalGithub.style.display = "none";
    }

    // Démo
    if (card.dataset.demo) {
      modalDemo.href = card.dataset.demo;
      modalDemo.style.display = "inline-block";
    } else {
      modalDemo.style.display = "none";
    }

    modal.style.display = 'flex';
  });
});

closeModal.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });

// Formulaire
document.getElementById('contact-form').addEventListener('submit', e => {
  e.preventDefault();
  alert("Merci pour votre message !");
  e.target.reset();
});

// Animation scroll
const fadeElements = document.querySelectorAll('.fade-in');
function checkVisibility() {
  fadeElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);

// SKILLs
const skillBars = document.querySelectorAll('.progress');
function animateSkills() {
  skillBars.forEach(bar => {
    const rect = bar.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      bar.style.width = bar.dataset.width;
    }
  });
}
window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);

// Toggle les détails au clic
document.querySelectorAll('.toggle-details').forEach(button => {
  button.addEventListener('click', () => {
    const details = button.closest('.experience-item').querySelector('.experience-details');
    details.style.display = details.style.display === 'block' ? 'none' : 'block';
    button.textContent = details.style.display === 'block' ? '−' : '+';
  });
});