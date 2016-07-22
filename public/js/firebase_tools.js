var instance = null;

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
  getProducts(count, productIDs) {
    var products = [];

    return products;
  }

  getProductsByQuery(query, callback) {

    var products = [];

    if (query.id !== null) {

      console.log(CONST.FIREBASE_PRODUCTS_PATH + '/' + query.id);
      firebase.database().ref(CONST.FIREBASE_PRODUCTS_PATH + '/' + query.id).once('value').then(function(snapshot) {
        var product = new Product(snapshot.val(), {});
        callback([product]);
      });
    }
    else if (query.name !== null) {

    }
    else if (query.founders !== null) {

    }
  }
}
