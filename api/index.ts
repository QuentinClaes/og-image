import axios from "axios";
import { IncomingMessage, ServerResponse } from "http";
import { getScreenshot } from "./_lib/chromium";
import { parseRequest } from "./_lib/parser";
import { getHtml } from "./_lib/template";
import { ParsedRequest } from "./_lib/types";

const isDev = !process.env.AWS_REGION;


function getData(parsedReq: ParsedRequest) {
  const { text, id } = parsedReq;
  const test = axios({
    url: "https://cuustomer-api-cafdaa7625.herokuapp.com/cuustomer-new-api/dev",
    method: "post",
    data: {
      query: `query {
          reviews(where:{provider:{name: "${text ? text : "Proximus"}"}, id: ${id ? id : 94}}){
            id
            title
            content
            rating
            provider {
              logo
            }
            author {
              name
              companyName
              title
              companySize
            }
          }
        }`,
    },
  }).then((result) => {
    return result.data;
  });
  return test;
}
export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
) {
  try {
    const parsedReq = parseRequest(req);
    const test = await getData(parsedReq);
    const ImagesRatingArray = ["https://i.ibb.co/6NbqYPN/stars1.png","https://i.ibb.co/F5nNGgv/stars3.png","https://i.ibb.co/xCSz4qg/stars2.png","https://i.ibb.co/5hGbmTS/stars4.png","https://i.ibb.co/F0zKX6w/stars5.png"]
    const ImageRating = ImagesRatingArray[test.data.reviews[0].rating - 1]
    const Title = test.data.reviews[0].title
    const Content = test.data.reviews[0].content
    const Name = test.data.reviews[0].author.name
    const CompanyTitle = test.data.reviews[0].author.title
    const CompanyName = test.data.reviews[0].author.companyName
    const Logo = test.data.reviews[0].provider.logo
    const html = getHtml(Title, Content, CompanyTitle, CompanyName, Name, ImageRating, Logo);
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
    res.end(e);
    console.error(e);
  }
}
