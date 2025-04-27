
const uuid4 = require('uuid4');


exports.generateUUID4 = () => {
    return uuid4();
}

exports.validateUUID4 = (uuid) => {
    return uuid4.valid(uuid);
}