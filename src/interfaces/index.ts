export interface IEmployee {
    id: string,
    firstName: string,
    lastName: string,
    vacationDaysLeft: number
}


export interface IVacation {
    id: string,
    employeeId: string,
    startDate: number,
    endDate: number,
    numberOfDays: number
}
