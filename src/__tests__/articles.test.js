const request = require("supertest");
const app = require("../server/server");
const nock = require("nock");

describe("Articles endpoints", () => {
  it("should violate the joi schema validation for an article", async () => {
    const res = await request(app).post("/api/articles").send({
      email: "ricardo.perez.1@gmail.com",
      title: "Article about php",
      description: "Article description 2",
    });
    expect(res.statusCode).toEqual(422);
  });

  it("should create a new article", async () => {
    const res = await request(app).post("/api/articles").send({
      email: "ricardo.perez.1@gmail.com",
      title: "Article about php",
      description: "Article description 2",
      body: "Article body",
    });
    expect(res.statusCode).toEqual(422);
  });

  it("should violate title constraint", async () => {
    const res = await request(app).post("/api/articles").send({
      email: "ricardo.perez.1@gmail.com",
      title: "Article about php",
      description: "Article description 2",
      body: "Article body",
    });
    expect(res.statusCode).toEqual(422);
  });

  it("should return all the articles from a user", async () => {
    const res = await request(app).get(
      "/api/articles/user/ricardo.perez.1@gmail.com"
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("articles");
  });

  it("should test the outside data with nock", async () => {
    nock("https://pokeapi.co")
      .get("/api/v2/pokemon/ditto")
      .reply(200, {
        results: [
          {
            name: "hitmontop",
            url: "https://pokeapi.co/api/v2/pokemon/237/",
          },
          {
            name: "smoochum",
            url: "https://pokeapi.co/api/v2/pokemon/238/",
          },
          {
            name: "elekid",
            url: "https://pokeapi.co/api/v2/pokemon/239/",
          },
        ],
      });
    const res = await request(app).get("/api/external");
    expect(res.statusCode).toEqual(200);
    expect(res.body.results).toHaveLength(3)
  });
});
