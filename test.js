const mongoose = require('mongoose');

const connect = () => {
  return mongoose.connect('mongodb://localhost:27017/introMongo');
};

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  isEmployed: Boolean
})

const UserModel = mongoose.model('users', userSchema);


connect()
  .then(async con => {
    const users = await UserModel.findByIdAndRemove('634842d95b96f238af2cac78')
      .exec()
    console.log('ok');
  })
  .catch(e => console.error(e))


// const schoolSchema = new mongoose.Schema({
//   name: String
// });
//
// const studentSchema = new mongoose.Schema({
//   firstName: String,
//   school: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: 'school'
//   }
// });
//
// const SchoolModel = mongoose.model('school', schoolSchema)
// const StudentModel = mongoose.model('student', studentSchema);
//
// connect()
//   .then(async connection => {
//     const school = await SchoolModel
//       .create({name: 'mlk elementary'});
//
//     const student = await StudentModel
//       .create({firstName: 'Test', school: school._id});
//
//     const studentData = await StudentModel
//       .findById(student.id)
//       .populate('school')
//       .exec();
//
//     console.log(studentData);
//   })
//   .catch(e => console.error(e))
