/* eslint-disable no-undef */
const base_url = "https://hipaadev.us";

export interface OrgCredential {
  email: string;
  password: string;
}
export interface LoginCredential {
  org_id: string;
  username: string;
  password: string;
}
export interface Token {
  access_toke: string;
  expires_in: number;
  token_type: string;
  scope: any;
  refresh_token: string;
  client_id: string;
  client_secret: string;
  user_id: string;
  tags: string;
  error: string;
}

export async function getOrganizations(requestData: OrgCredential) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append("email", requestData.email);
  urlencoded.append("password", requestData.password);

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  const response = await fetch(`${base_url}/api/1.0/getorgs.php`, requestOptions);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}

export async function Login(requestData: LoginCredential): Promise<Token> {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  const urlencoded = new URLSearchParams();
  urlencoded.append("org_id", requestData.org_id);
  urlencoded.append("username", requestData.username);
  urlencoded.append("password", requestData.password);

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  const response = await fetch(`${base_url}/api/1.0/login.php`, requestOptions);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Couldn't Login");
  }
  return data;
}
