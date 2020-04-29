import _ from 'lodash'
import {workers} from './workers';

const week = [{name: 1}, {name: 2}, {name: 3},{name: 4}, {name: 5},{name: 6},{name: 7}];
const getWorkerOnDay = dayName => workers.filter(x => !(_.includes(x.constraints, dayName)));
const shifts = week.map(({name}) => _.head(getWorkerOnDay(name)));

console.log(shifts[4]);