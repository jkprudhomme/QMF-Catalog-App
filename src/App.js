import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const { Parser } = require('json2csv');

var json = {};


function postToRepo(query) {
  const uri = "/api/repositories/DTS/connect";
  const data = {
  	"repositoryStorage":
  	{
  		"login": "db2admin",
  		"password": "R0cket123"
  	}
  }
    axios.request({
      method: "post",
      url: uri,
      timeout: 300000,
      headers: {
      "Content-Type": "application/json",
      },
      data: data,
    })
        .then(function (response) {
          console.log(response.data);
          console.log(response.status);
          console.log(response.statusText);
          console.log(response.data.data);
          postJob(response.data.data.accessToken, query);
        })
        .catch(function (error) {
          console.log(error);
        });
}


function postJob(token, query) {
  const uri = "/api/repositories/DTS/runObject?accessToken=" + token;
  const data = {
    	"key": query,
    	"dataSources":
    		[
    			{
    				"name": "DB2",
    				"type": "RELATIONAL",
    				"login": "db2admin",
    				"password": "R0cket123"
    			}
    		]
    }
    axios.request({
      method: "post",
      url: uri,
      timeout: 300000,
      headers: {
      "Content-Type": "application/json",
      },
      data: data,
    })
        .then(function (response) {
          console.log(response.data);
          console.log(response.status);
          console.log(response.statusText);
          getJobResults(token, response.data.data.resultsIds[0]);
        })
        .catch(function (error) {
          console.log(error);
        });
}


function getJobResults(token, id) {
  const uri = "/api/repositories/DTS/results/" + id + "?offset=0&limit=10&accessToken=" + token;
    axios.request({
      method: "get",
      url: uri,
      timeout: 300000,
      headers: {
      "Content-Type": "application/json",
      },
    })
        .then(function (response) {
          console.log(response.data);
          console.log(response.status);
          console.log(response.statusText);
        })
        .catch(function (error) {
          console.log(error);
        });
}

// function makeFile(json) {
//   try {
//     const parser = new Parser(opts);
//     const csv = parser.parse(myData);
//     console.log(csv);
//   } catch (err) {
//     console.error(err);
//   }
// }

function exportToJson() {
    let filename = "export.json";
    let contentType = "application/json;charset=utf-8;";
    var a = document.createElement('a');
    a.download = filename;
    a.href = 'data:' + contentType + ',' + encodeURIComponent(json);
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }



function move1() {
  postToRepo("rsbi:/Data Sources/DB2/QMF Catalog/Queries/DB2ADMIN/PRODUCTSQ");
  var elem = document.getElementById("myBar1");
  var width = 0;
  var padding = 0;
  //elem.style.paddingLeft = "400px"
  var id = setInterval(frame, 10);
  function frame() {
    if (width >= 12) {
      clearInterval(id);
      elem.innerHTML = "Complete";
      elem.style.color = "#12cf0e";
      elem.style.backgroundColor = "#fff9f2";
      elem.style.textAlign = "center";
      elem.style.paddingRight = "150px";
      elem.style.paddingLeft = "150px";
    } else {
      padding++;
      elem.style.paddingRight = padding + '%';
      elem.style.paddingLeft = padding + '%';
      elem.style.textAlign = "center";
      width++;
      elem.style.width = width + '%';
      elem.innerHTML = width * 4  + '%';
      //document.getElementById("demo").innerHTML = width * 4  + '%';
    }
  }
}

function move2() {
  postToRepo("rsbi:/Data Sources/DB2/QMF Catalog/Queries/DB2ADMIN/PRODUCTSQ");
  var elem = document.getElementById("myBar2");
  var width = 0;
  var padding = 0;
  //elem.style.paddingLeft = "400px"
  var id = setInterval(frame, 10);
  function frame() {
    if (width >= 12) {
      clearInterval(id);
      elem.innerHTML = "Complete";
      elem.style.color = "#12cf0e";
      elem.style.backgroundColor = "#fff9f2";
      elem.style.textAlign = "center";
      elem.style.paddingRight = "150px";
      elem.style.paddingLeft = "150px";
    } else {
      padding++;
      elem.style.paddingRight = padding + '%';
      elem.style.paddingLeft = padding + '%';
      elem.style.textAlign = "center";
      width++;
      elem.style.width = width + '%';
      elem.innerHTML = width * 4  + '%';
      //document.getElementById("demo").innerHTML = width * 4  + '%';
    }
  }
}



function App() {
  return (
    <div>
    <body>
    <div className="header">
      <h1>QMF Catalog</h1>
    </div>


    <div className="row">
      <div >
        <div className="card">
          <h2>Example 1</h2>
          <h5>Title description, Dec 7, 2017</h5>
          <button className="button" onClick={move1}><span>Run </span></button>
          <a href="#" className="buttonDownload" onClick={exportToJson}>Download</a>
          {/* <h2 id="demo">  0%  </h2> */}
        <div id="myBar1"></div>
        </div>
        <div className="card">
          <h2>Example 2</h2>
          <h5>Title description, Dec 7, 2017</h5>
          <button className="button" onClick={move2}><span>Run </span></button>
          <a href="#" className="buttonDownload" onClick={exportToJson}>Download</a>
          {/* <h2 id="demo">  0%  </h2> */}
          <div id="myBar2"></div>
        </div>
      </div>
    </div>

    <div className="footer">
      <p>Rocket Software 2019</p>
    </div>

    </body>

    </div>
  );
}

export default App;
