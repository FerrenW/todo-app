import express from "express";
import {
  query,
  validationResult,
  body,
  matchedData,
  checkSchema,
} from "express-validator";
import { createTaskValidationSchema } from "./utils/validationSchemas.mjs";
import { parse, resolve } from "path";

const app = express();
const port = 3000;

app.use(express.json());

const resolveIndexbyTaskid = (request, response, next) => {
  const {
    params: { id },
  } = request;

  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return response.sendStatus(400);
  const findTaskIndex = mockTasks.findIndex((task) => task.taskid === parsedId);
  if (findTaskIndex === -1) return response.sendStatus(404);
  request.findTaskIndex = findTaskIndex;
  next();
};

const mockTasks = [
  {
    taskid: 0,
    title: "This is a title1",
    content: "this is the content1",
    status: false,
  },
  {
    taskid: 1,
    title: "This is a title2",
    content: "this is the content2",
    status: false,
  },
  {
    taskid: 2,
    title: "This is a title3",
    content: "this is the content3",
    status: false,
  },
];
//get
app.get("/", (request, response) => {
  response.status(201).send({ msg: "Hello!" });
});
//get
app.get("/api/tasks", query(), (request, response) => {
  response.send(mockTasks);
});
//post
app.post(
  "/api/tasks",
  checkSchema(createTaskValidationSchema),
  (request, response) => {
    const result = validationResult(request);
    if (!result.isEmpty())
      return response.status(400).send({ errors: result.array() });
    const data = matchedData(request);
    const newTask = {
      taskid: mockTasks[mockTasks.length - 1].taskid + 1,
      ...data,
    };
    mockTasks.push(newTask);
    return response.status(201).send(newTask);
  }
);

app.get("/api/tasks/:id", resolveIndexbyTaskid, (request, response) => {
  const { findTaskIndex } = request;
  const findTask = mockTasks[findTaskIndex];
  if (!findTask) return response.sendStatus(404);
  return response.send(findTask);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`link: http:/\/localhost:${port}`);
});

app.put("/api/tasks/:id", resolveIndexbyTaskid, (request, response) => {
  const { body, findTaskIndex } = request;

  mockTasks[findTaskIndex] = {
    taskid: mockTasks[findTaskIndex].taskid,
    ...body,
  };
  return response.sendStatus(200);
});
app.patch("/api/tasks/:id", resolveIndexbyTaskid, (request, response) => {
  const { body, findTaskIndex } = request;
  mockTasks[findTaskIndex] = { ...mockTasks[findTaskIndex], ...body };
  return response.sendStatus(200);
});
app.delete("/api/tasks/:id", resolveIndexbyTaskid, (request, response) => {
  const { findTaskIndex } = request;
  mockTasks.splice(findTaskIndex, 1);
  return response.sendStatus(200);
});
