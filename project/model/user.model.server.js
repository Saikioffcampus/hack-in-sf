
module.exports = function (mongoose) {
    var model = {};
    var userSchema = require('./user.schema.server')(mongoose);
    var userModel = mongoose.model("UserModel", UserSchema);

    var api = {
        setModel: setModel,
        createUser: createUser,
        deleteUser: deleteUser,
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createUser(user) {
        return UserModel.create(user);
    }

    function deleteUser(uid) {
        return UserModel.remove({_id: rid});
    }

};