const functions = require("firebase-functions");
const admin = require('firebase-admin')
const express = require('express')
const serviceAccount = require("./permissions.json")
const app = express();

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()
app.get('/hello-world', (req, res) => {
	res.json({ message: 'hello world' });
})

app.post('api/products', async (req, res) => {
	await db.collection("products")
		.doc('/' + req.body.id + '/')
		.create({
			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
		})
	return res.status(204).json()
})
exports.app = functions.https.onRequest(app);
