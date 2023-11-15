import express, { Request, Response } from "express";
const app = express();
app.use(express.json())
app.use(express.text())


app.get("/", (req: Request, res: Response) => {
  res.send("Hello sifat!");
});

app.post("/", (req:Request, res:Response)=>{
    console.log(req.body)
    res.json({
        message:"Successfully received data"
    })
})

export default app;
