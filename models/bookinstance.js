const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

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
    },
    due_back_formatted: {
      get: function () {
        return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
      }
    },
    due_back_yyyy_mm_dd: {
      get: function () {
        return DateTime.fromJSDate(this.due_back).toISODate(); // format 'YYYY-MM-DD'
      }
    }
  }
});

module.exports = mongoose.model("BookInstance", BookInstanceSchema);
