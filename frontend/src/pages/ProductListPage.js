import ProductListPageComponent from "./components/ProductListPageComponent";
import axios from "axios";
import { useSelector } from "react-redux";

// ex: "&price=50&rating=1,2,3&category=a,b,c,d&attrs=color-red-blue,size-1TB-2TB"
let filtersUrl = "";

const getProducts = async (categoryName = "", pageNum = null, searchQuery = "", filters = {}, sortOption = "") => {
  const search = searchQuery ? `search/${searchQuery}/` : "";
  const category = categoryName ? `category/${categoryName}/` : "";
  const url = `/api/products/${category}${search}?pageNum=${pageNum}${filtersUrl}&sort=${sortOption}`;
  const { data } = await axios.get(url);
  return data;
}

const ProductListPage = () => {
  const { categories } = useSelector((state) => state.getCategories);

  return (
    <ProductListPageComponent getProducts={getProducts} categories={categories} />
  );
};

export default ProductListPage;
