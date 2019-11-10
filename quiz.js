var score = 0;
        var answer0;
        var answer1;
        var answer2;
        var answer3;
        var difficultySelector = "easy";


        $('input:radio[name="quizDifficulty"]:checked').val();



        /*$("#score").html('<p>Correct answers: ' + score + '</p>');*/

        $("#quizButton").click(function () {
            $("#result").html('<p></p>');

            //sets difficulty level
            difficultySelector = $('input:radio[name="quizDifficulty"]:checked').val();

            $.ajax({
                url: "https://opentdb.com/api.php?amount=1&type=multiple&difficulty=" + difficultySelector + "",
                type: 'get',
                success(response) {
                    console.log(response.results);
                    $("#quizCategory").html('Category: ' + response.results[0].category + ' /');
                    $("#quizDifficulty").html('Difficulty: ' + response.results[0].difficulty);
                    //$("#quizType").html('type: ' + response.results[0].type);
                    $("#quizQuestion").html('<h1>' + response.results[0].question + '</h1>');
                    //$("#quizCorrect_answer").html(response.results[0].correct_answer);
                    console.log('correct answer:' + response.results[0].correct_answer);
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

                    console.log(answersList);

                    $("#answersList").html(
                        ' <button type="button" class="btn btn-warning" onclick="checkAnswer(this)" value="' + answersList[0] + '">' + answersList[0] + '</button>' +
                        ' <button type="button" class="btn btn-warning" onclick="checkAnswer(this)" value="' + answersList[1] + '">' + answersList[1] + '</button>' +
                        ' <button type="button" class="btn btn-warning" onclick="checkAnswer(this)" value="' + answersList[2] + '">' + answersList[2] + '</button>' +
                        ' <button type="button" class="btn btn-warning" onclick="checkAnswer(this)" value="' + answersList[3] + '">' + answersList[3] + '</button>'
                    );

                },
                error(jqXHR, status, errorThrown) {
                    console.log("error!");
                }
            });
        });



        function checkAnswer(element) {
            console.log(element.value);
            if (element.value == answer0) {
                score = ++score;
                $("#result").html('<p>Correct!</p>');
                $("#score").html('<p> Correct answers: <b>' + score + '</b></p>');

            } else {
                $("#result").html('<p>Wrong! Correct answer is: <b>' + answer0 + '</b> </p>');

            }

        }

