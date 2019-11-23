//var score = 0;
var answer0;
var answer1;
var answer2;
var answer3;
var difficultySelector = "easy";
var categorySelector;

$("#quizButton").click(function () {
    $("#result").html('<p></p>');

    //sets difficulty level
    difficultySelector = $('input:radio[name="quizDifficulty"]:checked').val();

    //sets category
    categorySelector = $('#triviaCategory option:selected').val();


    $.ajax({
        url: "https://opentdb.com/api.php?amount=1&category=" + categorySelector + "&type=multiple&difficulty=" + difficultySelector + "",
        type: 'get',
        success(response) {
            //console.log(response.results);
            $("#quizQuestion").html('<p class="h1">' + response.results[0].question + '</p>');
            //console.log('correct answer:' + response.results[0].correct_answer);

            //sets answers to available options from API
            answer0 = response.results[0].correct_answer;
            answer1 = response.results[0].incorrect_answers[0];
            answer2 = response.results[0].incorrect_answers[1];
            answer3 = response.results[0].incorrect_answers[2];

            //creates array of answers
            var answersList = [answer0, answer1, answer2, answer3];

            //shuffles list of answers to choose from
            function answersShuffle() {
                answersList.sort(function (a, b) { return 0.5 - Math.random() });
            };
            answersShuffle();

            //console.log(answersList);

            $("#answersList").html(
                ' <button type="button" class="btn btn-warning btn-lg m-1" onclick="checkAnswer(this)" value="' + answersList[0] + '">' + answersList[0] + '</button>' +
                ' <button type="button" class="btn btn-warning btn-lg m-1" onclick="checkAnswer(this)" value="' + answersList[1] + '">' + answersList[1] + '</button>' +
                ' <button type="button" class="btn btn-warning btn-lg m-1" onclick="checkAnswer(this)" value="' + answersList[2] + '">' + answersList[2] + '</button>' +
                ' <button type="button" class="btn btn-warning btn-lg m-1" onclick="checkAnswer(this)" value="' + answersList[3] + '">' + answersList[3] + '</button>'
            );

        },
        error(jqXHR, status, errorThrown) {
            console.log("error!");
        }
    });
});

function checkAnswer(element) {
    //console.log(element.value);
    if (element.value == answer0) {
        //score = ++score;
        $("#result").html('<p class="h2">Correct!</p>');
    } else {
        $("#result").html('<p class="h2">Wrong! <br>Correct answer is: <b>' + answer0 + '</b> </p>');
    }

}
