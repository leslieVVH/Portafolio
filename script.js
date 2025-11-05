// Cambiar enlace activo según scroll
document.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("#sidebarMenu .nav-link");
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (scrollY >= sectionTop) current = section.getAttribute("id");
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) link.classList.add("active");
  });
});

// Hacer clic en tarjeta = abrir GitHub
document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("click", () => {
    const link = card.getAttribute("data-link");
    window.open(link, "_blank");
  });
});

// Mensaje del formulario
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  alert("¡Gracias por tu mensaje! Te responderé pronto 😊");
  e.target.reset();
});
