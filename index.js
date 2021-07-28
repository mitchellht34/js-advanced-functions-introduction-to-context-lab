// Your code here
function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(createEmployeeRecord);
}

function createTimeInEvent(employee, timeStamp) {
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(timeStamp.slice(11)),
        date: timeStamp.slice(0, 10)
    });
    return employee;
}

function createTimeOutEvent(employee, timeStamp) {
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(timeStamp.slice(11)),
        date: timeStamp.slice(0, 10)
    });
    return employee;
}

function hoursWorkedOnDate(employee, searchDate) {
    const clockOut = employee.timeOutEvents.find((clockOut) => clockOut.date === searchDate);
    const clockIn = employee.timeInEvents.find((clockIn) => clockIn.date === searchDate);
    return (clockOut.hour - clockIn.hour) / 100;

}

function wagesEarnedOnDate(employee, searchDate) {
    return hoursWorkedOnDate(employee, searchDate) * employee.payPerHour;
}

function allWagesFor(employee) {
    /* let dates = [];
    let wages = 0;
    employee.timeInEvents.forEach((element) => dates.push(element.date));
    dates.forEach((date) => wages += wagesEarnedOnDate(employee, date));
    return wages;
 */
    const dates = employee.timeInEvents.map((element) => element.date);
    return dates.reduce(((accumulator, date) => accumulator + wagesEarnedOnDate(employee, date)), 0);
 }

function findEmployeeByFirstName(srcArray, employee) {
    return srcArray.find(record => record.firstName === employee);
}

function calculatePayroll(employees){
    return employees.reduce(((accumulator, employee) => accumulator + allWagesFor(employee)), 0)
}