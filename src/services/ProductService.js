import axios from "axios";

class ProductService {
  constructor(realtimeDb, accessToken) {
    this.collectionName = "products.json";
    this.realtimeDb = realtimeDb;
    this.accessToken = accessToken;
  }

  insertProduct = async (entity) => {
    const res = await axios.post(this.realtimeDb + this.collectionName, entity);
    const insertId = await res.data.name;

    return insertId;
  };
  updateProduct = async (id, entity) => {
    const res = await axios.put(
      `${this.realtimeDb}products/${id}.json`,
      entity
    );

    return res.data;
  };
  deleteProduct = async (id) => {
    const res = await axios.delete(`${this.realtimeDb}products/${id}.json`);
    return res.data;
  };
  getProductById = async (id) => {
    const res = await axios.get(`${this.realtimeDb}products/${id}.json`);
    return res.data;
  };
  getProductAll = async (id) => {
    const res = await axios.get(this.realtimeDb + this.collectionName);
    return res.data;
  };
}
export default ProductService;
