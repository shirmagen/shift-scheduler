import {month} from '../schedules/schedule';
import {getTwoWorkersOnDay} from '../workers/workers.controller';

export const placeShifts = () => month.map(x => getTwoWorkersOnDay(x));