import _ from 'lodash'
import { month } from './schedules/schedule';
import { placeShifts } from './shifts/shifts.contoller';

placeShifts();
console.log(month);