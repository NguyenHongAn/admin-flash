import axiosClient from "../../api";
import URL from "../../api/URL";

function createRandomAvgScore(min, max) {
  return (Math.random() * (max - min) + min).toPrecision(3);
}

function genarateFakeNumber(start, length) {
  const seed = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let temp = start;
  for (let i = 0; i < length - start.length; i++) {
    const index = Math.floor(Math.random() * seed.length);
    temp += seed[index];
  }
  return temp;
}

const TEMPLATE_DATA = [
  {
    id: "a",
    orders: Math.floor(Math.random() * 1000),
    createdAt: new Date("03/21/2011"),
    avgReview: createRandomAvgScore(3, 5),
    reviews: Math.floor(Math.random() * 100),
    contractID: genarateFakeNumber("0", 10),
    email: "jipef40502@sejkt.com",
    name: "Quán Ăn Tisu - Nui & Mì Xào Bò - Shop Online",
    address: "25/2 Lý Tuệ, P. Tân Quý, Tân Phú, TP. HCM",
  },
  {
    id: "b",
    orders: Math.floor(Math.random() * 1000),
    createdAt: new Date("03/21/2011"),
    avgReview: createRandomAvgScore(3, 5),
    reviews: Math.floor(Math.random() * 100),
    contractID: genarateFakeNumber("0", 10),
    email: "somerandome@gmail.com",
    name: "Món Quảng Xuyên Việt",
    address: "39/10/11 Hoàng Bật Đạt, P. 15, Tân Bình, TP. HCM",
  },
  {
    id: "c",
    orders: Math.floor(Math.random() * 1000),
    createdAt: new Date("03/21/2011"),
    avgReview: createRandomAvgScore(3, 5),
    reviews: Math.floor(Math.random() * 100),
    contractID: genarateFakeNumber("0", 10),
    email: "somerandome@gmail.com",
    name: "Sunny House - Sinh Tố & Nước Ép",
    address: "499/24 Quang Trung, P. 10, Gò Vấp, TP. HCM",
  },
  {
    id: "d",
    orders: Math.floor(Math.random() * 1000),
    createdAt: new Date("03/21/2011"),
    avgReview: createRandomAvgScore(3, 5),
    reviews: Math.floor(Math.random() * 100),
    contractID: genarateFakeNumber("0", 10),
    email: "somerandome@gmail.com",
    name: "Bún Bò Đất Thánh - Shop Online",
    address: "221/16 Đất Thánh, P. 6, Tân Bình, TP. HCM",
  },
  {
    id: "e",
    orders: Math.floor(Math.random() * 1000),
    createdAt: new Date("03/21/2011"),
    avgReview: createRandomAvgScore(3, 5),
    reviews: Math.floor(Math.random() * 100),
    contractID: genarateFakeNumber("0", 10),
    email: "somerandome@gmail.com",
    name: "Quán Bún Dì Vân",
    address: "66/32 Trần Văn Quang, P. 10, Tân Bình, TP. HCM",
  },
  {
    id: "f",
    orders: Math.floor(Math.random() * 1000),
    createdAt: new Date("03/21/2011"),
    avgReview: createRandomAvgScore(3, 5),
    reviews: Math.floor(Math.random() * 100),
    contractID: genarateFakeNumber("0", 10),
    email: "somerandome@gmail.com",
    name: "Rules Of Tea - Trà Sữa Đế Vương - Nguyễn Văn Cừ",
    address: "213D Nguyễn Văn Cừ, P. 3, Quận 5, TP. HCM",
  },
];

const Service = {
  getRestaurantMangagementInfo: (city, search, page) => {
    return axiosClient.get(URL.ADMIN.GET_RESTAURANTS_INFO, {
      params: { city: city, search: search, page: page },
    });
  },
};

export default Service;
