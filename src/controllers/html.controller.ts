import { NextFunction, Request, Response } from 'express';
import { HtmlContentDto } from '../dtos/htmlcontent.dto';
import { HtmlContent } from '../interfaces/htmlcontent.interface';
import HtmlContentService from '../services/htmlcontent.service';

class HtmlContentController {
  public htmlcontentService = new HtmlContentService();

  public getHtmlContent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const inputData: HtmlContentDto = req.body;
      const htmlContentData: HtmlContent = await this.htmlcontentService.getHtmlContent(inputData);

      res.status(201).json({ data: htmlContentData, message: 'processed' });
    } catch (error) {
      next(error);
    }
  };

}

export default HtmlContentController;
