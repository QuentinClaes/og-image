import { IncomingMessage, ServerResponse } from "http";
import { parseRequest } from "./_lib/parser";
import { getScreenshot } from "./_lib/chromium";
import { getHtml } from "./_lib/template";
import axios from "axios";
const isDev = !process.env.AWS_REGION;
const isHtmlDebug = process.env.OG_HTML_DEBUG === "1";
function getData() {
  axios({
    url: "https://cuustomer-api-cafdaa7625.herokuapp.com/cuustomer-new-api/dev",
    method: "post",
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNlcnZpY2UiOiJjdXVzdG9tZXItbmV3LWFwaUBkZXYiLCJyb2xlcyI6WyJhZG1pbiJdfSwiaWF0IjoxNTk5NjkzOTc5LCJleHAiOjE2MDAyOTg3Nzl9.sFDXbxUJ6DSndPpyeVpKYaGLuZuWENbsqLZihrVpl_A`,
    },
    data: {
      query: `query {
          reviews(where:{provider:{name:"Proximus"}, id: 94}){
            id 
            title
            content
          }
        }`,
    },
  }).then((result) => {
    return result.data;
  });
}
export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
) {
  const test = await getData();
  console.log("mon test", test);
  try {
    const parsedReq = parseRequest(req);
    const html = getHtml(parsedReq);
    if (isHtmlDebug) {
      res.setHeader("Content-Type", "text/html");
      res.end(html);
      return;
    }
    const { fileType } = parsedReq;
    const file = await getScreenshot(html, fileType, isDev);
    res.statusCode = 200;
    res.setHeader("Content-Type", `image/${fileType}`);
    res.setHeader(
      "Cache-Control",
      `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`
    );
    res.end(file);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Internal Error</h1><p>Sorry, there was a problem</p>");
    console.error(e);
  }
}
