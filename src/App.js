import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { CSVLink, CSVDownload } from "react-csv";

const { Parser } = require('json2csv');


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      json: {},
      download: false
    }
    this.postToRepo = this.postToRepo.bind(this);
    this.postJob = this.postJob.bind(this);
    this.getJobResults = this.getJobResults.bind(this);
    this.exportToJson = this.exportToJson.bind(this);
    this.downloadJson = this.downloadJson.bind(this);
  }

  postToRepo(query) {
    const self = this;
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
            self.postJob(response.data.data.accessToken, query);
          })
          .catch(function (error) {
            console.log(error);
          });
  }

  postJob(token, query) {
    const self = this;
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
            self.getJobResults(token, response.data.data.resultsIds[0]);
          })
          .catch(function (error) {
            console.log(error);
          });
  };


  getJobResults(token, id) {
    const self = this;
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
            self.setState({json: response.data});
            console.log(self.state.json);
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

  exportToJson() {
      let filename = "export.json";
      let contentType = "application/json;charset=utf-8;";
      var a = document.createElement('a');
      a.download = filename;
      console.log(this.state.json);
      a.href = 'data:' + contentType + ',' + encodeURIComponent(this.state.json);
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }

    downloadJson(){
      var data = [this.state.json];
      document.createElement(<CSVDownload data={data} target="_blank" />);
        return(
          <CSVDownload data={data} target="_blank" />
        )
    }


    move(e) {
      switch(e.target.value){
        case 'example1': {
          this.postToRepo("rsbi:/Data Sources/DB2/QMF Catalog/Queries/DB2ADMIN/PRODUCTSQ");
        }
        case 'example2': {
          this.postToRepo("rsbi:/Data Sources/DB2/QMF Catalog/Queries/DB2ADMIN/PRODUCTSQ");
        }
        case 'example3':{
          this.postToRepo("rsbi:/Data Sources/DB2/QMF Catalog/Queries/DB2ADMIN/PRODUCTSQ");
        }
      }
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

  move1() {
    this.postToRepo("rsbi:/Data Sources/DB2/QMF Catalog/Queries/DB2ADMIN/PRODUCTSQ");
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

  move2() {
    this.postToRepo("rsbi:/Data Sources/DB2/QMF Catalog/Queries/DB2ADMIN/PRODUCTSQ");
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

  render() {
    return (
      <div>
        <body>
          <div className="header">
            <h1>QMF Catalog</h1>
          </div>
          <div className="row">
            <div>
              <div className="card">
                <h2>Example 1</h2>
                <h5>Title description, Dec 7, 2017</h5>
                <button className="button" value="example1" onClick={this.move1.bind(this)}><span>Run </span></button>
                <a href="#" className="buttonDownload" value="example1" onClick={this.downloadJson.bind(this)}>Download</a>
                {/* <h2 id="demo">  0%  </h2> */}
                <div id="myBar1"></div>
              </div>
              <div className="card">
                <h2>Example 2</h2>
                <h5>Title description, Dec 7, 2017</h5>
                <button className="button" value="example2" onClick={this.move2.bind(this)}><span>Run </span></button>
                <a href="#" className="buttonDownload" value="example2" onClick={this.exportToJson.bind(this)}>Download</a>
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
}
