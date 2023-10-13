// Referecing UI elements
const question = document.getElementById("mainQuestion");
const answer = document.getElementById("mainAnswer");
const add = document.getElementById("add");
const clear = document.getElementById("clear");
const flashcardContainers = document.getElementById("flashcard");
const previous = document.getElementById('load');
let array = [];


// Saving flashcard to locastorage
const saveFlashcardsToLocalStorage = () => {
    localStorage.setItem("flashcards", JSON.stringify(array));
  };


// Load flashcard back 
const loadFlashcardsFromLocalStorage = () => {
    const storedFlashcards = localStorage.getItem("flashcards");
    if (storedFlashcards) {
      array = JSON.parse(storedFlashcards);
      array.forEach((flashcard) => {
        createFlashcard(flashcard.save_question, flashcard.save_answer);
      });
    }
  };


// store the data from the input fields and puts it into an array
const createFlashcard = (questionText, answerText) => {
    let flashcard = {
        save_question: questionText,
        save_answer: answerText,
    }
    // save the data to the array
    array.push(flashcard);
    saveFlashcardsToLocalStorage();
    // Show the flashcards on the website
    const flashcardElement = document.createElement('div');
    flashcardElement.classList.add("flashcard");
    flashcardElement.innerHTML = `
    <label for="question">Question</label>
    <div class="question">${questionText}</div>
    <label for="answer">Answer</label>
    <div class="answer">${answerText}</div>
    <div class="buttons">
    <button class="show">Show</button>
    <button class="hide">Hide</button>
    <button class="delete">Delete</button>
    </div>
    `;
    flashcardContainers.append(flashcardElement);
    const hide = flashcardElement.querySelectorAll(".hide");
    const show = flashcardElement.querySelectorAll(".show");
    const deleteButton = flashcardElement.querySelector(".delete"); 
    // Hide flashcard answers 
    hide.forEach(hide => {
        hide.addEventListener("click", () => {
            const flashcardAnswer = flashcardElement.querySelector(".answer")
            flashcardAnswer.style.display = 'none';
        });

    })
    // Show flashcard answer
    show.forEach(show => {
        show.addEventListener("click", () => {
            const flashcardAnswer = flashcardElement.querySelector(".answer")
            flashcardAnswer.style.display = 'block';
        });
    })

    // Delete flashcard
    deleteButton.addEventListener('click', () => {
        const index = array.indexOf(flashcard);
        if (index !== -1) {
            array.splice(index,1);
            saveFlashcardsToLocalStorage();
        }
        flashcardElement.remove();
    });
};

// Listen for add function click
add.addEventListener("click", () => {
    createFlashcard(mainQuestion.value, mainAnswer.value);
    mainQuestion.value = " ";
    mainAnswer.value = " ";
})

// Clear input field
clear.addEventListener("click", () => {
    mainQuestion.value = ' ';
    mainAnswer.value = ' ';
})

// Listen for when the "Load" button is clicked
previous.addEventListener("click", () => {
    // Clear existing flashcards
    flashcardContainers.innerHTML = "";
    // Load flashcards from localStorage
    loadFlashcardsFromLocalStorage();
  });
