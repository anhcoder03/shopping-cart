import axios from "axios";

class OrderDetailService {
  constructor(realtimeDb, accessToken) {
    this.collectionName = "order_detail.json";
    this.realtimeDb = realtimeDb;
    this.accessToken = accessToken;
  }

  insertOrderDetail = async (entity) => {
    const res = await axios.post(this.realtimeDb + this.collectionName, entity);
    const insertId = await res.data.name;

    return insertId;
  };
  updateOrderDetail = async (id, entity) => {
    const res = await axios.put(
      `${this.realtimeDb}order_detail/${id}.json`,
      entity
    );

    return res.data;
  };
  deleteOrderDetail = async (id) => {
    const res = await axios.delete(`${this.realtimeDb}order_detail/${id}.json`);
    return res.data;
  };
  getOrderDetailById = async (id) => {
    const res = await axios.get(`${this.realtimeDb}order_detail/${id}.json`);
    return res.data;
  };
  getOrderDetailAll = async (id) => {
    const res = await axios.get(this.realtimeDb + this.collectionName);
    return res.data;
  };
  // getProductByCategory = async (categoryId) => {
  //   const collect = collection(apiLink, "catego")
  // }
}
export default OrderDetailService;
