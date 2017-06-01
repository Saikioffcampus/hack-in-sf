module.exports = function (mongoose) {

    var reviewSchema = mongoose.Schema({
        userId: Number,
        phoneNumnber: Schema.Types.Mixed,
        email: String,
        dateCreated: {type: Date, default: Date.now},
//        access_token: String,
//        token_expiration_time: Date
    });

    return UserSchema
}