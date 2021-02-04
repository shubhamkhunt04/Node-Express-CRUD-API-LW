var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BearSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Bear", BearSchema);
