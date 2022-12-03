import UserProfilePageComponent from "./components/UserProfilePageComponent";
import axios from "axios";
import { useSelector } from "react-redux";

const updateUserApiRequest = async (
  name,
  lastName,
  phoneNumber,
  address,
  country,
  zipCode,
  city,
  state,
  password
) => {
  const { data } = await axios.put("/api/users/profile", {
    name,
    lastName,
    phoneNumber,
    address,
    country,
    zipCode,
    city,
    state,
    password,
  });

  return data;
};

const fetchUser = async (user_id) => {
  const { data } = await axios.get("/api/users/profile/" + user_id);
  return data;
}

const UserProfilePage = () => {
  const { userInfo } = useSelector((state) => state.userRegisterLogin);
  
  return (
    <UserProfilePageComponent updateUserApiRequest={updateUserApiRequest} fetchUser={fetchUser} userInfo={userInfo} />
  );
};

export default UserProfilePage;
