const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookInstanceSchema = new Schema({
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  // 出版项
  imprint: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["Available", "Maintenance", "Loaned", "Reserved"],
    default: "Maintenance",
  },
  due_back: { type: Date, default: Date.now },
}, {
  virtuals: {
    url: {
      get: function () {
        return "/catalog/bookinstance/" + this._id;
      }
    }
  }
});

module.exports = mongoose.model("BookInstance", BookInstanceSchema);
