// quizscript.js
function startCountdown(quizLevel) {
    const levelNumber = quizLevel.charAt(5); // e.g., "1" from "level1.html"
    let countdownElement = document.getElementById(`countdown${levelNumber}`);
    let quizQuestionElement = document.getElementById('quizQuestion');
    let countdown = 3; // Starting countdown from 3

    // Show the countdown and hide quiz boxes
    countdownElement.style.display = 'block';
    countdownElement.textContent = `STARTING IN ${countdown}`;

    let countdownInterval = setInterval(function() {
        countdown--;
        countdownElement.textContent = `STARTING IN ${countdown}`;
        
        if (countdown < 1) {
            clearInterval(countdownInterval); // Stop the interval
            console.log("quiz started");
            countdownElement.style.display = 'none'; // Hide countdown
            quizQuestionElement.style.display = 'block'; // Show the quiz questions
            document.querySelectorAll('.quiz-box').forEach(box => box.style.display = 'none'); // Hide all boxes
        }
    }, 1000); // Interval every 1 second
}

// Add event listeners to all quiz boxes
document.querySelectorAll('.quiz-box').forEach((box, index) => {
    box.addEventListener('click', function() {
        startCountdown(`level${index + 1}.html`); // This should match your HTML structure
    });
});

// Submit quiz function to calculate score and show result
function submitQuiz() {
    const answers = {
        q1: 'B', // Correct answer for question 1
        q2: 'C', // Correct answer for question 2
        q3: 'B', // Correct answer for question 3
        q4: 'B', // Correct answer for question 4
        q5: 'C'  // Correct answer for question 5
    };

    let score = 0;

    // Loop through answers and compare with user input
    for (let question in answers) {
        const userAnswer = document.querySelector(`input[name="${question}"]:checked`);
        if (userAnswer && userAnswer.value === answers[question]) {
            score++;
        }
    }

    // Display result
    document.getElementById('quizForm').style.display = 'none';
    document.getElementById('quizResult').style.display = 'block';
    document.getElementById('resultText').textContent = `You scored ${score} out of 5.`;

    // Optionally, provide feedback based on score
    if (score === 5) {
        document.getElementById('resultText').textContent += " Excellent!";
    } else if (score >= 3) {
        document.getElementById('resultText').textContent += " Good job!";
    } else {
        document.getElementById('resultText').textContent += " Keep practicing!";
    }
}

// Hide the quiz question section initially
document.getElementById('quizQuestion').style.display = 'none';