// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from "../main.js";

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Coupons", () => {
    describe("GET /coupon/:id", () => {
        // Test to get single customer with wrong id
        it("should not get a coupon with id 5", (done)=>{
            const id = '5';
            chai.request(app)
                .get(`/coupon/${id}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        // Test to get single customer
        it("should get a coupon by its id", (done) => {
            const id = 'AF9B0B0C-B374-C672-AE0B-5165B7F8249B';
            chai.request(app)
                .get(`/coupon/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body[0].should.be.a('object');
                    done();
                });
        });
    });
});
