const sessionIdToUserMap = new Map();

const setId = (id, user) => {
    sessionIdToUserMap.set(id,user)
}

const getUser = (id) => {
    return sessionIdToUserMap.get(id)
}

module.exports = {setId,getUser}