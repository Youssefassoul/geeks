let questions = [];
let currentIndex = 0;
let score = 0;

async function loadQuestions() {
  try {
    const res = await fetch("/api/quiz");
    questions = await res.json();
    if (questions.length === 0) {
      document.getElementById("quiz").innerHTML = "<p>No questions found.</p>";
      document.getElementById("nextBtn").style.display = "none";
      return;
    }
    showQuestion();
  } catch (error) {
    console.error("Error loading quiz:", error);
  }
}

function showQuestion() {
  const q = questions[currentIndex];
  const quizDiv = document.getElementById("quiz");

  quizDiv.innerHTML = `
    <h3>${q.question}</h3>
    ${q.options
      .map(
        (opt) => `
        <div>
          <label>
            <input type="radio" name="option" value="${opt.id}" />
            ${opt.text}
          </label>
        </div>`,
      )
      .join("")}
  `;
}

document.getElementById("nextBtn").addEventListener("click", () => {
  const selected = document.querySelector("input[name='option']:checked");
  if (!selected) return alert("Please select an answer!");

  const correct = questions[currentIndex].correctAnswer;
  const selectedValue = parseInt(selected.value);

  if (selectedValue === correct) {
    score++;
    alert("✅ Correct!");
  } else {
    alert("❌ Wrong!");
  }

  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    document.getElementById("quiz").innerHTML = "";
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("result").innerHTML =
      `<h2>Your Score: ${score}/${questions.length}</h2>`;
  }
});

loadQuestions();
