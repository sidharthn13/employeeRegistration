const fs = require("fs");
const uuid = require("uuid")
const prompt = require('prompt-sync')();
//fs.writeFileSync('data.json','[]')
let readData // to store data after reading JSON file


console.log(
  "Welcome to employee registration system.\nWhat would you like to do?\n\n"
);
console.log(
  "1. Create new employee \n2. Update employee record \n3. Delete employee \n4. Display employees by department \n5. Display employee by employee id \n6. exit\n "
);

selectOperation()

function selectOperation(){
    const operation = +prompt('\nEnter a number corresponding to the operation >>   ')
    try{
        if(operation>6 || operation <1 ){throw "please enter a valid number"} // log error to .txt file
        
        switch(operation){
            case 1:
                createEmployee();
                break;
            case 3:
                deleteEmployee();
                break;
            case 4:
                displayByDepartment();
                break;
            case 5:
                displayByID();
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
    //check if user already exists        
    for(let i = 0; i< readData.length; i++){
        if(readData[i]['name']===employeeName){
            console.log('\n\nUser has an existing account')
        selectOperation()
        return;
        }
    }
        
    readData.push(newData);
    writeJsonData()
    console.log('\nEmployee data added\n\n')
    selectOperation()
}

function deleteEmployee(){
    const name = prompt('\nEnter name of employee whose record has to be deleted > ')
    readJsonData()
    for(let i = 0; i < readData.length; i++){
        if(readData[i]['name']===name){
            readData.splice(i,1);
            writeJsonData();
            console.log('\nDelete operation successful\n\n')
            selectOperation()
            return}
    }
    console.log('\nNo such user Exists')
    selectOperation();
}

function displayByID(){
    const id = prompt('\nEnter employee ID > ')
    readJsonData()
    for(let i = 0;i<readData.length;i++){
        if(readData[i]['id'] === id){
            displayDetails(readData[i])
            selectOperation();
            return
        }
    }
    console.log("\nNo employee with this ID\n")
    selectOperation();
}

function displayByDepartment(){
    const department = prompt("\nEnter department name > ")
    readJsonData()
    let employeesInDepartment = []
    let employeeCount = 0
    for(let i = 0; i<readData.length;i++){
        if(readData[i]['dept'] === department){
            let employeeName = readData[i]['name']
            let employeeDob = readData[i]['dob']
            let employeeDetails = {name:employeeName,dob:employeeDob}
            employeesInDepartment.push(JSON.stringify(employeeDetails))
            employeeCount += 1
        }
    }
    console.log(`\nList of employees in ${department} : ${employeesInDepartment}\n
    Number of employees in ${department} : ${employeeCount} `)
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

//function to display employee details
function displayDetails(employeeObject){
    console.log(`\n\nEmployee name: ${employeeObject['name']}\nEmployee ID: ${employeeObject['id']}\nEmployee department: ${employeeObject['dept']}\n\n`)
}




