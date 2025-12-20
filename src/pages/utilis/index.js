import axios from "axios";

export const imageUpload = async (imageData) => {
  const formData = new FormData();
  formData.append("image", imageData);

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
    formData
  );
  return data?.data?.display_url;
};

// save or update user in db
// export const saveOrUpdateUser = async (userData) => {
//   const { data } = await axios.post(
//     `${import.meta.env.VITE_LOCALHOST}user`,
//     userData
//   );
//   return data;
// };

export const saveOrUpdateUser = async (userData, token) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_LOCALHOST}/users`,
    userData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data;
};
