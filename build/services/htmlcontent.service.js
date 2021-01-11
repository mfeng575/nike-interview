"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const htmlcontent_dto_1 = require("../dtos/htmlcontent.dto");
const HttpException_1 = __importDefault(require("../exceptions/HttpException"));
const util_1 = require("../utils/util");
class HtmlContentService {
    async getHtmlContent(inputData) {
        if (util_1.isEmpty(inputData))
            throw new HttpException_1.default(400, "Invalid input");
        const contentData = new htmlcontent_dto_1.HtmlContentDto();
        let subValues = JSON.parse(inputData.input);
        Object.keys(subValues).forEach(key => {
            console.log("key : " + key + " value : " + subValues[key]);
        });
        contentData.output = [];
        inputData.template.forEach(template => {
            let renderedString = null;
            if (typeof (template) === 'object') {
                renderedString = this.getRenderedContent(template.dataText, subValues, template.fallbackText);
            }
            else if (typeof (template) === 'string') {
                renderedString = this.getRenderedContent(template, subValues, null);
            }
            else {
                // this is not supported type, ignore the template
            }
            if (renderedString)
                contentData.output.push(renderedString);
        });
        return contentData;
    }
    getRenderedContent(template, subValues, fallback) {
        let content = template;
        // find the key of the content to be replaced
        let key = content.match(/{{(.*?)}}/g);
        // if there is nothing to replace, return the orignal content
        if (!key || key.length === 0)
            return content;
        let realKey = key[0].replace("{{", "").replace("}}", "");
        if (Object.keys(subValues).includes(realKey)) {
            content = content.replace(key[0], subValues[realKey]);
        }
        else if (fallback) {
            content = fallback;
        }
        else {
            // this is a validation error since there is no correct way to process the template
            return null;
        }
        return content;
    }
}
exports.default = HtmlContentService;
//# sourceMappingURL=htmlcontent.service.js.map