//mock db for storing inventory, can be replaced with a real database
function createId() {
  return String(Math.floor(Math.random() * 1000000));
}

module.exports = class Database {
  constructor() {
    this.inventory = [
      {
        id: "123456",
        name: "Item 1",
        price: 10,
        quantity: 10,
        location: "Ontario",
      },
      {
        id: "123457",
        name: "Item 2",
        price: 20,
        quantity: 20,
        location: "New York",
      },
      {
        id: "123458",
        name: "Item 3",
        price: 30,
        quantity: 30,
        location: "California",
      },
    ];
  }

  //get all inventory
  getAllInventory() {
    return this.inventory;
  }

  //get inventory by id
  getInventory(id) {
    return this.inventory.find((item) => item.id === id);
  }

  //check if item exists
  itemExists(id) {
    return this.inventory.find((item) => item.id === id);
  }

  //check if item exists by fields
  itemExistsByFields(item) {
    return this.inventory.find(
      (i) =>
        i.name === item.name &&
        i.price === item.price &&
        i.quantity === item.quantity &&
        i.location === item.location
    );
  }

  //add item
  addInventory(item) {
    item.id = createId();
    this.inventory.push(item);
  }

  //update item
  findByIdAndUpdate(id, item) {
    const index = this.inventory.findIndex((i) => i.id === id);
    if (index !== -1) {
      this.inventory[index].id = id;
      this.inventory[index].name = item.name;
      this.inventory[index].price = item.price;
      this.inventory[index].quantity = item.quantity;
      this.inventory[index].location = item.location;
    }
    return this.inventory[index];
  }

  //delete item
  deleteInventory(id) {
    const index = this.inventory.findIndex((i) => i.id === id);
    this.inventory.splice(index, 1);
  }
};
