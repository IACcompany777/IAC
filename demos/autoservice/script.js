/* Гайка і Ключ: інтерактив концепту сайту. Нічого не надсилає і не зберігає. */
(function () {
  'use strict';

  function one(selector, root) {
    return (root || document).querySelector(selector);
  }

  function all(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  function setText(element, text) {
    if (element) {
      element.textContent = text;
    }
  }

  /* Мобільне меню */
  function initMenu() {
    var toggle = one('[data-menu-toggle]');
    var menu = one('[data-menu]');
    if (!toggle || !menu) {
      return;
    }

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      menu.classList.toggle('is-open', open);
    }

    function isOpen() {
      return toggle.getAttribute('aria-expanded') === 'true';
    }

    toggle.addEventListener('click', function () {
      setOpen(!isOpen());
    });

    menu.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        setOpen(false);
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && isOpen()) {
        setOpen(false);
        toggle.focus();
      }
    });

    document.addEventListener('click', function (event) {
      if (isOpen() && !menu.contains(event.target) && !toggle.contains(event.target)) {
        setOpen(false);
      }
    });

    window.addEventListener('resize', function () {
      if (isOpen() && window.innerWidth > 860) {
        setOpen(false);
      }
    });
  }

  /* Позначає поточну сторінку; розмітка шапки однакова на обох сторінках */
  function markCurrentPage() {
    var page = window.location.pathname.split('/').pop() || 'index.html';
    all('.site-nav a').forEach(function (link) {
      if (link.getAttribute('href') === page) {
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  /* Дати в локальному часі: toISOString зсунув би день через часовий пояс */
  function pad(number) {
    return (number < 10 ? '0' : '') + number;
  }

  function toIsoDate(date) {
    return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
  }

  function parseIsoDate(value) {
    var parts = value.split('-');
    return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  }

  function maxBookingDate() {
    var date = new Date();
    date.setDate(date.getDate() + 60);
    return toIsoDate(date);
  }

  function formatDate(value) {
    var text = new Intl.DateTimeFormat('uk-UA', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(parseIsoDate(value));
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  /* Віджет запису */
  function initBooking() {
    var root = one('[data-booking]');
    var form = one('[data-bk-form]');
    if (!root || !form) {
      return;
    }

    var panels = all('[data-bk-panel]', root);
    var progress = all('[data-bk-progress]', root);
    var status = one('[data-bk-status]', root);
    var alertBox = one('[data-bk-alert]', root);
    var nav = one('[data-bk-nav]', root);
    var back = one('[data-bk-back]', root);
    var next = one('[data-bk-next]', root);
    var edit = one('[data-bk-edit]', root);
    var restart = one('[data-bk-restart]', root);
    var dateInput = one('#bk-date', root);
    var nameInput = one('#bk-name', root);
    var phoneInput = one('#bk-phone', root);
    var emailInput = one('#bk-email', root);
    var carInput = one('#bk-car', root);
    var noteInput = one('#bk-note', root);
    var services = all('input[name="service"]', root);
    var slots = all('input[name="slot"]', root);
    if (panels.length !== 4 || !dateInput || !nameInput || !phoneInput || !emailInput) {
      return;
    }

    var LAST_FORM_STEP = 2;
    var SUMMARY_STEP = 3;
    var statusTexts = [
      'Крок 1 з 3: оберіть послугу',
      'Крок 2 з 3: оберіть дату й час',
      'Крок 3 з 3: залиште контакти',
      'Підсумок: заявку не надіслано, це концепт сайту'
    ];
    var current = 0;

    function checkedOf(radios) {
      return radios.filter(function (radio) {
        return radio.checked;
      })[0] || null;
    }

    function firstEnabled(radios) {
      return radios.filter(function (radio) {
        return !radio.disabled;
      })[0] || radios[0];
    }

    function checkDate() {
      var value = dateInput.value;
      if (!value) {
        return 'Оберіть дату візиту.';
      }
      if (value < toIsoDate(new Date())) {
        return 'Минулу дату обрати не можна. Оберіть сьогодні або пізніший день.';
      }
      if (value > maxBookingDate()) {
        return 'Запис відкрито лише на 60 днів наперед.';
      }
      if (parseIsoDate(value).getDay() === 0) {
        return 'У неділю майстерня зачинена. Оберіть інший день.';
      }
      return '';
    }

    function checkSlot() {
      if (checkedOf(slots)) {
        return '';
      }
      var anyFree = slots.some(function (slot) {
        return !slot.disabled;
      });
      return anyFree ? 'Оберіть час візиту.' : 'На цей день вільного часу вже немає. Оберіть іншу дату.';
    }

    function checkName() {
      return nameInput.value.trim().length >= 2 ? '' : 'Вкажіть ім’я: щонайменше 2 символи.';
    }

    function checkPhone() {
      var value = phoneInput.value.replace(/[\s()-]/g, '');
      if (!value) {
        return 'Вкажіть номер телефону.';
      }
      return /^(\+?38)?0\d{9}$/.test(value) ? '' : 'Вкажіть номер у форматі +380 00 000 00 00.';
    }

    function checkEmail() {
      var value = emailInput.value.trim();
      return !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Вкажіть пошту у форматі hello@example.com.';
    }

    var rules = [
      [{
        error: one('#err-service', root),
        check: function () {
          return checkedOf(services) ? '' : 'Оберіть послугу, щоб продовжити.';
        },
        marked: one('[data-bk-service-group]', root),
        focusTarget: function () {
          return services[0];
        }
      }],
      [{
        error: one('#err-date', root),
        check: checkDate,
        marked: dateInput,
        focusTarget: function () {
          return dateInput;
        }
      }, {
        error: one('#err-slot', root),
        check: checkSlot,
        marked: one('[data-bk-slot-group]', root),
        focusTarget: function () {
          return firstEnabled(slots);
        }
      }],
      [{
        error: one('#err-name', root),
        check: checkName,
        marked: nameInput,
        focusTarget: function () {
          return nameInput;
        }
      }, {
        error: one('#err-phone', root),
        check: checkPhone,
        marked: phoneInput,
        focusTarget: function () {
          return phoneInput;
        }
      }, {
        error: one('#err-email', root),
        check: checkEmail,
        marked: emailInput,
        focusTarget: function () {
          return emailInput;
        }
      }]
    ];

    function applyRule(rule) {
      var message = rule.check();
      if (rule.error) {
        rule.error.textContent = message;
        rule.error.hidden = !message;
      }
      if (rule.marked) {
        if (message) {
          rule.marked.setAttribute('aria-invalid', 'true');
        } else {
          rule.marked.removeAttribute('aria-invalid');
        }
      }
      return message;
    }

    function clearRule(rule) {
      if (rule.error) {
        rule.error.textContent = '';
        rule.error.hidden = true;
      }
      if (rule.marked) {
        rule.marked.removeAttribute('aria-invalid');
      }
    }

    function clearAllErrors() {
      rules.forEach(function (stepRules) {
        stepRules.forEach(clearRule);
      });
      setText(alertBox, '');
    }

    function validateStep(step) {
      var firstInvalid = null;
      var firstMessage = '';
      rules[step].forEach(function (rule) {
        var message = applyRule(rule);
        if (message && !firstInvalid) {
          firstInvalid = rule;
          firstMessage = message;
        }
      });
      if (!firstInvalid) {
        return true;
      }
      setText(alertBox, firstMessage);
      var target = firstInvalid.focusTarget();
      if (target) {
        target.focus();
      }
      return false;
    }

    /* Для сьогоднішньої дати вимикає слоти, які вже минули */
    function refreshSlots() {
      var now = new Date();
      var isToday = dateInput.value === toIsoDate(now);
      var minutesNow = now.getHours() * 60 + now.getMinutes();
      slots.forEach(function (slot) {
        var parts = slot.value.split(':');
        var slotMinutes = Number(parts[0]) * 60 + Number(parts[1]);
        var isPast = isToday && slotMinutes <= minutesNow;
        slot.disabled = isPast;
        if (isPast) {
          slot.checked = false;
        }
      });
    }

    function refreshDateLimits() {
      dateInput.min = toIsoDate(new Date());
      dateInput.max = maxBookingDate();
    }

    function showStep(step, moveFocus) {
      current = step;
      panels.forEach(function (panel, index) {
        panel.hidden = index !== step;
      });
      progress.forEach(function (item, index) {
        var isCurrent = index === step;
        item.classList.toggle('is-current', isCurrent);
        item.classList.toggle('is-done', index < step);
        if (isCurrent) {
          item.setAttribute('aria-current', 'step');
        } else {
          item.removeAttribute('aria-current');
        }
      });
      if (nav) {
        nav.hidden = step === SUMMARY_STEP;
      }
      if (back) {
        back.hidden = step === 0;
      }
      setText(next, step === LAST_FORM_STEP ? 'Показати підсумок' : 'Далі');
      setText(status, statusTexts[step]);
      setText(alertBox, '');
      if (step === 1) {
        refreshDateLimits();
        refreshSlots();
      }
      if (moveFocus) {
        var title = one('[data-bk-title]', panels[step]);
        if (title) {
          title.focus();
        }
      }
    }

    function fillSummary() {
      var service = checkedOf(services);
      var slot = checkedOf(slots);
      var serviceLabel = service ? one('span', service.parentNode) : null;
      var values = {
        service: serviceLabel ? serviceLabel.textContent : '',
        date: dateInput.value ? formatDate(dateInput.value) : '',
        slot: slot ? slot.value : '',
        name: nameInput.value.trim(),
        phone: phoneInput.value.trim(),
        email: emailInput.value.trim() || 'Не вказано',
        car: (carInput && carInput.value.trim()) || 'Не вказано',
        note: (noteInput && noteInput.value.trim()) || 'Не вказано'
      };
      all('[data-sum]', root).forEach(function (cell) {
        cell.textContent = values[cell.getAttribute('data-sum')] || '';
      });
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (current === 1) {
        refreshSlots();
      }
      if (current > LAST_FORM_STEP || !validateStep(current)) {
        return;
      }
      if (current === LAST_FORM_STEP) {
        fillSummary();
      }
      showStep(current + 1, true);
    });

    if (back) {
      back.addEventListener('click', function () {
        if (current > 0) {
          rules[current].forEach(clearRule);
          showStep(current - 1, true);
        }
      });
    }

    if (edit) {
      edit.addEventListener('click', function () {
        showStep(LAST_FORM_STEP, true);
      });
    }

    if (restart) {
      restart.addEventListener('click', function () {
        form.reset();
        clearAllErrors();
        showStep(0, true);
      });
    }

    /* Після виправлення поля помилка зникає одразу */
    function recheckVisibleErrors() {
      if (current > LAST_FORM_STEP) {
        return;
      }
      rules[current].forEach(function (rule) {
        if (rule.error && !rule.error.hidden) {
          applyRule(rule);
        }
      });
    }

    form.addEventListener('input', recheckVisibleErrors);
    form.addEventListener('change', recheckVisibleErrors);

    dateInput.addEventListener('change', function () {
      refreshSlots();
      if (dateInput.value) {
        applyRule(rules[1][0]);
      }
    });

    /* Кнопки «Записатися» у картках послуг одразу обирають послугу */
    all('[data-book]').forEach(function (link) {
      link.addEventListener('click', function () {
        var value = link.getAttribute('data-book');
        var match = services.filter(function (radio) {
          return radio.value === value;
        })[0];
        if (match) {
          match.checked = true;
          clearRule(rules[0][0]);
          showStep(0, false);
        }
      });
    });

    form.reset();
    refreshDateLimits();
    showStep(0, false);
  }

  /* Прайс-лист і кошторис */
  function formatUah(amount) {
    return new Intl.NumberFormat('uk-UA').format(amount) + ' грн';
  }

  function normalize(text) {
    return text.toLowerCase().replace(/[’ʼ`]/g, '\'').replace(/\s+/g, ' ').trim();
  }

  function initPriceFilter() {
    var table = one('[data-price-table]');
    if (!table) {
      return;
    }

    var search = one('[data-price-search]');
    var categories = all('[data-price-category]');
    var count = one('[data-price-count]');
    var empty = one('[data-price-empty]');
    var reset = one('[data-price-reset]');
    var groups = all('tbody[data-category]', table);
    var rows = all('[data-price-row]', table);
    var countTimer = 0;

    var indexed = rows.map(function (row) {
      var group = row.parentNode;
      var title = one('.price-group', group);
      var label = one('.price-name', row);
      return {
        row: row,
        category: group.getAttribute('data-category'),
        text: normalize((label ? label.textContent : row.textContent) + ' ' + (title ? title.textContent : ''))
      };
    });

    function selectedCategory() {
      var selected = categories.filter(function (radio) {
        return radio.checked;
      })[0];
      return selected ? selected.value : 'all';
    }

    function apply() {
      var words = search ? normalize(search.value).split(' ').filter(Boolean) : [];
      var category = selectedCategory();
      var shown = 0;

      indexed.forEach(function (item) {
        var visible = (category === 'all' || item.category === category) &&
          words.every(function (word) {
            return item.text.indexOf(word) !== -1;
          });
        item.row.hidden = !visible;
        if (visible) {
          shown += 1;
        }
      });

      groups.forEach(function (group) {
        group.hidden = !all('[data-price-row]', group).some(function (row) {
          return !row.hidden;
        });
      });

      table.hidden = shown === 0;
      if (empty) {
        empty.hidden = shown !== 0;
      }

      /* Затримка, щоб скринрідер не озвучував кожну введену літеру */
      window.clearTimeout(countTimer);
      countTimer = window.setTimeout(function () {
        setText(count, 'Показано позицій: ' + shown + ' із ' + rows.length);
      }, 300);
    }

    if (search) {
      search.addEventListener('input', apply);
    }

    categories.forEach(function (radio) {
      radio.addEventListener('change', apply);
    });

    if (reset) {
      reset.addEventListener('click', function () {
        if (search) {
          search.value = '';
        }
        categories.forEach(function (radio) {
          radio.checked = radio.value === 'all';
        });
        apply();
        if (search) {
          search.focus();
        }
      });
    }

    apply();
  }

  function initEstimate() {
    var panel = one('[data-estimate]');
    var table = one('[data-price-table]');
    if (!panel || !table) {
      return;
    }

    var checks = all('.price-item input', table);
    var list = one('[data-est-list]', panel);
    var emptyNote = one('[data-est-empty]', panel);
    var total = one('[data-est-total]', panel);
    var clear = one('[data-est-clear]', panel);
    var title = one('[data-est-title]', panel);
    var mini = one('[data-est-mini]');

    function focusTitle() {
      if (title) {
        title.focus();
      }
    }

    function nameOf(check) {
      var label = one('.price-name', check.parentNode);
      return label ? label.textContent : '';
    }

    function buildItem(check) {
      var item = document.createElement('li');
      var name = document.createElement('span');
      var price = document.createElement('strong');
      var remove = document.createElement('button');

      name.textContent = nameOf(check);
      price.textContent = formatUah(Number(check.value));
      remove.type = 'button';
      remove.className = 'estimate-remove';
      remove.textContent = '×';
      remove.setAttribute('aria-label', 'Прибрати з кошторису: ' + nameOf(check));
      remove.addEventListener('click', function () {
        check.checked = false;
        render();
        focusTitle();
      });

      item.appendChild(name);
      item.appendChild(price);
      item.appendChild(remove);
      return item;
    }

    function render() {
      var chosen = checks.filter(function (check) {
        return check.checked;
      });
      var sum = chosen.reduce(function (result, check) {
        return result + Number(check.value);
      }, 0);

      if (list) {
        list.textContent = '';
        chosen.forEach(function (check) {
          list.appendChild(buildItem(check));
        });
        list.hidden = chosen.length === 0;
      }
      if (emptyNote) {
        emptyNote.hidden = chosen.length > 0;
      }
      if (clear) {
        clear.hidden = chosen.length === 0;
      }
      setText(total, formatUah(sum));
      setText(mini, formatUah(sum));
    }

    checks.forEach(function (check) {
      check.addEventListener('change', render);
    });

    if (clear) {
      clear.addEventListener('click', function () {
        checks.forEach(function (check) {
          check.checked = false;
        });
        render();
        focusTitle();
      });
    }

    render();
  }

  initMenu();
  markCurrentPage();
  initBooking();
  initPriceFilter();
  initEstimate();
}());
