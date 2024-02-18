import express from "express";
import tasksRouter from "./routes/tasks.mjs";
import { mockTasks } from "./utils/mocktasks.mjs";

const app = express();
const port = 3000;

app.use(express.json());
app.use(tasksRouter);
//Get the index of a task by using the id.

//Temporary tasks.

//get
app.get("/", (request, response) => {
  response.status(201).send({ msg: "Hello!" });
});
//post

app.listen(port, () => {
  console.log(mockTasks);
  console.log(`Example app listening on port ${port}`);
  console.log(`link: http:/\/localhost:${port}`);
});
