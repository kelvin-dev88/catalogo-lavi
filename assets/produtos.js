(() => {
  const foto = document.getElementById('fotoPrincipal');
  const container = document.getElementById('fotoContainer');
  const thumbs = Array.from(document.querySelectorAll('[data-foto]'));
  function selecionar(btn){
    foto.src = btn.dataset.foto;
    foto.alt = btn.dataset.alt || foto.alt;
    container.classList.remove('image-missing');
    for(const el of thumbs)el.setAttribute('aria-pressed',String(el===btn));
  }
  for(const el of thumbs)el.addEventListener('click',()=>selecionar(el));
  if(foto){foto.addEventListener('error',()=>container.classList.add('image-missing'));}
  const add = document.getElementById('adicionarCarrinho');
  if(add) add.addEventListener('click',()=>{
    const d = window.__laviProduto;
    if(!d) return;
    const key = 'lavi-carrinho-v1';
    const id = encodeURIComponent(JSON.stringify([d.nome,d.ml,d.cat]));
    let items=[];
    try { const raw=JSON.parse(localStorage.getItem(key)||'[]'); if(Array.isArray(raw))items=raw; }catch(e){}
    const found=items.find(it=>it.id===id);
    if(found){found.qtd=Number.isSafeInteger(found.qtd)&&found.qtd>0?found.qtd+1:1;}
    else items.push({id,qtd:1});
    try{localStorage.setItem(key,JSON.stringify(items));}catch(e){
      alert('Não foi possível salvar o carrinho no navegador. Você pode pedir pelo WhatsApp.');
      return;
    }
    window.location.href='../?abrirCarrinho=1';
  });
})();
