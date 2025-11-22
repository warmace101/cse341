const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot be longer than 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot be longer than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
  },
  favoriteColor: {
    type: String,
    required: [true, 'Favorite color is required'],
    trim: true,
    maxlength: [30, 'Favorite color cannot be longer than 30 characters']
  },
  birthday: {
    type: Date,
    required: [true, 'Birthday is required'],
    validate: {
      validator: function(value) {
        return value <= new Date();
      },
      message: 'Birthday cannot be in the future'
    }
  }
}, {
  timestamps: true // This adds createdAt and updatedAt fields
});

// Add index for better query performance
contactSchema.index({ lastName: 1, firstName: 1 });

// Virtual for full name
contactSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Ensure virtual fields are serialized
contactSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret.__v;
    return ret;
  }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;