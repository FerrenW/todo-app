import express from "express";
import { parse } from "path";
const app = express();
const port = 3000;

const mockTasks = [
    {
        'taskid':0,
        "userid": 0,
          "title":"This is a title1",
          "content":"this is the content1"}
       ,
       {"taskid":1,
        "userid": 1,
          "title":"This is a title2",
          "content":"this is the content2"
       
    }
 ]

app.get("/", (request, response) => {
  response.status(201).send({msg: "Hello!"})
});

app.get('/api/tasks', (request, response) =>{
    response.send(mockTasks)
});
app.get('/api/tasks/:id', ( request, response) =>{
    console.log(request.params)
    const parsedId= parseInt(request.params.id)
    if (isNaN(parsedId))return response.status(400).send({msg:"Bad Request. Invalid ID"})
    const findTask = mockTasks.find((task) => task.taskid === parsedId);
    if(!findTask) return response.sendStatus(404)
    return response.send(findTask)

})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`link: http:/\/localhost:${port}`)
});
