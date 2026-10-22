(() => {
  const foto = document.getElementById('fotoPrincipal');
  const container = document.getElementById('fotoContainer');
  const thumbs = Array.from(document.querySelectorAll('.gallery-thumbs [data-foto]'));
  let selected = Math.max(0, thumbs.findIndex(t => t.getAttribute('aria-pressed') === 'true'));
  const choose = i => {
    if (!foto || !container || !thumbs.length) return;
    selected = (i + thumbs.length) % thumbs.length;
    const b = thumbs[selected];
    foto.src = b.dataset.foto;
    foto.alt = b.dataset.alt || foto.alt;
    container.classList.remove('image-missing');
    for (const [j, el] of thumbs.entries()) el.setAttribute('aria-pressed', String(j === selected));
  };
  for (const [i, el] of thumbs.entries()) el.addEventListener('click', () => choose(i));
  if (foto && container) foto.addEventListener('error', () => container.classList.add('image-missing'));
  const prev = document.querySelector('.gallery-prev');
  const next = document.querySelector('.gallery-next');
  if (prev) prev.addEventListener('click', () => choose(selected - 1));
  if (next) next.addEventListener('click', () => choose(selected + 1));
  const tabs = [...document.querySelectorAll('.tab-nav [role="tab"]')];
  for (const [i, tab] of tabs.entries()) {
    const activate = index => {
      for (const [j, t] of tabs.entries()) {
        const active = j === index;
        t.setAttribute('aria-selected', String(active));
        t.tabIndex = active ? 0 : -1;
        const panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) panel.hidden = !active;
      }
    };
    tab.addEventListener('click', () => activate(i));
    tab.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();const j=(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;
        activate(j); tabs[j].focus();
      }
    });
  }
  const query = document.getElementById('buscarPerfumes');
  if (query) {
    const cards = [...document.querySelectorAll('.all-grid .list-item')];
    const count = document.getElementById('quantidadeProdutos');
    const empty = document.getElementById('semResultados');
    const norm = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('pt-BR');
    const search = () => {
      const q = norm(query.value.trim());let visible=0;
      for (const card of cards) { const show=norm(card.textContent).includes(q);card.hidden=!show;if(show)visible++; }
      if (count) count.textContent=`${visible} ${visible===1?'perfume':'perfumes'}`;
      if (empty) empty.hidden=visible!==0;
    };
    query.addEventListener('input',search);search();
  }
})();