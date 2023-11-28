import { Student } from '../student.model';
import { TStudent } from './student.interface';

const createStudentIntoDB = async (studentData: TStudent) => {
  //const result = await StudentModel.create(student);//build in static method
  const student = new Student(studentData);
  if (await student.isUserExits(studentData.id)) {
    throw new Error('Student already exist');
  }

  const result = await student.save();
  return result;
};
const getAllStudentFromDB = async () => {
  const result = await Student.find();
  return result;
};
const getOneStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};
const DeleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { idDeleted: true });
  return result;
};
export const StudentService = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getOneStudentFromDB,
  DeleteStudentFromDB,
};
