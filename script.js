function startGame() {
  localStorage.setItem("aiPuzzleScore", "0");
  localStorage.setItem("puzzle1", "false");
  localStorage.setItem("puzzle2", "false");
  localStorage.setItem("puzzle3", "false");
  localStorage.setItem("puzzle4", "false");
  window.location.href = "puzzle1.html";
}

function normalizeAnswer(value) {
  return value.trim().toUpperCase().replace(/\s+/g, "");
}

function checkAnswer() {
  const card = document.querySelector(".puzzle-card");
  const input = document.getElementById("answerInput");
  const result = document.getElementById("resultMessage");
  const nextBtn = document.getElementById("nextBtn");

  if (!card || !input || !result) return;

  const puzzleNumber = card.dataset.puzzle;
  const correctAnswer = normalizeAnswer(card.dataset.answer);
  const userAnswer = normalizeAnswer(input.value);

  if (userAnswer === "") {
    result.textContent = "Please type an answer first.";
    result.className = "result wrong";
    return;
  }

  if (userAnswer === correctAnswer) {
    result.textContent = "Correct! AI system unlocked the next puzzle.";
    result.className = "result correct";

    const puzzleKey = "puzzle" + puzzleNumber;
    const alreadySolved = localStorage.getItem(puzzleKey);

    if (alreadySolved !== "true") {
      let score = Number(localStorage.getItem("aiPuzzleScore")) || 0;
      score++;
      localStorage.setItem("aiPuzzleScore", score.toString());
      localStorage.setItem(puzzleKey, "true");
    }

    if (nextBtn) {
      nextBtn.classList.remove("disabled-link");
      nextBtn.classList.add("active-link");
    }

    input.disabled = true;
  } else {
    result.textContent = "Wrong answer. Think again like an AI.";
    result.className = "result wrong";
  }
}

function showFinalScore() {
  const finalScore = document.getElementById("finalScore");
  const scoreMessage = document.getElementById("scoreMessage");

  if (!finalScore || !scoreMessage) return;

  const score = Number(localStorage.getItem("aiPuzzleScore")) || 0;
  finalScore.textContent = score;

  if (score === 4) {
    scoreMessage.textContent = "Excellent! You solved all puzzles like a true AI master.";
  } else if (score === 3) {
    scoreMessage.textContent = "Great work! You are very close to becoming an AI master.";
  } else if (score === 2) {
    scoreMessage.textContent = "Good try! Your logic power is growing.";
  } else if (score === 1) {
    scoreMessage.textContent = "You solved one puzzle. Try again and improve your score.";
  } else {
    scoreMessage.textContent = "No puzzle solved yet. Restart and begin your AI journey.";
  }
}

function restartGame() {
  localStorage.removeItem("aiPuzzleScore");
  localStorage.removeItem("puzzle1");
  localStorage.removeItem("puzzle2");
  localStorage.removeItem("puzzle3");
  localStorage.removeItem("puzzle4");
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", function () {
  showFinalScore();

  const input = document.getElementById("answerInput");
  if (input) {
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        checkAnswer();
      }
    });
  }
});
