fetch("https://www.futurepedia.io/api/search", {
  headers: {
    accept: "application/json, text/plain, */*",
    "accept-language": "en,en-US;q=0.9",
    "content-type": "application/json",
    priority: "u=1, i",
    "sec-ch-ua":
      '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
  },
  referrer: "https://www.futurepedia.io/",
  referrerPolicy: "strict-origin-when-cross-origin",
  body: '{"verified":false,"sort":"featured","feature":[],"pricing":[],"q":"","page":2}',
  method: "POST",
  mode: "cors",
  credentials: "include",
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
