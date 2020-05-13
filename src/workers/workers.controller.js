import {workers} from './workers.consts';
import _ from 'lodash';

export const getTwoWorkersOnDay = ({number, isWeekEnd}) => {
    const optionalWorkers = isWeekEnd ? weekendWorkersOptions(workers, number) : basicWorkersOptions(workers, number);
    const optionalThatPrefer = optionalWorkers.filter(x => !(_.includes(x.preferNot, number)));
    const firstWorker = optionalThatPrefer > 0 ? getWorkerFromOptions(optionalThatPrefer) : getWorkerFromOptions(optionalWorkers);

    updateWorkerAfterPlaced({number, worker: firstWorker});
    const secondWorker = firstWorker != null ? getSecondWorker(firstWorker) : {id: 0};
    updateWorkerAfterPlaced({number, worker: secondWorker});

    return {first: firstWorker, second: secondWorker};
};

const weekendWorkersOptions = (workers, number) => basicWorkersOptions(workers, number).filter(x => x.shabats == 0);
const basicWorkersOptions = (workers, number) => workers.filter(x => !(_.includes(x.constraints, number)) && x.shiftsAMonth > 0 && x.isSenior == 1);

const getWorkerFromOptions = options => {
    const firstWorker = _.maxBy(options, x => x.shiftsAMonth);
    console.log( firstWorker != null ? firstWorker : {id: 0});
    return firstWorker != null ? firstWorker : {id: 0};
};
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
    if(worker.id == 0) return;
     updateConstraints({dayNumber, worker});
     updatePreferNot({dayNumber, worker});
     updateShiftsAMonth(worker);
};