quizBox = document.getElementById("quiz-box");
scoreBox = document.getElementById("score-box");
resultBox = document.getElementById("result-box");
timerBox = document.getElementById("timer-box");

const url = window.location.href;

const acticvateTimer = (time) => {
  if (time.toString().length < 2) {
    timerBox.innerHTML += `0${time}:00`;
  } else {
    timerBox.innerHTML += `${time}:00`;
  }

  let min = time - 1;
  let sec = 59;
  let d_min;
  let d_sec;

  const timer = setInterval(() => {
    sec--;
    if (sec < 0) {
      sec = 59;
      min--;
    }
    if (min.toString().length < 2) {
      d_min = "0" + min;
    } else {
      d_min = min;
    }
    if (sec.toString().length < 2) {
      d_sec = "0" + sec;
    } else {
      d_sec = sec;
    }
    if (min === 0 && sec === 0) {
      timerBox.innerHTML = "<b>00:00</b>";
      setTimeout(() => {
        clearInterval(timer);
        alert("Time Over");
        sendData();
      }, 500);
    }
    timerBox.innerHTML = `${d_min}:${d_sec}`;
  }, 1000);
};

$.ajax({
  type: "get",
  url: `${url}/quize-data`,
  success: function (response) {
    const data = response.data;
    data.forEach((element) => {
      for (const [question, answers] of Object.entries(element)) {
        quizBox.innerHTML += `
                <hr>
                <div>
                <b>${question}</b>
                </div>
                `;
        answers.forEach((ans) => {
          quizBox.innerHTML += `
                    <div>
                        <input type='radio' class='ans' id='${question}-${ans}' name='${question}' value='${ans}' />
                        <label for='${question}' >${ans}</label>
                    </div>
                    `;
        });
      }
    });

    acticvateTimer(response.time);
  },

  error: function (error) {
    console.log(error);
  },
});

const quizForm = document.getElementById("quiz-form");
const csrf = document.getElementsByName("csrfmiddlewaretoken");

const sendData = () => {
  const ans = [...document.getElementsByClassName("ans")];
  const data = {};
  data["csrfmiddlewaretoken"] = csrf[0].value;
  ans.forEach((a) => {
    if (a.checked) {
      data[a.name] = a.value;
    } else {
      if (!data[a.name]) {
        data[a.name] = null;
      }
    }
  });

  $.ajax({
    type: "POST",
    url: `${url}/quize-data-save`,
    data: data,
    success: function (response) {
      console.log(response);
      const result = response.result;
      // quizForm.classList.add('not-visible');
      quizForm.classList.add("d-none");

      resultBox.innerHTML += `${
        response.passed ? "Congragulation" : "Wanna Try Again?"
      } Your Score Is : ${response.score.toFixed(2)}`;

      result.forEach((res) => {
        console.log(res);
        const resDiv = document.createElement("div");
        for (const [question, answered] of Object.entries(res)) {
          resDiv.innerHTML += question;
          const cls = ["container", "p-3", "text-light", "h3"];
          resDiv.classList.add(...cls);
          if (answered == "not answered") {
            resDiv.innerHTML += "- not answered";
            resDiv.classList.add("bg-danger");
          } else {
            const answer = answered["answered"];
            const correct = answered["correct_answer"];
            if (answer == correct) {
              resDiv.innerHTML += `answered: ${answer}`;
              resDiv.classList.add("bg-success");
            } else {
              resDiv.innerHTML += ` | correct answer: ${correct}`;
              resDiv.innerHTML += ` | answered: ${answer}`;
              resDiv.classList.add("bg-danger");
            }
          }
          // const body = document.getElementsByTagName("BODY")[0];
          scoreBox.append(resDiv);
        }
      });
    },
    error: function (error) {
      console.log(error);
    },
  });
};

quizForm.addEventListener("submit", (e) => {
  e.preventDefault();
  sendData();
});
