/*Create and object for all the necessary fields and buttons for the functionality*/
const calculationItems = {
    billInfo : document.getElementById("bill-amount"),
    percentageButtons : document.getElementsByClassName("calc-btn"),
    customInput : document.getElementById("custom-input"),
    tipResult : document.getElementById("tip-result"),
    totalResult : document.getElementById("total-result"),
    peopleNumber : document.getElementById("people-number"),
    resetButton: document.getElementById("reset-btn"),
}

//A function to check the input in the bill amount field
const checkBillAmount = function () {
    if( calculationItems.billInfo.value < 1 || calculationItems.billInfo.value.length === 0 ) { //Check if user enters something less than 1 or user enters no unput at all
        document.querySelector("#zero-bill").classList.add("display"); //Display the "Can't be zero" error
        return true
    }
    else {
        document.querySelector("#zero-bill").classList.remove("display"); //Remove the can't be zero error
        return false
    }
}

//Add Event listeners to the bill amount field
calculationItems.billInfo.addEventListener("keyup", checkBillAmount); //Call the checkBillAmount function whenever there is a keyup event

//Event Listener to remove the error on mouseout
calculationItems.billInfo.addEventListener("mouseout", () => {
    document.querySelector("#zero-bill").classList.remove("display");
})

//A functi0n to check the custom input field
const checkCustomInput = function () {
    if( calculationItems.customInput.value.length < 1 || calculationItems.customInput.value === "0") {
        return true
    } else {
        return false
    }
}

//A function to check if the number of people field in the bill amount
const checkPeople = function () {
    if( calculationItems.peopleNumber.value < 1 || calculationItems.peopleNumber.value.length === 0 ) {
        document.querySelector("#zero-people").classList.add("display");
        return true
    }
    else {
        document.querySelector("#zero-people").classList.remove("display");
        return false
    }
}

//Add Event Listeners to check number of people
calculationItems.peopleNumber.addEventListener("keyup", checkPeople); //Call the checkPeople function whenever there is a key up event.

//Event Listener to remove the "Can't be zero" error on mouseout
calculationItems.peopleNumber.addEventListener("mouseout", () => {
    document.querySelector("#zero-people").classList.remove("display");
})

//Add click Event Listener to all the buttons and display results
for(let btn of calculationItems.percentageButtons) {
    btn.addEventListener("click", () => {
        if(checkBillAmount() || checkPeople() ) {
            calculationItems.tipResult.innerHTML = "0.00";
            calculationItems.totalResult.innerHTML = "0.00";
        } else {
            let tipAmount = 0.01 * (parseFloat(calculationItems.billInfo.value) * parseFloat(btn.value));
            let totalPerPerson = (tipAmount / parseFloat(calculationItems.peopleNumber.value)) + (calculationItems.billInfo.value / parseFloat(calculationItems.peopleNumber.value));
            calculationItems.tipResult.innerHTML = tipAmount.toFixed(2);
            calculationItems.totalResult.innerHTML = totalPerPerson.toFixed(2);
            calculationItems.customInput.value = "";
        }
    })
}

//Add a keyup Event Listener to the custom input and display results
calculationItems.customInput.addEventListener("keyup", () => {
    if(checkBillAmount() || checkPeople() || checkCustomInput() ) {
        calculationItems.tipResult.innerHTML = "0.00";
        calculationItems.totalResult.innerHTML = "0.00";
    } else {
        let tipAmount = 0.01 * (parseFloat(calculationItems.billInfo.value) * parseFloat(calculationItems.customInput.value));
        let totalPerPerson = (tipAmount / parseFloat(calculationItems.peopleNumber.value)) + (parseInt(calculationItems.billInfo.value) / parseFloat(calculationItems.peopleNumber.value));
        calculationItems.tipResult.innerHTML = tipAmount.toFixed(2);
        calculationItems.totalResult.innerHTML = totalPerPerson.toFixed(2);
    }
})

//A function to remove clear input fields and display no results in the calculator
const resetCalculator = function () {
    calculationItems.billInfo.value = "";
    calculationItems.customInput.value = "";
    calculationItems.peopleNumber.value = "";
    calculationItems.tipResult.innerHTML = "0.00";
    calculationItems.totalResult.innerHTML = "0.00"
    document.querySelector("#zero-bill").classList.remove("display");
    document.querySelector("#zero-people").classList.remove("display");
}

calculationItems.resetButton.onclick = resetCalculator; //Event Handler to call resetCalculator when the reset button is clicked