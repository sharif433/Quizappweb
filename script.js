const questions = [
    {
      question: "What is the capital of India?",
      options: ["Delhi", "Mumbai", "Kolkata", "Chennai"],
      answer: "Delhi"
    },
    {
      question: "Which is the smallest continent?",
      options: ["Asia", "Europe", "Australia", "Africa"],
      answer: "Australia"
    },
    {
      question: "5 + 3 = ?",
      options: ["6", "8", "7", "9"],
      answer: "8"
    },
    {
      question: "Which planet is closest to the Sun?",
      options: ["Earth", "Venus", "Mercury", "Mars"],
      answer: "Mercury"
    },
    {
      question: "Red + Yellow = ?",
      options: ["Orange", "Green", "Purple", "Blue"],
      answer: "Orange"
    }
  ];
  
  let currentIndex = 0;
  let score = 0;
  let timer;
  let timeLeft = 15;
  
  const questionEl = document.getElementById("question");
  const optionsContainer = document.getElementById("options-container");
  const feedbackEl = document.getElementById("feedback");
  const nextBtn = document.getElementById("next-btn");
  const timerEl = document.getElementById("timer");
  
  function loadQuestion() {
    clearInterval(timer);
    timeLeft = 15;
    updateTimerDisplay();
    startTimer();
  
    feedbackEl.innerText = "";
    feedbackEl.className = "";
    nextBtn.style.display = "none";
  
    const current = questions[currentIndex];
    questionEl.innerText = `${currentIndex + 1}. ${current.question}`;
    optionsContainer.innerHTML = "";
  
    current.options.forEach(option => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.innerText = option;
      btn.onclick = () => checkAnswer(option, current.answer);
      optionsContainer.appendChild(btn);
    });
  }
  
  function startTimer() {
    timer = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();
  
      if (timeLeft === 0) {
        clearInterval(timer);
        feedbackEl.innerText = `⏱️ Time's up! Correct: ${questions[currentIndex].answer}`;
        feedbackEl.className = "incorrect";
        nextBtn.style.display = "block";
        disableOptions();
      }
    }, 1000);
  }
  
  function updateTimerDisplay() {
    timerEl.innerText = `⏱️ ${timeLeft}`;
  }
  
  function checkAnswer(selected, correct) {
    clearInterval(timer);
    const isCorrect = selected === correct;
    feedbackEl.innerText = isCorrect ? "✅ Correct!" : `❌ Wrong! Correct: ${correct}`;
    feedbackEl.className = isCorrect ? "correct" : "incorrect";
  
    if (isCorrect) score++;
    nextBtn.style.display = "block";
    disableOptions();
  }
  
  function disableOptions() {
    Array.from(optionsContainer.children).forEach(btn => {
      btn.disabled = true;
    });
  }
  
  nextBtn.onclick = () => {
    currentIndex++;
    if (currentIndex < questions.length) {
      loadQuestion();
    } else {
      showFinal();
    }
  };
  
  function showFinal() {
    questionEl.innerHTML = `<h3>🎉 Quiz Completed!</h3>`;
    optionsContainer.innerHTML = '';
    feedbackEl.innerHTML = `✅ Your Score: ${score} / ${questions.length}`;
    nextBtn.style.display = 'none';
  }
  
  loadQuestion();
  