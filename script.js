// Executa só depois de garantir que tudo está no DOM
window.addEventListener('DOMContentLoaded', () => {
  const botao = document.getElementById('botaoTema');
  const container = document.querySelector('.carrossel-container');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectsGrid = document.getElementById('projectsGrid');

  // 1️⃣ Carrossel automático — passando os itens a cada rodada
  let idx = 0;
  function carrossel() {
    const items = container.querySelectorAll('.item');
    if (!items.length) return;
    idx = (idx + 1) % items.length;
    const step = items[0].offsetWidth; // ou 500 dependendo do CSS
    container.style.transition = 'transform 0.6s ease';
    container.style.transform = `translateX(${-idx * step}px)`;
  }
  const timer = setInterval(carrossel, 2000);

  // 2️⃣ Alternância de tema escuro — botão com id="botaoTema"
  if (botao) {
    botao.addEventListener('click', () => document.body.classList.toggle('dark-theme'));
  }

  // 3️⃣ Filtro e display dos projetos
  function displayProjects(projects) {
    projectsGrid.innerHTML = '';
    projects.forEach(p => {
      const card = document.createElement('div');
      card.classList.add('project-card');
      card.innerHTML = `
        <img src="${p.image}" alt="${p.title}" data-ai-hint="${p.dataAiHint}">
        <div class="project-card-content">
          <h3>${p.title}</h3>
          <p>${p.description}</p>
          <div class="project-tags">
            ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
        </div>`;
      projectsGrid.appendChild(card);
    });
  }

  function filterProjects(filter) {
    const filtered = filter === 'all'
      ? window.myProjects
      : window.myProjects.filter(p => p.tags.includes(filter));
    displayProjects(filtered);
  }

  filterBtns.forEach(b => b.addEventListener('click', () => {
    filterBtns.forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    filterProjects(b.dataset.filter);
  }));

  // Inicializa a tela com todos os projetos
  filterProjects('all');
});
