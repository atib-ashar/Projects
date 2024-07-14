let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msg = document.querySelector("p")
let msgContainer = document.querySelector(".msg-container");
let count = 0;
let  x = false;
let turnO = true;

const winPattern = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]





const draw = () =>{
    if(count === 8){
        msg.innerText = "It's a Draw....";
        disableButton();
        msgContainer.classList.remove("hide");
    }
};




boxes.forEach( (box)=>{
    box.addEventListener("click",()=>{
        if(turnO)
        {
            box.innerText="O";
            turnO=false;
        }
        else{
            box.innerText="X";
            turnO=true;
        }
        box.disabled = true;
        count++;
       let isWinner = checkWinner();

       if(count !=8 && !isWinner)
       draw();
    })
})




const checkWinner = () => {
    for(let pattern of winPattern){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(pos1 === pos2 && pos2 === pos3){
                x=true;
                winMsg(pos1);
            }
         }
    }
};


const disableButton = () =>
{
    for(let box of boxes){
        box.disabled=true;
    }
};


const enableButton = () =>
{
    for(let box of boxes){
        box.disabled=false;
        box.innerText = "";
    }
};


const winMsg = (winner) => {
    msg.innerText =  `Congratulations, WINNER is ${winner}`;
    disableButton();
    msgContainer.classList.remove("hide");
};


const resetGame = () => {
    turnO = true;
    count = 0;
    enableButton();
    msgContainer.classList.add("hide");
}


newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);