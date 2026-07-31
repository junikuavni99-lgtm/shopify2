document.addEventListener('click', async (e) => {
  const btn = e.target.closest('[data-add-variant]');
  if (!btn) return;
  e.preventDefault();
  const id = btn.getAttribute('data-add-variant');
  btn.disabled = true;
  try {
    await fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [{ id: Number(id), quantity: 1 }] })
    });
    const res = await fetch('/cart.js');
    const cart = await res.json();
    document.querySelectorAll('[data-cart-count]').forEach((el) => {
      el.textContent = cart.item_count;
    });
    btn.classList.add('is-added');
    setTimeout(() => btn.classList.remove('is-added'), 1200);
  } catch (err) {
    console.error(err);
  } finally {
    btn.disabled = false;
  }
});
