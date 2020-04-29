import _ from 'lodash'

import {workers} from './workers';
import {month} from './schedule';

const getTwoWorkersOnDay = dayNumber => {
    const optionalWorkers = workers.filter(x => !(_.includes(x.constraints, dayNumber)) && x.shiftsAMonth > 0 && x.isSenior == 1);
    const optionalThatPrefer = optionalWorkers.filter(x => !(_.includes(x.preferNot, dayNumber)));
    const firstWorker = optionalThatPrefer > 0 ? getWorkerFromOptions(optionalThatPrefer) : getWorkerFromOptions(optionalWorkers)
    if(firstWorker == null)
    {
        return {first: {id: 0}, second: {id:0}};
    }

    updateWorkerAfterPlaced({dayNumber, worker: firstWorker});
    const secondWorker = getSecondWorker(firstWorker);
    updateWorkerAfterPlaced({dayNumber, worker: secondWorker});

    return {first: firstWorker, second: secondWorker};
};

const getWorkerFromOptions = options => _.maxBy(options, x => x.shiftsAMonth);
const getSecondWorker = ({id, shiftsAMonth, gender}) => {
    let secondWorkerOptions = [];
    while(secondWorkerOptions.length == 0 && shiftsAMonth > 0)
    {
        secondWorkerOptions = workers.filter(x => x.id != id && x.shiftsAMonth == shiftsAMonth && x.gender == gender);
        shiftsAMonth--;
    }

    if(shiftsAMonth == 0)
    {
        return {id :0};
    }

    const secondWorkerJunior =  secondWorkerOptions.find(x => x.isSenior == 0);
    const secondWorker = secondWorkerJunior != null ? secondWorkerJunior : _.head(secondWorkerOptions);
    
    return secondWorker;
}

const updateConstraints = ({dayNumber, worker}) => { 
    worker.constraints.push(dayNumber + 1)
};
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
    if(worker.id != 0)
     updateConstraints({dayNumber, worker});
     updatePreferNot({dayNumber, worker});
     updateShiftsAMonth(worker);
};

const shifts = month.map(({number}) => getTwoWorkersOnDay(number));
month.forEach(day => {
    day.firstWorker = shifts[day.number - 1].first.id;
    day.secondWorker = shifts[day.number - 1].second.id;
});

console.log(month);