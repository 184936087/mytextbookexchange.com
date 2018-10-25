const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const db = low(new FileSync('db.json'))
const app = express()

db._.mixin(require('lodash-id'))

db.defaults({
	users: [],
	books: []
}).write()

app.use(session({
    name: 'skey',
    secret: 'terces',
    resave: false,
    saveUninitialized: false
}))

app.use(morgan('tiny'))

app.use(express.static(__dirname + '/page'))

app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// new user
app.post('/users', (req, res) => {
	const id = db.get('users').insert(req.body).value().id
	db.write()
	req.session.uid = id
	res.send({ ok: true, id })
})

// verify user
app.post('/login', (req, res) => {
	let v = db.get('users').find(req.body).value()
	if (v && v.id) {
		req.session.regenerate(function(err) {
			if (err)
				return res.send({ ok: false, msg: 'login failed' })
			req.session.uid = v.id
			res.send({ ok: true, id: v.id })
		})
	} else
		res.send({ ok: false, msg: 'no such user' })
})

// new book
app.post('/books', (req, res) => {
	if (!req.session.uid)
		return res.send({ ok: false, msg: 'not logged in' })
	const book = Object.assign({ seller: req.session.uid }, req.body)
	const id = db.get('books').insert(book).value().id
	db.write()
	res.send({ ok: true, id })
})

// get my books
app.get('/books', (req, res) => {
	if (!req.session.uid)
		return res.send({ ok: false, msg: 'not logged in' })
	let v = db.get('books').filter({ seller: req.session.uid }).sortBy('price').value()
	if (v)
		res.send({ ok: true, books: v })
	else
		res.send({ ok: false, msg: 'not logged in' })
})

// get books not mine
app.get('/sells', (req, res) => {
	if (!req.session.uid)
		return res.send({ ok: false, msg: 'not logged in' })
	res.send({ ok: true, books: db.get('books').value()
		.filter(x => x.seller != req.session.uid) })
})

// get seller information
app.get('/seller/:id', (req, res) => {
	if (!req.session.uid)
		return res.send({ ok: false, msg: 'not logged in' })
	const user = db.get('users').getById(req.params.id).value()
	if (!user)
		return res.send({ ok: false, msg: 'not found' })
	const seller = Object.assign(user, { password: '<encrypted>' })
	res.send({ ok: true, seller })
})

// delete my book
app.delete('/books/:id', (req, res) => {
	if (!req.session.uid)
		return res.send({ ok: false, msg: 'not logged in' })
	if (db.get('books').removeById(req.params.id).value()){
		db.write()
		res.send({ ok: true })
	} else
		res.send({ ok: false, msg: 'no such book' })
})

// search books
app.post('/search', (req, res) => {
	if (!req.session.uid)
		return res.send({ ok: false, msg: 'not logged in' })
	res.send({
		ok: true,
		books: db.get('books')
			.filter(b => b[req.body.field].includes(req.body.value))
			.sortBy('price').value()
	})
})

app.listen(3000, () => console.log('http://localhost:3000'))
