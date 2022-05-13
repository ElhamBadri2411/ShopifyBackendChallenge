const express = require("express");
const Database = require("./Model/Database");
let cors = require("cors");

const app = express();

//connect to the database
let db = new Database();

app.use(express.json({ extended: false }));
app.use(cors());
app.use(express.static(__dirname + "/build"));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//set routes

// @route   GET api/inventory
// @desc    Get all inventory
// @access  Public
app.get("/api/inventory", async (req, res) => {
  //we do async await to simulate getting data from a database
  try {
    const inventory = await db.getAllInventory();
    console.log(inventory);
    res.json(inventory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/inventory/:id
// @desc    Get inventory by id
// @access  Public
app.get("/api/inventory/:id", async (req, res) => {
  //we do async await to simulate getting data from a database
  try {
    const id = req.params.id;
    //check if item exists
    console.log(id);
    console.log(await db.itemExists(id));
    if (!(await db.itemExists(id))) {
      return res.status(404).json({ msg: "Item not found" });
    }
    const inventory = await db.getInventory(id);
    // console.log(inventory);
    res.json(inventory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/inventory
// @desc    Add inventory
// @access  Public
app.post("/api/inventory", async (req, res) => {
  //we do async await to simulate getting data from a database
  try {
    const item = req.body;
    //validate item
    if (!item.name || !item.price || !item.quantity || !item.location) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }
    //check if price is correct format
    console.log(String(item.price));
    console.log(String(item.price).match(/\d*.\d\d/m));
    if (!String(item.price).match(/^\d+(\.\d{2})?$/)) {
      return res.status(400).json({ msg: "Please enter a valid price" });
    }

    //check if quantity is correct format
    if (
      !typeof item.quantity === "number" ||
      item.quantity < 0 ||
      !Number.isInteger(item.quantity)
    ) {
      return res.status(400).json({ msg: "Please enter a valid quantity" });
    }

    //check if item exists
    if (await db.itemExistsByFields(item)) {
      return res.status(400).json({ msg: "Item already exists" });
    }

    //add item
    // console.log(item);
    await db.addInventory(item);
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/inventory/:id
// @desc    Update inventory
// @access  Public
app.put("/api/inventory/:id", async (req, res) => {
  //we do async await to simulate getting data from a database
  try {
    const id = req.params.id;
    let item = req.body;
    //validate item
    if (!item.name || !item.price || !item.quantity || !item.location) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }
    //check if item exists
    if (!(await db.itemExists(id))) {
      return res.status(404).json({ msg: "Item not found" });
    }
    //update item
    item = await db.findByIdAndUpdate(id, item);
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/inventory/:id
// @desc    Delete inventory
// @access  Public
app.delete("/api/inventory/:id", async (req, res) => {
  //we do async await to simulate getting data from a database
  try {
    const id = req.params.id;
    //check if item exists
    if (!(await db.itemExists(id))) {
      return res.status(404).json({ msg: "Item not found" });
    }
    //get item
    const item = await db.getInventory(id);
    //delete item
    await db.deleteInventory(id);
    res.json({ item: item });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
