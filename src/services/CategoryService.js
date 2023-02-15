import axios from "axios";

class CategoryService {
  constructor(realtimeDb, accessToken) {
    this.collectionName = "categories.json";
    this.realtimeDb = realtimeDb;
    this.accessToken = accessToken;
  }

  insertCategory = async (entity) => {
    const res = await axios.post(this.realtimeDb + this.collectionName, entity);
    const insertId = await res.data.name;

    return insertId;
  };
  updateCategory = async (id, entity) => {
    const res = await axios.put(
      `${this.realtimeDb}categories/${id}.json`,
      entity
    );

    return res.data;
  };
  deleteCategory = async (id) => {
    const res = await axios.delete(`${this.realtimeDb}categories/${id}.json`);
    return res.data;
  };
  getCategoryById = async (id, entity) => {
    const res = await axios.get(`${this.realtimeDb}categories/${id}.json`);
    return res.data;
  };
  getCategoryAll = async (id) => {
    const res = await axios.get(this.realtimeDb + this.collectionName);
    return res.data;
  };
}
export default CategoryService;
