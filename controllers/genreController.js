const asyncHandler = require("express-async-handler");
const Genre = require("../models/genre");
const Book = require("../models/book");
const { body, validationResult } = require("express-validator");

exports.genreList = asyncHandler(async (req, res, next) => {
  const genres = await Genre.find().exec();
  res.render("catalog/genreList", { 
    title: "Book Instance List",
    genres_list: genres
  });
});

exports.genreDetail = asyncHandler(async (req, res, next) => {
  try {
    const [genre, genre_books] = await Promise.all([
      Genre.findById(req.params.id).exec(),
      Book.find({ genre: req.params.id }).exec(),
    ]);
  
    if (!genre) {
      const err = new Error("Genre not found");
      err.status = 404;
      return next(err);
    }
    
    res.render("catalog/genreDetail", {
      title: "Genre Detail",
      genre: genre,
      genre_books: genre_books,
    });
  } catch (error) {
    next(error);
  }
});

exports.genreCreateGET = (req, res, next) => {
  res.render("catalog/genreForm", { title: "Create Genre" });
};

exports.genreCreatePOST = [
  // Validate and sanitize the name field.
  body("name", "Genre name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a genre object with escaped and trimmed data.
    const genre = new Genre({ name: req.body.name });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("catalog/genreForm", {
        title: "Create Genre",
        genre: genre,
        errors: errors.array(),
      });
      return;
    }

    // Data from form is valid.
    // Check if Genre with same name already exists.
    const genreExists = await Genre.findOne({ name: req.body.name })
      .collation({ locale: "en", strength: 2 })
      .exec();
    if (genreExists) {
      // Genre exists, redirect to its detail page.
      res.redirect(genreExists.url);
    } else {
      await genre.save();
      // New genre saved. Redirect to genre detail page.
      res.redirect(genre.url);
    }
  }),
];

// 通过 GET 显示流派删除表单。
exports.genreDeleteGET = asyncHandler(async (req, res, next) => {
  res.render("404", { title: "Genre Delete Not Implemented" });
});

// 处理 POST 时的流派删除。
exports.genreDeletePOST = asyncHandler(async (req, res, next) => {
  res.render("404", { title: "Genre Delete Not Implemented" });
});

// 通过 GET 显示流派更新表单。
exports.genreUpdateGET = asyncHandler(async (req, res, next) => {
  res.render("404", { title: "Genre Update Not Implemented" });
});

// 处理 POST 上的流派更新。
exports.genreUpdatePOST = asyncHandler(async (req, res, next) => {
  res.render("404", { title: "Genre Update Not Implemented" })
});
