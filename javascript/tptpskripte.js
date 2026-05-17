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
    if (dugmeTema) dugmeTema.textContent = 'Svijetli mod';
}

// Toggle tamni/svjetli mod na klik
if (dugmeTema) {
    dugmeTema.addEventListener('click', function () {
        document.body.classList.toggle('tamni-mod');

        if (document.body.classList.contains('tamni-mod')) {
            localStorage.setItem('tema', 'tamni');
            dugmeTema.textContent = 'Svijetli mod';
        } else {
            localStorage.setItem('tema', 'svijetli');
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

// ------------------------------------------------------------
// MOJ DIO — Amina Arifagić
// Skaliranje image map koordinata za Krik i Guernicu
// ------------------------------------------------------------

function skalajKrik() {
    var img = document.querySelector('img[usemap="#mapa-krik"]');
    var map = document.querySelector('map[name="mapa-krik"]');
    if (!img || !map) return;

    var prirodnaSirina = 400;
    var prirodnaVisina = 490;
    var omjerX = img.offsetWidth / prirodnaSirina;
    var omjerY = img.offsetHeight / prirodnaVisina;

    var originalneCoords = [
        "120,200,280,490",
        "0,0,400,180",
        "0,180,120,490",
        "280,200,400,400"
    ];

    map.querySelectorAll('area').forEach(function(area, index) {
        var coords = originalneCoords[index].split(',').map(Number);
        var noveCoords = coords.map(function(val, i) {
            return Math.round(i % 2 === 0 ? val * omjerX : val * omjerY);
        });
        area.setAttribute('coords', noveCoords.join(','));
    });
}

function skalajGuernicu() {
    var img = document.querySelector('img[usemap="#mapa-guernica"]');
    var map = document.querySelector('map[name="mapa-guernica"]');
    if (!img || !map) return;

    var prirodnaSirina = 600;
    var prirodnaVisina = 380;
    var omjerX = img.offsetWidth / prirodnaSirina;
    var omjerY = img.offsetHeight / prirodnaVisina;

    var originalneCoords = [
        "0,0,150,200",
        "150,50,400,300",
        "0,200,150,380",
        "400,100,600,380"
    ];

    map.querySelectorAll('area').forEach(function(area, index) {
        var coords = originalneCoords[index].split(',').map(Number);
        var noveCoords = coords.map(function(val, i) {
            return Math.round(i % 2 === 0 ? val * omjerX : val * omjerY);
        });
        area.setAttribute('coords', noveCoords.join(','));
    });
}

window.addEventListener('load', function() {
    skalajKrik();
    skalajGuernicu();
});

window.addEventListener('resize', function() {
    skalajKrik();
    skalajGuernicu();
});
// ============================================================
// KONTAKT FORMA VALIDACIJA — Amina Arifagić
// ============================================================

(function () {

    var forma = document.getElementById('kontakt-forma');
    var uspjesnaPoruka = document.getElementById('uspjesna-poruka');
    var dugmeReset = document.getElementById('dugme-reset');

    // Regex za email validaciju
    // Uz pomoć Claude-a sam pronašla/razumjela ovaj pattern:
    var emailRegex = /^[\w.-]+@[\w.-]+\.[a-z]{2,}$/i;

    // Regex za telefon — samo cifre, razmaci i crtice
    var telefonRegex = /^[0-9\s\-\+]{7,15}$/;

    function prikaziGresku(idGreske, poruka) {
        var el = document.getElementById(idGreske);
        if (el) {
            el.textContent = poruka;
            el.style.display = 'block';
        }
        var polje = document.getElementById(idGreske.replace('greska-', ''));
        if (polje) polje.classList.add('polje-greska');
    }

    function ocistiGresku(idGreske) {
        var el = document.getElementById(idGreske);
        if (el) {
            el.textContent = '';
            el.style.display = 'none';
        }
        var polje = document.getElementById(idGreske.replace('greska-', ''));
        if (polje) polje.classList.remove('polje-greska');
    }

    function validirajFormu() {
        var ispravna = true;

        // Ime
        var ime = document.getElementById('ime').value.trim();
        if (ime === '') {
            prikaziGresku('greska-ime', '⚠ Ime je obavezno polje.');
            ispravna = false;
        } else {
            ocistiGresku('greska-ime');
        }

        // Prezime
        var prezime = document.getElementById('prezime').value.trim();
        if (prezime === '') {
            prikaziGresku('greska-prezime', '⚠ Prezime je obavezno polje.');
            ispravna = false;
        } else {
            ocistiGresku('greska-prezime');
        }

        // Email
        var email = document.getElementById('email').value.trim();
        if (email === '') {
            prikaziGresku('greska-email', '⚠ Email je obavezno polje.');
            ispravna = false;
        } else if (!emailRegex.test(email)) {
            prikaziGresku('greska-email', '⚠ Email nije u ispravnom formatu (primjer@email.com).');
            ispravna = false;
        } else {
            ocistiGresku('greska-email');
        }

        // Telefon
        var telefon = document.getElementById('telefon').value.trim();
        if (telefon === '') {
            prikaziGresku('greska-telefon', '⚠ Telefon je obavezno polje.');
            ispravna = false;
        } else if (!telefonRegex.test(telefon)) {
            prikaziGresku('greska-telefon', '⚠ Telefon smije sadržavati samo cifre, razmake i crtice.');
            ispravna = false;
        } else {
            ocistiGresku('greska-telefon');
        }

        // Tema
        var tema = document.getElementById('tema').value;
        if (tema === '') {
            prikaziGresku('greska-tema', '⚠ Molimo odaberite temu upita.');
            ispravna = false;
        } else {
            ocistiGresku('greska-tema');
        }

        // Poruka
        var poruka = document.getElementById('poruka').value.trim();
        if (poruka === '') {
            prikaziGresku('greska-poruka', '⚠ Poruka je obavezno polje.');
            ispravna = false;
        } else if (poruka.length < 10) {
            prikaziGresku('greska-poruka', '⚠ Poruka mora imati najmanje 10 znakova.');
            ispravna = false;
        } else {
            ocistiGresku('greska-poruka');
        }

        return ispravna;
    }

    // Submit
    forma.addEventListener('submit', function (e) {
        e.preventDefault();

        if (validirajFormu()) {
            var ime = document.getElementById('ime').value.trim();
            uspjesnaPoruka.textContent = '✓ Hvala, ' + ime + '! Vaša poruka je uspješno poslana. Javit ćemo vam se uskoro.';
            uspjesnaPoruka.style.display = 'block';
            forma.style.display = 'none';
        }
    });

    // Reset
    dugmeReset.addEventListener('click', function () {
        forma.reset();
        uspjesnaPoruka.style.display = 'none';
        forma.style.display = 'block';
        ['ime', 'prezime', 'email', 'telefon', 'tema', 'poruka'].forEach(function (polje) {
            ocistiGresku('greska-' + polje);
        });
    });

}());
