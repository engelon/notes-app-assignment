import httpClient from "./httpClient";

export function signup(email, password) {
  return httpClient.post("/auth/signup", { email, password }).then(res => res.data);
}

export function login(email, password) {
  return httpClient.post("/auth/login", { email, password }).then(res => res.data);
}
