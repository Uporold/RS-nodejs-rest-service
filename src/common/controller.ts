import {
  Router,
  RouterOptions,
  Request,
  Response,
  NextFunction,
} from 'express';
import { routeWrapper } from './routeWrapper';

export abstract class Controller {
  public router: Router;

  protected constructor(routerOptions?: RouterOptions) {
    this.router = Router(routerOptions);
  }

  abstract getAll: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;

  abstract create: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;

  abstract getById: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;

  abstract update: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;

  abstract delete: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;

  public routes(): void {
    this.router
      .get('/', routeWrapper(this.getAll))
      .post('/', routeWrapper(this.create))
      .get('/:id', routeWrapper(this.getById))
      .put('/:id', routeWrapper(this.update))
      .delete('/:id', routeWrapper(this.delete));
  }
}
