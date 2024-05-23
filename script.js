const novels = [
  {
    title: "Crime et Châtiment",
    author: "Fyodor Dostoevsky",
    hint: "Un jeune homme commet un meurtre et lutte avec sa conscience et ses motivations philosophiques.",
  },
  {
    title: "Les Démons",
    author: "Fyodor Dostoevsky",
    hint: "Une histoire de conspiration et de folie explorant le nihilisme et la révolution.",
  },
  {
    title: "Le Joueur",
    author: "Fyodor Dostoevsky",
    hint: "Un récit d'obsession et de passion pour le jeu et les relations humaines.",
  },
  {
    title: "L'Adolescent",
    author: "Fyodor Dostoevsky",
    hint: "Les tribulations et réflexions d'un jeune homme à Saint-Pétersbourg.",
  },
  {
    title: "Les Frères Karamazov",
    author: "Fyodor Dostoevsky",
    hint: "Une saga familiale complexe explorant les relations entre les membres de la famille Karamazov.",
  },
  {
    title: "Les Dix Petits Nègres",
    author: "Agatha Christie",
    hint: "Un groupe de dix personnes invitées sur une île commence à être tué l'une après l'autre, suivant une comptine pour enfants.",
  },
  {
    title: "Le Crime de l'Orient-Express",
    author: "Agatha Christie",
    hint: "Une enquête de Hercule Poirot sur le meurtre d'un riche passager dans le train de l'Orient-Express.",
  },
  {
    title: "La Maison Biscornue",
    author: "Agatha Christie",
    hint: "Une enquête de Miss Marple sur un meurtre survenu dans une famille vivant dans une maison étrange.",
  },
  {
    title: "Un Cadavre dans la Bibliothèque",
    author: "Agatha Christie",
    hint: "Miss Marple enquête sur le meurtre d'une femme inconnue retrouvée dans la bibliothèque d'une famille bourgeoise.",
  },
];

let selectedNovelIndex = Math.floor(Math.random() * novels.length);
let selectedNovel = novels[selectedNovelIndex].title;
let guessedLetters = [];
let score = 0;
let consecutiveWins = 0;

document.getElementById("hint").textContent +=
  novels[selectedNovelIndex].hint +
  " - Auteur: " +
  novels[selectedNovelIndex].author;

function displayWordToGuess() {
  const wordContainer = document.getElementById("word-to-guess");
  wordContainer.innerHTML = "";
  for (let i = 0; i < selectedNovel.length; i++) {
    if (guessedLetters.includes(selectedNovel[i])) {
      wordContainer.innerHTML += selectedNovel[i] + " ";
    } else {
      wordContainer.innerHTML += "_ ";
    }
  }
}

function createAlphabetButtons() {
  const alphabetButtonsContainer = document.getElementById("alphabet-buttons");
  for (let i = 0; i < 26; i++) {
    const letter = String.fromCharCode(97 + i);
    const button = document.createElement("button");
    button.textContent = letter;
    button.className = "button";
    button.addEventListener("click", function () {
      if (!guessedLetters.includes(letter)) {
        guessedLetters.push(letter);
        displayWordToGuess();
        updateGuessedLetters();
        checkWin();
      }
    });
    alphabetButtonsContainer.appendChild(button);
  }
}

function updateGuessedLetters() {
  const guessedLettersContainer = document.getElementById("guessed-letters");
  guessedLettersContainer.textContent =
    "Lettres Devinées: " + guessedLetters.join(", ");
}

function checkWin() {
  if (
    selectedNovel.split("").every((letter) => guessedLetters.includes(letter))
  ) {
    const resultContainer = document.getElementById("result");
    resultContainer.textContent = "Félicitations ! Vous avez deviné le mot !";
    score++;
    consecutiveWins++;
    if (consecutiveWins === 5) {
      getGift();
      consecutiveWins = 0;
    }
    // Sélectionner un nouveau mot après un certain délai
    setTimeout(() => {
      resetGame();
    }, 2000);
  } else {
    consecutiveWins = 0;
  }
}

function getGift() {
  alert("Vous avez deviné 5 mots d'affilée ! Vous avez gagné un cadeau !");
}

function resetGame() {
  // Réinitialiser les lettres devinées et sélectionner un nouveau mot
  guessedLetters = [];
  selectedNovelIndex = Math.floor(Math.random() * novels.length);
  selectedNovel = novels[selectedNovelIndex].title;
  document.getElementById("hint").textContent =
    "Indice: " +
    novels[selectedNovelIndex].hint +
    " - Auteur: " +
    novels[selectedNovelIndex].author;
  displayWordToGuess();
  updateGuessedLetters();
  document.getElementById("result").textContent = "";
}

displayWordToGuess();
createAlphabetButtons();
updateGuessedLetters();
