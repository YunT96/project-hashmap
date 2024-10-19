import "./styles.css";

import HashMap from "./hashmap";

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log(test);
console.log(test.getLoadFactor());

// expand the hashmap by exceeding the threshold
test.set("moon", "silver");

console.log(test);
console.log(test.getLoadFactor());
console.log(test.has("apple"));

test.set("apple", "green");

console.log(test);
console.log(test.getLoadFactor());

console.log(test.entries());
