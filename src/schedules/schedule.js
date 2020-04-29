export const week = [{number: 1}, {number: 2}, {number: 3},{number: 4}, {number: 5},{number: 6},{number: 7}];

const getMonthArray = () => { 
    const month = [];
    for (let index = 0; index < 30; index++) {
        month.push({number: index + 1});
    }

    return month;
};

export const month = getMonthArray();