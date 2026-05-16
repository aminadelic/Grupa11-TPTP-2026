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

/*Filtriranje kartica*/

   /*Uz pomoć Claude-a sam razumjela kako filtriranje funkcioniše:
   data-filter atribut na dugmetu se poredi sa data-kategorija atributom
   na kartici. Ako se ne podudaraju, kartica dobija klasu "sakrivena"
   koja je u CSS-u postavljena na display: none.*/

(function () {
  var filterDugmici = document.querySelectorAll('.filter-btn');
  var kartice = document.querySelectorAll('.kartica');
  var nemaRezultata = document.getElementById('nemaRezultata');

  filterDugmici.forEach(function (dugme) {
    dugme.addEventListener('click', function () {

      filterDugmici.forEach(function (d) {
        d.classList.remove('aktivan');
      });
      this.classList.add('aktivan');

      var odabraniFilter = this.dataset.filter;
      var brojPrikazanih = 0;

      kartice.forEach(function (kartica) {
        if (odabraniFilter === 'sve' || kartica.dataset.kategorija === odabraniFilter) {
          kartica.classList.remove('sakrivena');
          brojPrikazanih++;
        } else {
          kartica.classList.add('sakrivena');
        }
      });

      if (nemaRezultata) {
        nemaRezultata.style.display = (brojPrikazanih === 0) ? 'block' : 'none';
      }
    });
  });
}());

/* Brojač posjeta*/

   /*Uz pomoć Claude-a sam razumjela funkcionisanje brojača:
   parseInt() pretvara string iz LocalStorage-a u broj jer
   LocalStorage uvijek čuva podatke kao string.
   isNaN() provjerava je li vrijednost broj – ako nije (prvi posjet),
   počinjemo od nule.*/

(function () {
  var brojac = document.getElementById('brojPosjeta');

  if (!brojac) return;

  var trenutniBroj = parseInt(localStorage.getItem('brojPosjeta'), 10);

  if (isNaN(trenutniBroj)) {
    trenutniBroj = 0;
  }

  trenutniBroj = trenutniBroj + 1;
  localStorage.setItem('brojPosjeta', trenutniBroj);
  brojac.textContent = trenutniBroj;
}());


/* Hamburger meni*/

   /*Uz pomoć Claude-a sam razumjela kako hamburger meni funkcioniše:
   classList.toggle('otvoren') dodaje klasu ako je nema, uklanja ako postoji.
   Na taj način se navigacija otvara i zatvara klikom na dugme.
   Kad korisnik klikne na link u meniju, meni se automatski zatvara.*/

(function () {
  var hamburger = document.getElementById('hamburger');
  var navbar = document.querySelector('.navbar');

  if (!hamburger || !navbar) return;

  hamburger.addEventListener('click', function () {
    navbar.classList.toggle('otvoren');
    hamburger.textContent = navbar.classList.contains('otvoren') ? '✕' : '≡';
  });

  navbar.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navbar.classList.remove('otvoren');
      hamburger.textContent = '≡';
    });
  });
}());
