import express from 'express'
import cors from 'cors'
import path from 'path'
import router from './routes/routes.ts'
import cookieParser from "cookie-parser";


const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  credentials: true,
  origin:"http://localhost:5173"
}))

const __dirname = path.resolve()

app.listen(process.env.PORT || 3001, () => {
    console.log(`Server listening on ${process.env.PORT || 3001}`);
  });
  
  // app.get("/api/:name", (req, res) => {
  //   res.json({ message: `Hello ${req.params.name}, from server!` });
  // });
  
  app.use('/api', router)
  // Have Node serve the files for our built React app
  app.use(express.static(path.resolve(__dirname, "./client/build")));
  app.use(express.static(path.join(__dirname, "/client/build")));
  
  // All other GET requests not handled before will return our React app
  app.get("*", (_, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
  
