module.exports = function() {

    var connectionString = '';
    var connectionStringLocal = 'mongodb://localhost/ak';

    var mongoose = require('mongoose');
//    mongoose.connect(connectionString);
     mongoose.connect(connectionStringLocal);

//    var ReviewModel = require("./review/review.model.server")(mongoose);

    var model = {
//        reviewModel: ReviewModel
    }

//    ReviewModel.setModel(model);
    return model;

};
