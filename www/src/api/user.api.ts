const BASE_URL = "http://localhost:3001";

class UserDataApi {
  async fetchUsers(): Promise<any[]> {
    const url = `${BASE_URL}/users`;
    const response = await fetch(url);
    return await response.json();
  }

  async upsertUser(user: any, isNew: boolean): Promise<any> {
    const url = `${BASE_URL}/users`;
    const response = await fetch(url, {
      method: isNew ? "post" : "put",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type?": " application/json"
      },
      body: JSON.stringify(user)
    });
    return await response.json();
  }
}

export default new UserDataApi();
