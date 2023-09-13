quizBox = document.getElementById('quiz-box')
const url = window.location.href

$.ajax({
    type: "get",
    url: `${url}/quize-data`,
    success: function (response) {
        console.log(response);
        array = response.data
        array.forEach(element => {            
            console.log(element);
            
        });
    },
    error: function (error) {
        console.log(error);
    }
});