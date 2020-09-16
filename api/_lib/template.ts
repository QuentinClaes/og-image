// import { readFileSync } from "fs";
// import { sanitizeHtml } from "./sanitizer";
// import { ParsedRequest } from "./types";
// const rglr = readFileSync(
//   `${__dirname}/../_fonts/Inter-Regular.woff2`
// ).toString("base64");
// const bold = readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString(
//   "base64"
// );
// const mono = readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString(
//   "base64"
// );

function getCss() {
  // let background = "white";
  // let foreground = "black";
  // let radial = "lightgray";

  // if (theme === "dark") {
  //   background = "black";
  //   foreground = "white";
  //   radial = "dimgray";
  // }
  return `
      html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      font: inherit;
      vertical-align: baseline;
    }
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
      display: block;
    }
    body {
      line-height: 1;
    }
    ol, ul {
      list-style: none;
    }
    blockquote, q {
      quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
      content: '';
      content: none;
    }
    table {
      border-collapse: collapse;
      border-spacing: 0;
    }

    html {
      box-sizing: border-box;
    }
    *, *:before, *:after {
      box-sizing: inherit;
    }

    body {
      background: #0b4d76;
      color: white;
      font-family: "pragmatica-slabserif";
      height: 627px;
      width: 1200px;
    }
    .review-container {
      padding: 60px 100px 0px 100px;
      font-size: 40px;
    }
    .review-header {
      display: flex;
      justify-content: space-between;
      padding-bottom: 20px;
    }
    .review-header div {
      display: flex;
    }
    .review-header-rating img {
      width: 270px;
      height: 100%;
    }
    .review-header-picture {
      margin-right: 40px;
      position: relative;
      height: 160px;
      width: 160px;
      top: 0;
      left: 0;
      display: flex;
      margin-bottom: 20px;
    }
    .review-header-picture img {
      border-radius: 5px;
      position: relative;
      top: 0;
      left: 0;
      display: flex;
      width: 100%;
      height: auto;
    }
    .review-header-user {
      display: flex;
      flex-direction: column;
    }
    .review-header-user .review-header-user-name {
      font-weight: bolder;
      margin-bottom: 20px;
    }
    .company-size {
      background-color: white;
      color: #0b4d76;
      border-radius: 10px;
      padding: 0 12px;
      padding-top: 8px;
      padding-bottom: 6px;
      margin-top: -5px;
      margin-left: 30px;
    }
    .company-size span {
      font-family: "ainslie-sans";
      font-weight: bold;
      font-size: 30px;
    }
    .review-header-user .review-header-user-position,
    .review-header-user .review-header-user-company {
      color: #74a9ca;
      font-family: "ainslie-sans";
      text-transform: uppercase;
      font-size: 30px;
      margin: 6px 0;
    }
    .review-header-user .review-header-user-company {
      font-weight: bolder;
    }
    .provider-rating {
      display: block !important;
    }
    .logo-area {
      background-color: white;
      text-align: center;
      min-width: 180px;
      max-width: 180px;
      max-height: 180px;
      padding: 20px;
      height: fit-content;
      width: fit-content;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      margin: auto;
    }
    .logo-area img {
      display: flex;
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
      margin: auto;
    }
    .review-title {
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: 10px;
      margin-bottom: 40px;
    }
    .review-content {
      color: #74a9ca;
      font-size: 26px;
      line-height: 1.3;
    }
    .review-footer {
      left: 0;
      bottom: 0;
      position: absolute;
      background: #03436b;
      height: 75px;
      width: 100%;
      padding-left: 100px;
      display: flex;
    }
    .review-footer img {
      height: fit-content;
      width: auto;
      margin: auto 0;
    }
`;
}

// export function getHtml(parsedReq: ParsedRequest, test: object) {
export function getHtml(Data: string, Content: string, CompanyTitle: string, CompanyName: string) {
  // const { theme, fontSize, rating, id } = parsedReq;
  // console.log("test2 dans le brol", test);
  console.log("test dans template.tsx", Data);
  return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Cuustomer review</title>
    <link rel="stylesheet" href="https://use.typekit.net/qrj1sqs.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss()}
    </style>
  <body>
    <div class="review-container">
      <div class="review-header">
        <div>
          <div class="review-header-picture">
            <img src="https://i.ibb.co/x7F6Tgb/Profile-Picture.png" />
          </div>
          <div class="review-header-user">
            <div>
              <span class="review-header-user-name"> John D. </span>
              <span>
                <div class="company-size">
                  <span>PME</span>
                </div>
              </span>
            </div>
            <span class="review-header-user-position"> ${CompanyTitle} </span>
            <span class="review-header-user-company"> ${CompanyName} </span>
          </div>
        </div>
        <div class="provider-rating">
          <div class="logo-area">
            <img src="https://i.ibb.co/HYN7K7Q/octa-shrink.jpg" />
          </div>
          <div class="review-header-rating">
            <img src="https://i.ibb.co/5hGbmTS/stars4.png" />
          </div>
        </div>
      </div>
      <div class="review-title">
        <span>${Data}</span>
      </div>
      <div class="review-content">
        <span>
          ${Content}
        </span>
      </div>

      <div class="review-footer">
        <img src="https://i.ibb.co/ySgQGhz/Logotype.png" />
      </div>
    </div>
  </body>
</html>`;
}
