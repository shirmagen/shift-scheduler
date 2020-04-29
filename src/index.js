import _ from 'lodash'

import {workers} from './workers';
import {month} from './schedule';

const getWorkerOnDay = dayNumber => {
    const optionalWorkers = workers.filter(x => !(_.includes(x.constraints, dayNumber)) && x.shiftsAMonth > 0);
    const worker = _.head(optionalWorkers);
    worker.constraints.push(dayNumber + 1);
    worker.shiftsAMonth--;

    return worker;
};

const shifts = month.map(({number}) => getWorkerOnDay(number));

month.forEach(day => day.worker = shifts[day.number - 1].id);

console.log(month);