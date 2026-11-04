/* Тиха Кімната: інтерактивні частини. Кожен блок перевіряє, чи є потрібні елементи на сторінці. */
(function () {
  'use strict';

  function one(selector, root) {
    return (root || document).querySelector(selector);
  }

  function all(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  function formatNumber(value) {
    try {
      return value.toLocaleString('uk-UA');
    } catch (err) {
      return String(value);
    }
  }

  /* Активний пункт меню: розмітка шапки однакова на всіх сторінках */
  function initCurrentPage() {
    var file = window.location.pathname.split('/').pop() || 'index.html';
    all('.site-nav a').forEach(function (link) {
      if (link.getAttribute('href') === file) {
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  /* Мобільне меню */
  function initMenu() {
    var toggle = one('.nav-toggle');
    var nav = one('#site-nav');
    if (!toggle || !nav) {
      return;
    }
    var label = one('.nav-toggle__label', toggle);

    function isOpen() {
      return toggle.getAttribute('aria-expanded') === 'true';
    }

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      nav.classList.toggle('is-open', open);
      if (label) {
        label.textContent = open ? 'Закрити' : 'Меню';
      }
    }

    toggle.addEventListener('click', function () {
      setOpen(!isOpen());
    });

    nav.addEventListener('click', function (event) {
      if (event.target.closest && event.target.closest('a')) {
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
      if (isOpen() && !nav.contains(event.target) && !toggle.contains(event.target)) {
        setOpen(false);
      }
    });

    document.addEventListener('focusin', function (event) {
      if (isOpen() && !nav.contains(event.target) && !toggle.contains(event.target)) {
        setOpen(false);
      }
    });

    window.addEventListener('resize', function () {
      if (isOpen() && window.innerWidth > 860) {
        setOpen(false);
      }
    });
  }

  /* Поява блоків під час прокручування */
  function initReveal() {
    var items = all('.reveal');
    if (!items.length) {
      return;
    }
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function showAll() {
      items.forEach(function (item) {
        item.classList.add('is-in');
      });
    }

    if (reduced || !('IntersectionObserver' in window)) {
      showAll();
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    items.forEach(function (item) {
      observer.observe(item);
    });
  }

  /* Фільтр концептів */
  function conceptWord(count) {
    var lastTwo = count % 100;
    var last = count % 10;
    if (lastTwo >= 11 && lastTwo <= 14) {
      return 'концептів';
    }
    if (last === 1) {
      return 'концепт';
    }
    if (last >= 2 && last <= 4) {
      return 'концепти';
    }
    return 'концептів';
  }

  function initFilter() {
    var gallery = one('.gallery');
    var buttons = all('[data-filter]');
    if (!gallery || !buttons.length) {
      return;
    }
    var cards = all('[data-room]', gallery);
    var status = one('.filters__status');

    function apply(value) {
      var shown = 0;
      cards.forEach(function (card) {
        var match = value === 'all' || card.getAttribute('data-room') === value;
        card.hidden = !match;
        if (match) {
          shown += 1;
        }
      });
      buttons.forEach(function (button) {
        button.setAttribute('aria-pressed', button.getAttribute('data-filter') === value ? 'true' : 'false');
      });
      gallery.classList.toggle('is-filtered', value !== 'all');
      if (status) {
        status.textContent = 'Показано ' + shown + ' ' + conceptWord(shown) + ' із ' + cards.length;
      }
    }

    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        apply(button.getAttribute('data-filter'));
      });
    });
  }

  /* Слайдер до/після: миша, дотик і клавіатура */
  function initCompare() {
    var root = one('[data-compare]');
    if (!root) {
      return;
    }
    var handle = one('.ba__handle', root);
    if (!handle) {
      return;
    }
    var position = 50;
    var dragging = false;

    function setPosition(value) {
      position = Math.min(100, Math.max(0, value));
      var rounded = Math.round(position);
      root.style.setProperty('--pos', position + '%');
      handle.setAttribute('aria-valuenow', String(rounded));
      handle.setAttribute('aria-valuetext', 'Стан «до»: ' + rounded + '%, стан «після»: ' + (100 - rounded) + '%');
    }

    function moveTo(event) {
      var rect = root.getBoundingClientRect();
      if (rect.width > 0) {
        setPosition(((event.clientX - rect.left) / rect.width) * 100);
      }
    }

    root.addEventListener('pointerdown', function (event) {
      if (event.pointerType === 'mouse' && event.button !== 0) {
        return;
      }
      dragging = true;
      if (root.setPointerCapture) {
        try {
          root.setPointerCapture(event.pointerId);
        } catch (err) {
          /* без захоплення перетягування теж працює в межах блока */
        }
      }
      moveTo(event);
    });

    root.addEventListener('pointermove', function (event) {
      if (dragging) {
        moveTo(event);
      }
    });

    root.addEventListener('pointerup', function () {
      if (dragging) {
        dragging = false;
        handle.focus({ preventScroll: true });
      }
    });

    root.addEventListener('pointercancel', function () {
      dragging = false;
    });

    handle.addEventListener('keydown', function (event) {
      var next = null;
      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowDown':
          next = position - 2;
          break;
        case 'ArrowRight':
        case 'ArrowUp':
          next = position + 2;
          break;
        case 'PageDown':
          next = position - 10;
          break;
        case 'PageUp':
          next = position + 10;
          break;
        case 'Home':
          next = 0;
          break;
        case 'End':
          next = 100;
          break;
        default:
          return;
      }
      event.preventDefault();
      setPosition(next);
    });

    setPosition(position);
  }

  /* Показ і прибирання помилки біля поля */
  function setFieldError(input, errorEl, message) {
    if (message) {
      input.setAttribute('aria-invalid', 'true');
    } else {
      input.removeAttribute('aria-invalid');
    }
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.hidden = !message;
    }
  }

  /* Калькулятор: ставки беруться з атрибутів data-rate у розмітці */
  function initEstimator() {
    var form = one('#estimator-form');
    if (!form) {
      return;
    }
    var area = one('#est-area', form);
    var levels = all('input[name="level"]', form);
    var error = one('#est-area-error', form);
    var total = one('#est-total');
    var detail = one('#est-detail');
    if (!area || !levels.length || !total || !detail) {
      return;
    }
    var min = Number(area.getAttribute('min')) || 10;
    var max = Number(area.getAttribute('max')) || 1000;

    function selectedLevel() {
      return levels.filter(function (level) {
        return level.checked;
      })[0] || null;
    }

    function update() {
      var raw = String(area.value).trim().replace(',', '.');
      var value = Number(raw);
      var message = '';

      if (raw === '') {
        message = 'Вкажіть площу в квадратних метрах.';
      } else if (!isFinite(value) || value < min || value > max) {
        message = 'Площа має бути числом від ' + min + ' до ' + formatNumber(max) + ' м².';
      }
      setFieldError(area, error, message);

      var level = selectedLevel();
      if (message || !level) {
        total.textContent = '—';
        detail.textContent = 'Введіть площу, щоб побачити розрахунок.';
        return;
      }

      var rate = Number(level.getAttribute('data-rate'));
      var sum = Math.round((value * rate) / 100) * 100;
      total.textContent = formatNumber(sum) + ' грн';
      detail.textContent = formatNumber(value) + ' м² × ' + formatNumber(rate) +
        ' грн/м², рівень «' + level.getAttribute('data-name') + '»';
    }

    form.addEventListener('input', update);
    form.addEventListener('change', update);
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      update();
    });
    update();
  }

  /* Контактна форма: лише перевірка в браузері, нічого не надсилається */
  function initContactForm() {
    var form = one('#contact-form');
    if (!form) {
      return;
    }
    var status = one('#form-status');
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    var phonePattern = /^\+?[\d\s()-]+$/;

    var rules = {
      name: function (input) {
        var value = input.value.trim();
        if (!value) {
          return 'Вкажіть ваше ім’я.';
        }
        return value.length < 2 ? 'Ім’я має містити щонайменше 2 символи.' : '';
      },
      email: function (input) {
        var value = input.value.trim();
        if (!value) {
          return 'Вкажіть електронну пошту.';
        }
        return emailPattern.test(value) ? '' : 'Перевірте адресу: вона має виглядати як hello@example.com.';
      },
      phone: function (input) {
        var value = input.value.trim();
        if (!value) {
          return '';
        }
        var digits = value.replace(/\D/g, '').length;
        return phonePattern.test(value) && digits >= 10 && digits <= 13 ?
          '' : 'Перевірте номер: потрібно від 10 до 13 цифр.';
      },
      room: function (input) {
        return input.value ? '' : 'Оберіть тип кімнати.';
      },
      message: function (input) {
        var value = input.value.trim();
        if (!value) {
          return 'Опишіть, що хочете змінити.';
        }
        return value.length < 10 ? 'Напишіть трохи докладніше: щонайменше 10 символів.' : '';
      },
      consent: function (input) {
        return input.checked ? '' : 'Підтвердьте, що розумієте: це концепт сайту.';
      }
    };

    var fields = Object.keys(rules).map(function (name) {
      return { input: form.elements[name], rule: rules[name], error: one('#' + name + '-error', form) };
    }).filter(function (field) {
      return Boolean(field.input);
    });

    function check(field) {
      var message = field.rule(field.input);
      setFieldError(field.input, field.error, message);
      return !message;
    }

    fields.forEach(function (field) {
      field.input.addEventListener('blur', function () {
        if (field.input.value.trim() !== '' && field.input.type !== 'checkbox') {
          check(field);
        }
      });
      ['input', 'change'].forEach(function (type) {
        field.input.addEventListener(type, function () {
          if (status) {
            status.hidden = true;
          }
          if (field.input.getAttribute('aria-invalid') === 'true') {
            check(field);
          }
        });
      });
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var invalid = fields.filter(function (field) {
        return !check(field);
      });

      if (invalid.length) {
        if (status) {
          status.hidden = true;
        }
        invalid[0].input.focus();
        return;
      }

      form.reset();
      if (status) {
        status.hidden = false;
        status.focus();
      }
    });
  }

  function start() {
    initCurrentPage();
    initMenu();
    initReveal();
    initFilter();
    initCompare();
    initEstimator();
    initContactForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
