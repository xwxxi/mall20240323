import axios from "@/utils/axios";

export const adminLogin = (data: any) => {
  return axios({
    url: "/admin/adminLogin",
    method: "post",
    data,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
