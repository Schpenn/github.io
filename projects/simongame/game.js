var userClickedPattern = [];
var gamePattern = [];
var buttonClors =["red", "blue", "green", "yellow"];
var level = 0
var difficulty = ""
var playing = false;

$("button").on("click", function(){
    difficulty = $("Select").val();
    nextSequence();  
})

function playSound(name){
    var sound = new Audio(src="sounds/" + name + ".mp3");
    sound.play()
}

function animatePress(currentColor){
    var button = "." + currentColor;
    $(button).addClass("pressed");
    setTimeout(function(){
        $(button).removeClass("pressed");
    },200) 
}

$(".btn").on("click", function(event){
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    //console.log("User " + userClickedPattern);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
    playing = true;
    $("button").prop("disabled", true);
    $("select").prop("disabled", true);
    var randomNumber =  (Math.floor(Math.random() *4));
    var randomChosenColor = buttonClors[randomNumber];
    gamePattern.push(randomChosenColor);
    //console.log("Game " + gamePattern);
    level ++;
    $("h1").text("Level " + level)
    userClickedPattern = [];
    if(difficulty==="Easy"){
        showEasyHints();
    }else if(difficulty === "Medium"){
        showMediumHints();
    }else{
        $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
        playSound(randomChosenColor);
    }
        
}

function showEasyHints(){
    $(".hints").empty();
    gamePattern.forEach(element => {
        $("<div type='button' class='btn-small " + element + "'></div>").appendTo(".hints");
    });
}

function showMediumHints(){
    gamePattern.forEach((color, i) => {
        setTimeout(() => {
            playSound(color);
            animatePress(color);
        }, i * 1000); 
    });
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        //console.log("sucess "+ currentLevel);
        playSound(userClickedPattern[currentLevel]);
        if(currentLevel === (gamePattern.length - 1)){
            setTimeout(function(){
                $("body").addClass("success");
                $("h1").text("Well done!");
            }, 500);
            setTimeout(function(){
                $("body").removeClass("success");
                nextSequence();
            },1000); 
        }
    }else{
        playing = false;
        $("button").prop("disabled", false);
        $("select").prop("disabled", false);
        //console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Click Start to Restart");
        $(".hints").empty();
        gamePattern = [];
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
    }
}

