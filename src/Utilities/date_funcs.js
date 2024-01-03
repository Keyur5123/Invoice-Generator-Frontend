let date = new Date();

export function daysDifference(day1, day2) {

    const date1 = new Date(day1);
    const date2 = new Date(day2);

    const diff = Math.abs(date2 - date1);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    return days;
}

export let curr_date = [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('-');

 