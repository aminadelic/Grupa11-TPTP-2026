// ============================================================
// TPTP SKRIPTE - Virtualna galerija umjetnosti
// ============================================================


// ------------------------------------------------------------
// 1. TAMNI MOD TOGGLE
// Iskorišten prijedlog AI-a za LocalStorage logiku
// ------------------------------------------------------------

const dugmeTema = document.getElementById('dugmeTema');

// Provjeri da li je korisnik već odabrao tamni mod
if (localStorage.getItem('tema') === 'tamni') {
    document.body.classList.add('tamni-mod');
    if (dugmeTema) dugmeTema.textContent = 'Svjetli mod';
}

// Toggle tamni/svjetli mod na klik
if (dugmeTema) {
    dugmeTema.addEventListener('click', function () {
        document.body.classList.toggle('tamni-mod');

        if (document.body.classList.contains('tamni-mod')) {
            localStorage.setItem('tema', 'tamni');
            dugmeTema.textContent = 'Svjetli mod';
        } else {
            localStorage.setItem('tema', 'svjetli');
            dugmeTema.textContent = 'Tamni mod';
        }
    });
}


// ------------------------------------------------------------
// 2. SMOOTH SCROLL
// Za bookmark navigaciju na sadrzaj.html
// ------------------------------------------------------------

document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
        const ciljId = this.getAttribute('href');
        const cilj = document.querySelector(ciljId);

        if (cilj) {
            e.preventDefault();
            cilj.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// ------------------------------------------------------------
// 3. SKALIRANJE IMAGE MAP KOORDINATA
// Iskorišten prijedlog AI-a za logiku skaliranja
// Prilagođava koordinate kada se slika skalira u browseru
// ------------------------------------------------------------

function skalajImageMap() {
    const img = document.querySelector('img[usemap="#mapa-atenska"]');
    const map = document.querySelector('map[name="mapa-atenska"]');

    if (!img || !map) return;

    const prirodnaSirina = 1308;
    const prirodnaVisina = 736;

    const trenutnaSirina = img.offsetWidth;
    const trenutnaVisina = img.offsetHeight;

    const omjerX = trenutnaSirina / prirodnaSirina;
    const omjerY = trenutnaVisina / prirodnaVisina;

    const originalneCoords = [
        "520,250,750,580",
        "0,300,520,736",
        "750,300,1308,736",
        "350,0,950,250"
    ];

    const areas = map.querySelectorAll('area');
    areas.forEach(function (area, index) {
        const coords = originalneCoords[index].split(',').map(Number);
        const noveCoords = coords.map(function (val, i) {
            return Math.round(i % 2 === 0 ? val * omjerX : val * omjerY);
        });
        area.setAttribute('coords', noveCoords.join(','));
    });
}

window.addEventListener('load', skalajImageMap);
window.addEventListener('resize', skalajImageMap);