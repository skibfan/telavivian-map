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
  origin: ["https://telavivian-map.onrender.com"]
}))

const __dirname = path.resolve()

app.listen(process.env.PORT || 3001, () => {
    console.log(`Server listening on ${process.env.PORT || 3001}`);
  });
  
  app.use('/api', router)


  app.use((req, res, next) => {
    if (req.path.endsWith('.html')) {
      res.header("Content-Type", "text/html");
    }
    next();
  });
  
  // Have Node serve the files for our built React app
  app.use(express.static(path.resolve(__dirname, "./client/dist")));
  app.use(express.static(path.join(__dirname, "/client/dist")));
  
  // All other GET requests not handled before will return our React app
  app.get("*", (_, res) => {
    res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
  });
  
