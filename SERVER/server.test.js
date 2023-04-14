const request = require("supertest");
const app = require("./index.js");
const jwt = require("jsonwebtoken");

const secretKeys = "your_secret_key";

describe("GET /login", () => {
  test("should return a JWT token", async () => {
    const res = await request(app).get("/login").expect(200);
    console.log(res.text);
    const json = res.text
    const obj = JSON.parse(json)
    const token = obj.token
    const decoded = jwt.verify(token, secretKeys);
    expect(decoded.id).toBe(1207);
  });
});

test("Querry", async () => {
    const response = await request(app).get("/question");
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("[{\"_id\":\"6432e4327053bbf8b5ac2620\",\"id\":1,\"title\":\"Bisection\",\"question\":\"(x^4)-13\"},{\"_id\":\"6432e4d57053bbf8b5ac2621\",\"id\":2,\"title\":\"One-Point\",\"question\":\"(x^2)-7\"},{\"_id\":\"64339dfb12b1ca9efb7fe304\",\"id\":4,\"title\":\"Bisection\",\"question\":\"(x^2)-7\"},{\"_id\":\"6433cdc332a57b0caab376ff\",\"id\":3,\"title\":\"Newton-Raphson\",\"question\":\"x^4\"}]");
  });