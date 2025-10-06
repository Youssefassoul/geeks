const products = require("./products");

function findProductByName(productName) {
  const product = products.find((p) => p.name === productName);

  if (product) {
    console.log("Product found:");
    console.log(`Name: ${product.name}`);
    console.log(`Price: ${product.price}`);
    console.log(`Category: ${product.category}`);
  } else {
    console.log("⚠️ Product not found");
  }
}

findProductByName("Laptop");
findProductByName("Phone");
findProductByName("Shoes");
