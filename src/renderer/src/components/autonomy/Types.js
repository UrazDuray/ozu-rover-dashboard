class MarkerDictionary {
  constructor() {
    this._dict = {
      "Hammer": 1000,
      "Mullet": 1000,
      "Bottle": 1001
    };
  }

  getID(type) {
    if (type in this._dict) {
      return this._dict[type];
    }
    else {
      return type;
    }
  }
}

export default MarkerDictionary;