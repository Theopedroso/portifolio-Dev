// ===== MENU =====
const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  document.querySelectorAll(".menu a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
    });
  });
}

// ===== REVEAL (ANIMAÇÃO AO SCROLL) =====
const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  const trigger = window.innerHeight * 0.88;

  revealElements.forEach((element) => {
    const top = element.getBoundingClientRect().top;

    if (top < trigger) {
      element.classList.add("visible");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// ===== FILTRO =====
const filterButtons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    cards.forEach((card) => {
      const category = card.dataset.category || "";

      if (filter === "todos" || category.includes(filter)) {
        card.classList.remove("hide-card");
      } else {
        card.classList.add("hide-card");
      }
    });
  });
});

// ===== MODAL =====
const modal = document.getElementById("projectModal");
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");

const modalTag = document.getElementById("modalTag");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalList = document.getElementById("modalList");

const projectButtons = document.querySelectorAll(".project-more");

const projectData = {
  saas: {
    tag: "SaaS / Startup",
    title: "FlowSync",
    description: "Plataforma SaaS com dashboard, métricas, pricing e estrutura completa.",
    items: ["Dashboard", "Pricing", "Métricas", "FAQ", "UI Premium"]
  },
  shop: {
    tag: "E-commerce",
    title: "NordHaus",
    description: "Loja premium com vitrine de produtos e experiência moderna.",
    items: ["Carrinho", "Vitrine", "Conversão", "UX"]
  },
  estetica: {
    tag: "Clínica Estética",
    title: "Lumière Clinic",
    description: "Projeto com posicionamento premium e estética sofisticada.",
    items: ["Luxo", "Depoimentos", "Formulário"]
  },
  law: {
    tag: "Advocacia",
    title: "Pedroso Advocacia",
    description: "Site institucional focado em autoridade e credibilidade.",
    items: ["Institucional", "Autoridade"]
  },
  food: {
    tag: "Restaurante",
    title: "FoodPrime",
    description: "Landing page gastronômica com alto impacto visual.",
    items: ["Cardápio", "CTA"]
  },
  realestate: {
    tag: "Imobiliária",
    title: "Pedroso Imóveis",
    description: "Projeto com foco em imóveis de alto padrão.",
    items: ["Luxo", "Vendas"]
  }
};

function openModal(projectKey) {
  const project = projectData[projectKey];
  if (!project) return;

  modalTag.textContent = project.tag;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalList.innerHTML = project.items.map(item => `<span>${item}</span>`).join("");

  modal.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("show");
  document.body.style.overflow = "";
}

projectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openModal(button.dataset.project);
  });
});

if (modalOverlay) modalOverlay.addEventListener("click", closeModal);
if (modalClose) modalClose.addEventListener("click", closeModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// ===== HOVER 3D (NÍVEL APPLE) =====
const cards3D = document.querySelectorAll(".project-card");

cards3D.forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 12;
    const rotateY = (x - centerX) / 12;

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.03)
    `;

    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;
  });
});