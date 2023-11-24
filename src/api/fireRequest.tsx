import { notifications } from "@mantine/notifications";

const baseUrl = "https://wd301-capstone-api.pupilfirst.school";

type Options = {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers: Headers;
  body?: string;
};

const showErrorNotification = (message: string) => {
  notifications.show({
    title: "Error",
    message,
    color: "red",
  });
};

const fireRequest = async ({
  method,
  path,
  body,
  pathParam,
  params,
  authenticationRequired = true,
}: {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  body?: Object;
  pathParam?: Object;
  params?: Object;
  authenticationRequired?: boolean;
}) => {
  //headers
  let requestPath = path;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  if (authenticationRequired) {
    const authToken =
      localStorage.getItem("auth_token") !== "undefined"
        ? JSON.parse(localStorage.getItem("auth_token") ?? "")
        : "";

    headers.append("Authorization", `Bearer ${authToken}`);
  }

  // fetch api options
  const options: Options = {
    method,
    headers,
  };

  if (body) options.body = JSON.stringify(body);

  // modifying path according to params
  if (params) {
    Object.entries(params).forEach((obj) => {
      requestPath = requestPath.replace(`:${obj[0]}`, obj[1]);
    });
  }

  // modifying requestPath according to pathParam
  if (pathParam) {
    requestPath += "?";
    Object.entries(pathParam).forEach((obj) => {
      requestPath += `${obj[0]}=${obj[1]}`;
    });
  }

  // calling fetch api
  const response = fetch(baseUrl + requestPath, options)
    .then((resp) => {
      const data = resp.json();
      return Promise.all([resp, data]);
    })
    .then((res) => {
      if (res[0].status === 401) {
        showErrorNotification("Unauthorized access denied");
        localStorage.removeItem("access_token");
      } else if (res[0].status === 405)
        showErrorNotification("Permission denied");
      else if (res[0].status >= 400) {
        res[1].forEach((err: any) => {
          if (typeof err === "string")
            showErrorNotification(
              err.replace(/\w\S*/g, (w: any) =>
                w.replace(/^\w/, (c: any) => c.toUpperCase())
              )
            );
          else
            showErrorNotification(
              err.replace(/\w\S*/g, (w: any) =>
                w.replace(/^\w/, (c: any) => c.toUpperCase())
              )
            );
        });
      }

      return res[1];
    })
    .catch(() => showErrorNotification("Something went wrong"));
  return response;
};

export default fireRequest;
