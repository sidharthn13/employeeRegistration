const fs = require("fs");
const prompt = require('prompt-sync')();

console.log(
  "Welcome to employee registration system.\nWhat would you like to do?\n\n"
);
console.log(
  "1. Create new employee \n2. Update employee record \n3. Delete employee \n4. Display employees by department \n5. Display employee by employee id \n6. exit\n "
);

selectOperation()

function selectOperation(){
    const operation = +prompt('Enter a number corresponding to the operation >>   ')
    try{
        if(operation>6 || operation <1){throw "please enter a valid number"}
    }
    catch(error){console.log(error);
                selectOperation()}
}

