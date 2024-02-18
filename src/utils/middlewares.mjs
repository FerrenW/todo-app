import { mockTasks } from "./mocktasks.mjs";

export const resolveIndexbyTaskid = (request, response, next) => {
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
