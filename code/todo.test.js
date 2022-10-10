const request = require("supertest");
const app = require("./app");

describe("GET root", () => {
  test("test that website works", done => {
    request(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
