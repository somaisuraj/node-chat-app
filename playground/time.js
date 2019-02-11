const moment = require('moment');

let createdAt = 1234;
let date = moment(createdAt);

let someTimestamp = moment().valueOf();
console.log(someTimestamp);


console.log(date.format(' h:mm a '));
