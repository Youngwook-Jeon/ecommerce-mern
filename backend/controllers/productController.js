const RECORDS_PER_PAGE = require("../config/pagination");
const Product = require("../models/ProductModel");

const getProducts = async (req, res, next) => {
  try {
    let query = {};
    let queryCondition = false;
    let priceQueryCondition = {};
    if (req.query.price) {
      queryCondition = true;
      priceQueryCondition = { price: { $lte: Number(req.query.price) } };
    }

    let ratingQueryCondition = {};
    if (req.query.rating) {
      queryCondition = true;
      ratingQueryCondition = { rating: { $in: req.query.rating.split(",") } };
    }

    if (queryCondition) {
      query = {
        $and: [priceQueryCondition, ratingQueryCondition],
      };
    }

    const pageNum = Number(req.query.pageNum) || 1;

    // sort by name, price etc
    let sort = {};
    const sortOption = req.query.sort || "";
    if (sortOption) {
      let sortOpt = sortOption.split("_");
      sort = { [sortOpt[0]]: Number(sortOpt[1]) };
    }

    const totalProducts = await Product.countDocuments(query);
    const products = await Product.find(query)
      .skip(RECORDS_PER_PAGE * (pageNum - 1))
      .sort(sort)
      .limit(RECORDS_PER_PAGE);

    res.json({
      products,
      pageNum,
      paginationLinksNumber: Math.ceil(totalProducts / RECORDS_PER_PAGE),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getProducts;
