import { HtmlContentDto } from '../dtos/htmlcontent.dto';
import HttpException from '../exceptions/HttpException';
import { HtmlContent, Template } from '../interfaces/htmlcontent.interface';
import { isEmpty } from '../utils/util';

class HtmlContentService {

  public async getHtmlContent(inputData: HtmlContentDto): Promise<HtmlContent> {
    if (isEmpty(inputData)) throw new HttpException(400, "Invalid input");

    const contentData: HtmlContent = new HtmlContentDto();

    let subValues:any = JSON.parse(inputData.input);
    Object.keys(subValues).forEach(key => {
      console.log("key : " + key + " value : " + subValues[key])
    });

    contentData.output = [];

    inputData.template.forEach(template => {
      let renderedString = null;

      if (typeof(template) === 'object') {
        renderedString = this.getRenderedContent(template.dataText, subValues, template.fallbackText);
      } else if (typeof(template) === 'string') {
        renderedString = this.getRenderedContent(template, subValues, null);
      } else {
        // this is not supported type, ignore the template
      }

      if (renderedString) contentData.output.push(renderedString);

    });

    return contentData;
  }

  private getRenderedContent(template: string, subValues: any, fallback:string): string {
    let content: string = template;

    // find the key of the content to be replaced
    let key = content.match(/{{(.*?)}}/g); 

    // if there is nothing to replace, return the orignal content
    if (!key || key.length === 0) return content;

    let realKey = key[0].replace("{{", "").replace("}}", "");

    if (Object.keys(subValues).includes(realKey)) {
      content = content.replace(key[0], subValues[realKey]);
    } else if (fallback) {
      content = fallback;
    } else {
      // this is a validation error since there is no correct way to process the template
      return null;
    }

    return content;
  }

}

export default HtmlContentService;
