import {IVacation} from "../interfaces";
import {Vacation} from "../models/Vacation";
import {Op} from "sequelize";

const uniqid = require('uniqid');


export interface IVacationService {
    getVacations(): Promise<IVacation[]>;

    getVacationById(id: string): Promise<IVacation | null>;

    createVacation({employeeId, startDate, numberOfDays, endDate}: { employeeId: string, startDate: number, numberOfDays: number, endDate: number }): Promise<string>;

    deleteVacation(id: string): Promise<number>;

    updateVacation(id: string, {employeeId, startDate, numberOfDays, endDate}: { employeeId: string, startDate: number, numberOfDays: number, endDate: number }): Promise<IVacation>;

    getVacationsOfEmployee(employeeId: string): Promise<IVacation[]>;

    getVacationsOnDate(date: number): Promise<IVacation[]>;
}

export class VacationService implements IVacationService {

    constructor() {
    }

    public async getVacations() {
        return await Vacation.findAll();
    };

    public async getVacationById(id: string) {
        return Vacation.findByPk(id);
    };

    public async createVacation({employeeId, startDate, numberOfDays}: { employeeId: string, startDate: number, numberOfDays: number}) {
        const id = uniqid();
        const body = {
            id,
            employeeId,
            startDate,
            numberOfDays,
            endDate: startDate + (numberOfDays * 24 * 60 * 60 * 1000)
        };

        await Vacation.create(body);

        return id;
    };

    public async deleteVacation(id: string) {
        return Vacation.destroy({
            where: {
                id
            }
        })
    };

    public async updateVacation(id: string, {employeeId, startDate, numberOfDays, endDate}: { employeeId?: string, startDate?: number, numberOfDays?: number, endDate?: number }) {

        let vacation = await this.getVacationById(id);
        if (!vacation) {
            throw new Error('No such Vacation');
        }

        return vacation.update({
            employeeId: employeeId || vacation.employeeId,
            startDate: startDate || vacation.startDate,
            numberOfDays: numberOfDays || vacation.numberOfDays,
            endDate: endDate || vacation.endDate
        });
    };

    public async getVacationsOfEmployee(employeeId: string) {
        return await Vacation.findAll({
            where:{
                employeeId
            }
        });
    };

    public async getVacationsOnDate(date: number) {
        return await Vacation.findAll({
            where:{
                startDate:{
                    [Op.gte]: date
                },
                endDate:{
                    [Op.lte]: date
                },
            }
        });
    };
}







