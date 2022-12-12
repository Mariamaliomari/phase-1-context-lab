/* Your Code Here */


let createEmployeeRecord = function(row){
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employeeRowData) {
    return employeeRowData.map(function(row){
        return createEmployeeRecord(row)
    })
}

let createTimeInEvent = function(employee, stampedDate){
    let [date, hour] = stampedDate .split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

let createTimeOutEvent = function(employee, stampedDate){
    let [date, hour] = stampedDate.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

let hoursWorkedOnDate = function(employee, seekDate){
    let eventIn = employee.timeInEvents.find(function(e){
        return e.date === seekDate
    })

    let eventOut = employee.timeOutEvents.find(function(e){
        return e.date === seekDate
    })

    return (eventOut.hour - eventIn.hour) / 100
}

let wagesEarnedOnDate = function(employee, dateSeek){
    let rawWages = hoursWorkedOnDate(employee, dateSeek)
        * employee.payPerHour
    return parseFloat(rawWages.toString())
}

let allWagesFor = function(employee){
    let acceptableDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = acceptableDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
  return srcArray.find(function(rec){
    return rec.firstName === firstName
  })
}

let calculatePayroll = function(arrayEmployeeRecord){
    return arrayEmployeeRecord.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}

// function allWagesFor () {
//     const eligibleDates = this.timeInEvents.map(function (e) {
//         return e.date
//     })

//     const payable = eligibleDates.reduce(function (memo, d) {
//         return memo + wagesEarnedOnDate.call(this, d)
//     }.bind(this), 0) 

//     return payable
// }

