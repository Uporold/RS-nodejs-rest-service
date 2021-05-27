import express, { Request, Response, NextFunction, Application } from 'express';
import path from 'path';
import YAML from 'yamljs';
import * as swaggerUI from 'swagger-ui-express';
import { config } from './common/config';
import { UsersController } from './resources/users/users.controller';
import { BoardsController } from './resources/boards/boards.controller';
import { TasksController } from './resources/tasks/tasks.controller';
import { CustomError, handleError } from './middlewares/error';

class Server {
  private app: Application;
  private usersController: UsersController;
  private boardsController: BoardsController;
  private tasksController: TasksController;
  private readonly swaggerDocument: swaggerUI.JsonObject;

  constructor() {
    this.app = express();
    this.swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
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

    this.app.use('/', (req: Request, res: Response, next: NextFunction) => {
      if (req.originalUrl === '/') {
        res.send('Service is running!');
        return;
      }
      next();
    });

    this.app.use('/users', this.usersController.router);
    this.app.use('/boards', this.boardsController.router);
    this.app.use('/boards/:boardId/tasks', this.tasksController.router);

    this.app.use(
      (err: CustomError, _req: Request, res: Response, next: NextFunction) => {
        handleError(err, res);
        next();
      }
    );
  }

  start() {
    this.app.listen(config.PORT, () =>
      console.log(`App is running on http://localhost:${config.PORT}`)
    );
  }
}

const server = new Server();
server.start();
