let current = 0;
let score = 0;
let questions = [];

async function loadQuestions() {
  const res = await fetch("/api/questions");
  questions = await res.json();
  showQuestion();
}

function showQuestion() {
  if (current >= questions.length) {
    document.getElementById("quiz").innerHTML = "<h2>Quiz Over!</h2>";
    document.getElementById("score").innerText =
      `Your score: ${score}/${questions.length}`;
    return;
  }

  const q = questions[current];
  document.getElementById("question").innerText = q.question;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => selectAnswer(opt);
    optionsDiv.appendChild(btn);
  });
}

async function selectAnswer(selected) {
  const q = questions[current];
  const res = await fetch("/api/answer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: q.id, selected }),
  });
  const result = await res.json();

  const feedback = document.getElementById("feedback");
  if (result.correct) {
    feedback.textContent = "Correct!";
    score++;
  } else {
    feedback.textContent = `Wrong! Correct answer: ${q.answer}`;
  }

  current++;
  setTimeout(() => {
    feedback.textContent = "";
    showQuestion();
  }, 1000);
}

loadQuestions();
