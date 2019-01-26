var should = require('chai').should(),
	expect = require('chai').expect,
	supertest = require('supertest'),
	API_URL = process.env.API_URL,
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

describe("Upload and Replace with custom file name (PUT) file", function () {
	var uploadedfile;

	it("single PNG file upload", function (done) {
		api.put('/api/upload/' + 'foobar.png')
			.set('Content-Type', 'multipart/form-data')
			.attach('image', '_data/sample.png')
			.expect(200)
			.expect('Content-Type', /text\/plain/)
			.expect(/foobar\.png/)
			.end(function (err, res) {
				if (err) {
					return done(err);
				}
				uploadedfile = res.text;
				done();
			});
	});


	it("single PNG file replace", function (done) {
		api.put('/api/upload/' + 'foobar.png')
			.set('Content-Type', 'multipart/form-data')
			.attach('image', '_data/ZY-IMG_0091-635px.jpg')
			.expect(200)
			.expect('Content-Type', /text\/plain/)
			.expect(/foobar\.png/)
			.end(function (err, res) {
				if (err) {
					return done(err);
				}
				uploadedfile = res.text;
				done();
			});
	});
})

describe("delete file", function () {
	var uploadedfile;
	before(function (done) {

		api.put('/api/upload/' + 'foobar.jpg')
			.set('Content-Type', 'multipart/form-data')
			.attach('image', '_data/ZY-IMG_0091-635px.jpg')
			.expect(200)
			.expect('Content-Type', /text\/plain/)
			.expect(/jpg/)
			.end(function (err, res) {
				if (err) return done(err);
				uploadedfile = res.text;
				done();
			});
	});

	it("delete file", function (done) {
		api.delete('/api/upload/' + 'foobar.jpg')
			.expect(200)
			.expect('Content-Type', /text\/plain/)
			.expect(/foobar\.jpg/)
			.end(function (err, res) {
				if (err) {
					return done(err);
				}
				uploadedfile = res.text;

				done();
			});
	});
})




describe("return 404 for non existing images", function () {
	it("404", function (done) {
		api.get('/image/h0/' + 'foobar.jpg')
			.expect(404)
			.end(function (err, res) {
				if (err) {
					return done(err);
				}
				done();
			});
	});
})