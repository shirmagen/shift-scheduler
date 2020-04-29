import _ from 'lodash'

import {workers} from './workers';
import {week} from './schedule';

const getWorkerOnDay = dayNumber => {
    const optionalWorkers = workers.filter(x => !(_.includes(x.constraints, dayNumber)));
    const worker = _.head(optionalWorkers);
    worker.constraints.push(dayNumber + 1);

    return worker;

};

const shifts = week.map(({number}) => getWorkerOnDay(number));

week.forEach(day => day.worker = shifts[day.number - 1].id);

// console.log(shifts);
console.log(week);