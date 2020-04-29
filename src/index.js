import _ from 'lodash'

import {workers} from './workers';
import {month} from './schedule';

const getWorkerOnDay = dayNumber => {
    const optionalWorkers = workers.filter(x => !(_.includes(x.constraints, dayNumber)) && x.shiftsAMonth > 0);
    const optionalThatPrefer = optionalWorkers.filter(x => !(_.includes(x.preferNot, dayNumber)));

    const worker = optionalThatPrefer > 0 ? getWorkerFromOptions(optionalThatPrefer) : getWorkerFromOptions(optionalWorkers)
    updateWorkerAfterPlaced({dayNumber, worker})

    return worker;
};

const getWorkerFromOptions = options => _.maxBy(options, x => x.shiftsAMonth);

const updateConstraints = ({dayNumber, worker}) => { worker.constraints.push(dayNumber + 1)};
const updatePreferNot = ({dayNumber, worker}) => {
    if(worker.shiftsAMonth < 4)
    {
        for (let index = dayNumber; index < dayNumber + 7; index++) {
            worker.preferNot.push(index);
        };
    }
};

const updateShiftsAMonth = worker => {worker.shiftsAMonth--};

const updateWorkerAfterPlaced = ({dayNumber, worker}) => {
    updateConstraints({dayNumber, worker});
    updatePreferNot({dayNumber, worker});
    updateShiftsAMonth(worker);
};

const shifts = month.map(({number}) => getWorkerOnDay(number));
month.forEach(day => day.worker = shifts[day.number - 1].id);

console.log(month);