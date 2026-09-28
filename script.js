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

    // ---------------------------------------------------------------
    // Grilla: versión corta de días y clases para que entre entera en el celular
    // ---------------------------------------------------------------
    const tables = [...document.querySelectorAll('.schedule-table')];

    tables.forEach((table) => {
        table.querySelectorAll('thead th:not(:first-child)').forEach((th) => {
            const day = th.textContent.trim();
            th.innerHTML = '<span class="t-full"></span><abbr class="t-short"></abbr>';
            th.children[0].textContent = day;
            th.children[1].textContent = day.slice(0, 3);
            th.children[1].title = day;
        });
        table.querySelectorAll('.class-name').forEach((el) => {
            const name = el.textContent.trim();
            const short = name.replace(/^Pilates\s+/i, '');
            el.innerHTML = '<span class="t-full"></span><span class="t-short" aria-hidden="true"></span>';
            el.children[0].textContent = name;
            el.children[1].textContent = short;
        });
    });

    // En celular, la letra de la grilla se achica lo justo para que la palabra
    // más larga entre entera en su celda (sin cortar palabras)
    const compactGrid = window.matchMedia('(max-width: 760px)');
    const measure = document.createElement('canvas').getContext('2d');

    const fitGrid = () => {
        tables.forEach((table) => {
            if (!compactGrid.matches) {
                table.style.removeProperty('--grid-font');
                return;
            }
            const cell = table.querySelector('tbody td');
            if (!cell || !cell.offsetWidth) return; // sede oculta: se ajusta al mostrarla

            const style = getComputedStyle(cell);
            const room = cell.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight) - 1;
            const family = getComputedStyle(document.body).fontFamily;

            const texts = [
                ...[...table.querySelectorAll('td .t-short')].map((el) => ({ text: el.textContent, weight: 600 })),
                ...[...table.querySelectorAll('thead .t-short')].map((el) => ({ text: el.textContent.toUpperCase(), weight: 700 })),
            ];
            let widest = 0;
            texts.forEach(({ text, weight }) => {
                measure.font = `${weight} 100px ${family}`;
                text.split(/\s+/).forEach((word) => {
                    widest = Math.max(widest, measure.measureText(word).width / 100);
                });
            });
            if (!widest) return;

            const size = Math.min(12, room / widest);
            table.style.setProperty('--grid-font', `${size.toFixed(2)}px`);
        });
    };

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
        fitGrid();
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
            // El navegador enfoca el panel al abrir un link con #pilates o #fit; sin recuadro en ese caso
            if (document.activeElement && document.activeElement.classList.contains('sede')) document.activeElement.blur();
        }
    };

    selectSede('pilates', { animate: false });
    fromHash();
    window.addEventListener('hashchange', fromHash);

    // El carro aparece recién cuando está en su lugar
    requestAnimationFrame(() => sw && sw.classList.add('is-ready'));
    window.addEventListener('resize', () => {
        placeCarriage();
        fitGrid();
    });
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
            placeCarriage();
            fitGrid();
        });
    }
});
