import { Router } from "express";
import { validationResult, matchedData, checkSchema } from "express-validator";
import { createTaskValidationSchema } from "../utils/validationSchemas.mjs";
const router = Router();
import { mockTasks } from "../utils/mocktasks.mjs";
import { resolveIndexbyTaskid } from "../utils/middlewares.mjs";
router.get("/api/tasks", (request, response) => {
  response.send(mockTasks);
});
router.post(
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

//get task by id
router.get("/api/tasks/:id", resolveIndexbyTaskid, (request, response) => {
  const { findTaskIndex } = request;
  const findTask = mockTasks[findTaskIndex];
  if (!findTask) return response.sendStatus(404);
  return response.send(findTask);
});
router.post(
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

//get task by id
router.get("/api/tasks/:id", resolveIndexbyTaskid, (request, response) => {
  const { findTaskIndex } = request;
  const findTask = mockTasks[findTaskIndex];
  if (!findTask) return response.sendStatus(404);
  return response.send(findTask);
});
router.put("/api/tasks/:id", resolveIndexbyTaskid, (request, response) => {
  const { body, findTaskIndex } = request;

  mockTasks[findTaskIndex] = {
    taskid: mockTasks[findTaskIndex].taskid,
    ...body,
  };
  return response.sendStatus(200);
});
router.patch("/api/tasks/:id", resolveIndexbyTaskid, (request, response) => {
  const { body, findTaskIndex } = request;
  mockTasks[findTaskIndex] = { ...mockTasks[findTaskIndex], ...body };
  return response.sendStatus(200);
});
router.delete("/api/tasks/:id", resolveIndexbyTaskid, (request, response) => {
  const { findTaskIndex } = request;
  mockTasks.splice(findTaskIndex, 1);
  return response.sendStatus(200);
});

export default router;
