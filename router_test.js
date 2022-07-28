const { fork } = require("child_process");
const express = require("express");
const routerTest = express.Router();
let alias = process.argv[2]
let default_value=process.argv[3]


routerTest.get("/info" , (req,res)=>{
    res.send(`
    The <strong>args</strong> are : <strong>alias</strong>:<span style="color:blue">${alias}</span>: <strong>default_value</strong>:<span style="color:green">${default_value}</span>,
    the <strong>path</strong> is <span style="color:green">${process.argv[0]}</span>, 
    and the <strong>process name </strong>: <span style="color:green">${process.platform}</span>,
    the <strong>process_id</strong> is :<span style="color:green">${process.pìd}</span>,
    the used <strong>node_version </strong>is : <span style="color:green">${process.version}</span>,
    and finally the <strong>project_path </strong>is : <span style="color:green">${process.argv[1]}</span>
    and the <strong>memory_usage</strong> is <span style="color:blue">rss </span>:<span style="color:green">${process.memoryUsage().rss}</span></span>
    `)
})
let contador=0 ;
routerTest.get("/", (req,res)=>{
    contador++;
    res.send({contador})
})
routerTest.get("/randoms",(req,res)=>{
    let qty = req.query.qty;
    !req.query.qty ? qty=100000 : qty;
    let forked = fork("./test.js");
    forked.send({"qty":qty});
    forked.on("message", (msg)=>{
    if (msg) {
    res.send(JSON.stringify(msg.result));
    }
    })
})
module.exports=routerTest;