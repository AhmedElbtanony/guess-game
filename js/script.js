let gameName = "guess the word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${gameName} game created by me`;
let numberOfTries = 6;
let numberOfLetters = 4;
let currentTry = 1;
const words = [
  "acid",
  "arch",
  "bake",
  "bark",
  "bird",
  "blue",
  "bush",
  "cake",
  "calm",
  "card",
  "cave",
  "clay",
  "coat",
  "cold",
  "dark",
  "dear",
  "desk",
  "dive",
  "earn",
  "edge",
  "fade",
  "farm",
  "fast",
  "fire",
  "fish",
  "flag",
  "flaw",
  "gift",
  "glow",
  "goat",
  "gold",
  "golf",
  "hair",
  "hand",
  "hike",
  "hope",
  "idea",
  "iron",
  "item",
  "join",
  "joke",
  "jump",
  "king",
  "kite",
  "lake",
  "lamp",
  "leaf",
  "lion",
  "list",
  "love",
  "mask",
  "meat",
  "milk",
  "mint",
  "navy",
  "neck",
  "nest",
  "nose",
  "open",
  "oven",
  "palm",
  "pink",
  "play",
  "quit",
  "quiz",
  "rain",
  "ride",
  "ring",
  "risk",
  "road",
  "rock",
  "salt",
  "sand",
  "seed",
  "ship",
  "snow",
  "soup",
  "star",
  "time",
  "trap",
  "tree",
  "ugly",
  "unit",
  "wave",
  "wind",
  "wolf",
  "wool",
  "zero",
  "zone",
  "zoom",
];
let wordToGuess = words[Math.floor(Math.random() * words.length)].toUpperCase();
console.log(wordToGuess);
let messageArea = document.querySelector(".message");

function geneateinput() {
  const inputsContainer = document.querySelector(".inputs");
  for (let i = 1; i <= numberOfTries; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>try ${i} </span>`;
    if (i !== 1) tryDiv.classList.add("disabled-inputs");
    for (let j = 1; j <= numberOfLetters; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}-letter-${j}`;
      input.maxLength = 1;
      tryDiv.appendChild(input);
    }
    inputsContainer.appendChild(tryDiv);
  }
  inputsContainer.children[0].children[1].focus();
  const inputsInDisabledDiv = document.querySelectorAll(
    ".disabled-inputs input"
  );
  inputsInDisabledDiv.forEach((input) => (input.disabled = true));

  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
      const nextInput = inputs[index + 1];
      if (nextInput) nextInput.focus();
    });

    input.addEventListener("keydown", function (event) {
      const currentIndex = Array.from(inputs).indexOf(event.target);
      if (event.key === "ArrowRight") {
        const nextInput = currentIndex + 1;
        if (nextInput < inputs.length) inputs[nextInput].focus();
      } else if (event.key === "ArrowLeft") {
        const previnput = currentIndex - 1;
        if (previnput >= 0) inputs[previnput].focus();
      } else if (event.key === "Backspace") {
        const previnput = currentIndex - 1;
        if (previnput >= 0) {
          if (currentIndex === numberOfTries-1 && inputs[currentIndex].value !== "") {
            inputs[currentIndex].value = "";
          } else if (inputs[currentIndex].value === "") {
            if (!inputs[previnput].disabled) {
              inputs[previnput].focus();
              inputs[previnput].value = "";
            }
          } else {
            inputs[currentIndex].value = "";
          }
        }
      }
    });
  });
}

const checkButton = document.querySelector(".check");
checkButton.addEventListener("click", handleGuesses);
document.body.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    handleGuesses();
  }
});

function handleGuesses() {
  let successGuess = true;
  console.log(wordToGuess);
  for (let i = 1; i <= numberOfLetters; i++) {
    const inputfield = document.querySelector(
      `#guess-${currentTry}-letter-${i}`
    );
    const letter = inputfield.value.toUpperCase();
    const actualLetter = wordToGuess[i - 1];
    if (letter === actualLetter) {
      inputfield.classList.add("yes-in-place");
    } else if (wordToGuess.includes(letter) && letter !== "") {
      inputfield.classList.add("not-in-place");
      successGuess = false;
    } else {
      inputfield.classList.add("no");
      successGuess = false;
    }
  }
  if (successGuess) {
    messageArea.innerHTML = `Congratulations! You guessed the word <span class="success">${wordToGuess}</span> in ${currentTry} tries.`;
    messageArea.classList.remove("d-none");
    let allTries = document.querySelectorAll(".inputs > div");
    allTries.forEach((tryDiv) => {
      tryDiv.classList.add("disabled-inputs");
    });
    let controlsButtons = document.querySelectorAll(".control > button");
    controlsButtons.forEach((tryDiv) => {
      tryDiv.classList.add("disabled-inputs");
    });
  } else {
    document
      .querySelector(`.try-${currentTry}`)
      .classList.add("disabled-inputs");
    const currentTryInputs = document.querySelectorAll(
      `.try-${currentTry} input`
    );
    currentTryInputs.forEach((input) => (input.disabled = true));
    currentTry++;
    if (currentTry > numberOfTries) {
      messageArea.innerHTML = `Game Over! The word was <span class="error">${wordToGuess}</span>.`;
      messageArea.classList.remove("d-none");
      let allTries = document.querySelectorAll(".inputs > div");
      allTries.forEach((tryDiv) => {
        tryDiv.classList.add("disabled-inputs");
      });
      let controlsButtons = document.querySelectorAll(".control > button");
      controlsButtons.forEach((tryDiv) => {
        tryDiv.classList.add("disabled-inputs");
      });
      return;
    }else{
    const nextTryInput = document.querySelectorAll(`.try-${currentTry} input`);
    nextTryInput.forEach((input) => (input.disabled = false));

    let el = document.querySelector(`.try-${currentTry}`);
    if (el) {
      document
        .querySelector(`.try-${currentTry}`)
        .classList.remove("disabled-inputs");
      el.children[1].focus();
    }}
  }
  const inputsInDisabledDiv = document.querySelectorAll(".disabled-inputs");
  inputsInDisabledDiv.forEach((input) => (input.disabled = true));
}

const hintButton = document.querySelector(".hint");
hintButton.addEventListener("click", hint);
function hint(params) {
  
}


window.onload = function () {
  geneateinput();
};
