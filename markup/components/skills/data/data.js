const data = {
    skillAreas: {
        hyvä: {
            title: { default: 'Hyvä:' },
            skillGroups: [
                [{default: 'Hyvä Themes'}],
                [{default: 'Alpine.js'}],
                [{default: 'Tailwind CSS'}],
                [{default: 'Hyvä UI'}],
                [{default: 'Magewire'}]
            ]
        },
        magento2: {
            title: { default: 'Magento 2:' },
            skillGroups: [
                [{en: 'XML Layouts', ru: 'XML Лейаут', uk: 'XML Розмітка'}],
                [{en: 'Fallback/Inheritance system', ru: 'Fallback/Inheritance система', uk: 'Fallback/Inheritance система'}],
                [{default: 'Ui lib / Blank / Luma'}],
                [{en: 'Custom modules development', ru: 'Разработка модулей', uk: 'Розробка модулів'}],
                [{
                    en: '3rd-party modules customisation <br/> (Mirasvit, Amasty, Ubertheme, etc)',
                    ru: 'Кастомизация сторонних модулей <br/> (Mirasvit, Amasty, Ubertheme, и пр)',
                    uk: 'Кастомізація сторонніх модулів <br/> (Mirasvit, Amasty, Ubertheme тощо)'
                }],
                [{en: 'PHP DI, Plugins ViewModels', ru: 'PHP DI, Плагины ViewModels', uk: 'PHP DI, Плагіни ViewModels'}],
                [{en: 'Widgets (widget.xml)', ru: 'Виджеты (widget.xml)', uk: 'Віджети (widget.xml)'}],
                [{en: 'UI components', ru: 'UI компоненты', uk: 'UI компоненти'}],
                [{en: 'RequireJS / JS mixins', ru: 'RequireJS / JS миксины', uk: 'RequireJS / JS міксини'}],
                [{en: 'Emails customisation', ru: 'Кастомизация писем', uk: 'Кастомізація листів'}],
                [{en: 'Magento 1 (themes, modules)', ru: 'Magento 1 (темы, модули)', uk: 'Magento 1 (теми, модулі)'}]
            ]
        },
        frontend: {
            title: { en: 'Front-end:', ru: 'Фронт-энд:', uk: 'Фронт-енд:' },
            skillGroups: [
                [{en: 'Accessibility / Semantic HTML5', ru: 'Доступность / Семантический HTML5', uk: 'Доступність / Семантичний HTML5'}],
                [{en: 'RTL Implementation', ru: 'Реализация RTL', uk: 'Реалізація RTL'}],
                [{default: 'jQuery / Knockout'}],
                [{default: 'NPM / Grunt / Gulp'}],
                [{default: 'SVG / Font Icons'}],
                [{default: 'Pixel perfect'}],
                [{en: 'Optimization for Google Pagespeed', ru: 'Оптимизация для Google Pagespeed', uk: 'Оптимізація для Google Pagespeed'}]
            ]
        },
        backend: {
            title: { en: 'Back-end:', ru: 'Бэк-энд:', uk: 'Бек-енд:' },
            skillGroups: [
                [{default: 'Composer'}],
                [{default: 'PHP'}, {en: 'PHP Debug', ru: 'PHP Дебаг', uk: 'PHP Дебаг'}, {
                    en: 'PHP DOM <br/> (parsing &amp; modifying html on server side)',
                    ru: 'PHP DOM <br/> (работа с html dom на стороне сервера)',
                    uk: 'PHP DOM <br/> (робота з html dom на стороні сервера)'
                }],
                [{default: 'MySQL'}]
            ]
        },
        flow: {
            title: { default: 'Flow:' },
            skillGroups: [
                [{default: 'Docker / DDEV'}],
                [{en: 'Git/GitHub Actions, CI/CD for Hyvä/Tailwind builds', ru: 'Git/GitHub Actions, CI/CD для Hyvä/Tailwind сборок', uk: 'Git/GitHub Actions, CI/CD для Hyvä/Tailwind збірок'}]
            ]
        },
        misc: {
            title: { en: 'Misc:', ru: 'Прочее:', uk: 'Інше:' },
            skillGroups: [
                [{default: 'Jira'}],
                [{en: 'Semantic versioning', ru: 'Семант. верс.', uk: 'Семант. верс.'}, {en: 'Keeping a changelog', ru: 'Ведение changelog', uk: 'Ведення changelog'}]
            ]
        }
    }
};
