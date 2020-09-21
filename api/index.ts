import axios from "axios";
import { IncomingMessage, ServerResponse } from "http";
import { getScreenshot } from "./_lib/chromium";
import { parseRequest } from "./_lib/parser";
import { getHtml } from "./_lib/template";
import { ParsedRequest } from "./_lib/types";
import { getImage } from "./_lib/contentful"
const isDev = !process.env.AWS_REGION;


function getData(parsedReq: ParsedRequest) {
  const { text, id} = parsedReq;
  const test = axios({
    url: "https://cuustomer-api-cafdaa7625.herokuapp.com/cuustomer-new-api/dev",
    method: "post",
    data: {
      query: `query {
          reviews(where:{provider:{name: "${text ? text : "Proximus"}"}, id: ${id ? id : 94}}){
            id
            title
            titleFr
            titleNl
            titleEn
            content
            contentFr
            contentNl
            contentEn
            rating
            provider {
              logo
            }
            author {
              name
              companyName
              title
              companySize
              userId
              familyName
              givenName
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
    const { locale } = parsedReq;
    const test = await getData(parsedReq);
    const PmeArrayFr = ["freelance", "Pme", "Grande entreprise"]
    const PmeArrayNl = ["freelance nl", "Pme nl", "Grande entreprise nl"]
    const PmeArrayEn = ["freelance en", "Pme en", "Grande entreprise en"]
    const PME = locale === "fr" ? PmeArrayFr[test.data.reviews[0].author.companySize === "1" ? 1 : test.data.reviews[0].author.companySize === "2-10" ? 2 : 3] : locale === "nl" ? PmeArrayNl[test.data.reviews[0].author.companySize === "1" ? 1 : test.data.reviews[0].author.companySize === "2-10" ? 2 : 3] : PmeArrayEn[test.data.reviews[0].author.companySize === "1" ? 1 : test.data.reviews[0].author.companySize === "2-10" ? 2 : 3]
    const ImagesRatingArray = ["https://i.ibb.co/6NbqYPN/stars1.png","https://i.ibb.co/F5nNGgv/stars3.png","https://i.ibb.co/xCSz4qg/stars2.png","https://i.ibb.co/5hGbmTS/stars4.png","https://i.ibb.co/F0zKX6w/stars5.png"]
    const ImageRating = ImagesRatingArray[test.data.reviews[0].rating - 1]
    var Title = locale === "fr" ? test.data.reviews[0].titleFr : locale === "nl" ? test.data.reviews[0].titleNl : test.data.reviews[0].titleEn
    var Contenu = locale === "fr" ? test.data.reviews[0].contentFr : locale === "nl" ? test.data.reviews[0].contentNl : test.data.reviews[0].contentEn
    const ImgUrl = await getImage(test.data.reviews[0].author.userId)
    const CompanyTitle = test.data.reviews[0].author.title
    const CompanyName = test.data.reviews[0].author.companyName
    const familyName = test.data.reviews[0].author.familyName
    const givenName = test.data.reviews[0].author.givenName
    const Logo = test.data.reviews[0].provider.logo
    const html = getHtml(Title, CompanyTitle, CompanyName, ImageRating, Logo, ImgUrl, Contenu, familyName, givenName, PME);
    const { fileType } = parsedReq;
    const file = await getScreenshot(html, fileType, isDev);
    res.statusCode = 200;
    res.setHeader("Content-Type", `image/${fileType}`);
    res.setHeader(
      "Cache-Control",
      `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`
    );
    res.end(file);
    // res.end(html);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end(e);
    console.error(e);
  }
}
