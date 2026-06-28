const data = {
    skillAreas: {
        hyvä: {
            title: {default: 'Hyvä:'},
            skillGroups: [
                [{default: 'Hyvä Themes'}],
                [{default: 'Alpine.js'}],
                [{default: 'Tailwind CSS'}],
                [{default: 'Hyvä UI'}],
                [{default: 'Magewire'}]
            ]
        },
        magento2: {
            title: {default: 'Magento 2:'},
            skillGroups: [
                [{en: 'XML Layouts', ru: 'XML Лейаут', uk: 'XML Розмітка'}],
                [{default: 'Fallback'}, {en: 'Inheritance system', ru: 'Inheritance система', uk: 'Inheritance система'}],
                [{default: 'UI lib'}, {default: 'Blank'}, {default: 'Luma'}],
                [{en: 'Custom modules development', ru: 'Разработка модулей', uk: 'Розробка модулів'}],
                [{
                    en: '3rd-party modules customisation <br/> (Mirasvit, Amasty, Ubertheme, etc)',
                    ru: 'Кастомизация сторонних модулей <br/> (Mirasvit, Amasty, Ubertheme, и пр)',
                    uk: 'Кастомізація сторонніх модулів <br/> (Mirasvit, Amasty, Ubertheme тощо)'
                }],
                [{en: 'PHP DI, Plugins ViewModels', ru: 'PHP DI, Плагины ViewModels', uk: 'PHP DI, Плагіни ViewModels'}],
                [{en: 'Widgets (widget.xml)', ru: 'Виджеты (widget.xml)', uk: 'Віджети (widget.xml)'}],
                [{en: 'UI components', ru: 'UI компоненты', uk: 'UI компоненти'}],
                [{default: 'RequireJS'}, {en: 'JS mixins', ru: 'JS миксины', uk: 'JS міксини'}],
                [{en: 'Emails customisation', ru: 'Кастомизация писем', uk: 'Кастомізація листів'}],
                [{en: 'Magento 1 (themes, modules)', ru: 'Magento 1 (темы, модули)', uk: 'Magento 1 (теми, модулі)'}]
            ]
        },
        frontend: {
            title: {en: 'Front-end:', ru: 'Фронт-энд:', uk: 'Фронт-енд:'},
            skillGroups: [
                [
                    {en: 'Accessibility', ru: 'Доступность', uk: 'Доступність'},
                    {en: 'Semantic HTML5', ru: 'Семантический HTML5', uk: 'Семантичний HTML5'}
                ],
                [{en: 'RTL Implementation', ru: 'Реализация RTL', uk: 'Реалізація RTL'}],
                [{default: 'jQuery'}, {default: 'Knockout'}],
                [{default: 'NPM'}, {default: 'Grunt'}, {default: 'Gulp'}],
                [{default: 'SVG'}, {default: 'Font Icons'}],
                [{default: 'Pixel perfect'}],
                [{en: 'Optimization for Google Pagespeed', ru: 'Оптимизация для Google Pagespeed', uk: 'Оптимізація для Google Pagespeed'}]
            ]
        },
        backend: {
            title: {en: 'Back-end:', ru: 'Бэк-энд:', uk: 'Бек-енд:'},
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
            title: {default: 'Flow:'},
            skillGroups: [
                [{default: 'Docker'}, {default: 'DDEV'}],
                [{en: 'Git/GitHub Actions, CI/CD for Hyvä/Tailwind builds', ru: 'Git/GitHub Actions, CI/CD для Hyvä/Tailwind сборок', uk: 'Git/GitHub Actions, CI/CD для Hyvä/Tailwind збірок'}]
            ]
        },
        misc: {
            title: {en: 'Misc:', ru: 'Прочее:', uk: 'Інше:'},
            skillGroups: [
                [{default: 'Jira'}],
                [{en: 'Semantic versioning', ru: 'Семант. верс.', uk: 'Семант. верс.'}, {en: 'Keeping a changelog', ru: 'Ведение changelog', uk: 'Ведення changelog'}]
            ]
        }
    }
};
