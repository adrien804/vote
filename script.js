// ===========================
// 🗳️ Données des lois (provisoires)
// ===========================
const laws = [
  {
    id: 1,
    title: "Loi sur la transition énergétique",
    description: "Objectif : réduire les émissions de gaz à effet de serre de 40 % d'ici 2030."
  },
  {
    id: 2,
    title: "Réforme du système éducatif",
    description: "Améliorer la qualité et l'accessibilité de l'éducation pour tous."
  },
  {
    id: 3,
    title: "Loi sur la sécurité numérique",
    description: "Renforcer la protection des données et la cybersécurité."
  }
];

// ===========================
// ⚙️ Initialisation du site
// ===========================
const lawList = document.getElementById("lawList");
const themeToggle = document.getElementById("themeToggle");

// Fonction principale : afficher toutes les lois
function renderLaws() {
  lawList.innerHTML = ""; // Nettoie l’affichage avant de tout recréer

  laws.forEach(law => {
    // 📦 Création de la carte de loi
    const card = document.createElement("div");
    card.classList.add("law-card");

    // 🧠 Vérifie si un vote est déjà enregistré
    const savedVote = localStorage.getItem(`vote_${law.id}`);

    // 🧱 Construction du HTML de la carte
    card.innerHTML = `
      <h3>${law.title}</h3>
      <p>${law.description}</p>
      <div class="vote-buttons">
        <button class="for" onclick="vote(${law.id}, 'pour')">✅ Pour</button>
        <button class="against" onclick="vote(${law.id}, 'contre')">❌ Contre</button>
        <button class="neutral" onclick="vote(${law.id}, 'neutre')">➖ Neutre</button>
      </div>
      <div id="result-${law.id}" class="results"></div>
    `;

    // Ajoute la carte dans la liste
    lawList.appendChild(card);

    // 🎨 Si un vote est enregistré, on restaure le résultat visuel
    if (savedVote) {
      showResult(law.id, savedVote);
    }
  });
}

// ===========================
// 🧮 Gestion du vote
// ===========================
function vote(lawId, choice) {
  // 💾 Sauvegarde le choix localement
  localStorage.setItem(`vote_${lawId}`, choice);

  // 🎨 Met à jour le résultat à l’écran
  showResult(lawId, choice);

  // 🛰️ (Préparé pour plus tard)
  // Ici, tu pourras envoyer le vote vers N8N
  console.log(`[N8N Ready] Vote enregistré : loi ${lawId} → ${choice}`);
}

// ===========================
// 🎨 Affichage du résultat visuel
// ===========================
function showResult(lawId, choice) {
  const resultDiv = document.getElementById(`result-${lawId}`);

  // 🔄 Nettoie les anciennes classes
  resultDiv.className = "results visible";

  // 🖍️ Change le style selon le choix
  if (choice === "pour") {
    resultDiv.classList.add("result-pour");
    resultDiv.textContent = "✅ Vous êtes POUR cette loi";
  } else if (choice === "contre") {
    resultDiv.classList.add("result-contre");
    resultDiv.textContent = "❌ Vous êtes CONTRE cette loi";
  } else if (choice === "neutre") {
    resultDiv.classList.add("result-neutre");
    resultDiv.textContent = "➖ Vous êtes NEUTRE sur cette loi";
  }
}

// ===========================
// 🌙 Gestion du mode clair/sombre
// ===========================
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// ===========================
// 🚀 Lancement
// ===========================
renderLaws();
