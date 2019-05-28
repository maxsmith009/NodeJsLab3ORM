import {Table, Column, Model,  PrimaryKey, HasMany} from 'sequelize-typescript';
import {Vacation} from "./Vacation";

// @ts-ignore
@Table({
    timestamps: false,
})
export class Employee extends Model<Employee> {

    @PrimaryKey
    @Column
    public id!: string;

    @Column
    public  firstName!: string;

    @Column
    public lastName!: string;

    @Column
    public vacationDaysLeft!: number;

      @HasMany(() => Vacation)
      vacations: Vacation[] | undefined;
}
