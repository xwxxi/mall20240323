import axios from "@/utils/axios";

// // 商品分类-分页列表
// export const getProductCategoryList = (data: any) => {
//   return axios({
//     url: "/product/productCategory/list",
//     method: "post",
//     data,
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
// };
// // 业务商品列表-获取关联商品列表
// export const getRenewProductList = (data: any) => {
//   let params = `${data.countryCode}&productCategoryId=${data.productCategoryId}&renewFlag=${data.renewFlag}&saleMonth=${data.saleMonth}`;
//   return axios({
//     url: "/product/productInfo/renewProductList?countryCode=" + params,
//     method: "get",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
// };

// 测试
export const getProductFindSwiper = () => {
  return axios({
    url: "/api/product/findSwiper",
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });
};