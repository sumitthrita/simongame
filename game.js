var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;
$("body").keypress(function () { 
    
    if(!started){
        $("h1").text("level "+level);
        nextSequence();
        started=true;
    }
    
});
$(".btn").click(function () { 
    var userChosenColour=$(this).attr("id");
    
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    var indexLastAnswer=userClickedPattern.length-1;
    
    checkAnswer(indexLastAnswer);
    
});
function checkAnswer(currentLevel){
    
        if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
            
            if(userClickedPattern.length===gamePattern.length){
                setTimeout(function(){
                    nextSequence();
                },1000);
            }
        } else {
            var wrong="wrong";
            playSound(wrong);
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            },200);
            $("h1").text("Game Over, Press any key to restart.");
            startOver();
        }
    
    
}


function nextSequence(){
    userClickedPattern=[];
    level+=1;
    $("h1").text("level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    playSound(randomChosenColour);
    
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    
}

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();

}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}


