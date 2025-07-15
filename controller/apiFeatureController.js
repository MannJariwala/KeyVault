import db from "../connect.js";

export async function handleDelete(req, res) {
  const id = req.params.id;
  const [del] = await db.execute(`delete from api_keys where id = ${id}`);
  if (del.affectedRows > 0) return res.redirect("/dashboard");
}

export async function handleDisplayEdit(req, res) {
  const editMode = req.query.edit === "1";

  const [rows] = await db.execute(
    "select * from api_keys where id = " + req.params.id
  );

  res.render("view_edit", {
    key: rows[0],
    editMode,
  });
}

export async function handleEdit(req, res) {
  const id = req.params.id;
  const { name, service, environment, api_key_value, notes } = req.body;

  await db.execute(
    "update api_keys set name = ?,service = ?,environment = ?,api_key_value = ?,notes = ?, updated_at = NOW() where id = ?",
    [name, service, environment, api_key_value, notes, id]
  );

  res.redirect("/Dashboard");
}

export async function handleCopy(req, res) {
  const id = req.params.id;
  await db.execute("UPDATE api_keys SET last_copied_at = NOW() WHERE id = ?", [
    id,
  ]);
}

export async function handleShowAddPage(req, res) {
  res.render("add_key");
}

export async function handleAddKey(req, res) {
  const { name, service, environment, api_key_value, notes } = req.body;
  const user_id = req.user.data.id;
  await db.execute(
    "insert into api_keys(user_id,name,service,environment,api_key_value,notes,last_copied_at,created_at,updated_at) values(?,?,?,?,?,?,?,NOW(),NOW())",
    [user_id, name, service, environment, api_key_value, notes, null]
  );
  res.redirect("/Dashboard");
}
