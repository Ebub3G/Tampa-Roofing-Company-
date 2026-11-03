/* Progressive enhancement only: every section is readable without this file. */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Mobile menu ---------- */
function initMenu() {
  const openBtn = document.querySelector<HTMLButtonElement>('[data-menu-open]');
  const panel = document.getElementById('mobile-menu');
  if (!openBtn || !panel) return;
  const focusables = () =>
    Array.from(panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));

  const open = () => {
    document.body.classList.add('menu-open');
    openBtn.setAttribute('aria-expanded', 'true');
    // wait for visibility to apply before moving focus
    requestAnimationFrame(() => focusables()[0]?.focus());
  };
  const close = (returnFocus = true) => {
    if (!document.body.classList.contains('menu-open')) return;
    document.body.classList.remove('menu-open');
    openBtn.setAttribute('aria-expanded', 'false');
    if (returnFocus) openBtn.focus();
  };

  openBtn.addEventListener('click', open);
  document.querySelectorAll('[data-menu-close]').forEach((el) => el.addEventListener('click', () => close()));
  panel.querySelectorAll('[data-menu-link]').forEach((el) => el.addEventListener('click', () => close(false)));
  document.addEventListener('keydown', (e) => {
    if (!document.body.classList.contains('menu-open')) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key === 'Tab') {
      const f = focusables();
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  window.matchMedia('(min-width: 75rem)').addEventListener('change', (m) => m.matches && close(false));
}

/* ---------- Roof systems tabs (WAI-ARIA tabs, automatic activation) ---------- */
function initTabs() {
  document.querySelectorAll<HTMLElement>('[data-tabs]').forEach((root) => {
    const list = root.querySelector<HTMLElement>('[data-tablist]');
    const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
    const panels = Array.from(root.querySelectorAll<HTMLElement>('[data-panel]'));
    if (!list || !tabs.length) return;
    list.hidden = false;

    const select = (i: number, focus = false) => {
      tabs.forEach((t, j) => {
        const on = i === j;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        panels[j].hidden = !on;
      });
      if (focus) tabs[i].focus();
      tabs[i].scrollIntoView({ block: 'nearest', inline: 'nearest' });
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(i));
      t.addEventListener('keydown', (e) => {
        const n = tabs.length;
        let k = -1;
        if (e.key === 'ArrowRight') k = (i + 1) % n;
        else if (e.key === 'ArrowLeft') k = (i - 1 + n) % n;
        else if (e.key === 'Home') k = 0;
        else if (e.key === 'End') k = n - 1;
        if (k > -1) { e.preventDefault(); select(k, true); }
      });
    });
    panels.forEach((p, j) => (p.hidden = j !== 0));
  });

  // Hovering a layer in the legend highlights it in the diagram.
  document.querySelectorAll<HTMLElement>('[data-panel]').forEach((panel) => {
    const wrap = panel.querySelector<HTMLElement>('[data-xsec]');
    if (!wrap) return;
    const shapes = Array.from(wrap.querySelectorAll<SVGElement>('[data-layer]'));
    panel.querySelectorAll<HTMLElement>('[data-layer-ref]').forEach((row) => {
      const idx = row.dataset.layerRef;
      const on = () => {
        wrap.classList.add('has-focus');
        shapes.forEach((s) => s.classList.toggle('is-focus', s.dataset.layer === idx));
      };
      const off = () => {
        wrap.classList.remove('has-focus');
        shapes.forEach((s) => s.classList.remove('is-focus'));
      };
      row.addEventListener('mouseenter', on);
      row.addEventListener('mouseleave', off);
    });
  });
}

/* ---------- Demo proposal forms ---------- */
function initForms() {
  document.querySelectorAll<HTMLElement>('[data-form-stack]').forEach((stack) => {
    const form = stack.querySelector<HTMLFormElement>('[data-proposal-form]');
    const success = stack.querySelector<HTMLElement>('[data-form-success]');
    const reset = stack.querySelector<HTMLButtonElement>('[data-form-reset]');
    if (!form || !success) return;

    const setError = (el: HTMLInputElement | HTMLSelectElement, msg: string) => {
      const err = document.getElementById(el.getAttribute('aria-describedby') || '');
      el.setAttribute('aria-invalid', msg ? 'true' : 'false');
      if (err) err.textContent = msg;
    };
    const validate = () => {
      const name = form.elements.namedItem('name') as HTMLInputElement;
      const contact = form.elements.namedItem('contact') as HTMLInputElement;
      const need = form.elements.namedItem('need') as HTMLSelectElement;
      const v = contact.value.trim();
      const digits = v.replace(/\D/g, '');
      const okContact = /\S+@\S+\.\S+/.test(v) || digits.length >= 10;
      setError(name, name.value.trim() ? '' : 'Enter your name.');
      setError(contact, !v ? 'Enter a phone number or email.' : okContact ? '' : 'Enter a 10-digit phone number or a full email address.');
      setError(need, need.value ? '' : 'Choose what you need.');
      const firstBad = form.querySelector<HTMLElement>('[aria-invalid="true"]');
      firstBad?.focus();
      return !firstBad;
    };

    // Clear a field's error as soon as the user corrects it.
    form.querySelectorAll<HTMLInputElement | HTMLSelectElement>('input, select').forEach((el) => {
      const evt = el.tagName === 'SELECT' ? 'change' : 'input';
      el.addEventListener(evt, () => {
        if (el.getAttribute('aria-invalid') === 'true' && el.value.trim()) setError(el, '');
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validate()) return;
      const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim().split(' ')[0];
      const text = success.querySelector('[data-success-text]');
      if (text) text.textContent = `Thanks, ${name}. In the live site, this request would go to the office and someone would follow up by phone or email.`;
      stack.classList.add('is-sent');
      success.focus();
    });
    reset?.addEventListener('click', () => {
      form.reset();
      form.querySelectorAll('[aria-invalid]').forEach((el) => el.removeAttribute('aria-invalid'));
      form.querySelectorAll('.field-error').forEach((el) => (el.textContent = ''));
      stack.classList.remove('is-sent');
      (form.elements.namedItem('name') as HTMLInputElement).focus();
    });
  });
}

/* ---------- Reveal on scroll ---------- */
function initReveal() {
  const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (reduceMotion || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const show = (el: HTMLElement, instant = false) => {
    if (el.classList.contains('is-in')) return;
    if (instant) el.classList.add('no-anim');
    el.classList.add('is-in');
    io.unobserve(el);
  };
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && show(e.target as HTMLElement)),
    { rootMargin: '0px 0px -8% 0px' },
  );
  // Content already on screen is never hidden; only below-the-fold content
  // is armed for reveal. The hiding class is added here, by the same script
  // that reveals, so if this file fails to load nothing stays hidden.
  const vh0 = window.innerHeight;
  els.forEach((el) => {
    if (el.getBoundingClientRect().top < vh0) el.classList.add('is-in');
    else io.observe(el);
  });
  document.documentElement.classList.add('reveal-ready');

  // Fast-scroll guard: anything already scrolled past is shown at once, so no
  // section can ever be blank behind the viewport.
  let ticking = false;
  const sweep = () => {
    ticking = false;
    const vh = window.innerHeight;
    els.forEach((el) => {
      if (el.classList.contains('is-in')) return;
      const r = el.getBoundingClientRect();
      if (r.bottom < 0) show(el, true);
      else if (r.top < vh) show(el);
    });
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(sweep); } }, { passive: true });
  // Hash jumps land mid-page: sweep once after load.
  sweep();
  // Safety net: after 1.2s, force-show anything that is still hidden.
  window.setTimeout(() => els.forEach((el) => show(el, true)), 1200);
}

initMenu();
initTabs();
initForms();
initReveal();
