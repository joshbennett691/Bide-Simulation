// db.js
import Dexie from "dexie";

export const db = new Dexie("rules");
db.version(1).stores({
  rules: "++id", // Primary key and indexed props
});
