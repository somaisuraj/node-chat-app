class Users {
  constructor () {
    this.users = [];
  }
  addUser (id, name , room) {
      var user = {id, name, room};
      this.users.push(user);
      return user;
  }
  removeUser (id) {
     var user = this.getUser(id);
     if (user) {
         this.users = this.users.filter((user) => user.id !== id);
     }
     return user;



  }
  getUser (id) {
return this.users.filter((user) => user.id === id);

  }
  getUserList (room) {
    //return true to keep item or false to remove item from array
    //this filter function return whole user object which it filters
    let users = this.users.filter((user) => user.room === room);
    console.log(users);

    //but map lets return the value we want to use
    //but map will just go one by one and pick each user.name one by one
    let namesArray = users.map((user) => user.name);
    return namesArray;
  }
}

module.exports = {Users};
