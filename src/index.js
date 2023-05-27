class Item {
  constructor(value) {
    this.name = value.name;
    this.price = value.price;
  }
}

class Player {
  constructor(name, balance) {
    this.name = name;
    this.balance = balance;
    this.inventory = [];
  }

  buy(item, shop) {
    if (this.balance >= item.price && shop.hasItem(item)) {
      this.balance -= item.price;
      this.inventory.push(item);
      shop.sell(item);
      console.log(`${this.name} bought ${item.name} for ${item.price} coins.`);
    } else {
      console.log(`${this.name} can't buy ${item.name}.`);
    }
  }

  sell(item, shop) {
    const itemIndex = this.inventory.findIndex((i) => i.name === item.name);
    if (itemIndex !== -1) {
      this.balance += item.price;
      this.inventory.splice(itemIndex, 1);
      shop.buy(item);
      console.log(`${this.name} sold ${item.name} for ${item.price} coins.`);
    } else {
      console.log(`${this.name} doesn't have ${item.name} to sell.`);
    }
  }

  displayInventory() {
    console.log(`${this.name}'s Inventory:`);
    if (this.inventory.length === 0) {
      console.log(`(empty)`);
    } else {
      this.inventory.forEach((item) => {
        console.log(`${item.name} - ${item.price} coins`);
      });
    }
  }
}

class Shop {
  constructor(name, inventory) {
    this.name = name;
    this.inventory = inventory;
  }

  hasItem(item) {
    return this.inventory.some((i) => i.name === item.name);
  }

  sell(item) {
    const itemIndex = this.inventory.findIndex((i) => i.name === item.name);
    if (itemIndex !== -1) {
      this.inventory.splice(itemIndex, 1);
    }
  }

  buy(item) {
    this.inventory.push(item);
  }

  displayInventory() {
    console.log(`${this.name}'s Inventory:`);
    if (this.inventory.length === 0) {
      console.log(`(empty)`);
    } else {
      this.inventory.forEach((item) => {
        console.log(`${item.name} - ${item.price} coins`);
      });
    }
  }

  findItemByName(name) {
    return this.inventory.find((item) => item.name === name);
  }
}

// Create shop and player instances
const shop = new Shop('Armory', []);
const player = new Player('Player', 100);

function buyItem() {
  const itemName = document.getElementById('itemInput').value;
  const item = shop.findItemByName(itemName);

  if (item) {
    player.buy(item, shop);
  } else {
    console.log(`Item '${itemName}' not found in the shop.`);
  }
}

// Attach the buyItem function to the button click event
document.getElementById('buyButton').addEventListener('click', buyItem);

// Fetch item data from the JSON file
fetch('items.json')
  .then((response) => response.json())
  .then((itemsData) => {
    // Create shop inventory based on the JSON data
    const shopInventory = Object.values(itemsData).flatMap((itemArray) =>
      itemArray.map((itemData) => new Item(itemData))
    );

    // Update the shop inventory
    shop.inventory = shopInventory;
  });
