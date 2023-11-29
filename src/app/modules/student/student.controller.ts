import { StudentService } from './student.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

//Get All Student
const getAllStudent = catchAsync(async (req, res) => {
  const result = await StudentService.getAllStudentFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is retrieved successfully',
    data: result,
  });
});

//Get One Student By ID
const getOneStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentService.getOneStudentFromDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is retrieved successfully',
    data: result,
  });
});

//Delete a Student By ID
const deleteOneStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentService.DeleteStudentFromDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is deleted successfully',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudent,
  getOneStudent,
  deleteOneStudent,
};
