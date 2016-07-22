class Query {
  constructor(id, name, founders) {
    if (id !== {}) {
      this.id = id;
    }
    else if (name !== {}) {
      this.name = name;
    }
    else if (founders !== {}) {
      this.founders = founders;
    }
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
