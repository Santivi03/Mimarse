document.addEventListener('DOMContentLoaded', () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Año del footer
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    // ---------------------------------------------------------------
    // Menú en celular
    // ---------------------------------------------------------------
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.getElementById('nav-links');

    const setMenu = (open) => {
        navLinks.classList.toggle('is-open', open);
        menuBtn.setAttribute('aria-expanded', String(open));
        menuBtn.querySelector('.sr-only').textContent = open ? 'Cerrar menú' : 'Abrir menú';
    };

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => setMenu(!navLinks.classList.contains('is-open')));
        navLinks.addEventListener('click', (e) => {
            if (e.target.closest('a')) setMenu(false);
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('is-open')) {
                setMenu(false);
                menuBtn.focus();
            }
        });
    }

    // Sombra del header al bajar y botón flotante fuera del inicio
    const header = document.querySelector('.site-header');
    const hero = document.querySelector('.hero');
    const waFloat = document.querySelector('.wa-float');
    const contact = document.getElementById('contacto');

    const onScroll = () => {
        header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    if (waFloat && 'IntersectionObserver' in window) {
        const visible = new Set();
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) visible.add(entry.target);
                else visible.delete(entry.target);
            });
            // Se esconde mientras se ven el inicio o el contacto, que ya tienen su botón
            waFloat.classList.toggle('is-hidden', visible.size > 0);
        }, { threshold: 0.15 });
        [hero, contact].forEach((el) => el && io.observe(el));
    }

    // ---------------------------------------------------------------
    // Color de resorte según la clase
    // ---------------------------------------------------------------
    const springFor = (name) => {
        const n = name.toLowerCase();
        if (n.includes('yoga')) return 'blue';
        if (n.includes('stretching') || n.includes('silla')) return 'green';
        if (n.includes('jump') || n.includes('dance')) return 'yellow';
        return 'red';
    };

    document.querySelectorAll('.class-row').forEach((row) => {
        row.dataset.spring = springFor(row.querySelector('.class-row-name').textContent);
    });

    document.querySelectorAll('.class-name').forEach((el) => {
        el.dataset.spring = springFor(el.textContent);
    });

    // Referencias de color: una por clase que aparece en la grilla
    document.querySelectorAll('.schedule').forEach((schedule) => {
        const legend = schedule.querySelector('.legend');
        const names = [...new Set([...schedule.querySelectorAll('.class-name')].map((el) => el.textContent.trim()))];
        const order = { red: 0, yellow: 1, green: 2, blue: 3 };
        names
            .sort((a, b) => order[springFor(a)] - order[springFor(b)] || a.localeCompare(b, 'es'))
            .forEach((name) => {
                const li = document.createElement('li');
                li.dataset.spring = springFor(name);
                li.textContent = name;
                legend.appendChild(li);
            });
    });

    // ---------------------------------------------------------------
    // Grilla: marcar hoy y armar la lista por día para celular
    // ---------------------------------------------------------------
    const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const todayName = dayNames[new Date().getDay()];

    document.querySelectorAll('.schedule').forEach((schedule, scheduleIndex) => {
        const table = schedule.querySelector('.schedule-table');
        const headers = [...table.querySelectorAll('thead th')].slice(1);
        const days = headers.map((th) => th.textContent.trim());
        const rows = [...table.querySelectorAll('tbody tr')];

        const todayIndex = days.indexOf(todayName);
        if (todayIndex >= 0) {
            headers[todayIndex].classList.add('is-today');
            headers[todayIndex].insertAdjacentHTML('beforeend', '<span class="sr-only"> (hoy)</span>');
            rows.forEach((tr) => tr.children[todayIndex + 1].classList.add('is-today'));
        }

        const byDay = days.map((_, i) => rows
            .map((tr) => ({
                time: tr.querySelector('th').textContent.trim(),
                name: (tr.children[i + 1].textContent || '').trim(),
            }))
            .filter((slot) => slot.name));

        const view = document.createElement('div');
        view.className = 'day-view';

        const tabs = document.createElement('div');
        tabs.className = 'day-tabs';
        tabs.setAttribute('role', 'tablist');
        tabs.setAttribute('aria-label', 'Día de la semana');

        const list = document.createElement('div');
        list.className = 'day-list';
        list.setAttribute('role', 'tabpanel');
        list.id = `day-list-${scheduleIndex}`;
        list.setAttribute('aria-live', 'polite');

        const render = (i, animate) => {
            [...tabs.children].forEach((tab, j) => {
                tab.setAttribute('aria-selected', String(i === j));
                tab.tabIndex = i === j ? 0 : -1;
            });
            list.setAttribute('aria-labelledby', tabs.children[i].id);

            list.innerHTML = '';
            if (!byDay[i].length) {
                list.innerHTML = '<p class="day-empty">No hay clases este día.</p>';
            } else {
                byDay[i].forEach((slot) => {
                    const row = document.createElement('div');
                    row.className = 'day-row';
                    row.innerHTML = '<span class="day-row-time"></span><span class="day-row-name"></span>';
                    row.children[0].textContent = slot.time;
                    row.children[1].textContent = slot.name;
                    row.children[1].dataset.spring = springFor(slot.name);
                    list.appendChild(row);
                });
            }

            if (animate && !reduceMotion.matches) {
                list.classList.remove('is-snapping');
                void list.offsetWidth;
                list.classList.add('is-snapping');
            }
        };

        days.forEach((day, i) => {
            const tab = document.createElement('button');
            tab.type = 'button';
            tab.className = 'day-tab';
            tab.id = `day-tab-${scheduleIndex}-${i}`;
            tab.setAttribute('role', 'tab');
            tab.setAttribute('aria-controls', list.id);
            tab.setAttribute('aria-label', day);
            tab.textContent = day.slice(0, 3);
            tab.addEventListener('click', () => render(i, true));
            tab.addEventListener('keydown', (e) => {
                const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
                if (!step) return;
                e.preventDefault();
                const next = (i + step + days.length) % days.length;
                render(next, true);
                tabs.children[next].focus();
            });
            tabs.appendChild(tab);
        });

        view.append(tabs, list);
        schedule.appendChild(view);
        schedule.classList.add('has-day-view');
        render(todayIndex >= 0 ? todayIndex : 0, false);
    });

    // ---------------------------------------------------------------
    // Selector de sede: el carro corre por el riel y estira el resorte
    // ---------------------------------------------------------------
    const sw = document.querySelector('.switch');
    const sedeTabs = [...document.querySelectorAll('.switch-tab')];
    const panels = [...document.querySelectorAll('.sede')];
    const sedeLinks = [...document.querySelectorAll('[data-sede-link]')];

    const placeCarriage = () => {
        const active = sedeTabs.find((t) => t.getAttribute('aria-selected') === 'true');
        if (!sw || !active) return;
        sw.style.setProperty('--carriage-x', `${active.offsetLeft}px`);
        sw.style.setProperty('--carriage-w', `${active.offsetWidth}px`);
        const springRoom = sw.clientWidth - 14;
        sw.style.setProperty('--spring-scale', springRoom > 0 ? Math.max(0, (active.offsetLeft - 14) / springRoom) : 0);
    };

    const selectSede = (id, { focus = false, animate = true } = {}) => {
        sedeTabs.forEach((tab) => {
            const on = tab.dataset.sede === id;
            tab.setAttribute('aria-selected', String(on));
            tab.tabIndex = on ? 0 : -1;
            if (on && focus) tab.focus();
        });
        panels.forEach((panel) => {
            const on = panel.id === id;
            panel.hidden = !on;
            panel.classList.remove('is-entering');
            if (on && animate && !reduceMotion.matches) {
                void panel.offsetWidth;
                panel.classList.add('is-entering');
            }
        });
        placeCarriage();
    };

    sedeTabs.forEach((tab, i) => {
        tab.addEventListener('click', () => {
            selectSede(tab.dataset.sede);
            history.replaceState(null, '', `#${tab.dataset.sede}`);
        });
        tab.addEventListener('keydown', (e) => {
            const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
            if (!step) return;
            e.preventDefault();
            const next = sedeTabs[(i + step + sedeTabs.length) % sedeTabs.length];
            selectSede(next.dataset.sede, { focus: true });
        });
    });

    // Links "Pilates" / "Fit" del menú y #pilates / #fit en la URL
    sedeLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            selectSede(link.dataset.sedeLink, { animate: false });
            history.replaceState(null, '', `#${link.dataset.sedeLink}`);
            document.getElementById('sedes').scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth' });
        });
    });

    const fromHash = () => {
        const id = location.hash.slice(1);
        if (id === 'pilates' || id === 'fit') {
            selectSede(id, { animate: false });
            document.getElementById('sedes').scrollIntoView();
        }
    };

    selectSede('pilates', { animate: false });
    fromHash();
    window.addEventListener('hashchange', fromHash);

    // El carro aparece recién cuando está en su lugar
    requestAnimationFrame(() => sw && sw.classList.add('is-ready'));
    window.addEventListener('resize', placeCarriage);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(placeCarriage);
});
