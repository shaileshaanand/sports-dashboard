import { CreateUserPayload, SignInPayload } from "../types";

import fireRequest from "./fireRequest";

export const createUser = (body: CreateUserPayload) =>
  fireRequest({
    method: "POST",
    path: "/users",
    body,
    authenticationRequired: false,
  });

export const signinUser = (body: SignInPayload) =>
  fireRequest({
    method: "POST",
    path: "/users/sign_in",
    body,
    authenticationRequired: false,
  });
