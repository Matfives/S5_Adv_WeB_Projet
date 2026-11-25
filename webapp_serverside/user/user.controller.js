const repo = require('./user.repository');

function parseId(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    res.status(400).json({ error: 'Invalid user id.' });
    return null;
  }
  return id;
}

function validate(body, res) {
  const b = body || {};
  if (!b.user_name || !String(b.user_name).trim()) {
    res.status(400).json({ error: 'user_name is required.' });
    return null;
  }
  const restId = Number(b.rest_id);
  if (!Number.isInteger(restId)) {
    res.status(400).json({ error: 'rest_id is required.' });
    return null;
  }
  return {
    user_name: String(b.user_name).trim(),
    user_type: b.user_type ?? null,
    user_phone: b.user_phone ?? null,
    user_birthdate: b.user_birthdate ?? null,
    user_city: b.user_city ?? null,
    rest_id: restId
  };
}

async function getUsers(req, res, next) {
  try {
    res.json(await repo.getAllUsers());
  } catch (error) {
    next(error);
  }
}

async function getUser(req, res, next) {
  try {
    const id = parseId(req, res);
    if (id === null) return;
    const user = await repo.getUserById(id);
    if (!user) return res.status(404).json({ error: 'User not found.' });
    res.json(user);
  } catch (error) {
    next(error);
  }
}

async function createUser(req, res, next) {
  try {
    const data = validate(req.body, res);
    if (!data) return;
    res.status(201).json(await repo.createUser(data));
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    const id = parseId(req, res);
    if (id === null) return;
    const data = validate(req.body, res);
    if (!data) return;
    const user = await repo.updateUser(id, data);
    if (!user) return res.status(404).json({ error: 'User not found.' });
    res.json(user);
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    const id = parseId(req, res);
    if (id === null) return;
    const deleted = await repo.deleteUser(id);
    if (!deleted) return res.status(404).json({ error: 'User not found.' });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };