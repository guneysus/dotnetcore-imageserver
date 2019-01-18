var should = require('chai').should(),
	expect = require('chai').expect,
	supertest = require('supertest'),
	API_URL = 'http://localhost:5000',
	api = supertest(API_URL);


describe("JPEG File Upload", function () {
	it("single JPEG file upload", function (done) {
		api.post('/api/upload')
			.set('Content-Type', 'multipart/form-data')
			.attach('image', '_data/ZY-IMG_0091-635px.jpg')
			.expect(200)
			.expect('Content-Type', /text\/plain/)
			.expect(/jpg/)
			.end(function (err, res) {
				if (err) {
					return done(err);
				}
				uploadedfile = res.text;

				done();
			});
	});
});

describe("JPEG  File Upload and Get Original Size", function () {
	var uploadedfile;

	before(function (done) {

		api.post('/api/upload')
			.set('Content-Type', 'multipart/form-data')
			.attach('image', '_data/ZY-IMG_0091-635px.jpg')
			.expect(200)
			.expect('Content-Type', /text\/plain/)
			.expect(/jpg/)
			.end(function (err, res) {
				if (err) return done(err);
				uploadedfile = res.text;
				console.log(uploadedfile);
				done();
			});
	});

	it("JPEG Get Original Size Image", function (done) {
		console.log(API_URL + '/image/h0/' + uploadedfile);

		api.get('/image/h0/' + uploadedfile)
			.expect(200)
			.expect('Content-Type', /jpeg/)
			.end(function (err, res) {
				if (err) return done(err);
				done();
			});
	});
});


describe("PNG File Upload", function () {
	it("single PNG file upload", function (done) {
		api.post('/api/upload')
			.set('Content-Type', 'multipart/form-data')
			.attach('image', '_data/sample.png')
			.expect(200)
			.expect('Content-Type', /text\/plain/)
			.expect(/png/)
			.end(function (err, res) {
				if (err) {
					return done(err);
				}
				uploadedfile = res.text;

				done();
			});
	});
});


describe("PNG File Upload and Get Original Size", function () {
	var uploadedfile;

	before(function (done) {

		api.post('/api/upload')
			.set('Content-Type', 'multipart/form-data')
			.attach('image', '_data/sample.png')
			.expect(200)
			.expect('Content-Type', /text\/plain/)
			.expect(/png/)
			.end(function (err, res) {
				if (err) return done(err);
				uploadedfile = res.text;
				console.log(uploadedfile);
				done();
			});
	});

	it("PNG Get Original Size Image", function (done) {
		console.log(API_URL + '/image/h0/' + uploadedfile);

		api.get('/image/h0/' + uploadedfile)
			.expect(200)
			.expect('Content-Type', /png/)
			.end(function (err, res) {
				if (err) return done(err);
				done();
			});
	});
});
