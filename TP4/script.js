const conteneurProjets = document.querySelector("#api-liste");
const conteneurProjetsLocal = document.querySelector("#projets-liste");
const conteneurRecherche = document.querySelector("#recherche-resultats");

const inputRecherche = document.querySelector("#recherche");

const btnTriPop = document.querySelector("#tri-pop");
const btnTriNom = document.querySelector("#tri-nom");
const btnFiltreGrand = document.querySelector("#filtre-grand");
const btnReset = document.querySelector("#reinitialiser");

let tousPays = [];

// ===============================
// TEMPS 1 — JSON LOCAL
// ===============================

async function chargerProjets() {
  conteneurProjetsLocal.innerHTML = "<p class='loading'>Chargement...</p>";

  try {
    const res = await fetch("./data.json");
    const data = await res.json();

    afficherProjets(data.projets);
  } catch (e) {
    conteneurProjetsLocal.innerHTML = "<p class='error'>Erreur chargement JSON</p>";
  }
}

function afficherProjets(projets) {
  conteneurProjetsLocal.innerHTML = "";

  projets.forEach((p) => {
    const div = document.createElement("div");
    div.classList.add("carte");

    div.innerHTML = `
      <h3>${p.titre}</h3>
      <p>${p.description}</p>
      <p class="annee">${p.annee}</p>
      <div class="tags">
        ${p.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
      </div>
    `;

    conteneurProjetsLocal.append(div);
  });
}

// ===============================
// TEMPS 2 — API UNIQUE (REST COUNTRIES)
// ===============================

async function chargerPays() {
  conteneurProjets.innerHTML = "<p class='loading'>Chargement API...</p>";

  try {
    const res = await fetch("https://restcountries.com/v3.1/region/europe");

    if (!res.ok) throw new Error("Erreur API");

    tousPays = await res.json();
    afficherPays(tousPays);

  } catch (e) {
    conteneurProjets.innerHTML = "<p class='error'>Erreur chargement API</p>";
  }
}

function afficherPays(liste) {
  conteneurProjets.innerHTML = "";

  liste.forEach((p) => {
    const div = document.createElement("div");
    div.classList.add("carte");

    div.innerHTML = `
      <h3>${p.flag} ${p.name.common}</h3>
      <p>Capitale : ${p.capital?.[0] || "Inconnue"}</p>
      <p>Population : ${p.population.toLocaleString()}</p>
    `;

    conteneurProjets.append(div);
  });
}

// ===============================
// TEMPS 3 — RECHERCHE API
// ===============================

let timer;

inputRecherche.addEventListener("input", () => {
  clearTimeout(timer);

  timer = setTimeout(async () => {
    const terme = inputRecherche.value.trim();

    if (terme.length < 2) {
      conteneurRecherche.innerHTML = "<p>Tape au moins 2 caractères</p>";
      return;
    }

    conteneurRecherche.innerHTML = "<p class='loading'>Recherche...</p>";

    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/name/${terme}`
      );

      if (!res.ok) {
        conteneurRecherche.innerHTML = "<p>Aucun résultat</p>";
        return;
      }

      const data = await res.json();
      afficherRecherche(data);

    } catch {
      conteneurRecherche.innerHTML = "<p class='error'>Erreur recherche</p>";
    }
  }, 300);
});

function afficherRecherche(liste) {
  conteneurRecherche.innerHTML = "";

  liste.forEach((p) => {
    const div = document.createElement("div");
    div.classList.add("carte");

    div.innerHTML = `
      <h3>${p.flag} ${p.name.common}</h3>
      <p>Capitale : ${p.capital?.[0] || "Inconnue"}</p>
      <p>Population : ${p.population.toLocaleString()}</p>
    `;

    conteneurRecherche.append(div);
  });
}

// ===============================
// TEMPS 4 — TRI / FILTRE
// ===============================

btnTriPop.addEventListener("click", () => {
  const sorted = [...tousPays].sort((a, b) => b.population - a.population);
  afficherPays(sorted);
});

btnTriNom.addEventListener("click", () => {
  const sorted = [...tousPays].sort((a, b) =>
    a.name.common.localeCompare(b.name.common)
  );
  afficherPays(sorted);
});

btnFiltreGrand.addEventListener("click", () => {
  const filtered = tousPays.filter(p => p.population > 10000000);
  afficherPays(filtered);
});

btnReset.addEventListener("click", () => {
  afficherPays(tousPays);
});

// ===============================
// LANCEMENT
// ===============================

chargerProjets();
chargerPays();