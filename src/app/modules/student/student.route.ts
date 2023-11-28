import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

router.post('/create-student', StudentControllers.createStudent);

router.get('/:studentId', StudentControllers.getOneStudent);
router.delete('/:studentId', StudentControllers.deleteOneStudent);
router.get('/', StudentControllers.getAllStudent);
export const StudentRoute = router;
