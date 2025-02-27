const BookInstance = require("../models/bookinstance");
const Book = require("../models/book");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.bookInstanceList = asyncHandler(async (req, res, next) => {
  const allBookInstances = await BookInstance.find().populate("book").exec();

  res.render("catalog/bookInstanceList", {
    title: "Book Instance List",
    bookinstance_list: allBookInstances,
  });
});

exports.bookInstanceDetail = asyncHandler(async (req, res, next) => {
  const bookInstance = await BookInstance.findById(req.params.id)
    .populate("book")
    .exec();

  if (bookInstance === null) {
    const err = new Error("Book copy not found");
    err.status = 404;
    return next(err);
  }

  res.render("catalog/bookInstanceDetail", {
    title: "Book:",
    bookinstance: bookInstance,
  });
});

// Display BookInstance create form on GET.
exports.bookInstanceCreateGET = asyncHandler(async (req, res, next) => {
  const allBooks = await Book.find({}, "title").sort({ title: 1 }).exec();

  res.render("catalog/bookInstanceForm", {
    title: "Create BookInstance",
    book_list: allBooks,
  });
});

// Handle BookInstance create on POST.
exports.bookInstanceCreatePOST = [
  // Validate and sanitize fields.
  body("book", "Book must be specified").trim().isLength({ min: 1 }).escape(),
  body("imprint", "Imprint must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("status").escape(),
  body("due_back", "Invalid date")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a BookInstance object with escaped and trimmed data.
    const bookInstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back,
    });

    if (!errors.isEmpty()) {
      // There are errors.
      // Render form again with sanitized values and error messages.
      const allBooks = await Book.find({}, "title").sort({ title: 1 }).exec();

      res.render("catalog/bookInstanceForm", {
        title: "Create BookInstance",
        book_list: allBooks,
        selected_book: bookInstance.book._id,
        errors: errors.array(),
        bookinstance: bookInstance,
      });
      return;
    } else {
      // Data from form is valid
      await bookInstance.save();
      res.redirect(bookInstance.url);
    }
  }),
];



// 由 GET 显示删除 BookInstance 的表单
exports.bookInstanceDeleteGET = asyncHandler(async (req, res, next) => {
  res.render('404', { title: 'Not Implemented yet: BookInstance Delete GET' });
});

// 由 POST 删除 BookInstance
exports.bookInstanceDeletePOST = asyncHandler(async (req, res, next) => {
  res.render('404', { title: 'Not Implemented yet: BookInstance Delete POST' });
});

// 由 GET 显示更新 BookInstance 的表单
exports.bookInstanceUpdateGET = asyncHandler(async (req, res, next) => {
  res.render('404', { title: 'Not Implemented yet: BookInstance Update GET' });
});

// 由 POST 处理更新 BookInstance
exports.bookInstanceUpdatePOST = asyncHandler(async (req, res, next) => {
  res.render('404', { title: 'Not Implemented yet: BookInstance Update POST' });
});
