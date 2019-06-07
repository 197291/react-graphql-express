import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  favorites: {
    type: [Schema.Types.ObjectId],
    ref: 'Recipe'
  },
});

UserSchema.pre('save', function(next) {

  if(!this.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10)
    .then(salt => {
      return bcrypt.hash(this.password, salt);
    })
    .then(hash => {
      this.password = hash;
      next();
    })
    .catch(err => next(err))
})

export default mongoose.model('User', UserSchema);
