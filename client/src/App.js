import "./App.css";
import axios from "axios";
import Item from "./Item";
import { useState, useEffect } from "react";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    location: "",
  });
  const [currentId, setCurrentId] = useState(null);
  const [items, setItems] = useState([]); //
  const [deletedItems, setDeletedItems] = useState([]);

  let API_URL = process.env.API_URL || "http://localhost:3001/api";

  const handleUpdate = (id) => {
    setCurrentId(id);
    const item = items.find((i) => i.id === id);
    setFormData({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      location: item.location,
    });
  };

  const handleDelete = async (id, comment) => {
    if (!comment) {
      comment = "";
    }
    console.log("comment: ", comment);
    const item = items.find((i) => i.id === id);
    item.comment = comment;
    setDeletedItems([...deletedItems, item]);

    setItems(items.filter((i) => i.id !== id));
    await axios.delete(`${API_URL}/inventory/${id}`);
  };

  const clearForm = (e) => {
    e.preventDefault();
    if (currentId) {
      setCurrentId(null);
    }
    setFormData({
      name: "",
      price: "",
      quantity: "",
      location: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId) {
      const item = items.find((i) => i.id === currentId);
      item.name = formData.name;
      item.price = formData.price;
      item.quantity = formData.quantity;
      item.location = formData.location;
      setItems([...items]);
      setCurrentId(null);
      clearForm(e);
      await axios.put(`${API_URL}/inventory/${currentId}`, item);
    } else {
      const result = await axios.post(`${API_URL}/inventory`, formData);
      setItems([...items, result.data]);
      setFormData({
        name: "",
        price: "",
        quantity: "",
        location: "",
      });
      setCurrentId(null);
    }
  };

  const restoreItem = async (item) => {
    const result = await axios.post(`${API_URL}/inventory`, item);
    setItems([...items, result.data]);
    setDeletedItems(deletedItems.filter((i) => i.id !== item.id));
  };

  const getAllInventory = async () => {
    const inventory = await axios.get(`${API_URL}/inventory`);
    setItems(inventory.data);
  };

  //useeffect to get all inventory on page load
  useEffect(() => {
    getAllInventory(); ///////
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "50%",
          marginTop: "1rem",
        }}>
        <label style={{ margin: "2px", heigh: "2rem" }}> Name </label>
        <input
          style={{ margin: "2px", height: "2rem" }}
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <label style={{ margin: "2px", height: "2rem" }}> Price </label>
        <input
          style={{ margin: "2px", height: "2rem" }}
          type="text"
          name="price"
          value={formData.price}
          placeholder="Enter a price (e.g. 10.00)"
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
        <label style={{ margin: "2px", height: "2rem" }}> Quantity </label>
        <input
          style={{ margin: "2px", height: "2rem" }}
          type="text"
          name="quantity"
          value={formData.quantity}
          placeholder=" Enter a number (e.g. 19)"
          onChange={(e) =>
            setFormData({ ...formData, quantity: e.target.value })
          }
        />
        <label style={{ margin: "2px", height: "2rem" }}> Location </label>
        <input
          style={{ margin: "2px", height: "2rem" }}
          type="text"
          name="location"
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
        />
        <button
          style={{
            margin: "2px",
            height: "2rem",
            color: "white",
            backgroundColor: "black",
          }}
          type="submit">
          {currentId ? "Update" : "Add"}
        </button>
        <button
          style={{
            margin: "2px",
            height: "2rem",
            color: "white",
            backgroundColor: "blue",
          }}
          onClick={clearForm}>
          {currentId ? "Cancel" : "Clear"}
        </button>
      </form>

      {/* ALL ITEMS */}
      <div style={{ backgroundColor: "lightGreen", padding: "1rem" }}>
        <h1>Inventory</h1>
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
        ))}
      </div>

      {/* DELETED ITEMS */}
      <div style={{ backgroundColor: "lightPink", padding: "1rem" }}>
        <h1>Deleted Items</h1>
        {deletedItems.map((item) => (
          <div key={item.id}>
            {console.log(item.id)}
            <h2>{item.name}</h2>
            <p>{"$" + item.price}</p>
            <p>{"Qty: " + item.quantity}</p>
            <p>{"Located: " + item.location}</p>
            {item.comment ? <p>{"Delete reason: " + item.comment}</p> : null}
            <button onClick={() => restoreItem(item)}>Restore</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
