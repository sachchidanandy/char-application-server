/**
 * Users file use to manage users
 *
 * @file users.js
 * @author SachchidanandY
*/

const users = [];

const userModule = {};

userModule.addUser = ({ id, name, room }) => {
    // Sanatize inputs
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    // Check if user name already used in that room
    const userAlreadyExist = users.filter( user => (user.name == name && user.room == room) )
    if (userAlreadyExist.length) {
        return { error: 'User name already in use.' }
    }

    // Add new user to user list
    const newUser = { id, name, room };
    users.push(newUser);

    // Return new user
    return { user: newUser };
};

// Function to get user by socket id
userModule.getUser = id => {
    const fetchedUser = users.filter(user => (user.id == id));
    return fetchedUser.length > 0 ? { user: fetchedUser[0] } : { error: `Invalid user`};
};

module.exports = userModule;
