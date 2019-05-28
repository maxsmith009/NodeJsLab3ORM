import {Router} from 'express'
import {VacationService} from "../services/Vacation";

const VacService = new VacationService();

export const vacations = Router();

vacations.get('/', async (req, res) => {
    try {
        res.json(await VacService.getVacations());
    } catch (err) {
        res.status(500).json(err);
    }
});


vacations.get('/:id', async (req, res) => {

    if (!req.params.id) {
        res.status(400).send('No vacation id');
        return;
    }

    try {
        const vacation = await VacService.getVacationById(req.params.id);
        if (vacation) {
            res.json(vacation);
        } else {
            res.status(404).send('No vacation found');
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


vacations.post('/', async (req, res) => {

    const newVacationData = req.body;

    if (!newVacationData.employeeId && !newVacationData.startDate && !newVacationData.numberOfDays) {
        res.status(400).send('Bad request');
        return;
    }

    try {
        const vacationId = await VacService.createVacation(newVacationData);
        res.status(201).json({vacationId});
    } catch (err) {
        res.status(500).json(err);
    }
});

vacations.delete('/:id', async (req, res) => {

    if (!req.params.id) {
        res.status(404).send('No vacation id');
        return;
    }

    try {
        await VacService.deleteVacation(req.params.id);
        res.status(204).json();
    } catch (err) {
        res.status(500).json(err);
    }
});

vacations.put('/:id', async (req, res) => {

    if (!req.params.id) {
        res.status(404).send('No vacation id');
        return;
    }

    const body = req.body;

    try {
        res.json(await VacService.updateVacation(req.params.id, body));
    } catch (err) {
        res.status(500).json(err);
    }

});

vacations.get('/vacations-on-date', async (req, res) => {
    const searchDate = req.query.date;

    if (!searchDate) {
        res.status(404).send('No date provided');
        return;
    }

    try {
        res.json(await VacService.getVacationsOnDate(searchDate));
    } catch (e) {
        res.status(500).json(e)
    }

});

