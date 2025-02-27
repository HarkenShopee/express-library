const asyncHandler = require('express-async-handler');
const Author = require('../models/author');
const Book = require('../models/book');
const { body, validationResult } = require("express-validator");

// Display list of all Authors.
exports.authorList = function (req, res, next) {
    Author.find()
      .sort([["last_name", "ascending"]])
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
  

exports.authorCreateGET = (req, res, next) => {
    res.render('catalog/authorForm', { title: 'Create Author' });
};
  
exports.authorCreatePOST = [
  // Validate and sanitize fields.
  body("first_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),
  body("last_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Family name must be specified.")
    .isAlphanumeric()
    .withMessage("Family name has non-alphanumeric characters."),
  body("date_of_birth", "Invalid date of birth")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),
  body("date_of_death", "Invalid date of death")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create Author object with escaped and trimmed data
    const author = new Author({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      date_of_birth: req.body.date_of_birth,
      date_of_death: req.body.date_of_death,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render("author_form", {
        title: "Create Author",
        author: author,
        errors: errors.array(),
      });
      return;
    }

    // Data from form is valid.

    // Save author.
    await author.save();
    // Redirect to new author record.
    res.redirect(author.url);
  }),
];

  
exports.authorDeleteGET = asyncHandler(async (req, res, next) => {
    res.render('404', { title: 'Not implemented yet: Delete Author GET'});
});
  
exports.authorDeletePOST = asyncHandler(async (req, res, next) => {
    res.render('404', { title: 'Not implemented yet: Delete Author POST'});
});
  
exports.authorUpdateGET = asyncHandler(async (req, res, next) => {
    res.render('404', { title: 'Not implemented yet: Update Author GET'});
});
  
exports.authorUpdatePOST = asyncHandler(async (req, res, next) => {
    res.render('404', { title: 'Not implemented yet: Update Author POST'});
});