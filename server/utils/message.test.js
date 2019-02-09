const expect = require('expect');
let {generateMessage} = require('./message');

describe('generate Message', () => {
 it('should generate corrext message object', () => {
    let from = 'hunter';
    let text = 'it will generate message'
    let resObject = generateMessage(from, text);
    expect(resObject.from).toBe(from);
    expect(resObject.text).toBe(text);
    expect(typeof resObject.createdAt).toBe('number');
 });
});
