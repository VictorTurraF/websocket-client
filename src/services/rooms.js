import { authenticatedClient as client } from "./client";

function listAll() {
  return client.get("/rooms");
}

export { listAll }