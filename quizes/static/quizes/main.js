console.log('main.js here')

modelBtn = [...document.getElementsByClassName('model-btn')]
modelBody = document.getElementById('modal-body')
startQuiz = document.getElementById('start-quiz')

const url = window.location.href

modelBtn.forEach(body => body.addEventListener('click', ()=> {
    const pk = body.getAttribute('data-pk') 
    const name = body.getAttribute('data-name') 
    const questions = body.getAttribute('data-questions') 
    const diffculty = body.getAttribute('data-diffculty') 
    const time = body.getAttribute('data-time') 
    const pass = body.getAttribute('data-pass') 

    modelBody.innerHTML =`
    <div class="h4 mt-4">Want To Start <b>${name}</b> Quiz ?</div>
    <div class="text-muted">
        <ul>
            <li>Diffculty : <b>${diffculty}</b> </li>
            <li>No Of Questions : <b>${questions}</b> </li>
            <li>Score To Pass : <b>${pass}</b> </li>
            <li>Time : <b>${time} min</b> </li>
        </ul>
    </div>
    `
    startQuiz.addEventListener('click', ()=>{
        window.location.href = url + 'quize/' + pk
    })
}) );