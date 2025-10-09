export const getRoleStorage = (role) => {
  if (role === "Artist") return "artistsData";
  if (role === "Visitor") return "visitorsCart";
  if (role === "Curator") return "curatorsExhibitions";
  return null;
};

export const addDataForUser = (role, username, newData) => {
  const key = getRoleStorage(role);
  if (!key) return;

  const data = JSON.parse(localStorage.getItem(key)) || {};
  if (!data[username]) data[username] = [];
  data[username].push(newData);
  localStorage.setItem(key, JSON.stringify(data));
};

export const getDataForUser = (role, username) => {
  const key = getRoleStorage(role);
  if (!key) return [];
  const data = JSON.parse(localStorage.getItem(key)) || {};
  return data[username] || [];
};
