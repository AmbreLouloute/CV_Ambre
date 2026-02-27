const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  reveals.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < windowHeight - 100) {
      section.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".step");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target); // une seule fois
        }
      });
    },
    {
      threshold: 0.3
    }
  );

  steps.forEach(step => observer.observe(step));
});

const dateNaissance = new Date('2000-10-02'); 

function calculerAge(dateNaissance) {
    const aujourdHui = new Date();
    let age = aujourdHui.getFullYear() - dateNaissance.getFullYear();
    const mois = aujourdHui.getMonth() - dateNaissance.getMonth();
    
    // Si le mois n'est pas encore passé ou le jour n'est pas encore arrivé cette année
    if (mois < 0 || (mois === 0 && aujourdHui.getDate() < dateNaissance.getDate())) {
        age--;
    }
    return age;
}

document.getElementById('age').textContent = calculerAge(dateNaissance);

document.querySelectorAll('.flip-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('is-flipped');
  });
});

const chatWindow = document.getElementById("chatWindow");
const choiceButtons = document.querySelectorAll(".choices-box button");

const answers = {
  method: "Je commence par assembler les idées et définir quelques principes forts : un axe fonctionnel, un axe créatif et un axe unificateur propre à la marque.",
  organisation: "J’ai besoin de visualiser les tâches pour être efficace. J’organise le travail selon les priorités, la charge et les affinités, tout en gardant une marge pour les imprévus.",
  team: "Je me situe souvent entre un rôle de médiation et un rôle créatif. J’aime faire le lien entre les personnes et aider l’équipe à avancer vers un objectif commun.",
  failure: "Quand tout ne se passe pas comme prévu, je m’adapte. Je m’appuie sur l’improvisation, l’échange et les retours pour trouver la solution la plus juste."
};

choiceButtons.forEach(button => {
  button.addEventListener("click", () => {
    const key = button.dataset.answer;

    // Message joueur (le choix cliqué)
    addMessage(button.textContent, "player");

    // Message NPC (la réponse)
    setTimeout(() => {
      addMessage(answers[key], "npc");
    }, 400);
  });
});

function addMessage(text, type) {
  const msg = document.createElement("div");
  msg.classList.add("message", type);
  msg.textContent = text;

  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

const carousel = document.querySelector('.carousel-images');
const images = document.querySelectorAll('.carousel-images img');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const carouselWrapper = document.querySelector('.carousel-wrapper');

let index = 0;
const totalImages = images.length;
let autoSlideInterval;

// Déplacer la slide
function showSlide(i) {
  if (i < 0) index = totalImages - 1;
  else if (i >= totalImages) index = 0;
  else index = i;

  const slideWidth = carouselWrapper.clientWidth;
  carousel.style.transform = `translateX(${-index * slideWidth}px)`;
}

// Défilement automatique
function startAutoSlide() {
  autoSlideInterval = setInterval(() => showSlide(index + 1), 3000);
}

// Réinitialiser le timer quand on clique
function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

// Boutons
prev.addEventListener('click', () => {
  showSlide(index - 1);
  resetAutoSlide();
});

next.addEventListener('click', () => {
  showSlide(index + 1);
  resetAutoSlide();
});

// Démarrage
window.addEventListener('load', () => {
  showSlide(index);
  startAutoSlide();
});

// Recalculer si la fenêtre est redimensionnée
window.addEventListener('resize', () => {
  showSlide(index);
});


const questButtons = document.querySelectorAll(".quest-btn");

questButtons.forEach(button => {
  button.addEventListener("click", () => {

    const questCard = button.closest(".quest-card");
    const content = questCard.querySelector(".quest-content");

    questCard.classList.toggle("active-quest");
    content.classList.toggle("active");

    if (questCard.classList.contains("active-quest")) {
      button.textContent = "Quête réussie ✓";
    } else {
      button.textContent = "Récapitulatif de la quête";
    }

  });
});
