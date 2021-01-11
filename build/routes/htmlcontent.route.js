"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const html_controller_1 = __importDefault(require("../controllers/html.controller"));
const htmlcontent_dto_1 = require("../dtos/htmlcontent.dto");
const validation_middleware_1 = __importDefault(require("../middlewares/validation.middleware"));
class HtmlContentRoute {
    constructor() {
        this.path = '/htmlcontent';
        this.router = express_1.Router();
        this.htmlcontentController = new html_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}`, validation_middleware_1.default(htmlcontent_dto_1.HtmlContentDto, 'body'), this.htmlcontentController.getHtmlContent);
    }
}
exports.default = HtmlContentRoute;
//# sourceMappingURL=htmlcontent.route.js.map