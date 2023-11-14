const fs = require("fs");
const uuid = require("uuid")
const prompt = require('prompt-sync')();
fs.writeFileSync('data.json','[]')
let readData // to store data after reading JSON file


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
        if(operation>6 || operation <1 ){throw "please enter a valid number"} // log error to .txt file
        
        switch(operation){
            case 1:
                createEmployee();
                break;
        }

    }
    catch(error){console.log(error);
                selectOperation()}
}

function createEmployee(){
    const employeeName = prompt('Enter employee name > ')
    const employeeDob = prompt('Enter employee date of birth > ')
    const employeeDept = prompt('Enter employee department > ')
    const employeeID = uuid.v4() //generates random unique ID for employee
    const newData = {name:employeeName,dob:employeeDob,dept:employeeDept,id:employeeID}

    readJsonData()
    readData.push(newData);
    writeJsonData()
    console.log('Employee data added\n\n')
    selectOperation()

}


//function to read from JSON file
function readJsonData(){
readData = fs.readFileSync('data.json')
readData = JSON.parse(readData)
}
//function to write to Json file
function writeJsonData(){
    const writeData = JSON.stringify(readData)
    fs.writeFileSync('data.json',writeData) 
}





