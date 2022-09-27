const RECORDS_PER_PAGE = require("../config/pagination");
const Product = require("../models/ProductModel");

const getProducts = async (req, res, next) => {
  try {
    const pageNum = Number(req.query.pageNum) || 1;
    const totalProducts = await Product.countDocuments({});
    const products = await Product.find({})
      .skip(RECORDS_PER_PAGE * (pageNum - 1))
      .sort({ name: 1 })
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
