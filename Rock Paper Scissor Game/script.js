let userScore = 0;
let compScore = 0;

let choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
let user_score = document.querySelector("#user-score");
let comp_score = document.querySelector("#comp-score");
let msgStyle = document.querySelector("#msg").style;

const genCompChoice = () =>{
    const options = ["rock", "paper", "scissors"];
    let i = Math.floor(Math.random() * 3);
    return options[i];
}

const drawGame = () =>{
    console.log("Draw Game");
    msg.innerText="It's a Draw";
}

const showWinner = (userWin,compChoice,userChoice) => {
    if(userWin){
        console.log("You Win");
        msg.innerText=`You Win! ${userChoice} beats ${compChoice}`;
        userScore += 1;
        user_score.innerText=userScore;
        msgStyle.backgroundColor = "green";
    }
    else{
        console.log("Youu lose");
        msg.innerText=`You Lose! ${userChoice} beats ${userChoice}`;
        compScore+=1;
        comp_score.innerText = compScore;
        msgStyle.backgroundColor = "red";
    }
}

const playGame = (userChoice) => {
    let compChoice = genCompChoice();

    if(userChoice === compChoice){
        drawGame();
    }
    else{
        let userWin = true;
        if(userChoice === "paper")
        {
            userWin = compChoice === "rock" ? true : false;
        }
        else if(userChoice === "rock")
        {
            userWin = compChoice === "scissors" ? true : false;
        }
        else
        {
            userWin = compChoice === "paper" ? true : false;
        }
        showWinner(userWin,compChoice,userChoice);
    }
}

choices.forEach((choice) =>{
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
         playGame(userChoice);
    })
});

