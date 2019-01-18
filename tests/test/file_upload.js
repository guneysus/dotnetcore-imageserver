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

// describe('Account', function () {

// 	var users = {
// 		ahmed: {
// 			username: 'ahmed',
// 			password: 123
// 		},
// 		mehmet: {
// 			username: 'mehmet',
// 			password: 123
// 		},
// 		blocked: {
// 			username: 'blocked',
// 			password: 123
// 		}
// 	}

// 	before(function (done) {
// 		api.post('/api/account/register')
// 			.send(users.ahmed)
// 			.set('Accept', 'application/json')
// 			//.expect(200)
// 			.end(function (err, res) {
// 				if (err) return done(err);
// 				done();
// 			});
// 	});

// 	before(function (done) {
// 		api.post('/api/account/register')
// 			.send(users.mehmet)
// 			.set('Accept', 'application/json')
// 			//.expect(200)
// 			.end(function (err, res) {
// 				if (err) return done(err);
// 				done();
// 			});
// 	});

// 	before(function (done) {
// 		api.post('/api/account/register')
// 			.send(users.blocked)
// 			.set('Accept', 'application/json')
// 			.end(function (err, res) {
// 				if (err) return done(err);
// 				done();
// 			});
// 	});

// 	it('should ahmed login and response contains JWT token', function (done) {

// 		api.post('/api/account/login')
// 			.send(users.ahmed)
// 			.set('Accept', 'application/json')
// 			.expect(200)
// 			.expect('Content-Type', /json/)
// 			.end(function (err, res) {
// 				if (err) return done(err);
// 				users.ahmed.token = res.body;
// 				done();
// 			});
// 	});

// 	it('should mehmet login and response contains JWT token', function (done) {

// 		api.post('/api/account/login')
// 			.send(users.mehmet)
// 			.set('Accept', 'application/json')
// 			.expect(200)
// 			.expect('Content-Type', /json/)
// 			.end(function (err, res) {
// 				if (err) return done(err);
// 				users.mehmet.token = res.body;
// 				done();
// 			});
// 	});

// 	it('should blocked login and response contains JWT token', function (done) {

// 		api.post('/api/account/login')
// 			.send(users.blocked)
// 			.set('Accept', 'application/json')
// 			.expect(200)
// 			.expect('Content-Type', /json/)
// 			.end(function (err, res) {
// 				if (err) return done(err);
// 				users.blocked.token = res.body;
// 				done();
// 			});
// 	});

// 	it('should ahmed account info contains ahmed', function (done) {

// 		api.post('/api/account/info')
// 			.set('Authorization', 'Bearer ' + users.ahmed.token)
// 			.expect(200)
// 			.expect('Content-Type', /text/)
// 			.end(function (err, res) {
// 				if (err) return done(err);
// 				done();
// 			});
// 	});

// 	it('should mehmet account info contains ahmed', function (done) {

// 		api.post('/api/account/info')
// 			.set('Authorization', 'Bearer ' + users.mehmet.token)
// 			.expect(200)
// 			.expect('Content-Type', /text/)
// 			.end(function (err, res) {
// 				if (err) return done(err);
// 				done();
// 			});
// 	});

// 	it('ahmed should not send an not existing user', function (done) {
// 		api.post('/api/message/send')
// 			.send({ to: 'non_existing_user', body: "Message" })
// 			.set('Authorization', 'Bearer ' + users.ahmed.token)
// 			.expect(500)
// 			.end(function (err, res) {
// 				if (err) return done(err);
// 				done();
// 			});
// 	});

// 	it('ahmed should send to mehmet', function (done) {
// 		api.post('/api/message/send')
// 			.send({ to: 'mehmet', body: "Merhaba Mehmet" })
// 			.set('Authorization', 'Bearer ' + users.ahmed.token)
// 			.expect(200)
// 			.end(function (err, res) {
// 				if (err) return done(err);
// 				done();
// 			});
// 	});

// 	it('mehmet should send to ahmed', function (done) {
// 		api.post('/api/message/send')
// 			.send({ to: 'ahmed', body: "Merhaba Ahmed" })
// 			.set('Authorization', 'Bearer ' + users.mehmet.token)
// 			.expect(200)
// 			.end(function (err, res) {
// 				if (err) return done(err);
// 				done();
// 			});
// 	});

// 	it('ahmed should get conversation with mehmet', function (done) {
// 		api.post('/api/message/getconversation')
// 			.send({ with: 'mehmet' })
// 			.set('Authorization', 'Bearer ' + users.ahmed.token)
// 			.expect(200)
// 			.end(function (err, res) {
// 				if (err) return done(err);
// 				done();
// 			});
// 	});

// 	it('mehmet should get conversation with ahmed', function (done) {
// 		api.post('/api/message/getconversation')
// 			.send({ with: 'ahmed' })
// 			.set('Accept', 'application/json')
// 			.set('Authorization', 'Bearer ' + users.mehmet.token)
// 			.expect(200)
// 			.end(function (err, res) {
// 				if (err) return done(err);
// 				done();
// 			});
// 	});

// 	it('ahmed should block the user: blocked', function (done) {
// 		api.post('/api/account/block')
// 			.send({ username: 'blocked' })
// 			.set('Authorization', 'Bearer ' + users.ahmed.token)
// 			.expect(200)
// 			.end(function (err, res) {
// 				if (err) return done(err);
// 				done();
// 			});
// 	});

// 	it("blocked user should NOT send message to ahmed :')   ", function (done) {
// 		api.post('/api/message/send')
// 			.send({ to: 'ahmed', body: "Merhaba Ahmed" })
// 			.set('Authorization', 'Bearer ' + users.blocked.token)
// 			.expect(500)
// 			.end(function (err, res) {
// 				if (err) return done(err);
// 				done();
// 			});
// 	});
// });
