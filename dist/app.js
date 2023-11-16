"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import cors from 'cors'
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.text());
const userRouter = express_1.default.Router();
app.use('/api/v1/user', userRouter);
userRouter.get('/create-user', (req, res) => {
    const user = req.body;
    // console.log(user);
    res.json({
        success: true,
        message: 'User is created Successfully',
        data: user,
    });
});
const logger = (req, res, next) => {
    //console.log(req.url, req.method, req.hostname);
    next();
};
app.get('/', logger, (req, res) => {
    res.send('Hello sifat!');
});
app.post('/', logger, (req, res) => {
    console.log(req.body);
    res.json({
        message: 'Successfully received data',
    });
});
app.all('*', (req, res) => {
    res.status(400).json({
        success: false,
        message: 'Route is not found',
    });
});
exports.default = app;
