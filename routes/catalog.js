const express = require('express');
const router = express.Router();

const bookController = require('../controllers/bookController');
const authorController = require('../controllers/authorController');
const genreController = require('../controllers/genreController');
const bookInstanceController = require('../controllers/bookInstanceController');

/// 图书路由 ///

router.get('/', bookController.index);
router.get('/book/:id', bookController.bookDetail);
router.get('/books', bookController.bookList);
router.get('/book/create', bookController.bookCreateGET);
router.post('/book/create', bookController.bookCreatePOST);
router.get('/book/:id/delete', bookController.bookDeleteGET);
router.post('/book/:id/delete', bookController.bookDeletePOST);
router.get('/book/:id/update', bookController.bookUpdateGET);
router.post('/book/:id/update', bookController.bookUpdatePOST);

/// 作者路由 ///

router.get('/author/:id', authorController.authorDetail);
router.get('/authors', authorController.authorList);
router.get('/author/create', authorController.authorCreateGET);
router.post('/author/create', authorController.authorCreatePOST);
router.get('/author/:id/delete', authorController.authorDeleteGET);
router.post('/author/:id/delete', authorController.authorDeletePOST);
router.get('/author/:id/update', authorController.authorUpdateGET);
router.post('/author/:id/update', authorController.authorUpdatePOST);

/// 类别路由 ///

router.get('/genre/:id', genreController.genreDetail);
router.get('/genres', genreController.genreList);
router.get('/genre/create', genreController.genreCreateGET);
router.post('/genre/create', genreController.genreCreatePOST);
router.get('/genre/:id/delete', genreController.genreDeleteGET);
router.post('/genre/:id/delete', genreController.genreDeletePOST);
router.get('/genre/:id/update', genreController.genreUpdateGET);
router.post('/genre/:id/update', genreController.genreUpdatePOST);

/// 书籍实例路由 ///

router.get('/bookinstance/:id', bookInstanceController.bookInstanceDetail);
router.get('/bookinstances', bookInstanceController.bookInstanceList);
router.get('/bookinstance/create', bookInstanceController.bookInstanceCreateGET);
router.post('/bookinstance/create', bookInstanceController.bookInstanceCreatePOST);
router.get('/bookinstance/:id/delete', bookInstanceController.bookInstanceDeleteGET);
router.post('/bookinstance/:id/delete', bookInstanceController.bookInstanceDeletePOST);
router.get('/bookinstance/:id/update', bookInstanceController.bookInstanceUpdateGET);
router.post('/bookinstance/:id/update', bookInstanceController.bookInstanceUpdatePOST);

module.exports = router;