"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const htmlcontent_route_1 = __importDefault(require("../routes/htmlcontent.route"));
afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500));
});
describe('Testing Rendering HTML content', () => {
    describe('[POST] /users', () => {
        it('test case 2', async () => {
            const htmlcontentData = {
                template: [
                    "Hello {{firstName}},",
                    "This is a simple example."
                ],
                input: "{\"firstName\": \"Mary\"}",
                output: []
            };
            const expectedResult = {
                "data": {
                    "output": [
                        "Hello Mary,",
                        "This is a simple example."
                    ]
                },
                "message": "processed"
            };
            const htmlcontentRoute = new htmlcontent_route_1.default();
            const app = new app_1.default([htmlcontentRoute]);
            return supertest_1.default(app.getServer()).post(`${htmlcontentRoute.path}`).send(htmlcontentData).expect(201, expectedResult);
        });
        it('test case 2', async () => {
            const htmlcontentData = {
                template: [
                    {
                        dataText: "Hello {{firstName}},",
                        fallbackText: "Hello from Nike,"
                    },
                    "This dynamic data is {{requiredText}}",
                    {
                        dataText: "Sincerely yours, {{senderName}}",
                        fallbackText: ""
                    }
                ],
                input: "{\"firstName\": \"Pierre\", \"requiredText\": \"required\", \"senderName\": \"Natasha\"}",
                output: []
            };
            const expectedResult = {
                "data": {
                    "output": [
                        "Hello Pierre,",
                        "This dynamic data is required",
                        "Sincerely yours, Natasha"
                    ]
                },
                "message": "processed"
            };
            const htmlcontentRoute = new htmlcontent_route_1.default();
            const app = new app_1.default([htmlcontentRoute]);
            return supertest_1.default(app.getServer()).post(`${htmlcontentRoute.path}`).send(htmlcontentData).expect(201, expectedResult);
        });
        it('test case 3', async () => {
            const htmlcontentData = {
                template: [
                    {
                        dataText: "Hello {{firstName}},",
                        fallbackText: "Hello from Nike,"
                    },
                    "This dynamic data is {{requiredText}}",
                    {
                        dataText: "Sincerely yours, {{senderName}}",
                        fallbackText: ""
                    }
                ],
                input: "{\"requiredText\": \"required\", \"senderName\": \"Natasha\"}",
                output: []
            };
            const expectedResult = {
                "data": {
                    "output": [
                        "Hello from Nike,",
                        "This dynamic data is required",
                        "Sincerely yours, Natasha"
                    ]
                },
                "message": "processed"
            };
            const htmlcontentRoute = new htmlcontent_route_1.default();
            const app = new app_1.default([htmlcontentRoute]);
            return supertest_1.default(app.getServer()).post(`${htmlcontentRoute.path}`).send(htmlcontentData).expect(201, expectedResult);
        });
        it('test case 4', async () => {
            const htmlcontentData = {
                template: [
                    {
                        dataText: "Hello {{firstName}},",
                        fallbackText: "Hello from Nike,"
                    },
                    "This dynamic data is {{requiredText}}",
                    {
                        dataText: "Sincerely yours, {{senderName}}",
                        fallbackText: ""
                    }
                ],
                input: "{\"requiredText\": \"required\"}",
                output: []
            };
            const expectedResult = {
                "data": {
                    "output": [
                        "Hello from Nike,",
                        "This dynamic data is required"
                    ]
                },
                "message": "processed"
            };
            const htmlcontentRoute = new htmlcontent_route_1.default();
            const app = new app_1.default([htmlcontentRoute]);
            return supertest_1.default(app.getServer()).post(`${htmlcontentRoute.path}`).send(htmlcontentData).expect(201, expectedResult);
        });
    });
});
//# sourceMappingURL=htmlcontent.test.js.map