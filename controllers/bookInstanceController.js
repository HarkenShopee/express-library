const BookInstance = require("../models/bookinstance");
const asyncHandler = require("express-async-handler");

// 呈现所有书本实例（BookInstance）的列表
exports.bookInstanceList = asyncHandler(async (req, res, next) => {
  const allBookInstances = await BookInstance.find().populate("book").exec();

  res.render("catalog/bookInstanceList", {
    title: "Book Instance List",
    bookinstance_list: allBookInstances,
  });
});


// 展示特定 BookInstance 的详情页。
exports.bookInstanceDetail = asyncHandler(async (req, res, next) => {
  const bookInstance = await BookInstance.findById(req.params.id)
    .populate("book")
    .exec();

  if (bookInstance === null) {
    // 没有结果。
    const err = new Error("Book copy not found");
    err.status = 404;
    return next(err);
  }

  res.render("catalog/bookInstanceDetail", {
    title: "Book:",
    bookinstance: bookInstance,
  });
});


// 由 GET 显示创建 BookInstance 的表单
exports.bookInstanceCreateGET = asyncHandler(async (req, res, next) => {
  res.send("未实现：BookInstance 创建 GET");
});

// 由 POST 处理创建 BookInstance
exports.bookInstanceCreatePOST = asyncHandler(async (req, res, next) => {
  res.send("未实现：BookInstance 创建 POST");
});

// 由 GET 显示删除 BookInstance 的表单
exports.bookInstanceDeleteGET = asyncHandler(async (req, res, next) => {
  res.send("未实现：BookInstance 删除 GET");
});

// 由 POST 删除 BookInstance
exports.bookInstanceDeletePOST = asyncHandler(async (req, res, next) => {
  res.send("未实现：BookInstance 删除 POST");
});

// 由 GET 显示更新 BookInstance 的表单
exports.bookInstanceUpdateGET = asyncHandler(async (req, res, next) => {
  res.send("未实现：BookInstance 更新 GET");
});

// 由 POST 处理更新 BookInstance
exports.bookInstanceUpdatePOST = asyncHandler(async (req, res, next) => {
  res.send("未实现：BookInstance 更新 POST");
});
