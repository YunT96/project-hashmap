export default class HashMap {
  constructor() {
    this.bucketSize = 16;
    this.buckets = new Array(this.bucketSize);
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode %= this.bucketSize; // reduce to value between 0 and bucketSize - 1
    }
    console.log(`Hashcode for ${key} is ${hashCode}`);
    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }
    this.buckets[index] = value;
  }

  get(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }
    if (this.buckets[index] === undefined) {
      return null;
    }
    return this.buckets[index];
  }

  remove(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }
    if (this.buckets[index] !== undefined) {
      delete this.buckets[index];
      return true;
    }

    return false;
  }

  length() {
    return this.buckets.length;
  }
}
