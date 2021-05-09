// const cookieParser = require('cookie-parser');
const express = require('express');
const jwt = require('jsonwebtoken');
const bookData = require('../models/bookModel');
const userData = require('../models/userModel');
const authUser = require('../middleware/auth');

const app = express();
const router = express.Router();
// app.use(cookieParser());

// const createToken = (id) => {
//     return jwt.sign({ id }, 'thisismy#secret', {
//         expiresIn: '60'
//     });


// }

// const authUser = (req, res, next) => {
//     let token = request.header('auth')
//     jwt.verify(token, "thisismy#secret", (err, token) => {
//         if (!err) {
//             next();
//         } else {
//             return false;
//         }
//     })
// }

router.post('/addBook', async (request, response) => {
    console.log(request.body);
    if (authUser(request.header("auth"))) {
        const newBook = new bookData(request.body);
        await newBook.save()
            .then(data => {
                response.json({ 'status': true })
            })
            .catch(err => {
                response.json({ 'error': err })
            })
    } else {
        repoonse.json({ 'status': false })
    }
})

router.delete('/deleteBook', authUser, async (request, response) => {
    let title = request.body.title;
    console.log(title);
    await bookData.findOneAndDelete({ title })
        .then(data => response.json({ 'status': true }))
        .catch(err => response.json({ 'status': false }))
})

router.post('/getBookList/', async (request, response) => {
    var key = new RegExp(request.body.keyword, 'i');
    var range = request.body.range;
    if (request.body.tag === "author") {
        await bookData.find({ author: key, price: { $gte: range } })
            .then((data) => { console.log(data); response.send(data) })
            .catch((err) => console.log(err))
    } else if (request.body.tag === "title") {
        await bookData.find({ title: key, price: { $lte: range } })
            .then((data) => response.send(data))
            .catch((err) => console.log(err))
    } else {
        await bookData.find({ price: { $lte: range } })
            .then((data) => response.send(data))
            .catch((err) => console.log(err))
    }
})

router.post('/login', async (request, response) => {

    let userDetails = await userData.findOne({ email: request.body.email });
    if (userDetails) {
        console.log(request.body.password, userDetails);
        if (request.body.password === userDetails.password) {
            let token = await jwt.sign({ _id: userDetails._id }, 'thisismy#secret', {
                expiresIn: '60'
            })
            // await createToken(userDetails._id);
            console.log(token);
            response.json({ "token": token })
        } else {
            response.json({ "Error": "wrong password" });
        }
    }
    else {
        response.json({ "error": "invalid email" });
    }
})

router.post('/signup', async (request, response) => {
    const email = request.body.email;

    const newUser = new userData(request.body);
    try {
        await newUser.save((err) => console.log(err))
        console.log("Successfully Created", data);
        const token = createToken(newUser._id)
        response.json({ "token": token })
    } catch (err) {
        console.log(err);
    }
})

router.post('/bookInfo/:id', (request, response) => {
    let _id = request.params.id
    console.log(_id);
    bookData.findOne({ _id })
        .then(data => response.json(data))
        .catch(err => console.log(err))
})

module.exports = router;