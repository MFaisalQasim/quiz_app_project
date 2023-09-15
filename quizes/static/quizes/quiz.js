quizBox = document.getElementById("quiz-box");
const url = window.location.href;

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
  },
  error: function (error) {
    console.log(error);
  }
});

const quizForm = document.getElementById('quiz-form')
const csrf = document.getElementsByName('csrfmiddlewaretoken')

const sendData = () => {
    const ans = [...document.getElementsByClassName('ans')]
    const data = {}
    data['csrfmiddlewaretoken'] = csrf[0].value
    ans.forEach(a => {
        if (a.checked) {
            data[a.name] = a.value
        } else {
            if (!data[a.name]) {
                data[a.name] = null
            }
        }
    });

    $.ajax({
        type: "POST",
        url: `${url}/quize-data-save`,
        data: data,
        success: function (response) {
            const result = response.result
            console.log(result);
            quizForm.classList.add('not-visible')

            result.forEach(res => {
              console.log(res);
              const resDiv = document.createElement('div')
              for (const[question, answers] of Object.entries(res)){
                resDiv.innerHTML += question
                const cls = ['container', 'p-3', 'text-light', 'h3']
                resDiv.classList.add(...cls)
                if (answers=='not answered') {
                  resDiv.innerHTML += '- not answered'
                  resDiv.classList.add('bg-danger')
                } else {
                  
                }
              }
            });
        },
        error: function (error) {
            console.log(error);
        }
    });
}

quizForm.addEventListener('submit', e=> {
    e.preventDefault()
    sendData()
} )