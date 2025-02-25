const Book = require("../models/book");
const Author = require("../models/author");
const Genre = require("../models/genre");
const BookInstance = require("../models/bookinstance");

const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  // 并行获取书的详细信息、书实例、作者和体裁的数量
  const [
    numBooks,
    numBookInstances,
    numAvailableBookInstances,
    numAuthors,
    numGenres,
  ] = await Promise.all([
    Book.countDocuments({}).exec(),
    BookInstance.countDocuments({}).exec(),
    BookInstance.countDocuments({ status: "Available" }).exec(),
    Author.countDocuments({}).exec(),
    Genre.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Harken's Library Home",
    book_count: numBooks,
    book_instance_count: numBookInstances,
    book_instance_available_count: numAvailableBookInstances,
    author_count: numAuthors,
    genre_count: numGenres,
  });
});


// 呈现数据库中所有书本的列表
exports.bookList = asyncHandler(async (req, res, next) => {
  const allBooks = await Book.find({}, "title author")
    .sort({ title: 1 })
    .populate("author")
    .exec();

  res.render("catalog/bookList", { title: "Book List", book_list: allBooks });
});

// 显示特定书籍的详细信息页面。
exports.bookDetail = asyncHandler(async (req, res, next) => {
  // 获取书籍的详细信息，以及特定书籍的实例
  const [book, bookInstances] = await Promise.all([
    Book.findById(req.params.id).populate("author").populate("genre").exec(),
    BookInstance.find({ book: req.params.id }).exec(),
  ]);

  if (book === null) {
    // 没有结果。
    const err = new Error("Book not found");
    err.status = 404;
    return next(err);
  }

  res.render("catalog/bookDetail", {
    title: book.title,
    book: book,
    book_instances: bookInstances,
  });
});


// 通过 GET 显示创建图书。
exports.bookCreateGET = asyncHandler(async (req, res, next) => {
  res.send("未实现：创建图书 GET");
});

// 以 POST 方式处理创建图书。
exports.bookCreatePOST = asyncHandler(async (req, res, next) => {
  res.send("未实现：Book 创建 POST");
});

// 通过 GET 显示删除图书。
exports.bookDeleteGET = asyncHandler(async (req, res, next) => {
  res.send("未实现：删除 GET");
});

// 以 POST 方式处理删除图书。
exports.bookDeletePOST = asyncHandler(async (req, res, next) => {
  res.send("未实现：删除 POST");
});

// 通过 GET 显示更新图书。
exports.bookUpdateGET = asyncHandler(async (req, res, next) => {
  res.send("未实现：更新图书 GET");
});

// 处理 POST 时的更新图书。
exports.bookUpdatePOST = asyncHandler(async (req, res, next) => {
  res.send("未实现：更新图书 POST");
});
