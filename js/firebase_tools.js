let instance = null;

class FirebaseTools {

  constructor(config) {

    if (!instance) {
      instance = this;

      firebase.initializeApp(config);
      this.database = firebase.database();
      this.storage = firebase.storage();
    }

    return instance;
  }

  // If count is not specified then ask for 10 products if possible
  // If productIDs are not specified then take first N products according to count variable
  // TODO: Constant for count var
  getProducts(count = 10, productIDs = []) {
    let products = [];

    return products;
  }

  queryForProducts(query) {
    let products = [];

    return products;
  }
}
