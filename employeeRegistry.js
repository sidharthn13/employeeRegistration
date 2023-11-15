const fs = require("fs");
const uuid = require("uuid")
const prompt = require('prompt-sync')();
let readData // to store data after reading JSON file
let loginTime//to keep track of session duration

let eN = ""
let eD = ""
let eDob

console.log(
  "Welcome to employee registration system.\nWhat would you like to do?\n\n"
);
console.log(
  "1. Create new employee \n2. Update employee record \n3. Delete employee \n4. Display employees by department \n5. Display employee by employee id \n6. exit\n "
);

selectOperation()

function selectOperation(){
    const operation = prompt('Enter a number corresponding to the operation >>   ')
    
        try{
        switch(operation){
            case '1':
                setLoginTime()
                createEmployee();
                break;
            case '2':
                setLoginTime()
                updateEmployeeRecord();
                break;
            case '3':
                setLoginTime()
                deleteEmployee();
                break;
            case '4':
                setLoginTime()
                displayByDepartment();
                break;
            case '5':
                setLoginTime()
                displayByID();
                break;
            case '6':
                getSessionDuration()
                console.log('\nGoodbye.\n')
                return
                
            default:
                throw new Error('Invalid input')
                
        }
    }

    catch(error){console.log(`${error.message}, please enter a valid number\n`);
                createErrorMessage(error);
                selectOperation()}
}

function getName(){
    
        let employee = prompt('Enter employee name > ')
        try{
        if(employee == ""){throw new Error('Client error: Invalid name format')}
        
        }
    
    catch(error){createErrorMessage(error);
                console.log(`\n${error.message}..Please enter a valid name\n`);
            getName()}
        if(eN == ""){eN= employee}
        
}
function retName(){getName();return eN}

function getDepartment(){
    
        let dept = prompt('Enter employee department > ')
        try{
        if(dept == ""){throw new Error('Client error: No input')}
       
        }
    
    catch(error){createErrorMessage(error);
                console.log(`\n${error.message}..Please enter a valid department name\n`);
            getDepartment()}
        if(eD ==""){eD = dept}
}
function retDept(){getDepartment();return eD}

function createEmployee(){
    let employeeName = retName()
    eN = ""
    let employeeDob = prompt('Enter employee dob > ')
    let employeeDept = retDept()
    eD =""
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
    try{
    const name = prompt('Enter name of employee whose record has to be deleted > ')
    if(name ===""){throw new Error('Client error, employee name not provided for deletion.')}
    readJsonData()
    for(let i = 0; i < readData.length; i++){
        if(readData[i]['name']===name){
            readData.splice(i,1);
            writeJsonData();
            console.log('\nDelete operation successful\n\n')
            selectOperation()
            return}
    }
    console.log('\nNo such user Exists\n')
    selectOperation();}
    catch(error){
        console.log(`\n${error.message}. Please enter data\n`)
                createErrorMessage(error);
                selectOperation()
    }
}

function displayByID(){
    try{
    const id = prompt('Enter employee ID > ')
    if(id ===""){throw new Error('Client error, employee ID not provided.')}
    readJsonData()
    for(let i = 0;i<readData.length;i++){
        if(readData[i]['id'] === id){
            displayDetails(readData[i])
            selectOperation();
            return
        }
    }
    console.log("\nNo employee with this ID\n")
    selectOperation();}
    catch(error){
        console.log(`\n${error.message}. Please enter data\n`)
                createErrorMessage(error);
                selectOperation()
    }
}

function displayByDepartment(){
    try{
    const department = prompt("Enter department name > ")
    if(department ===""){throw new Error('Client error, department name not given.')}
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
    selectOperation()}
    catch(error){console.log(`\n${error.message}. Please enter data\n`)
                createErrorMessage(error);
                selectOperation()}
}

function updateEmployeeRecord(){
    try{
    const name = prompt('Enter name of employee whose record has to be updated > ')
    if(name ===""){throw new Error('Client error, employee name not provided.')}
    readJsonData()
    for(let i = 0; i < readData.length; i++){
        if(readData[i]['name']===name){
            console.log('Current employee details:')
            displayDetails(readData[i])
            //update 
            update(i)
            console.log('\nSuccessfully Updated\n')
        }
    }
    selectOperation()}
    catch(error){console.log(`\n${error.message}. Please enter data\n`)
    createErrorMessage(error);
    selectOperation()}
}

function update(index){
    const name = prompt('Enter name > ')
    const department = prompt('Enter department > ')
    const dob = prompt('Enter date of birth > ')
    readData[index]['name'] = name
    readData[index]['dept'] = department
    readData[index]['dob'] = dob
    writeJsonData();
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
    console.log(`\nEmployee name: ${employeeObject['name']}\nEmployee ID: ${employeeObject['id']}\nEmployee department: ${employeeObject['dept']}\n`)
}

//function to set login time
function setLoginTime(){
    if(!loginTime){
        const date = new Date()
        loginTime = date.getTime()/1000
    }
}

function getSessionDuration(){
    if(loginTime){
        const date = new Date()
        let currentTime = date.getTime()/1000
        const sessionDuration = Math.floor((currentTime - loginTime)/60)
        console.log(`\nsession lasted ${sessionDuration} minutes.\n`)
    }
}

function createErrorMessage(error){

    const date = new Date
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    hours = (hours < 10)? "0"+hours:hours
    minutes = (minutes < 10)? "0"+minutes:minutes
    seconds = (seconds < 10)? "0"+seconds:seconds
    const timeOfError = `${hours}:${minutes}:${seconds}`
    const errorInLog = `${error.message} || Time: ${timeOfError}`
    log(errorInLog)
}


function log(message){
    fs.appendFileSync(`./errors.txt`,`${message}\n`,"utf-8")
}




