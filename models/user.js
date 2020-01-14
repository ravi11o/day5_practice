var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 5
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /@/

  },
  age: {
    type: Number,
    min: 18
  }
}, { timestamps: true }); 

// var User = mongoose.model('User', userSchema);

// module.exports = User;

module.exports = mongoose.model('User', userSchema);


