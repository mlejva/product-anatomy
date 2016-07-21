class Query {
  constructor(id = null, name = null, founders = null) {
      this.id = id;
      this.name = name;
      this.founders = founders;
  }

  queryWithID(id) {
    this.id = id;
    this.name = null;
    this.founders = null;
  }

  queryWithName(name) {
    this.id = null;
    this.name = name;
    this.founders = null;
  }

  queryWithFounders(founders) {
    this.id = null;
    this.name = null;
    this.founders = founders;
  }
}
