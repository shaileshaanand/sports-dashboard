import { CreateUserPayload } from "../types";

import fireRequest from "./fireRequest";

export const createUser = (body: CreateUserPayload) =>
  fireRequest("POST", "/users", body, true, {}, undefined, false);
