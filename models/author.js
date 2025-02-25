const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    first_name: { type: String, required: true, max: 100 },
    last_name: { type: String, required: true, max: 100 },
    date_of_birth: { type: Date },
    date_of_death: { type: Date },
}, {
    virtuals: {
        name: {
            get: function() {
                return this.first_name + ', ' + this.last_name;
            }
        },
        lifespan: {
            get: function() {
                return (
                    this.date_of_death?.getYear() - this.date_of_birth?.getYear()
                ).toString();
            }
        },
        url: {
            get: function() {
                return '/catalog/author/' + this._id;
            }
        }
    }
});

module.exports = mongoose.model('Author', AuthorSchema);