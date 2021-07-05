import { Response, Request, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './auth.dto';
import { routeWrapper } from '../../common/routeWrapper';

export class AuthController {
  public router: Router;
  private authService: AuthService;

  constructor() {
    this.router = Router();
    this.authService = new AuthService();
    this.router.post('/', routeWrapper(this.login));
  }

  login = async (req: Request, res: Response): Promise<void> => {
    const authCredentialsDto: AuthCredentialsDto = req.body;
    const response = await this.authService.login(authCredentialsDto);
    res.status(StatusCodes.OK).json(response);
  };
}
