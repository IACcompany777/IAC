/* All site text lives here. Each L("...", "...") is English first, Ukrainian second. */
const L = (en, uk) => ({ en, uk });

window.SITE = {
  /* ===== EDIT THIS PART ===== */
  contacts: {
    email: "artemsevcuk053@gmail.com",
    telegram: "IACcompany1", // username without @
    upwork: "", // full link to your Upwork profile
    github: "", // full link to your GitHub profile
  },

  // Add real projects only, and label concepts as concepts. Copy one block for each new project.
  projects: [
    {
      title: L("Concept: Tepla Skorynka bakery", "Концепт: пекарня «Тепла Скоринка»"),
      text: L(
        "A one-page bakery site concept with a filterable menu and a working order basket.",
        "Односторінковий концепт сайту пекарні з фільтром меню та робочим кошиком замовлення."
      ),
      tags: "HTML · CSS · JavaScript",
      link: "demos/bakery/index.html",
    },
    {
      title: L("Concept: Tykha Kimnata interior studio", "Концепт: студія інтер'єрів «Тиха Кімната»"),
      text: L(
        "A four-page studio site concept with a filterable gallery, a before/after slider, and a cost estimator.",
        "Чотиристорінковий концепт сайту студії з фільтром галереї, слайдером «до і після» та калькулятором вартості."
      ),
      tags: "HTML · CSS · JavaScript",
      link: "demos/interior/index.html",
    },
    {
      title: L("Concept: Hayka i Kliuch car repair", "Концепт: автосервіс «Гайка і Ключ»"),
      text: L(
        "A two-page repair shop site concept with step-by-step online booking and a live price estimate.",
        "Двосторінковий концепт сайту автосервісу з покроковим онлайн-записом і живим кошторисом."
      ),
      tags: "HTML · CSS · JavaScript",
      link: "demos/autoservice/index.html",
    },
    {
      title: L("IAC website", "Сайт IAC"),
      text: L(
        "A responsive multi-page site with English and Ukrainian versions, animations, a time calculator, and a project brief form.",
        "Адаптивний багатосторінковий сайт англійською та українською мовами з анімаціями, калькулятором часу та формою для опису проєкту."
      ),
      tags: "HTML · CSS · JavaScript",
      link: "",
    },
  ],

  // Add real client reviews only. Example:
  // { name: "Client name", project: L("Telegram bot", "Telegram-бот"), text: L("Review in English", "Відгук українською"), link: "https://link-to-the-original-review" },
  reviews: [],
  /* ===== END OF EDITABLE PART ===== */

  nav: [
    ["services.html", L("Services", "Послуги")],
    ["work.html", L("Work", "Роботи")],
    ["reviews.html", L("Reviews", "Відгуки")],
    ["process.html", L("Process", "Процес")],
    ["about.html", L("About", "Про мене")],
    ["faq.html", L("FAQ", "Питання")],
    ["contact.html", L("Contact", "Контакти")],
  ],

  ui: {
    location: L("Vinnytsia, Ukraine", "Вінниця, Україна"),
    menu: L("Menu", "Меню"),
    learnMore: L("Learn more", "Детальніше"),
    viewProject: L("View project", "Переглянути проєкт"),
    moreProjects: L("More projects will appear here as they are finished.", "Нові проєкти з'являтимуться тут після завершення."),
    emailMe: L("Email me", "Написати листа"),
    pages: L("Pages", "Сторінки"),
    servicesLabel: L("Services", "Послуги"),
    rights: L("Independent software developer", "Незалежний розробник програмного забезпечення"),
    calc: {
      title: L("How much time does the task take?", "Скільки часу забирає завдання?"),
      lead: L("Enter your own numbers to see how much time one repeated task takes each year.", "Введіть свої дані й побачите, скільки часу одне повторюване завдання забирає за рік."),
      minutes: L("Minutes per task", "Хвилин на одне завдання"),
      times: L("Times per week", "Разів на тиждень"),
      people: L("People doing it", "Скільки людей це робить"),
      result: L("hours per year", "годин на рік"),
      days: L("That is about {n} eight-hour workdays.", "Робочих днів по 8 годин: приблизно {n}."),
      note: L("This is simple arithmetic based on your numbers, not a promise of savings.", "Це простий підрахунок за вашими даними, а не обіцянка економії."),
    },
    brief: {
      title: L("Describe your project", "Опишіть свій проєкт"),
      lead: L("Fill this in, and your email app will open with a ready message. Nothing is sent until you press send there.", "Заповніть форму, і ваша поштова програма відкриється з готовим листом. Нічого не надсилається, доки ви самі не натиснете кнопку там."),
      name: L("Your name", "Ваше ім'я"),
      type: L("What do you need?", "Що вам потрібно?"),
      types: [
        L("Telegram bot", "Telegram-бот"),
        L("Automation", "Автоматизація"),
        L("Website", "Сайт"),
        L("Bug fix", "Виправлення помилки"),
        L("Not sure yet", "Ще не знаю"),
      ],
      task: L("What should it do?", "Що воно має робити?"),
      deadline: L("Deadline (optional)", "Термін (необов'язково)"),
      budget: L("Budget (optional)", "Бюджет (необов'язково)"),
      send: L("Prepare email", "Підготувати листа"),
      copy: L("Copy text", "Скопіювати текст"),
      copied: L("Text copied.", "Текст скопійовано."),
      copyFailed: L("Could not copy the text. Please select it manually.", "Не вдалося скопіювати текст. Виділіть його вручну."),
      needTask: L("Please describe the task first.", "Спочатку опишіть завдання."),
      opened: L("Your email app should open now.", "Зараз має відкритися ваша поштова програма."),
      subject: L("New project request", "Запит на новий проєкт"),
    },
    game: {
      score: L("Caught", "Спіймано"),
    },
    noReviewsTitle: L("No reviews yet", "Відгуків поки немає"),
    noReviews: L("Client reviews will appear here after the first finished projects. I only publish real ones.", "Відгуки клієнтів з'являться тут після перших завершених проєктів. Я публікую лише справжні."),
    originalReview: L("See the original", "Переглянути оригінал"),
  },

  pages: {
    home: {
      blocks: [
        {
          type: "hero", big: true, terminal: true,
          eyebrow: L("Software developer · Vinnytsia, Ukraine", "Розробник програмного забезпечення · Вінниця, Україна"),
          title: L("Small software that does its job.", "Невеликі програми, які роблять свою справу."),
          lead: L("I build bots, automation scripts, and websites for people who want a clear plan and code they can keep.", "Створюю ботів, скрипти для автоматизації та сайти для тих, кому потрібні зрозумілий план і код, який залишиться у вас."),
          button: { text: L("Tell me about your task", "Розкажіть про завдання"), href: "contact.html" },
        },
        {
          type: "cards", title: L("What I build", "Що я створюю"),
          items: [
            { title: L("Telegram bots", "Telegram-боти"), text: L("Bots for orders, notifications, and everyday customer questions.", "Боти для замовлень, сповіщень і типових запитань клієнтів."), href: "telegram-bots.html" },
            { title: L("Automation", "Автоматизація"), text: L("Scripts that handle repeated work and connect your tools through APIs.", "Скрипти, які виконують повторювану роботу та з'єднують ваші сервіси через API."), href: "automation.html" },
            { title: L("Websites", "Сайти"), text: L("Responsive landing pages and small sites that are easy to maintain.", "Адаптивні лендинги та невеликі сайти, які легко підтримувати."), href: "websites.html" },
          ],
        },
        {
          type: "checks", title: L("What you can expect", "На що можна розраховувати"),
          items: [
            L("Scope, deadline, and price agreed before work starts", "Обсяг робіт, термін і ціну погоджуємо до початку"),
            L("Regular progress updates in plain language", "Регулярні новини про хід роботи простою мовою"),
            L("Testing against what we agreed", "Перевірка результату відповідно до домовленостей"),
            L("Source code and setup instructions at handover", "Вихідний код та інструкція із запуску при здачі"),
          ],
        },
        { type: "projects", title: L("Recent work", "Останні роботи") },
        {
          type: "cta",
          title: L("Have a task in mind?", "Маєте завдання?"),
          text: L("Send a short description, and I'll reply with my approach and a time estimate.", "Надішліть короткий опис, і я відповім, як планую його виконати та скільки часу це займе."),
          button: { text: L("Start a project", "Почати проєкт"), href: "contact.html" },
        },
      ],
    },

    services: {
      blocks: [
        {
          type: "hero",
          eyebrow: L("Services", "Послуги"),
          title: L("Pick the problem. I'll build the fix.", "Оберіть проблему. Я створю рішення."),
          lead: L("I focus on small and medium projects with a clear goal.", "Я працюю з малими й середніми проєктами, які мають чітку мету."),
        },
        {
          type: "cards", title: L("Main services", "Основні послуги"),
          items: [
            { title: L("Telegram bots", "Telegram-боти"), text: L("Take orders, send notifications, and answer common questions.", "Приймайте замовлення, надсилайте сповіщення й відповідайте на типові запитання."), href: "telegram-bots.html" },
            { title: L("Automation", "Автоматизація"), text: L("Move repeated work from people to scripts.", "Передайте повторювану роботу від людей скриптам."), href: "automation.html" },
            { title: L("Websites", "Сайти"), text: L("Present your business or offer on a fast, clear site.", "Покажіть свій бізнес чи пропозицію на швидкому й зрозумілому сайті."), href: "websites.html" },
          ],
        },
        {
          type: "checks", title: L("Also available", "Також можу допомогти"),
          items: [
            L("Fixing bugs in small projects", "Виправити помилки в невеликих проєктах"),
            L("Connecting two services through an API", "З'єднати два сервіси через API"),
            L("Adding a feature to an existing bot or site", "Додати функцію до наявного бота чи сайту"),
          ],
        },
        {
          type: "cta",
          title: L("Not sure what you need?", "Не знаєте, що саме потрібно?"),
          text: L("Describe the problem in your own words. We can choose the solution together.", "Опишіть проблему своїми словами. Рішення оберемо разом."),
          button: { text: L("Describe the problem", "Описати проблему"), href: "contact.html" },
        },
      ],
    },

    bots: {
      blocks: [
        {
          type: "hero",
          eyebrow: L("Telegram bots", "Telegram-боти"),
          title: L("A bot that answers while you work.", "Бот, який відповідає, поки ви працюєте."),
          lead: L("Automate the conversations and notifications you handle over and over.", "Автоматизуйте розмови й сповіщення, які постійно повторюються."),
          button: { text: L("Discuss a bot", "Обговорити бота"), href: "contact.html" },
        },
        {
          type: "cards", title: L("What a bot can do", "Що може бот"),
          items: [
            { title: L("Take orders", "Приймати замовлення"), text: L("Collect the details step by step and pass them to you.", "Збирати деталі крок за кроком і передавати їх вам.") },
            { title: L("Send notifications", "Надсилати сповіщення"), text: L("Tell you or your customers when something changes.", "Повідомляти вас чи клієнтів, коли щось змінюється.") },
            { title: L("Answer questions", "Відповідати на запитання"), text: L("Handle common questions through menus and buttons.", "Обробляти типові запитання через меню й кнопки.") },
            { title: L("Book appointments", "Записувати на прийом"), text: L("Let customers choose a time without a phone call.", "Клієнти обирають час без дзвінка.") },
            { title: L("Save data", "Зберігати дані"), text: L("Store requests in a table or database.", "Записувати заявки в таблицю чи базу даних.") },
            { title: L("Connect services", "З'єднувати сервіси"), text: L("Exchange data with your other tools through APIs.", "Обмінюватися даними з іншими сервісами через API.") },
          ],
        },
        {
          type: "checks", title: L("What you get", "Що ви отримаєте"),
          items: [
            L("A working bot that has been tested on the agreed scenarios", "Робочого бота, перевіреного на погоджених сценаріях"),
            L("Full source code", "Повний вихідний код"),
            L("Instructions for running and updating the bot", "Інструкцію із запуску й оновлення бота"),
          ],
        },
        {
          type: "cta",
          title: L("What should your bot do?", "Що має робити ваш бот?"),
          text: L("List the main actions, and I'll suggest a simple first version.", "Перелічіть основні дії, і я запропоную просту першу версію."),
          button: { text: L("Describe your bot", "Описати бота"), href: "contact.html" },
        },
      ],
    },

    automation: {
      blocks: [
        {
          type: "hero",
          eyebrow: L("Automation", "Автоматизація"),
          title: L("Let scripts do the boring part.", "Нехай нудну частину роблять скрипти."),
          lead: L("If a task follows the same steps every time, it may be a good fit for automation.", "Якщо завдання щоразу виконується за тими самими кроками, його, ймовірно, можна автоматизувати."),
          button: { text: L("Discuss a task", "Обговорити завдання"), href: "contact.html" },
        },
        { type: "calculator" },
        {
          type: "cards", title: L("Common tasks to automate", "Що часто автоматизують"),
          items: [
            { title: L("Collecting data", "Збір даних"), text: L("Gather permitted public data into one table.", "Збирати дозволені публічні дані в одну таблицю.") },
            { title: L("Reports", "Звіти"), text: L("Build the same report on schedule.", "Створювати той самий звіт за розкладом.") },
            { title: L("File processing", "Обробка файлів"), text: L("Rename, sort, and convert files in bulk.", "Масово перейменовувати, сортувати й конвертувати файли.") },
            { title: L("API integrations", "Інтеграції через API"), text: L("Pass data between services without copying it by hand.", "Передавати дані між сервісами без ручного копіювання.") },
          ],
        },
        {
          type: "steps", title: L("How we start", "З чого почнемо"),
          items: [
            L("You show me how the task is done today.", "Ви показуєте, як завдання виконується зараз."),
            L("I find the steps a script can safely handle.", "Я визначаю кроки, які скрипт може безпечно виконувати."),
            L("We agree on a small first version.", "Ми погоджуємо невелику першу версію."),
            L("I build and test it on real examples.", "Я створюю її та перевіряю на реальних прикладах."),
          ],
        },
        {
          type: "cta",
          title: L("Which task wastes your time?", "Яке завдання забирає ваш час?"),
          text: L("Describe it step by step, and I'll tell you whether automation makes sense.", "Опишіть його крок за кроком, і я скажу, чи варто його автоматизувати."),
          button: { text: L("Describe the task", "Описати завдання"), href: "contact.html" },
        },
      ],
    },

    websites: {
      blocks: [
        {
          type: "hero",
          eyebrow: L("Websites", "Сайти"),
          title: L("A clear site without extra weight.", "Зрозумілий сайт без зайвого."),
          lead: L("Landing pages and small sites that explain what you do and how to reach you.", "Лендинги й невеликі сайти, які пояснюють, що ви робите і як із вами зв'язатися."),
          button: { text: L("Discuss a site", "Обговорити сайт"), href: "contact.html" },
        },
        {
          type: "cards", title: L("What I can make", "Що можу зробити"),
          items: [
            { title: L("Landing pages", "Лендинги"), text: L("One focused page for a product, service, or event.", "Одна сторінка для продукту, послуги чи події.") },
            { title: L("Business sites", "Сайти для бізнесу"), text: L("A few pages covering services, work, and contacts.", "Кілька сторінок про послуги, роботи й контакти.") },
            { title: L("Portfolios", "Портфоліо"), text: L("A simple place to show your work.", "Просте місце, щоб показати свої роботи.") },
          ],
        },
        {
          type: "checks", title: L("Every site includes", "У кожному сайті"),
          items: [
            L("Layout that works on phones and computers", "Вигляд, що працює на телефонах і комп'ютерах"),
            L("Clear navigation and contact options", "Зрозуміла навігація та контакти"),
            L("Basic setup for search engines", "Базове налаштування для пошукових систем"),
            L("Help with launching on your own domain and hosting", "Допомога із запуском на вашому домені й хостингу"),
          ],
        },
        {
          type: "text", title: L("You own the site", "Сайт належить вам"),
          paragraphs: [
            L("The domain and hosting stay on your own account, and you pay for them directly. I can recommend options and set everything up.", "Домен і хостинг залишаються на вашому акаунті, і ви оплачуєте їх напряму. Я можу порадити варіанти й усе налаштувати."),
          ],
        },
        {
          type: "cta",
          title: L("Need a site?", "Потрібен сайт?"),
          text: L("Tell me what it should do and share any examples you like.", "Розкажіть, що він має робити, і надішліть приклади, які вам подобаються."),
          button: { text: L("Start a site", "Почати сайт"), href: "contact.html" },
        },
      ],
    },

    work: {
      blocks: [
        {
          type: "hero",
          eyebrow: L("Work", "Роботи"),
          title: L("Working sites you can open.", "Робочі сайти, які можна відкрити."),
          lead: L("These concept sites show what I can build. They are not client projects.", "Ці концепти сайтів показують, що я вмію. Це не проєкти для клієнтів."),
        },
        { type: "projects", title: L("Projects", "Проєкти") },
        {
          type: "cta",
          title: L("Your project could be next.", "Наступним може бути ваш проєкт."),
          text: L("Send a short description of what you need.", "Надішліть короткий опис того, що вам потрібно."),
          button: { text: L("Get in touch", "Зв'язатися"), href: "contact.html" },
        },
      ],
    },

    reviews: {
      blocks: [
        {
          type: "hero",
          eyebrow: L("Reviews", "Відгуки"),
          title: L("What clients say.", "Що кажуть клієнти."),
          lead: L("Real feedback from people I've worked with.", "Справжні відгуки людей, з якими я працював."),
        },
        { type: "reviews" },
        {
          type: "cta",
          title: L("Have we worked together?", "Ми вже працювали разом?"),
          text: L("I'd be glad to hear your feedback, good or bad.", "Буду радий вашому відгуку, хорошому чи поганому."),
          button: { text: L("Send feedback", "Надіслати відгук"), href: "contact.html" },
        },
      ],
    },

    process: {
      blocks: [
        {
          type: "hero",
          eyebrow: L("Process", "Процес"),
          title: L("No guessing where the project stands.", "Ви завжди знаєте, на якому етапі проєкт."),
          lead: L("Every project follows the same simple path.", "Кожен проєкт проходить той самий простий шлях."),
        },
        {
          type: "timeline",
          items: [
            { title: L("Brief", "Опис завдання"), text: L("You describe the goal and share any examples or access I need.", "Ви описуєте мету й надаєте приклади чи потрібні доступи.") },
            { title: L("Plan and price", "План і ціна"), text: L("I suggest an approach. We agree on the scope, deadline, and price.", "Я пропоную підхід. Ми погоджуємо обсяг робіт, термін і ціну.") },
            { title: L("Build", "Розробка"), text: L("I do the work and share progress. If the scope changes, we discuss it first.", "Я виконую роботу й розповідаю про хід. Якщо обсяг змінюється, ми спершу це обговорюємо.") },
            { title: L("Test", "Перевірка"), text: L("I test the result against what we agreed, including empty data and common errors.", "Я перевіряю результат відповідно до домовленостей, зокрема порожні дані й типові помилки.") },
            { title: L("Handover", "Здача"), text: L("You get the source code, access details, and setup instructions.", "Ви отримуєте вихідний код, доступи та інструкцію із запуску.") },
          ],
        },
        {
          type: "cta",
          title: L("Ready for step one?", "Готові до першого кроку?"),
          text: L("The brief form takes only a few minutes.", "Заповнення форми займе лише кілька хвилин."),
          button: { text: L("Fill in the brief", "Заповнити форму"), href: "contact.html" },
        },
      ],
    },

    about: {
      blocks: [
        {
          type: "hero",
          eyebrow: L("About", "Про мене"),
          title: L("One developer. Direct contact.", "Один розробник. Прямий зв'язок."),
          lead: L("IAC is my independent development practice in Vinnytsia, Ukraine.", "IAC — це моя незалежна розробницька практика у Вінниці, Україна."),
        },
        {
          type: "text", title: L("Who you'll work with", "З ким ви працюватимете"),
          paragraphs: [
            L("You work directly with me, with no managers or middlemen in between.", "Ви працюєте безпосередньо зі мною, без менеджерів і посередників."),
            L("I'm early in my freelance career, so I take on projects I can finish well and I'm upfront about what I can do.", "Я на початку фриланс-кар'єри, тому беру проєкти, які можу добре завершити, і чесно кажу, що мені під силу."),
          ],
        },
        {
          type: "checks", title: L("What matters to me", "Що для мене важливо"),
          items: [
            L("Honest estimates", "Чесні оцінки"),
            L("Simple code that is easy to maintain", "Простий код, який легко підтримувати"),
            L("Clear communication", "Зрозуміле спілкування"),
            L("Finishing what we agreed", "Виконання домовленостей до кінця"),
          ],
        },
        {
          type: "cta",
          title: L("Let's talk about your project.", "Поговорімо про ваш проєкт."),
          text: L("Send a short description, and I'll reply with next steps.", "Надішліть короткий опис, і я відповім, що робити далі."),
          button: { text: L("Contact me", "Зв'язатися зі мною"), href: "contact.html" },
        },
      ],
    },

    faq: {
      blocks: [
        {
          type: "hero",
          eyebrow: L("FAQ", "Питання"),
          title: L("Good questions, short answers.", "Хороші запитання, короткі відповіді."),
          lead: L("If your question isn't here, just ask.", "Якщо вашого запитання тут немає, просто напишіть мені."),
        },
        {
          type: "faq",
          items: [
            { q: L("How much does a project cost?", "Скільки коштує проєкт?"), a: L("It depends on the scope. Send a description, and I'll give you a price before any work starts.", "Це залежить від обсягу робіт. Надішліть опис, і я назву ціну ще до початку роботи.") },
            { q: L("How long does it take?", "Скільки часу це займе?"), a: L("I'll give you an estimate after reviewing the task. We agree on the deadline before I start.", "Я оціню термін, коли ознайомлюся із завданням. Ми погодимо його до початку роботи.") },
            { q: L("Who pays for the domain and hosting?", "Хто платить за домен і хостинг?"), a: L("You buy them on your own account, so you keep full ownership. They aren't included in my price, but I can help set them up.", "Ви купуєте їх на свій акаунт, тому повністю ними володієте. Вони не входять у мою ціну, але я можу допомогти з налаштуванням.") },
            { q: L("Do I get the source code?", "Чи отримаю я вихідний код?"), a: L("Yes. You get the code and instructions when the project is finished.", "Так. Ви отримаєте код та інструкцію після завершення проєкту.") },
            { q: L("Can you work on an existing project?", "Чи можете ви працювати з наявним проєктом?"), a: L("Often, yes. I'd need to see the code first to tell you whether I'm the right person for it.", "Часто так. Спершу мені потрібно подивитися на код, щоб сказати, чи я підхожу для цієї роботи.") },
            { q: L("What if the task grows during the work?", "Що, як завдання збільшиться під час роботи?"), a: L("We stop and discuss the new scope and price before I continue.", "Ми зупиняємося й обговорюємо новий обсяг і ціну, перш ніж я продовжу.") },
            { q: L("Do you use AI tools?", "Чи використовуєте ви ШІ-інструменти?"), a: L("Yes, I use AI-assisted development tools, and I review and test the result. If your project has restrictions on them, tell me before sharing any code.", "Так, я використовую ШІ-інструменти для розробки, а результат перевіряю й тестую. Якщо у вашому проєкті є обмеження, скажіть про це, перш ніж передавати код.") },
          ],
        },
        {
          type: "cta",
          title: L("Still have a question?", "Залишилися запитання?"),
          text: L("Write to me, and I'll answer directly.", "Напишіть мені, і я відповім особисто."),
          button: { text: L("Ask a question", "Поставити запитання"), href: "contact.html" },
        },
      ],
    },

    contact: {
      blocks: [
        {
          type: "hero",
          eyebrow: L("Contact", "Контакти"),
          title: L("Tell me what you need.", "Розкажіть, що вам потрібно."),
          lead: L("A few sentences are enough to get started.", "Для початку достатньо кількох речень."),
        },
        { type: "brief" },
        { type: "contacts", title: L("Other ways to reach me", "Інші способи зв'язку") },
      ],
    },

    notfound: {
      blocks: [
        {
          type: "hero", big: true, game: true,
          eyebrow: L("Error 404", "Помилка 404"),
          title: L("This page got away.", "Ця сторінка втекла."),
          lead: L("While you're here, click the flying carets to catch them.", "Поки ви тут, клікайте на летючі галочки, щоб їх ловити."),
          button: { text: L("Back to home", "На головну"), href: "index.html" },
        },
      ],
    },
  },
};
