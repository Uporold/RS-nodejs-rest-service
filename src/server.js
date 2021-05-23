import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import YAML from 'yamljs';
import * as swaggerUI from 'swagger-ui-express';
import { config } from './common/config.js';
import { UsersController } from './resources/users/users.controller.js';
import { BoardsController } from './resources/boards/boards.controller.js';
import { TasksController } from './resources/tasks/tasks.controller.js';
import { handleError } from './middlewares/error.js';

class Server {
  constructor() {
    this.app = express();
    this.swaggerDocument = YAML.load(
      path.join(dirname(fileURLToPath(import.meta.url)), '../doc/api.yaml')
    );
    this.usersController = new UsersController();
    this.boardsController = new BoardsController();
    this.tasksController = new TasksController();
    this.routes();
  }

  routes() {
    this.app.use(express.json());

    this.app.use(
      '/doc',
      swaggerUI.serve,
      swaggerUI.setup(this.swaggerDocument)
    );

    this.app.use('/', (req, res, next) => {
      if (req.originalUrl === '/') {
        res.send('Service is running!');
        return;
      }
      next();
    });

    this.app.use('/users', this.usersController.router);
    this.app.use('/boards', this.boardsController.router);
    this.app.use('/boards/:boardId/tasks', this.tasksController.router);

    this.app.use((err, req, res, next) => {
      handleError(err, res);
      next();
    });
  }

  start() {
    this.app.listen(config.PORT, () =>
      console.log(`App is running on http://localhost:${config.PORT}`)
    );
  }
}

const server = new Server();
server.start();
