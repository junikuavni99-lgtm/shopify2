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

/* PDP: gallery thumbs, quantity stepper, sticky add-to-cart */
document.addEventListener('click', (e) => {
  const thumb = e.target.closest('.thumb');
  if (thumb) {
    const main = document.getElementById('PdpMain');
    if (main) main.src = thumb.getAttribute('data-src');
    document.querySelectorAll('.thumb').forEach((t) => t.classList.remove('is-active'));
    thumb.classList.add('is-active');
    return;
  }

  const step = e.target.closest('[data-qty]');
  if (step) {
    const input = document.getElementById('PdpQty');
    if (input) {
      const next = Math.max(1, (parseInt(input.value, 10) || 1) + Number(step.getAttribute('data-qty')));
      input.value = next;
    }
    return;
  }

  const sticky = e.target.closest('#StickyAdd');
  if (sticky) {
    const form = document.querySelector('.pdp__form');
    if (form) form.requestSubmit ? form.requestSubmit() : form.submit();
  }
});

document.addEventListener('change', (e) => {
  if (e.target.id !== 'PdpVariant') return;
  const price = e.target.selectedOptions[0]?.getAttribute('data-price');
  const submit = document.querySelector('.pdp__form .btn--lg');
  if (price && submit && !submit.disabled) submit.textContent = 'Add to Cart — ' + price;
});
