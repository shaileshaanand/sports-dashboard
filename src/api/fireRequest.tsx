const baseUrl = "https://wd301-capstone-api.pupilfirst.school";

type Options = {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers: Headers;
  body?: string;
};

const fireRequest = async (
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  path: string,
  body?: Object,
  bodyRequired: boolean = false,
  pathParam?: Object,
  params?: Object,
  authenticationRequired: boolean = false
) => {
  //headers
  let requestPath = path;
  const authToken = JSON.parse(localStorage.getItem("auth_token") ?? "");
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  if (authenticationRequired)
    headers.append("Authorization", `Bearer ${authToken}`);

  // fetch api options
  const options: Options = {
    method,
    headers,
  };

  if (bodyRequired) options.body = JSON.stringify(body);

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
        console.error("Unauthorized access denied");
        localStorage.removeItem("access_token");
      } else if (res[0].status === 405) console.error("Permission denied");
      else if (res[0].status >= 400) {
        res[1].forEach((err: any) => {
          if (typeof err === "string")
            console.error(
              err.replace(/\w\S*/g, (w: any) =>
                w.replace(/^\w/, (c: any) => c.toUpperCase())
              )
            );
          else
            console.error(
              err.replace(/\w\S*/g, (w: any) =>
                w.replace(/^\w/, (c: any) => c.toUpperCase())
              )
            );
        });
      }

      return res[1];
    })
    .catch(() => console.error("Something went wrong"));
  return response;
};

export default fireRequest;
