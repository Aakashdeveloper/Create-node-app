let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
chai.use(chaiHttp);

describe('Testing my get Api', () => {
    it('should be return status 200 for /', function(done){
        chai
            .request('http://localhost:7600')
            .get('/')
            .then(function(res){
                expect(res).to.have.status(200);
                done();
            })
            .catch(function(err){
                throw(err);
            });
    });
    it('should be return status 200 for about', function(done){
        chai
            .request('http://localhost:7600')
            .get('/about')
            .then(function(res){
                expect(res).to.have.status(200);
                done();
            })
            .catch(function(err){
                throw(err);
            });
    });
    it('should be return status 201 for about', function(done){
        chai
            .request('http://localhost:7600')
            .get('/abouts')
            .then(function(res){
                expect(res).to.have.status(404);
                done();
            })
            .catch(function(err){
                throw(err);
            });
    });
})