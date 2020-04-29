import {month} from '../schedules/schedule';
import {getTwoWorkersOnDay} from '../workers/workers.controller';

export const placeShifts = () => {
const shifts = month.map(({number}) => getTwoWorkersOnDay(number));
month.forEach(day => {
    day.firstWorker = shifts[day.number - 1].first.id;
    day.secondWorker = shifts[day.number - 1].second.id;
});
};