const BASE_URL = "http://localhost:3001";

class UserDataApi {
  async fetchUsers(): Promise<any[]> {
    const url = `${BASE_URL}/users`;
    const response = await fetch(url);
    return await response.json();
  }
  async fetchRoles(): Promise<any[]> {
    try {
      const url = `${BASE_URL}/roles`;
      const response = await fetch(url);
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error(`Server error : ${response.status} => ${response.statusText}`);
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }
  async fetchResources(): Promise<any[]> {
    try {
      const url = `${BASE_URL}/resources`;
      const response = await fetch(url);
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error(`Server error : ${response.status} => ${response.statusText}`);
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }
  async upsertUser(user: any, isNew?: boolean): Promise<any> {
    const url = isNew ? `${BASE_URL}/users` : `${BASE_URL}/users/${user.id}`;
    const method = isNew ? "post" : "put";
    const response = await fetch(url, {
      method,
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(`Server error : ${response.status} => ${response.statusText}`);
    }
  }
  async upsertRole(role: any, isNew?: boolean): Promise<any> {
    const url = isNew ? `${BASE_URL}/roles` : `${BASE_URL}/roles/${role.id}`;
    const method = isNew ? "post" : "put";
    const response = await fetch(url, {
      method,
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(role)
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(`Server error : ${response.status} => ${response.statusText}`);
    }
  }
}

export default new UserDataApi();
