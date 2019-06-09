import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  instructions: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: Number,
    default: 0
  },
  username: {
    type: String
  }
});

RecipeSchema.index({
  '$**': 'text'
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

// PostSchema.statics = {
//   searchPartial: function(q, callback) {
//       return this.find({
//           $or: [
//               { "title": new RegExp(q, "gi") },
//               { "body": new RegExp(q, "gi") },
//           ]
//       }, callback);
//   },

//   searchFull: function (q, callback) {
//       return this.find({
//           $text: { $search: q, $caseSensitive: false }
//       }, callback)
//   },

//   search: function(q, callback) {
//       this.searchFull(q, (err, data) => {
//           if (err) return callback(err, data);
//           if (!err && data.length) return callback(err, data);
//           if (!err && data.length === 0) return this.searchPartial(q, callback);
//       });
//   },
// }

export default Recipe;
