// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from "../main.js";

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Customers", () => {
    describe("GET /customer/:id", () => {
        // Test to get single customer with wrong id
        it("should not get customer with id 5", (done)=>{
            const id = '5';
            chai.request(app)
                .get(`/customer/${id}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        // Test to get single customer
        it("should get a customer by its id", (done) => {
            const id = '407CE224-641F-152A-6784-86513E00740F';
            chai.request(app)
                .get(`/customer/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body[0].should.be.a('object');
                    done();
                });
        });
    });
    describe("POST /customer/login", () => {
        // Test to login a user
        it("should get a customer with login info", (done) => {
            const body = JSON.stringify({
                login: "admin",
                password: "admin"
            })
            chai.request(app)
                .post("/customer/login")
                .set('content-type', 'application/json')
                .send(body)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body[0].should.be.a('object');
                    done();
                });
        });

        // Test to login a user with wrong info
        it("should not login a customer", (done) => {
            const body = JSON.stringify({
                login: "admiin",
                password: "admin"
            })
            chai.request(app)
                .post("/customer/login")
                .set('content-type', 'application/json')
                .send(body)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.eql(false)
                    done();
                });
        });

    });
    describe("GET /customer/:id/coupons", () => {
        // Test to get all coupons of a customer
        it("should get a list of the customer's coupons", (done) => {
            const id = '407CE224-641F-152A-6784-86513E00740F';
            chai.request(app)
                .get(`/customer/${id}/coupons`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body[0].should.be.a('object');
                    done();
                });
        });

        // Test to get all coupons of a customer with no coupons
        it("should not get a list of coupon", (done) => {
            const id = 'e6604688-7df1-4991-b4c6-3d4709b88ce9';
            chai.request(app)
                .get(`/customer/${id}/coupons`)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });
    describe("POST /customer/:id/coupons/add", () => {
        // Test add a coupon to a customer
        it("should add a coupon to a customer's account", (done) => {
            const id = 'e6604688-7df1-4991-b4c6-3d4709b88ce9';
            const body = JSON.stringify({
                id_coupon: 'C47D3788-6BE6-8DC2-D933-24A97B539240'
            })
            chai.request(app)
                .post(`/customer/${id}/coupons/add`)
                .set('content-type', 'application/json')
                .send(body)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});
