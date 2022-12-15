import EditProductPageComponent from "./components/EditProductPageComponent";
import { useSelector } from "react-redux";
import axios from "axios";

const fetchProduct = async (productId) => {
  const { data } = await axios.get(`/api/products/get-one/${productId}`);
  return data;
}

const updateProductApiRequest = (productId, formInputs) => {
  console.log(productId);
}

const AdminEditProductPage = () => {
  const { categories } = useSelector((state) => state.getCategories);

  return (
    <EditProductPageComponent categories={categories} fetchProduct={fetchProduct} updateProductApiRequest={updateProductApiRequest} />
  );
};

export default AdminEditProductPage;
