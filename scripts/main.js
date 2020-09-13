import quizData from "./quiz-data.js";

const quizForm = document.querySelector(".js-quiz-form");
const correctAnswers = quizData.questions.map((question) => question.answer);

const markup = buildQuestionsMarkup(quizData.questions);

quizForm.insertAdjacentHTML("afterbegin", markup);

quizForm.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const formData = new FormData(form);

  const selectedAnswers = [];

  formData.forEach((value, name) => {
    selectedAnswers.push({
      name,
      value: Number(value),
    });
  });

  const validatedAnswers = selectedAnswers.map((answer, idx) => ({
    ...answer,
    passed: answer.value === correctAnswers[idx],
  }));

  // selectedAnswers.forEach((answer, idx) => {
  //   validatedAnswers.push({
  //     ...answer,
  //     passed: answer.value === correctAnswers[idx],
  //   });
  // });

  validatedAnswers.forEach((answer) => {
    console.log();
    const input = form.querySelector(
      `input[name="${answer.name}"][value="${answer.value}"]`
    );

    const parentLabel = input.parentElement;
    parentLabel.style.backgroundColor = answer.passed ? "green" : "red";
  });

  const amountOfCorrectAnswers = validatedAnswers.reduce((acc, answer) => {
    if (answer.passed) {
      return acc + 1;
    }

    return acc;
  }, 0);

  const percentage = Math.round(
    (amountOfCorrectAnswers / validatedAnswers.length) * 100
  );

  if (percentage >= 80) {
    console.log("passed");
  } else {
    console.log("failed");
  }

  // //const passed = validatedAnswers.every((answer) => answer.passed);
}

function buildQuestionsMarkup(questions) {
  return questions
    .map(
      (question, questionIndex) => `
  <section>
    <h3>${questionIndex + 1}. ${question.question}</h3>

    <ol>
    ${question.choices
      .map(
        (choice, choiceIndex) => `
        <li>
          <label data-question="${questionIndex}" data-answer="${choiceIndex}">
            <input type="radio" name="q_${questionIndex}" value="${choiceIndex}" />
            ${choice}
          </label>
        </li>`
      )
      .join("")}
    </ol>
  </section>`
    )
    .join("");
}
