import {
  NextFunction,
  Request,
  Response,
  Router,
  RouterOptions,
} from 'express';

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
    this.router.get('/', this.getAll);
    this.router.post('/', this.create);
    this.router.get('/:id', this.getById);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete);
  }
}
