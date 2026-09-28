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
    // Grilla: días abreviados para que entre entera en el celular
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
                ...[...table.querySelectorAll('td .class-name')].map((el) => ({ text: el.textContent, weight: 600 })),
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

    // Resorte en espiral vista de costado: el diámetro queda fijo y lo que cambia
    // al estirarse es la separación entre vueltas, como en el reformer.
    const spring = sw && sw.querySelector('.switch-spring');
    const carriage = sw && sw.querySelector('.switch-carriage');
    const coilBack = spring && spring.querySelector('.coil-back');
    const coilFront = spring && spring.querySelector('.coil-front');

    const drawSpring = (length) => {
        const lead = 5;       // alambre recto en cada punta
        const ry = 6.5;       // radio de la espiral
        const cy = 9;
        const hook = 2.6;     // gancho que se engancha en el pie del carro
        const L = Math.max(length, 2 * lead + 16);
        // Más largo, más vueltas; cada vuelta siempre forma un rulo visible
        const turns = Math.max(4, Math.min(12, Math.round((L - 2 * lead) / 16)));
        const pitch = (L - 2 * lead) / turns;
        const rx = Math.max(2.2, pitch * 0.32);
        const front = [`M0 ${cy} L${lead} ${cy - ry}`];
        const back = [];

        for (let half = 0; half < turns * 2; half++) {
            const pts = [];
            for (let s = 0; s <= 12; s++) {
                const t = (half + s / 12) * Math.PI;
                const x = lead + (pitch * t) / (2 * Math.PI) + rx * Math.sin(t);
                const y = cy - ry * Math.cos(t);
                pts.push(`${x.toFixed(2)} ${y.toFixed(2)}`);
            }
            (half % 2 === 0 ? front : back).push(`M${pts.join(' L')}`);
        }

        front.push(`M${(L - lead).toFixed(2)} ${cy - ry} L${L.toFixed(2)} ${cy}`);
        front.push(`M${(L - hook).toFixed(2)} ${cy} a${hook} ${hook} 0 1 0 ${hook * 2} 0 a${hook} ${hook} 0 1 0 ${-hook * 2} 0`);

        coilFront.setAttribute('d', front.join(' '));
        coilBack.setAttribute('d', back.join(' '));
        spring.setAttribute('width', (L + hook + 2).toFixed(1));
        spring.setAttribute('viewBox', `0 0 ${(L + hook + 2).toFixed(1)} 18`);
    };

    // El resorte sigue al carro cuadro a cuadro mientras dura su transición
    let springFrame;
    const followCarriage = () => {
        if (!spring) return;
        cancelAnimationFrame(springFrame);
        const start = performance.now();
        const tick = (now) => {
            const box = sw.getBoundingClientRect();
            const car = carriage.getBoundingClientRect();
            drawSpring(car.left - box.left + 11 - 14);
            if (now - start < 800) springFrame = requestAnimationFrame(tick);
        };
        springFrame = requestAnimationFrame(tick);
    };

    // Redibujo final por si el navegador frenó la animación (pestaña en segundo plano)
    if (carriage) carriage.addEventListener('transitionend', followCarriage);
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) followCarriage();
    });

    const placeCarriage = () => {
        const active = sedeTabs.find((t) => t.getAttribute('aria-selected') === 'true');
        if (!sw || !active) return;
        sw.style.setProperty('--carriage-x', `${active.offsetLeft}px`);
        sw.style.setProperty('--carriage-w', `${active.offsetWidth}px`);
        followCarriage();
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
