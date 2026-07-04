# Add Soft Skills Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use compose:subagent (recommended) or compose:execute to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new "Soft Skills" section with 10 items before the Work Experience section in the resume.

**Architecture:** Follow the exact pattern of the existing `experience` component — a Handlebars partial with data-driven items, i18n translations in `translations-ui.json`, and SCSS styles extending shared section mixins. The new component is inserted into `index.html` between `skills` and `experience`.

**Tech Stack:** Handlebars, SCSS, JSON (i18n), TARS build system.

---

### Task 1: Create soft-skills component template

**Covers:** New section with subtitle and 10 skill items.

**Files:**
- Create: `markup/components/soft-skills/soft-skills.html`

- [ ] **Step 1: Create the Handlebars template**

Create `markup/components/soft-skills/soft-skills.html`:

```handlebars
<section class="section soft-skills">
    <h2 class="title section-title" data-i18n="section.softSkills.title">
        {{t 'section.softSkills.title'}}
    </h2>
    <p class="desc" data-i18n="section.softSkills.desc">
        {{t 'section.softSkills.desc'}}
    </p>
    <ul class="soft-skills-list">
        {{#each softSkills}}
        <li class="soft-skills-item">
            <h3 class="soft-skills-title" data-i18n="softSkills.{{@index}}.title">{{{title.en}}}</h3>
            <p class="soft-skills-desc" data-i18n="softSkills.{{@index}}.description">{{{description.en}}}</p>
        </li>
        {{/each}}
    </ul>
</section>
```

- [ ] **Step 2: Verify the file was created correctly**

Read the file back and confirm it matches the experience component pattern with `soft-skills` class naming.

---

### Task 2: Create soft-skills data file

**Covers:** Data for 10 soft skill items with en/ru/uk translations.

**Files:**
- Create: `markup/components/soft-skills/data/data.js`

- [ ] **Step 1: Create the data file**

Create `markup/components/soft-skills/data/data.js`:

```javascript
const data = {
    softSkills: [
        {
            title: {
                en: 'Technical Leadership & Mentorship',
                ru: 'Техническое лидерство и наставничество',
                uk: 'Технічне лідерство та наставництво'
            },
            description: {
                en: 'Spearhead architectural direction and provide technical mentorship to elevate team capabilities in Hyvä, Alpine.js, and complex backend debugging.',
                ru: 'Руководство архитектурным направлением и техническое наставничество для повышения компетенций команды в Hyvä, Alpine.js и сложной отладке бэкенда.',
                uk: 'Керівництво архітектурним напрямком та технічне наставництво для підвищення компетенцій команди в Hyvä, Alpine.js та складному налагодженні бекенду.'
            }
        },
        {
            title: {
                en: 'Strategic Problem Solving',
                ru: 'Стратегическое решение проблем',
                uk: 'Стратегічне вирішення проблем'
            },
            description: {
                en: 'Expert at auditing complex legacy systems, identifying deep-seated architectural bottlenecks, and prioritizing high-impact solutions to maximize business outcomes.',
                ru: 'Экспертиза в аудите сложных legacy-систем, выявлении глубинных архитектурных узких мест и приоритизации высокоэффективных решений для максимизации бизнес-результатов.',
                uk: 'Експертиза в аудиті складних legacy-систем, виявленні глибинних архітектурних вузьких місць та пріоритизації високоефективних рішень для максимізації бізнес-результатів.'
            }
        },
        {
            title: {
                en: 'Stakeholder & Business Alignment',
                ru: 'Согласование с заинтересованными сторонами и бизнесом',
                uk: 'Узгодження із зацікавленими сторонами та бізнесом'
            },
            description: {
                en: 'Proven ability to translate complex technical metrics (Core Web Vitals, conversion rates) into clear business value for non-technical stakeholders.',
                ru: 'Доказанная способность транслировать сложные технические метрики (Core Web Vitals, коэффициенты конверсии) в понятную бизнес-ценность для нетехнических заинтересованных сторон.',
                uk: 'Доведена здатність транслювати складні технічні метрики (Core Web Vitals, коефіцієнти конверсії) в зрозумілу бізнес-цінність для нетехнічних зацікавлених сторін.'
            }
        },
        {
            title: {
                en: 'Proactive Risk Mitigation',
                ru: 'Проактивное снижение рисков',
                uk: 'Проактивне зменшення ризиків'
            },
            description: {
                en: 'Focus on engineering "upgrade-proof" systems and standardized architectures to prevent long-term technical debt and ensure stability during enterprise deployments.',
                ru: 'Фокус на создании «устойчивых к обновлениям» систем и стандартизированных архитектур для предотвращения долгосрочного технического долга и обеспечения стабильности при enterprise-деплоях.',
                uk: 'Фокус на створенні «стійких до оновлень» систем та стандартизованих архітектур для запобігання довгостроковому технічному боргу та забезпечення стабільності при enterprise-деплоях.'
            }
        },
        {
            title: {
                en: 'Operational Efficiency',
                ru: 'Операционная эффективность',
                uk: 'Операційна ефективність'
            },
            description: {
                en: 'Dedicated to optimizing development lifecycles by architecting boilerplates and reusable frameworks that accelerate onboarding and reduce project overhead.',
                ru: 'Предан оптимизации жизненных циклов разработки путём архитектуры шаблонов и переиспользуемых фреймворков, ускоряющих онбординг и снижающих проектные затраты.',
                uk: 'Присвячений оптимізації життєвих циклів розробки шляхом архітектури шаблонів та переємних фреймворків, що прискорюють онбординг та зменшують проектні витрати.'
            }
        },
        {
            title: {
                en: 'Accessibility & Inclusive Design',
                ru: 'Доступность и инклюзивный дизайн',
                uk: 'Доступність та інклюзивний дизайн'
            },
            description: {
                en: 'Champion for WCAG standards and inclusive user experiences, ensuring storefronts are accessible to all users through semantic HTML and rigorous compliance testing.',
                ru: 'Страндарт WCAG и инклюзивный пользовательский опыт — обеспечение доступности витрин для всех пользователей через семантический HTML и строгое тестирование на соответствие.',
                uk: 'Стандарт WCAG та інклюзивний користувацький досвід — забезпечення доступності вітрин для всіх користувачів через семантичний HTML та суворе тестування відповідності.'
            }
        },
        {
            title: {
                en: 'Cross-Functional Collaboration',
                ru: 'Межфункциональное сотрудничество',
                uk: 'Міжфункціональна співпраця'
            },
            description: {
                en: 'Effectively bridge the gap between technical infrastructure and marketing needs, empowering teams to manage sophisticated layouts independently.',
                ru: 'Эффективное связывание технической инфраструктуры и маркетинговых потребностей, предоставление командам возможности самостоятельно управлять сложными макетами.',
                uk: 'Ефективне з\'єднання технічної інфраструктури та маркетингових потреб, надання командам можливості самостійно керувати складними макетами.'
            }
        },
        {
            title: {
                en: 'Autonomous Project Ownership',
                ru: 'Автономное владение проектами',
                uk: 'Автономне володіння проєктами'
            },
            description: {
                en: 'Demonstrate full-cycle accountability for enterprise-scale projects, from initial technical discovery and audit to final deployment and performance tuning.',
                ru: 'Демонстрация полной ответственности за enterprise-проекты на всех этапах — от первоначального технического анализа и аудита до финального деплоя и тюнинга производительности.',
                uk: 'Демонстрація повної відповідальності за enterprise-проєкти на всіх етапах — від первинного технічного аналізу та аудиту до фінального деплою та тюнінгу продуктивності.'
            }
        },
        {
            title: {
                en: 'Detail-Oriented Precision',
                ru: 'Детализированная точность',
                uk: 'Деталізована точність'
            },
            description: {
                en: 'Committed to high-fidelity, pixel-perfect execution with an obsessive focus on performance stability and the total elimination of layout shifts.',
                ru: 'Приверженность высокоточной, pixel-perfect реализации с навязчивым фокусом на стабильность производительности и полное устранение сдвигов макета.',
                uk: 'Прихильність високоточній, pixel-perfect реалізації з нав\'язливим фокусом на стабільність продуктивності та повне усунення зсувів макету.'
            }
        },
        {
            title: {
                en: 'Continuous Learning Mindset',
                ru: 'Настрой на непрерывное обучение',
                uk: 'Настрой на безперервне навчання'
            },
            description: {
                en: 'Committed to staying at the forefront of the Magento ecosystem, demonstrated by a successful 10-year track record of evolving from legacy Luma to modern Hyvä architectures.',
                ru: 'Преданность лидерству в экосистеме Magento, подтверждённая 10-летним опытом эволюции от legacy Luma до современных архитектур Hyvä.',
                uk: 'Прихильність лідерству в екосистемі Magento, підтверджена 10-річним досвідом еволюції від legacy Luma до сучасних архітектур Hyvä.'
            }
        }
    ]
};
```

- [ ] **Step 2: Verify the file**

Read back and confirm 10 items with en/ru/uk translations for each.

---

### Task 3: Create soft-skills SCSS

**Covers:** Styles for the new section, reusing existing section mixins.

**Files:**
- Create: `markup/components/soft-skills/soft-skills.scss`

- [ ] **Step 1: Create the SCSS file**

Create `markup/components/soft-skills/soft-skills.scss`:

```scss
.soft-skills {
    &-list {
        @extend %section-list;
    }

    &-item {
        @extend %section-list-item;
    }

    &-title {
        @extend %section-list-item-title;
    }

    &-desc {
        @extend %section-list-item-desc;
    }
}
```

- [ ] **Step 2: Verify**

Read back — should match `experience.scss` pattern exactly.

---

### Task 4: Register component in SCSS imports

**Covers:** Making the new SCSS available to the build.

**Files:**
- Modify: `markup/static/scss/entry/partials/_components.scss`

- [ ] **Step 1: Add the import**

Add `@import 'components/soft-skills/soft-skills';` after the experience import (line 10):

```scss
// @import 'components/_template/_template.scss';

@import 'components/footer/footer';
@import 'components/header/header';
@import 'components/sections/sections';
@import 'components/sectionsItem/sectionsItem';
@import 'components/achievements/achievements';
@import 'components/languages/languages';
@import 'components/skills/skills';
@import 'components/experience/experience';
@import 'components/soft-skills/soft-skills';
```

- [ ] **Step 2: Verify**

Read back `_components.scss` and confirm the import is present.

---

### Task 5: Add i18n translations

**Covers:** Title and subtitle translations for en/ru/uk.

**Files:**
- Modify: `markup/translations-ui.json`

- [ ] **Step 1: Add `softSkills` key to each language**

In the `"en"` → `"section"` block, add after `"experience"`:

```json
"softSkills": { "title": "Soft Skills", "desc": "Professional Soft Skills" },
```

In the `"ru"` → `"section"` block, add after `"experience"`:

```json
"softSkills": { "title": "Гибкие навыки", "desc": "Профессиональные гибкие навыки" },
```

In the `"uk"` → `"section"` block, add after `"experience"`:

```json
"softSkills": { "title": "Гнучкі навички", "desc": "Професійні гнучкі навички" },
```

- [ ] **Step 2: Validate JSON**

Run: `node -e "JSON.parse(require('fs').readFileSync('markup/translations-ui.json','utf8'))"`
Expected: No output (valid JSON).

---

### Task 6: Add component to page template

**Covers:** Including the soft-skills partial in the page layout before experience.

**Files:**
- Modify: `markup/pages/index.html:39-40`

- [ ] **Step 1: Add the partial include**

Insert `{{> soft-skills/soft-skills}}` before the experience partial in `markup/pages/index.html`:

```handlebars
            <div class="sections-main">
                {{> soft-skills/soft-skills}}
                {{> experience/experience}}
                {{> achievements/achievements}}
            </div>
```

- [ ] **Step 2: Verify**

Read back `markup/pages/index.html` and confirm `soft-skills` partial appears before `experience`.

---

### Task 7: Build and verify

**Covers:** Ensuring the build succeeds and the new section renders.

**Files:** None (build verification).

- [ ] **Step 1: Run the build**

Run: `tars build-dev`
Expected: Build completes without errors.

- [ ] **Step 2: Inspect the output**

Read `dev/index.html` and search for "Soft Skills" to confirm the section renders with correct content.

- [ ] **Step 3: Commit**

```bash
git add markup/components/soft-skills/ markup/pages/index.html markup/static/scss/entry/partials/_components.scss markup/translations-ui.json
git commit -m "feat: add soft skills section before work experience"
```
