///////////////////////FILES///////////////////////
// Blocking, synchronous way
/*
const text = fs.readFileSync(
  "C:/Users/youss/OneDrive/Desktop/file.txt",
  "utf-8"
);
console.log(text);
fs.writeFileSync("C:/Users/youss/OneDrive/Desktop/file.txt", "My name is Ali");
*/

// Non-Blocking  - Asynchronous way
/*
fs.readFile("./txt/startl.txt", "utf-8", (error, data1) => {
  if (error) return console.log("there is error");
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (error, data2) => {
    console.log(data2);
    fs.writeFile("./txt/final.txt", `${data1}\n${data2}`, "utf-8", (error) => {
      console.log("DONE");
    });
  });
});
console.log(`i'm ali`);
*/

///////////////////SERVER//////////////////////////

const fs = require("fs");
const http = require("http");
const path = require("path");
const url = require("url");
const slugify = require("slugify");
const replaceTemplate = require("./modules/replacetemplate");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8");

const slugs = dataObj.map((el) =>
  slugify(el.productName, {
    lower: true,
  })
);

// console.log(slugify("Fresh Avocados", { lower: true, replacement: "#" }));

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  const pathUrl = req.url;
  //OVerView page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "conatant-type": "text/html",
    });
    const cardHtml = dataObj.map((el) => replaceTemplate(tempCard, el)).join("");
    const output = tempOverview.replace("{%product-cards%}", cardHtml);
    res.end(output);

    //Product Page
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product, asfsaf);
    res.end(output);
    //API
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "conatant-type": "application/json",
    });
    res.end(data);
    TODO;
    //Not Found
  } else {
    res.writeHead(404, {
      "contact-type": "text/html",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(5500, "127.0.0.1", () => {
  console.log("listening to request on port 5500");
});
