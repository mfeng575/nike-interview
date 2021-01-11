import request from 'supertest';
import App from '../app';
import { HtmlContent } from '../interfaces/htmlcontent.interface';
import HtmlContentRoute from '../routes/htmlcontent.route';
import { HtmlContentDto } from '../dtos/htmlcontent.dto';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Rendering HTML content', () => {

  describe('[POST] /htmlcontent', () => {
    it('test case 1', async () => {
      const htmlcontentData: HtmlContentDto = {
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

      const htmlcontentRoute = new HtmlContentRoute();
      const app = new App([htmlcontentRoute]);

      return request(app.getServer()).post(`${htmlcontentRoute.path}`).send(htmlcontentData).expect(201, expectedResult);
    });

    it('test case 2', async () => {
      const htmlcontentData: HtmlContentDto = {
        template: [
            {
            dataText: "Hello {{firstName}},",
            fallbackText: "Hello from Nike,"
            },
            "This dynamic data is {{requiredText}}",
            {
            dataText: "Sincerely yours, {{senderName}}",
            fallbackText : ""
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

      const htmlcontentRoute = new HtmlContentRoute();
      const app = new App([htmlcontentRoute]);

      return request(app.getServer()).post(`${htmlcontentRoute.path}`).send(htmlcontentData).expect(201, expectedResult);
    });

    it('test case 3', async () => {
        const htmlcontentData: HtmlContentDto = {
          template: [
              {
              dataText: "Hello {{firstName}},",
              fallbackText: "Hello from Nike,"
              },
              "This dynamic data is {{requiredText}}",
              {
              dataText: "Sincerely yours, {{senderName}}",
              fallbackText : ""
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
  
        const htmlcontentRoute = new HtmlContentRoute();
        const app = new App([htmlcontentRoute]);
  
        return request(app.getServer()).post(`${htmlcontentRoute.path}`).send(htmlcontentData).expect(201, expectedResult);
    });

    it('test case 4', async () => {
    const htmlcontentData: HtmlContentDto = {
        template: [
            {
            dataText: "Hello {{firstName}},",
            fallbackText: "Hello from Nike,"
            },
            "This dynamic data is {{requiredText}}",
            {
            dataText: "Sincerely yours, {{senderName}}",
            fallbackText : ""
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

    const htmlcontentRoute = new HtmlContentRoute();
    const app = new App([htmlcontentRoute]);

    return request(app.getServer()).post(`${htmlcontentRoute.path}`).send(htmlcontentData).expect(201, expectedResult);
    });
  });

});
