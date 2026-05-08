const users = [];
function createUser(username, password, role = "user") {
    const user = {
        id: users.length + 1,
        username,
        password,
        role,
        wallet: 0,
        history: []
    };

    users.push(user);
    return user;
}

function findUser(username) {
    return users.find(u => u.username === username);
}

function getUserById(id) {
    return users.find(u => u.id === id);
}

// ✅ ADD THIS (IMPORTANT)
function getUsers() {
    return users;
}

module.exports = {
    users,
    createUser,
    findUser,
    getUserById,
    getUsers
};