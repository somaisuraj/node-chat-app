const expect = require('expect');

const {Users} = require('./user');

let users;
beforeEach (() => {
  users = new Users();
  users.users = [{
    id:  '0',
    name: 'Mike',
    room : 'Node Course'
  },{
    id:  '1',
    name: 'hunter',
    room : 'React Course'
  },{
    id:  '2',
    name: 'suraj',
    room : 'Node Course'
  }];
});

describe('Users' ,() => {
  it('should add user with properties', () => {
    let surya = new Users();
    let user = {
      id: 123,
      name: 'surya',
      room: 'The Office Fans'
    };

    let addedUser = surya.addUser(user.id, user.name, user.room)
        expect(surya.users.length).toBe(1);
        expect(surya.users).toEqual([user]);
});

it('should return name for node course', () => {
   let usersList = users.getUserList('Node Course');

   expect(usersList).toEqual(['Mike', 'suraj']);
});
it('should return name for react course', () => {
   let usersList = users.getUserList('React Course');

   expect(usersList).toEqual(['hunter']);
});
it('should remove user by id', () => {
      let userId = users.users[1].id
    let res =   users.removeUser(userId);
    expect(res[0].id).toBe(userId);// this function return array so using index number
    expect(users.users.length).toBe(2);

});
it('should not remove user by id', () => {
      let userId = 99
    let res =   users.removeUser(userId);
    expect(res[0].id).toBeFalsy();
    expect(users.users.length).toBe(3);

});
it('should get user by id', () => {
   let id = users.users[2].id;//above deleted test doenot affect next test
   let res = users.getUser(id);
   expect(res).toBeTruthy();
   expect(res[0].id).toBe(id);//whenever you get res in array then we should specify index otherwise it will return undefined
});
});
