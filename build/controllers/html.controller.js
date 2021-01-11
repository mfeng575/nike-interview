"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const htmlcontent_service_1 = __importDefault(require("../services/htmlcontent.service"));
class HtmlContentController {
    constructor() {
        this.htmlcontentService = new htmlcontent_service_1.default();
        this.getHtmlContent = async (req, res, next) => {
            try {
                const inputData = req.body;
                const htmlContentData = await this.htmlcontentService.getHtmlContent(inputData);
                res.status(201).json({ data: htmlContentData, message: 'processed' });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = HtmlContentController;
//# sourceMappingURL=html.controller.js.map