import CreateProductPageComponent from "./components/CreateProductPageComponent";
import axios from "axios";
import { uploadImagesApiRequest, uploadImagesCloudinaryApiRequest } from "./utils/utils";
import { useSelector, useDispatch } from "react-redux";
import { newCategory, deleteCategory, saveAttributeToCatDoc } from "../../redux/actions/categoryActions";

const createProductApiRequest = async (formInputs) => {
  const { data } = await axios.post(`/api/products/admin`, { ...formInputs });
  return data;
};

const AdminCreateProductPage = () => {
  const { categories } = useSelector((state) => state.getCategories);
  const dispatch = useDispatch();

  return (
    <CreateProductPageComponent
      uploadImagesApiRequest={uploadImagesApiRequest}
      createProductApiRequest={createProductApiRequest}
      uploadImagesCloudinaryApiRequest={uploadImagesCloudinaryApiRequest}
      categories={categories}
      reduxDispatch={dispatch}
      newCategory={newCategory}
      deleteCategory={deleteCategory}
      saveAttributeToCatDoc={saveAttributeToCatDoc}
    />
  );
};

export default AdminCreateProductPage;
