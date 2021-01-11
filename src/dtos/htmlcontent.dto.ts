import {Template} from "../interfaces/htmlcontent.interface"

export class HtmlContentDto {
  public template: Array<string | Template>;
  public input: string;
  public output: Array<string>;
}
