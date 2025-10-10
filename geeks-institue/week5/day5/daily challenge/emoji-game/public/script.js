let correctAnswer = "";

async function loadEmoji() {
  const res = await fetch("/emoji");
  const data = await res.json();

  correctAnswer = data.correct;
  document.getElementById("emoji").textContent = data.emoji;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  data.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(opt);
    optionsDiv.appendChild(btn);
  });
}

async function checkAnswer(answer) {
  const res = await fetch("/guess", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answer, correct: correctAnswer }),
  });
  const data = await res.json();

  const feedback = document.getElementById("feedback");
  feedback.textContent = data.isCorrect ? "Correct!" : "Wrong!";
  document.getElementById("score").textContent = data.score;

  setTimeout(loadEmoji, 1000);
}

loadEmoji();
