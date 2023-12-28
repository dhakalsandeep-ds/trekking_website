import { axiosInstance } from "./axiosInstances";

export const getAllData = async (endpoint) => {
  const result = await axiosInstance
    .get(endpoint)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
  return result;
};

export const storeData = async (endpoint, data) => {
  const result = await axiosInstance
    .post(endpoint, data)
    .then((res) => {
      console.log("kkkk")
      return res;
    })
    .catch((err) => {
      return err;
    });
  return result;
};

export const updateData = async (endpoint, updatedData) => {
  const result = await axiosInstance
    .post(endpoint, updatedData)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('error.........',err)
      return err;
    });
  return result;
};

export const deleteData = async (endpoint) => {
  const result = await axiosInstance
    .delete(endpoint)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
  return result;
};
