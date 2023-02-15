import axios from "axios";

class OrdersService {
  constructor(realtimeDb, accessToken) {
    this.collectionName = "orders.json";
    this.realtimeDb = realtimeDb;
    this.accessToken = accessToken;
  }

  insertOrder = async (entity) => {
    const res = await axios.post(this.realtimeDb + this.collectionName, entity);
    const insertId = await res.data.name;

    return insertId;
  };
  updateOrder = async (id, entity) => {
    const res = await axios.put(`${this.realtimeDb}orders/${id}.json`, entity);

    return res.data;
  };
  deleteOrder = async (id) => {
    const res = await axios.delete(`${this.realtimeDb}orders/${id}.json`);
    return res.data;
  };
  getOrderById = async (id) => {
    const res = await axios.get(`${this.realtimeDb}orders/${id}.json`);
    return res.data;
  };
  getOrderAll = async (id) => {
    const res = await axios.get(this.realtimeDb + this.collectionName);
    return res.data;
  };
  // getProductByCategory = async (categoryId) => {
  //   const collect = collection(apiLink, "catego")
  // }
}
export default OrdersService;
