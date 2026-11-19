
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>React Essentials | Week 11 Review</title>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background: #101827;
    color: #f1f5f9;
    line-height: 1.6;
}

header {
    padding: 22px 8%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #334155;
}

.logo {
    font-size: 20px;
    font-weight: bold;
    color: #38bdf8;
}

nav a {
    color: #cbd5e1;
    text-decoration: none;
    margin-left: 20px;
}

.container {
    max-width: 850px;
    margin: 60px auto;
    padding: 20px;
}

.tag {
    color: #38bdf8;
    font-size: 13px;
    letter-spacing: 2px;
    font-weight: bold;
}

h1 {
    font-size: 45px;
    margin: 15px 0;
}

.description {
    color: #94a3b8;
    margin-bottom: 30px;
}

.score-box {
    background: #1e293b;
    padding: 18px;
    border-radius: 12px;
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
}

.question-card {
    background: #1e293b;
    border: 1px solid #334155;
    border-radius: 14px;
    padding: 25px;
    margin-bottom: 22px;
}

.question-card h3 {
    margin-bottom: 18px;
    font-size: 18px;
}

.option {
    display: block;
    background: #263449;
    border: 1px solid #475569;
    padding: 12px 15px;
    margin: 10px 0;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.2s;
}

.option:hover {
    border-color: #38bdf8;
    background: #334155;
}

.option input {
    margin-right: 10px;
}

.feedback {
    margin-top: 14px;
    font-size: 14px;
    font-weight: bold;
}

.correct {
    color: #4ade80;
}

.wrong {
    color: #fb7185;
}

button {
    padding: 12px 22px;
    background: #0284c7;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 15px;
}

button:hover {
    background: #0369a1;
}

.actions {
    display: flex;
    gap: 12px;
    margin-top: 25px;
}

.reset {
    background: #475569;
}

footer {
    text-align: center;
    padding: 30px;
    color: #94a3b8;
    border-top: 1px solid #334155;
    margin-top: 50px;
}

@media(max-width: 600px) {
    h1 { font-size: 34px; }
    header { padding: 18px 5%; }
    nav a { margin-left: 8px; font-size: 13px; }
    .container { margin: 30px auto; }
    .actions { flex-direction: column; }
}
</style>
</head>

<body>

<header>
    <div class="logo">REACT / LEARN</div>
    <nav>
        <a href="#home">Home</a>
        <a href="#quiz">Practice</a>
    </nav>
</header>

<main class="container" id="home">

    <p class="tag">WEEK 11 / MONDAY REVIEW</p>

    <h1>React Essentials.</h1>

    <p class="description">
        Test your understanding of React fundamentals.
        Select an answer and receive instant feedback.
    </p>

    <div class="score-box">
        <span>Practice Score</span>
        <strong id="score">0 / 5</strong>
        <span id="answered">0 Answered</span>
    </div>

    <section id="quiz">

        <div class="question-card" data-answer="1">
            <h3>01. What is React mainly used for?</h3>

            <label class="option">
                <input type="radio" name="q1" value="0">
                Database management
            </label>

            <label class="option">
                <input type="radio" name="q1" value="1">
                Building user interfaces
            </label>

            <label class="option">
                <input type="radio" name="q1" value="2">
                Managing computer hardware
            </label>

            <label class="option">
                <input type="radio" name="q1" value="3">
                Creating operating systems
            </label>

            <p class="feedback"></p>
        </div>

        <div class="question-card" data-answer="2">
            <h3>02. What is a React component?</h3>

            <label class="option">
                <input type="radio" name="q2" value="0">
                A database table
            </label>

            <label class="option">
                <input type="radio" name="q2" value="1">
                A CSS property
            </label>

            <label class="option">
                <input type="radio" name="q2" value="2">
                A reusable part of the user interface
            </label>

            <label class="option">
                <input type="radio" name="q2" value="3">
                A web browser
            </label>

            <p class="feedback"></p>
        </div>

        <div class="question-card" data-answer="0">
            <h3>03. Which hook is used to manage state in a functional component?</h3>

            <label class="option">
                <input type="radio" name="q3" value="0">
                useState
            </label>

            <label class="option">
                <input type="radio" name="q3" value="1">
                useEffect
            </label>

            <label class="option">
                <input type="radio" name="q3" value="2">
                useHTML
            </label>

            <label class="option">
                <input type="radio" name="q3" value="3">
                useCSS
            </label>

            <p class="feedback"></p>
        </div>

        <div class="question-card" data-answer="1">
            <h3>04. What are props in React?</h3>

            <label class="option">
                <input type="radio" name="q4" value="0">
                CSS styles
            </label>

            <label class="option">
                <input type="radio" name="q4" value="1">
                Data passed from parent to child components
            </label>

            <label class="option">
                <input type="radio" name="q4" value="2">
                Database records
            </label>

            <label class="option">
                <input type="radio" name="q4" value="3">
                HTML attributes only
            </label>

            <p class="feedback"></p>
        </div>

        <div class="question-card" data-answer="3">
            <h3>05. Which hook is commonly used for side effects?</h3>

            <label class="option">
                <input type="radio" name="q5" value="0">
                useState
            </label>

            <label class="option">
                <input type="radio" name="q5" value="1">
                useProps
            </label>

            <label class="option">
                <input type="radio" name="q5" value="2">
                useHTML
            </label>

            <label class="option">
                <input type="radio" name="q5" value="3">
                useEffect
            </label>

            <p class="feedback"></p>
        </div>

    </section>

    <div class="actions">
        <button onclick="checkAnswers()">Check My Answers</button>
        <button class="reset" onclick="resetQuiz()">Reset Quiz</button>
    </div>

</main>

<footer>
    Week 11 | React Essentials | Web Programming
</footer>

<script>
function checkAnswers() {
    const cards = document.querySelectorAll(".question-card");
    let score = 0;
    let answered = 0;

    cards.forEach(card => {
        const selected = card.querySelector("input:checked");
        const feedback = card.querySelector(".feedback");
        const correct = Number(card.dataset.answer);

        if (selected) {
            answered++;

            if (Number(selected.value) === correct) {
                score++;
                feedback.textContent = "✓ Correct answer!";
                feedback.className = "feedback correct";
            } else {
                feedback.textContent = "✗ Incorrect. Try reviewing this concept.";
                feedback.className = "feedback wrong";
            }
        } else {
            feedback.textContent = "Please select an answer.";
            feedback.className = "feedback wrong";
        }
    });

    document.getElementById("score").textContent =
        score + " / " + cards.length;

    document.getElementById("answered").textContent =
        answered + " Answered";
}

function resetQuiz() {
    document.querySelectorAll("input[type=radio]").forEach(input => {
        input.checked = false;
    });

    document.querySelectorAll(".feedback").forEach(feedback => {
        feedback.textContent = "";
        feedback.className = "feedback";
    });

    document.getElementById("score").textContent = "0 / 5";
    document.getElementById("answered").textContent = "0 Answered";
}
</script>

</body>
</html>
