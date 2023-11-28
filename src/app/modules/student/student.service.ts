import { Student } from './student.model';
// import { TStudent } from './student.interface';

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
  getAllStudentFromDB,
  getOneStudentFromDB,
  DeleteStudentFromDB,
};
