import "./styles.css";

import HashMap from "./hashmap";

const map = new HashMap();

map.set("carlos", "fenandez");
map.set("carla", "hernandez");

console.log(map);
console.log(`search for carla: ${map.get("carla")}`);
console.log(`search for foo: ${map.get("foo")}`);

console.log(`remove carla: ${map.remove("carla")}`);

console.log(map);

console.log(`length: ${map.length()}`);
