import {Router} from 'express'
import {EmployeeService} from "../services/Employee";
import {VacationService} from "../services/Vacation";


const EmpService = new EmployeeService();
const VacService = new VacationService();

export const employees = Router();

employees.get('', async (req, res) => {
    try {
        res.json(await EmpService.getEmployees());
    } catch (err) {
        res.status(500).json(err);
    }
});


employees.get('/:id', async (req, res) => {

    if (!req.params.id) {
        res.status(400).send('No employee id');
        return;
    }

    try {
        const employee = await EmpService.getEmployeeById(req.params.id);
        if (employee) {
            res.json(employee);
        } else {
            res.status(404).send('No employee found');
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


employees.post('/', async (req, res) => {

    const newEmployeeData = req.body;

    if (!newEmployeeData.firstName && !newEmployeeData.lastName) {
        res.status(400).send('Bad request');
        return;
    }

    try {
        const id = await EmpService.createEmployee(newEmployeeData);
        res.status(201).json(id);
    } catch (err) {
        res.status(500).json(err);
    }
});

employees.delete('/:id', async (req, res) => {

    if (!req.params.id) {
        res.status(400).send('No employee id');
        return;
    }

    try {
        await EmpService.deleteEmployee(req.params.id);
        res.status(204).json();
    } catch (err) {
        res.status(500).json(err);
    }
});

employees.put('/:id', async (req, res) => {

    if (!req.params.id) {
        res.status(404).send('No employee id');
        return;
    }

    const body = req.body;

    try {
        res.json(await EmpService.updateEmployee(req.params.id, body))

    } catch (err) {
        res.status(500).json(err);
    }

});

employees.get('/:id/vacations', async (req, res) => {

    if (!req.params.id) {
        res.status(400).send('No employee id');
        return;
    }

    try {
        const employee = await EmpService.getEmployeeById(req.params.id);

        if (!employee) {
            res.status(404).send('No such employee');
            return;
        }

        const vacationsOfEmployee = await VacService.getVacationsOfEmployee(req.params.id);

        res.json({
            numberOfDaysLeft: employee.vacationDaysLeft,
            vacationsOfEmployee
        });
    } catch (e) {
        res.status(500).json(e)
    }

});

employees.post('/:id/new-vacation-request', async (req, res) => {
    const employeeId = req.params.id;
    const body = req.body;

    if (!employeeId) {
        res.status(404).send('No employee id');
        return;
    }

    if (!body.startDate && !body.numberOfDays) {
        res.status(400).send('Bad request');
        return;
    }


    try {

        const employee = await EmpService.getEmployeeById(employeeId);

        if (!employee) {
            res.status(404).send('No such employee');
            return;
        }

        if (employee.vacationDaysLeft < body.numberOfDays) {
            res.status(400).send('Not enough days');
            return;
        }

        const vacationId = await VacService.createVacation({
            employeeId: employeeId,
            startDate: body.startDate,
            numberOfDays: body.numberOfDays
        });

        await EmpService.updateEmployee(employeeId, {
            vacationDaysLeft: Number(employee.vacationDaysLeft) - Number(body.numberOfDays)
        });

        res.json({vacationId});

    } catch (e) {
        res.status(500).json(e)
    }

});
