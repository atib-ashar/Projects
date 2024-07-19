// const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/v1/currencies";
//https://www.frankfurter.app/docs/  My API


const BASE_URL = `https://api.frankfurter.app/latest?`;
 

let dropdowns=document.querySelectorAll(".drop-down select");
let btn = document.querySelector("form button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg p");

for(let select of dropdowns){
    for(currCode in countryList)
    {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD")
        {
            newOption.selected = "selected";
        }
        else if(select.name === "to" && currCode === "INR")
        {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change",(evt) =>{
        updateFlag(evt.target);
    });
}

const updateExchange = async () =>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal < 0 || amtVal === "")
    {
        amtVal=1;
        amount.value="1";
    }
        // json = fetchJSON(`/currencies/${fromCurr}/${toCurr}`)
        // rate = json[toCurrency]
    const URL = `${BASE_URL}amount=${amtVal}&amp;from=${fromCurr.value.toLowerCase()}&amp;to=${toCurr.value.toLowerCase()}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.rates[toCurr.value];
    console.log(rate);
    msg.innerText = `${amtVal} ${fromCurr.value} = ${rate} ${toCurr.value}`;
}



const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src=newSrc;
}



window.document.addEventListener("load", ()=>{
    updateExchange();
});

btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchange();
});