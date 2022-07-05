const { log } = require("console");
const fs=require("fs");
const { readFile } = require("fs/promises");
const http=require("http");
const jsdom = require("jsdom");
const url=require("url")
const { JSDOM } = jsdom;


const login=fs.readFileSync("./html/Login.html","utf-8")
const main=fs.readFileSync("./html/main.html","utf-8")
const card=fs.readFileSync("./html/card.html","utf-8")
const obj1=fs.readFileSync("./json/data.json","utf-8")
const fruit=fs.readFileSync("./html/fruit.html","utf-8")
const addfruit=fs.readFileSync("./html/addfruit.html","utf-8")

const func=require("./funcmodul.js")
const obj=JSON.parse(obj1)

// const dom = new JSDOM(login);
// dom.window.document.querySelector("h1").textContent;

// const loginbtn=dom.window.document.querySelector(".btn")
// loginbtn.addEventListener("click",function(e){
//   // e.preventDefault()
//   const a=dom.window.document.querySelector("h1").textContent;
//   console.log(a)

//   fs.writeFileSync("./logintext.txt",a)
// })




const server=http.createServer((req,res)=>{
  const overview=obj.map(val=>{
    return func(card,val);
  }).join('')
  const urlcha=req.url;
  let query1=+url.parse(urlcha,true).query.id;
  console.log(query1)
  // let query1=1;
 
  const render=main.replace("{fruitmain}",overview)
  if(urlcha=="/login"){
    res.writeHead(200,{
      "content-type":"text/html"
    })
    res.end(login)
  }
  
  else if(urlcha==`/fruit?id=${query1}`){
    let b=obj.find(val=>val.id==query1);
    let x=func(fruit,b);

    res.writeHead(200,{
      "content-type":"text/html"
    })
    res.end(x);
  }

  else if(urlcha=="/addfruit"){
    res.writeHead(200,{
      "content-type":"text/html"
    })
    res.end(addfruit)
  }

  else if(urlcha=="/main" || urlcha=="/"){
    res.writeHead(200,{
      "content-type":"text/html"
    })
    res.end(render)
  }

  
  else{
    res.writeHead(404,{
      "content-type":"text/plain"
    })
    res.end("Bu sayt ishlamadi")
  }
})

server.listen("8000","127.0.0.2");