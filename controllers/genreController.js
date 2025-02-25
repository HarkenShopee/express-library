const genre = require("../models/genre");
const asyncHandler = require("express-async-handler");
const Genre = require("../models/genre");
const Book = require("../models/book");

// 显示所有的流派。
exports.genreList = asyncHandler(async (req, res, next) => {
  const genres = await Genre.find().exec();
  console.log(`[ep] genreList: ${genres.length}`);
  res.render("catalog/genreList", { 
    title: "Book Instance List",
    genres_list: genres
  });
});

// Display detail page for a specific Genre.
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


// 通过 GET 显示创建流派。
exports.genreCreateGET = asyncHandler(async (req, res, next) => {
  res.send("未实现：流派创建 GET");
});

// 以 POST 方式处理创建流派。
exports.genreCreatePOST = asyncHandler(async (req, res, next) => {
  res.send("未实现：流派创建 POST");
});

// 通过 GET 显示流派删除表单。
exports.genreDeleteGET = asyncHandler(async (req, res, next) => {
  res.send("未实现：流派删除 GET");
});

// 处理 POST 时的流派删除。
exports.genreDeletePOST = asyncHandler(async (req, res, next) => {
  res.send("未实现：流派删除 POST");
});

// 通过 GET 显示流派更新表单。
exports.genreUpdateGET = asyncHandler(async (req, res, next) => {
  res.send("未实现：流派更新 GET");
});

// 处理 POST 上的流派更新。
exports.genreUpdatePOST = asyncHandler(async (req, res, next) => {
  res.send("未实现：流派更新 POST");
});
