import {Table, Column, Model, PrimaryKey, ForeignKey} from 'sequelize-typescript';
import {Employee} from "./Employee";

// @ts-ignore
@Table({
    timestamps: false
})
export class Vacation extends Model<Vacation> {

    @PrimaryKey
    @Column
    public id!: string;

    @ForeignKey(() => Employee)
    @Column
    public  employeeId!: string;

    @Column
    public startDate!: number;

    @Column
    public endDate!: number;

    @Column
    public numberOfDays!: number;

}
