let mode = "learning";  // default mode

function setMode(selected) {
    mode = selected;

    // Hide feedback in exam mode
    document.querySelectorAll(".feedback").forEach(f => {
        f.style.display = (mode === "learning") ? "block" : "none";
        f.style.color = "black";
    });

    alert("Mode set to: " + mode.toUpperCase());
}

function checkAnswersExam() {
    let score = 0;
    const questions = document.querySelectorAll(".question");

    questions.forEach(q => {
        const correct = q.getAttribute("data-correct");
        const chosen = q.querySelector("input[type=radio]:checked");

        let fb = q.querySelector(".feedback");

        if (!chosen) {
            fb.style.display = "block";
            fb.style.color = "red";
            fb.innerHTML = "No answer selected.";
            return;
        }

        if (chosen.value === correct) {
            score++;
            fb.style.display = "block";
            fb.style.color = "green";
            fb.innerHTML = "Correct!";
        } else {
            fb.style.display = "block";
            fb.style.color = "red";
            fb.innerHTML = "Incorrect. Correct answer: " + correct.toUpperCase();
        }
    });

    document.getElementById("result").innerHTML =
        "<h2>Your Score: " + score + " / " + questions.length + "</h2>";
}
