import db from "./connect.js";

const [rows] = await db.execute(
  "select * from users where email = 'mann@gmail.com'"
);

console.log(rows[0].master_password_hash);
