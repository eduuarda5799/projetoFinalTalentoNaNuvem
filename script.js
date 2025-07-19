function mostraFerramentas() {
  // Carrossel automático
  let idx = 0;
  const container = document.querySelector('.carrossel-container');
  const items = document.querySelectorAll('.item');

  function carrossel() {
    idx++;
    if (idx >= items.length) {
      idx = 0;
    }
    container.style.transform = `translateX(${-idx * 500}px)`;
  }

  setInterval(carrossel, 2000);

  // Tema escuro
  const botao = document.getElementById('botaoTema');
  botao.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
  });
}

// Executa ao carregar a página
window.onload = mostraFerramentas;
  
 
