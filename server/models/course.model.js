const mongoose = require('mongoose');


const CourseSchema = new mongoose.Schema(
  {
     name: {
       type: String,
       required: [true, "A Course name is required"],
       minlength: [3, "A Course name must be atleast three characters long"],
       maxlength: [20, "The name of a meal must have a maximum of twenty characters"],
     },
     level: {
      type: Number,
      required: [true, "A level is required"],
      min: [1, "level must be a minimum of 1"],
      max: [5, "level should be no more than 5"],
     },
     field: {
      type: String,
      enum: ['Web developement', 'data analyst', 'ux design'],
      default: "Web developement",
      required: [true, "A field is required"],
    },
     description: {
       type: String,
       required: [true, "A description is required"],
       minlength: [10, "description must be at least 10 characters long"],
     },
     instructor: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User',
       required: true,
     },
     dayOfWeek: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          const currentDate = new Date();
          const selectedDate = new Date(value);
          return selectedDate >= currentDate;
        },
        message: "La date doit être supérieure à la date actuelle",
      },
    },
    status: {
      type: String,
      enum: ['pending', 'resolved'],
      default: "pending",
      required: [true, "status is required"],
    },
    typeOfCourse: {
      type: String,
      enum: ['presential', 'online'],
      default: "presential",
      required: [true, "typeOfCourse is required"],
    },
    linkMeeting: {
      type: String,
      minlength: [3, "A linkMeeting must be at least three characters long"],
      required: function () {
        // La fonction renvoie true si typeOfCourse est 'online', sinon false
        return this.typeOfCourse === 'online';
      },
    },
    documentsLink: {
      type: String,
      minlength: [3, "A documentsLink must be at least three characters long"],
    },
     startTime: {
      type: String,
      required: [true, "startTime is required"],
     },
     endTime: {
      type: String,
      required: [true, "endTime is required"],
     },
     duration: {
      type: Number,
      required: [true, "A  time is required"],
      min: [30, " time must be a minimum of 30 minutes"],
      max: [240, " time should be no more than 240 minutes."],
     },
     students: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      $setOnInsert: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId
      }
    }],
  },
  { timestamps: true }
);


 
const Course = mongoose.model('Course', CourseSchema);
 
module.exports = Course;




















 