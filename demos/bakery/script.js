/* Тепла Скоринка: фільтр меню, кошик і легкі анімації.
   Це концепт сайту: скрипт не робить жодних мережевих запитів і нічого не зберігає. */

(() => {
  'use strict';

  const MAX_QTY = 20;

  const byId = (id) => document.getElementById(id);
  const numberFormat = new Intl.NumberFormat('uk-UA');
  const formatUAH = (value) => `${numberFormat.format(value)} грн`;

  function plural(n, one, few, many) {
    const lastDigit = n % 10;
    const lastTwo = n % 100;
    if (lastDigit === 1 && lastTwo !== 11) return one;
    if (lastDigit >= 2 && lastDigit <= 4 && (lastTwo < 12 || lastTwo > 14)) return few;
    return many;
  }

  /* Фільтр меню */

  const menuList = byId('menu-list');
  const filterButtons = Array.from(document.querySelectorAll('.filter'));
  const menuGroups = Array.from(document.querySelectorAll('.menu-group'));
  const filterStatus = byId('filter-status');

  function applyFilter(button) {
    const category = button.dataset.filter;
    let count = 0;

    menuGroups.forEach((group) => {
      const show = category === 'all' || group.dataset.category === category;
      group.hidden = !show;
      group.classList.add('is-visible');
      if (show) count += group.querySelectorAll('.item').length;
    });

    filterButtons.forEach((other) => {
      other.setAttribute('aria-pressed', String(other === button));
    });

    menuList.classList.add('is-filtered');

    const items = `${count} ${plural(count, 'позиція', 'позиції', 'позицій')}`;
    filterStatus.textContent = category === 'all'
      ? `Показано все меню: ${items}.`
      : `Показано розділ «${button.textContent.trim()}»: ${items}.`;
  }

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => applyFilter(button));
  });

  /* Кошик */

  const basketSection = byId('basket');
  const basketTitle = byId('basket-title');
  const basketEmpty = byId('basket-empty');
  const linesList = byId('basket-lines');
  const basketNote = byId('basket-note');
  const basketTotal = byId('basket-total');
  const navCount = byId('nav-count');
  const basketBar = byId('basket-bar');
  const basketBarText = byId('basket-bar-text');

  const orderForm = byId('order-form');
  const orderName = byId('order-name');
  const orderPickup = byId('order-pickup');
  const summary = byId('summary');
  const summaryTitle = byId('summary-title');
  const summaryLines = byId('summary-lines');
  const summaryMeta = byId('summary-meta');
  const summaryActions = byId('summary-actions');

  const products = new Map(); // id -> { id, name, price, chip }
  const basket = new Map();   // id -> кількість
  const lines = new Map();    // id -> елементи рядка кошика

  let summaryOpen = false;
  let basketInView = false;

  document.querySelectorAll('.item').forEach((item) => {
    const chip = document.createElement('span');
    chip.className = 'item__count';
    chip.hidden = true;
    item.querySelector('.item__actions').append(chip);

    products.set(item.dataset.id, {
      id: item.dataset.id,
      name: item.dataset.name,
      price: Number(item.dataset.price),
      chip,
    });
  });

  function makeButton(className, text, label, action) {
    const button = document.createElement('button');
    button.type = 'button';
    if (className) button.className = className;
    button.textContent = text;
    button.setAttribute('aria-label', label);
    button.dataset.action = action;
    return button;
  }

  function createLine(product) {
    const li = document.createElement('li');
    li.className = 'line';
    li.dataset.id = product.id;

    const name = document.createElement('span');
    name.className = 'line__name';
    name.textContent = product.name;

    const sum = document.createElement('span');
    sum.className = 'line__sum';

    const qty = document.createElement('div');
    qty.className = 'qty';
    qty.setAttribute('role', 'group');
    qty.setAttribute('aria-label', `Кількість: ${product.name}`);

    const inputId = `qty-${product.id}`;
    const label = document.createElement('label');
    label.className = 'sr-only';
    label.htmlFor = inputId;
    label.textContent = `Кількість: ${product.name}`;

    const input = document.createElement('input');
    input.id = inputId;
    input.type = 'number';
    input.min = '1';
    input.max = String(MAX_QTY);
    input.step = '1';
    input.inputMode = 'numeric';

    qty.append(
      makeButton('', '−', `Зменшити кількість: ${product.name}`, 'decrease'),
      label,
      input,
      makeButton('', '+', `Збільшити кількість: ${product.name}`, 'increase'),
    );

    const remove = makeButton('line__remove', 'Прибрати', `Прибрати з кошика: ${product.name}`, 'remove');

    li.append(name, sum, qty, remove);
    linesList.append(li);

    const line = { li, sum, input, remove };
    lines.set(product.id, line);
    return line;
  }

  function render() {
    const isEmpty = basket.size === 0;
    let total = 0;
    let units = 0;

    basket.forEach((qty, id) => {
      const product = products.get(id);
      const line = lines.get(id) || createLine(product);
      line.input.value = String(qty);
      line.sum.textContent = formatUAH(product.price * qty);
      total += product.price * qty;
      units += qty;
    });

    lines.forEach((line, id) => {
      if (!basket.has(id)) {
        line.li.remove();
        lines.delete(id);
      }
    });

    products.forEach((product, id) => {
      const qty = basket.get(id) || 0;
      product.chip.hidden = qty === 0;
      product.chip.textContent = `У кошику: ${qty}`;
    });

    if (isEmpty) summaryOpen = false;

    basketEmpty.hidden = !isEmpty;
    linesList.hidden = isEmpty || summaryOpen;
    orderForm.hidden = isEmpty || summaryOpen;
    summary.hidden = !summaryOpen;
    summaryActions.hidden = !summaryOpen;

    const totalText = formatUAH(total);
    if (basketTotal.textContent !== totalText) basketTotal.textContent = totalText;

    navCount.hidden = isEmpty;
    navCount.textContent = String(units);

    basketBarText.textContent = `${units} шт. · ${totalText}`;
    updateBar();
  }

  function updateBar() {
    basketBar.hidden = basket.size === 0 || basketInView;
    document.body.classList.toggle('has-bar', !basketBar.hidden);
  }

  function setNote(text) {
    basketNote.textContent = text;
  }

  function limitNote() {
    setNote(`Можна замовити до ${MAX_QTY} шт. однієї позиції.`);
  }

  function setQty(id, qty) {
    const next = Math.min(MAX_QTY, Math.max(0, qty));
    if (next === 0) {
      basket.delete(id);
    } else {
      basket.set(id, next);
    }
    summaryOpen = false; // після змін старий підсумок уже неактуальний
    setNote('');
    render();
  }

  function addOne(id) {
    const current = basket.get(id) || 0;
    if (current >= MAX_QTY) {
      limitNote();
      return;
    }
    setQty(id, current + 1);
  }

  /* Рядок зникає разом із кнопкою у фокусі, тому фокус переносимо самі. */
  function removeLine(id) {
    const index = Array.from(basket.keys()).indexOf(id);
    setQty(id, 0);

    const rest = Array.from(basket.keys());
    if (rest.length > 0) {
      lines.get(rest[Math.min(index, rest.length - 1)]).remove.focus();
    } else {
      basketTitle.focus();
    }
  }

  menuList.addEventListener('click', (event) => {
    const button = event.target.closest('[data-add]');
    if (button) addOne(button.closest('.item').dataset.id);
  });

  linesList.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action]');
    if (!button) return;

    const id = button.closest('.line').dataset.id;
    const qty = basket.get(id);

    if (button.dataset.action === 'remove') {
      removeLine(id);
    } else if (button.dataset.action === 'decrease') {
      if (qty <= 1) {
        removeLine(id);
      } else {
        setQty(id, qty - 1);
      }
    } else if (qty >= MAX_QTY) {
      limitNote();
    } else {
      setQty(id, qty + 1);
    }
  });

  linesList.addEventListener('change', (event) => {
    const input = event.target;
    if (!input.matches('input')) return;

    const id = input.closest('.line').dataset.id;
    const value = Math.floor(Number(input.value));

    if (input.value.trim() === '' || !Number.isFinite(value)) {
      render(); // повертаємо попереднє значення
    } else if (value <= 0) {
      removeLine(id);
    } else {
      setQty(id, value);
      if (value > MAX_QTY) limitNote();
    }
  });

  /* Підсумок: лише показує дані на сторінці, нічого не надсилає. */

  function fillSummary() {
    const rows = Array.from(basket, ([id, qty]) => {
      const product = products.get(id);
      const li = document.createElement('li');
      const name = document.createElement('span');
      const sum = document.createElement('span');
      name.textContent = `${product.name} × ${qty}`;
      sum.textContent = formatUAH(product.price * qty);
      li.append(name, sum);
      return li;
    });
    summaryLines.replaceChildren(...rows);

    const name = orderName.value.trim();
    const pickup = orderPickup.options[orderPickup.selectedIndex].text;
    summaryMeta.textContent = `${name ? `Ім’я: ${name}. ` : ''}Самовивіз: ${pickup}.`;
  }

  orderForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (basket.size === 0) return;

    fillSummary();
    summaryOpen = true;
    setNote('');
    render();
    summaryTitle.focus();
  });

  byId('summary-edit').addEventListener('click', () => {
    summaryOpen = false;
    render();
    orderForm.querySelector('[type="submit"]').focus();
  });

  byId('summary-clear').addEventListener('click', () => {
    basket.clear();
    summaryOpen = false;
    orderForm.reset();
    setNote('');
    render();
    basketTitle.focus();
  });

  /* Нижня панель зникає, коли сам кошик уже на екрані. */

  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      basketInView = entries[entries.length - 1].isIntersecting;
      updateBar();
    }).observe(basketSection);
  }

  /* Сьогоднішній день у розкладі */

  const todayRow = document.querySelector(`[data-day="${new Date().getDay()}"]`);
  if (todayRow) {
    const tag = document.createElement('span');
    tag.className = 'hours__today';
    tag.textContent = 'сьогодні';
    todayRow.classList.add('is-today');
    todayRow.querySelector('th').append(tag);
  }

  /* Поява секцій під час прокручування */

  const motionAllowed = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

  if (motionAllowed && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js-reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 });

    document.querySelectorAll('.reveal').forEach((element) => {
      revealObserver.observe(element);
    });
  }

  render();
})();
