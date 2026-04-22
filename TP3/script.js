const projets = [
  { id: 1, titre: "Portfolio", description: "Mon site personnel responsive.", tags: ["HTML", "CSS"] },
  { id: 2, titre: "Blog tech", description: "Articles sur le développement web.", tags: ["JS", "API"] },
  { id: 3, titre: "App météo", description: "Application de météo en temps réel.", tags: ["JS", "API"] },
  { id: 4, titre: "Refonte asso", description: "Nouveau site pour une association.", tags: ["HTML", "CSS", "Figma"] },
  { id: 5, titre: "Mini-jeu", description: "Jeu de mémoire en JavaScript.", tags: ["JS", "DOM"] },
];

const conteneur = document.querySelector("#projets-liste");
const compteur = document.querySelector(".compteur");

let tagActuel = "tous";
let triActuel = "az";

function sauvegarder() {
  localStorage.setItem("projets", JSON.stringify(projets));
}

function charger() {
  const donnees = localStorage.getItem("projets");

  if (donnees) {
    projets.length = 0;
    JSON.parse(donnees).forEach((p) => projets.push(p));
  } else {
    sauvegarder();
  }
}

function supprimerProjet(id) {
  const index = projets.findIndex((p) => p.id === id);

  if (index !== -1) {
    projets.splice(index, 1);
    sauvegarder();
    mettreAJourAffichage();
  }
}

function appliquerFiltreEtTri() {
  let liste = [...projets];

  if (tagActuel !== "tous") {
    liste = liste.filter((p) => p.tags.includes(tagActuel));
  }

  if (triActuel === "az") {
    liste.sort((a, b) => a.titre.localeCompare(b.titre));
  } else {
    liste.sort((a, b) => b.titre.localeCompare(a.titre));
  }

  return liste;
}

function afficherProjets(listeProjets) {
  conteneur.innerHTML = "";

  if (listeProjets.length === 0) {
    conteneur.innerHTML = `<p class="vide">Aucun projet trouvé.</p>`;
    compteur.textContent = "0 projet";
    return;
  }

  listeProjets.forEach((projet) => {
    const carte = document.createElement("article");
    carte.classList.add("carte");

    carte.innerHTML = `
      <h3>${projet.titre}</h3>
      <p>${projet.description}</p>
      <div class="tags">
        ${projet.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
      </div>
      <button class="btn-supprimer" data-id="${projet.id}">Supprimer</button>
    `;

    conteneur.append(carte);
  });

  compteur.textContent = `${listeProjets.length} projet(s)`;

  document.querySelectorAll(".btn-supprimer").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      supprimerProjet(id);
    });
  });
}

function mettreAJourAffichage() {
  const liste = appliquerFiltreEtTri();
  afficherProjets(liste);
}

charger();
mettreAJourAffichage();

const boutonsFiltres = document.querySelectorAll(".filtre");

boutonsFiltres.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".filtre.active").classList.remove("active");
    btn.classList.add("active");

    tagActuel = btn.dataset.tag;
    mettreAJourAffichage();
  });
});

const selectTri = document.querySelector("#tri");

selectTri.addEventListener("change", () => {
  triActuel = selectTri.value;
  mettreAJourAffichage();
});

const form = document.querySelector("#form-ajout");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const titre = document.querySelector("#input-titre").value.trim();
  const description = document.querySelector("#input-desc").value.trim();
  const tagsTexte = document.querySelector("#input-tags").value.trim();

  if (!titre || !description) return;

  const nouveauProjet = {
    id: projets.length > 0 ? Math.max(...projets.map(p => p.id)) + 1 : 1,
    titre: titre,
    description: description,
    tags: tagsTexte ? tagsTexte.split(",").map((t) => t.trim()) : [],
  };

  projets.push(nouveauProjet);
  sauvegarder();
  mettreAJourAffichage();
  form.reset();
});