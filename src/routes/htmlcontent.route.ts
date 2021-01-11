import { Router } from 'express';
import HtmlContentController from '../controllers/html.controller';
import { HtmlContentDto } from '../dtos/htmlcontent.dto';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';

class HtmlContentRoute implements Route {
  public path = '/htmlcontent';
  public router = Router();
  public htmlcontentController = new HtmlContentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, validationMiddleware(HtmlContentDto, 'body'), this.htmlcontentController.getHtmlContent);
  }
}

export default HtmlContentRoute;
