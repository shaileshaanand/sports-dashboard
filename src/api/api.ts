import {
  ArticleDetail,
  ArticleList,
  CreateUserPayload,
  Match,
  MatchList,
  SignInPayload,
  SportList,
  Teams,
} from "../types";

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

export const getMatches = () =>
  fireRequest({
    method: "GET",
    path: "/matches",
  }) as Promise<MatchList>;

export const getMatch = (id: number) =>
  fireRequest({
    method: "GET",
    path: "/matches/:id",
    params: {
      id,
    },
  }) as Promise<Match>;

export const getSports = () =>
  fireRequest({
    method: "GET",
    path: "/sports",
  }) as Promise<SportList>;

export const getArticles = () =>
  fireRequest({
    method: "GET",
    path: "/articles",
  }) as Promise<ArticleList>;

export const getArticle = (id: number) =>
  fireRequest({
    method: "GET",
    path: "/articles/:id",
    params: {
      id,
    },
  }) as Promise<ArticleDetail>;

export const getTeams = () =>
  fireRequest({
    method: "GET",
    path: "/teams",
  }) as Promise<Teams>;
