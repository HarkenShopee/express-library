const asyncHandler = require('express-async-handler');
const Author = require('../models/author');
const Book = require('../models/book');

// Display list of all Authors.
exports.authorList = function (req, res, next) {
    Author.find()
      .sort([["family_name", "ascending"]])
      .exec()
      .then((list_authors) => {
        //Successful, so render
        res.render("catalog/authorList", {
          title: "Author List",
          author_list: list_authors,
        });
      })
      .catch((err) => {
        next(err);
      });
  };
  
// 呈现指定作者的详情页。
exports.authorDetail = asyncHandler(async (req, res, next) => {
    // （并行地）获取作者的详细信息及其所有作品
    const [author, allBooksByAuthor] = await Promise.all([
      Author.findById(req.params.id).exec(),
      Book.find({ author: req.params.id }, "title summary").exec(),
    ]);
  
    if (author === null) {
      // 没有结果。
      const err = new Error("Author not found");
      err.status = 404;
      return next(err);
    }
  
    res.render("catalog/authorDetail", {
      title: "Author Detail",
      author: author,
      author_books: allBooksByAuthor,
    });
  });
  

exports.authorCreateGET = asyncHandler(async (req, res, next) => {
    res.send('Not implemented yet: Create Author GET');
});
  
exports.authorCreatePOST = asyncHandler(async (req, res, next) => {
    res.send('Not implemented yet: Create Author POST');
});
  
exports.authorDeleteGET = asyncHandler(async (req, res, next) => {
    res.send('Not implemented yet: Delete Author GET');
});
  
exports.authorDeletePOST = asyncHandler(async (req, res, next) => {
    res.send('Not implemented yet: Delete Author POST');
});
  
exports.authorUpdateGET = asyncHandler(async (req, res, next) => {
    res.send('Not implemented yet: Update Author GET');
});
  
exports.authorUpdatePOST = asyncHandler(async (req, res, next) => {
    res.send('Not implemented yet: Update Author POST');
});