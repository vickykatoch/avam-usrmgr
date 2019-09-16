class UserDataApi {
  async fetchUsers(): Promise<any[]> {
    const url = "http://localhost:8600/users";
    const response = await fetch(url);
    return await response.json();
  }
}

export default new UserDataApi();
