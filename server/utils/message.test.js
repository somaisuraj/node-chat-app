const expect = require('expect');
let {generateMessage, generateLocationMessage} = require('./message');

describe('generate Message', () => {
 it('should generate corret message object', () => {
    let from = 'hunter';
    let text = 'it will generate message'
    let resObject = generateMessage(from, text);
    expect(resObject.from).toBe(from);
    expect(resObject.text).toBe(text);
    expect(typeof resObject.createdAt).toBe('number');
 });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    let from = 'hunter';
    let longitude= 1;
    let latitude = 1;
    let url = 'https://www.google.com/maps?q=1,1';
    let locationObj = generateLocationMessage(from, latitude, longitude);
    expect(typeof locationObj.createdAt).toBe('number');
    console.log(locationObj);
    expect(locationObj).toMatchObject({//while matching you should match with current variable
      from,
      url
    });
  });
});
