const request = require("supertest")
const app = require('../server/server')
describe('User endpoints',  () =>{

    it('should violate the joi schema validation', async () =>{
        const res = await request(app)
        .post('/api/users')
        .send({
            "username": "ricardo.3.perez",
            "password": "123"
        })
        expect(res.statusCode).toEqual(422)
    });

    it('should create a new user with no bio', async () =>{
        const res = await request(app)
        .post('/api/users')
        .send({
            "username": "ricardo.3.perez",
            "email": "ricardo.perez.3@gmail.com",
            "password": "123"
        })
        expect(res.statusCode).toEqual(201)
    });

    it('should return 422 with existant user email', async () =>{
        const res = await request(app)
        .post('/api/users')
        .send({
            "username": "ricardo.4.perez",
            "email": "ricardo.perez.3@gmail.com",
            "password": "123"
        })
        expect(res.statusCode).toEqual(422)
    })
})