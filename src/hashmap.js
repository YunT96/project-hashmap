import Node from "./node.js";

export default class HashMap {
  constructor(initialCapacity = 16, loadFactor = 0.75) {
    this.buckets = new Array(initialCapacity).fill(null);
    this.size = 0;
    this.loadFactor = loadFactor;
    this.threshold = Math.floor(initialCapacity * loadFactor);
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return hashCode % this.buckets.length;
  }

  set(key, value) {
    // Check if resizing is necessary before adding a new element
    if (this.size >= this.threshold) {
      this.resize();
    }

    const index = this.hash(key);
    if (!this.buckets[index]) {
      // if bucket is empty, create new node
      this.buckets[index] = new Node(key, value);
      this.size++;
    } else {
      let current = this.buckets[index];
      // loop through bucket to find matching key
      while (current) {
        if (current.key === key) {
          // if key is found, update value and return
          current.value = value;
          return;
        }
        if (!current.next) {
          // if key is not found at the end, add new node
          current.next = new Node(key, value);
          this.size++;
          return;
        }
        current = current.next;
      }
    }
  }

  get(key) {
    // calculate the index location
    const index = this.hash(key);
    let current = this.buckets[index];

    // loop through bucket to find matching key
    while (current) {
      if (current.key === key) {
        return current.value;
      }
      current = current.next;
    }
    return null;
  }

  has(key) {
    const index = this.hash(key);
    let current = this.buckets[index];
    while (current) {
      if (current.key === key) {
        return true;
      }
      current = current.next;
    }
    return false;
  }

  remove(key) {
    const index = this.hash(key);
    let current = this.buckets[index];
    let prev = null;

    while (current) {
      if (current.key === key) {
        if (prev) {
          // if not the first node, set the previous node's next to the current node's next
          prev.next = current.next;
        } else {
          // if the first node, update the bucket to point to the current node's next
          this.buckets[index] = current.next;
        }
        this.size--;
        return true;
      }
      prev = current;
      current = current.next;
    }
    return false;
  }

  // New method to resize the HashMap when it reaches the threshold
  resize() {
    const oldBuckets = this.buckets;
    this.buckets = new Array(this.buckets.length * 2).fill(null);
    this.size = 0;
    this.threshold = Math.floor(this.buckets.length * this.loadFactor);
    for (let i = 0; i < oldBuckets.length; i++) {
      let current = oldBuckets[i];
      while (current) {
        this.set(current.key, current.value);
        current = current.next;
      }
    }
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = new Array(this.buckets.length).fill(null);
    this.size = 0;
  }

  keys() {
    const keys = [];
    for (let i = 0; i < this.buckets.length; i++) {
      let current = this.buckets[i];
      while (current) {
        keys.push(current.key);
        current = current.next;
      }
    }
    return keys;
  }

  values() {
    const values = [];
    for (let i = 0; i < this.buckets.length; i++) {
      let current = this.buckets[i];
      while (current) {
        values.push(current.value);
        current = current.next;
      }
    }
    return values;
  }

  entries() {
    const entries = [];
    for (let i = 0; i < this.buckets.length; i++) {
      let current = this.buckets[i];
      while (current) {
        entries.push([current.key, current.value]);
        current = current.next;
      }
    }
    return entries;
  }

  // New method to get the current load factor
  getLoadFactor() {
    return this.size / this.buckets.length;
  }
}
