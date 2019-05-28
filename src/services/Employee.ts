import {IEmployee} from "../interfaces";
import {Employee} from "../models/Employee";

const uniqid = require('uniqid');


interface IEmployeeService {
    getEmployees(): Promise<IEmployee[]>;

    getEmployeeById(id: string): Promise<IEmployee | null>

    createEmployee({firstName, lastName}: { firstName: string, lastName: string }): Promise<string>

    deleteEmployee(id: string): Promise<number>

    updateEmployee(id: string, {firstName, lastName, vacationDaysLeft}: { firstName?: string, lastName?: string, vacationDaysLeft?: number }): Promise<IEmployee>
}


export class EmployeeService implements IEmployeeService {

    constructor() {
    }

    public async getEmployees() {
        return await Employee.findAll();
    };

    public async getEmployeeById(id: string) {
        return await Employee.findByPk(id);
    };

    public async createEmployee({firstName, lastName}: { firstName: string, lastName: string }) {
        const id = uniqid();
        const body = {
            id,
            firstName,
            lastName,
            vacationDaysLeft: 27
        };

        await Employee.create(body);
        return id;

    };

    public async deleteEmployee(id: string) {
        return Employee.destroy({
            where: {
                id
            }
        });
    };

    public async updateEmployee(id: string, {firstName, lastName, vacationDaysLeft}: { firstName?: string, lastName?: string, vacationDaysLeft?: number }) {
        let employee = await this.getEmployeeById(id);
        if (!employee) {
            throw new Error('No such Employee');
        }

        return employee.update({
            firstName: firstName || employee.firstName,
            lastName: lastName || employee.lastName,
            vacationDaysLeft: vacationDaysLeft || employee.vacationDaysLeft,
        })
    };
}

