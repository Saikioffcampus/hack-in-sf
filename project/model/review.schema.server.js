module.exports = function (mongoose) {

    //var webSchema = require("../website/website.schema.server.js") (mongoose)

    var reviewSchema = mongoose.Schema({
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}
        content: String,
        dateCreated: {type: Date, default: Date.now}
    });

    return reviewSchema
}