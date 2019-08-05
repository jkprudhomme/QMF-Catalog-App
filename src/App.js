import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { CSVLink, CSVDownload } from "react-csv";
import { BADRESP } from 'dns';

const { Parser } = require('json2csv');


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      json1: [],
      json2: [],
      json3: [],
      json4: [],
      download: false
    }
    this.postToRepo = this.postToRepo.bind(this);
    this.postJob = this.postJob.bind(this);
    this.getJobResults = this.getJobResults.bind(this);
    // this.exportToJson = this.exportToJson.bind(this);
    // this.downloadJson = this.downloadJson.bind(this);
  }

  postToRepo(query, bar, login, password) {
    const self = this;
    const uri = "/api/repositories/DTS/connect";
    const data = {
    	"repositoryStorage":
    	{
    		"login": login,//"db2admin",
    		"password": password//"R0cket123"
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
            console.log("connecting to repo")
            console.log(response.data);
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.data.data);
            bar.style.border = "2px solid #4a0d75";
            bar.style.backgroundColor = '#4a0d75';
            bar.style.color = 'white';
            bar.style.paddingRight = '6%';
            bar.style.paddingLeft = '6%';
            bar.style.textAlign = "center";
            bar.innerHTML = '30%';
            self.postJob(response.data.data.accessToken, query, bar, login, password);
          })
          .catch(function (error) {
            console.log(bar.id)
            console.log(error);
            if(bar.id == "myBar1"){
              document.getElementById("err1").style.display = "inline-block";
            }else if(bar.id =="myBar2"){
              document.getElementById("err2").style.display = "inline-block";
            }else if (bar.id =="myBar3"){
              document.getElementById("err3").style.display = "inline-block";
            }else if(bar.id == "myBar4"){
              document.getElementById("err4").style.display = "inline-block";
            }
          });
  }

  postJob(token, query, bar, login, password) {
    const self = this;
    const uri = "/api/repositories/DTS/runObject?accessToken=" + token;
    const data = {
      	"key": query,
      	"dataSources":
      		[
      			{
      				"name": "DB2",
      				"type": "RELATIONAL",
      				"login": login,//"db2admin",
      				"password": password//"R0cket123"
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
            bar.style.paddingRight = '12%';
            bar.style.paddingLeft = '12%';
            bar.style.textAlign = "center";
            bar.innerHTML = '60%';
            self.getJobResults(token, response.data.data.resultsIds[0], bar);
          })
          .catch(function (error) {
            console.log(error);
          });
  };


  getJobResults(token, id, bar) {
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
            clearInterval(id);
            bar.innerHTML = "Complete";
            bar.style.color = "#12cf0e";
            bar.style.backgroundColor = "#fff9f2";
            bar.style.textAlign = "center";
            bar.style.paddingRight = "150px";
            bar.style.paddingLeft = "150px";
            console.log(bar.id);
            switch(bar.id){
              case('myBar1'): {
                self.setState({json1: response.data.data.rows});
                document.getElementById("dwnld1").style.display = "inline-block";
                document.getElementById("err1").style.display = "none";
                console.log(response.data.data.rows);
                
                break;
              }
              case('myBar2'): {
                self.setState({json2: response.data.data.rows});
                document.getElementById("dwnld2").style.display = "inline-block";
                document.getElementById("err2").style.display = "none";
                console.log(self.state.json2);
                break;
              }
              case('myBar3'): {
                self.setState({json3: response.data.data.rows});
                document.getElementById("dwnld3").style.display = "inline-block";
                document.getElementById("err3").style.display = "none";
                console.log(self.state.json3);
                break;
              }
              case('myBar4'): {
                self.setState({json4: response.data.data.rows});
                document.getElementById("dwnld4").style.display = "inline-block";
                document.getElementById("err4").style.display = "none";
                console.log(self.state.json4);
                break;
              }
              default: {
                break;
              }
            }
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

  // exportToJson() {
  //     let filename = "export.json";
  //     let contentType = "application/json;charset=utf-8;";
  //     var a = document.createElement('a');
  //     a.download = filename;
  //     console.log(this.state.json);
  //     a.href = 'data:' + contentType + ',' + encodeURIComponent(this.state.json);
  //     a.target = '_blank';
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);
  //   }

  //   downloadJson(){
  //     var data = [this.state.json];
  //     document.createElement(<CSVDownload data={data} target="_blank" />);
  //       return(
  //         <CSVDownload data={data} target="_blank" />
  //       )
  //   }


    move(e) {
      var login = document.getElementById('uname').value;
      var pass = document.getElementById('pass').value;
      document.getElementById('id01').style.display='none';
      console.log(e.target.value);
      switch(e.target.value){
        case 'example1': {
          console.log("running example1");
          this.postToRepo("rsbi:/Data Sources/DB2/QMF Catalog/Queries/DB2ADMIN/PRODUCTSQ", document.getElementById("myBar1"), login, pass);
          break;
        }
        case 'example2': {
          console.log("running example2");
          this.postToRepo("rsbi:/Data Sources/DB2/QMF Catalog/Queries/DB2ADMIN/APPLICANTQ", document.getElementById("myBar2"), login, pass);
          break;
        }
        case 'example3':{
          console.log("running example3");
          this.postToRepo("rsbi:/Data Sources/DB2/QMF Catalog/Queries/DB2ADMIN/STAFFQ", document.getElementById("myBar3"), login, pass);
          break;
        }
        case 'example4':{
          console.log("running example4");
          this.postToRepo("rsbi:/Data Sources/DB2/QMF Catalog/Queries/DB2ADMIN/SALESQ", document.getElementById("myBar4"), login, pass);
          break;
        }
        default: {
          break;
        }
      }
    }


  login(e) {
    console.log(e.target.value)
    document.getElementById('id01').style.display = 'block';
    document.getElementById('submitButton').value = e.target.value;
  }

  removeLogin(e) {
    document.getElementById('id01').style.display='none';
  }

  clickDownload(e) {
    console.log(e);
  }

  render() {
    return (
      <div>
          <div className="header">
            <h1>QMF Catalog</h1>
          </div>
          <div className="row">
            <div>
              <div className="card">
                <h2>Example 1</h2>
                <h5>Products Query</h5>

                <button className="button" value="example1" onClick={this.login.bind(this)}>Run</button>
                <div className="error" id= "err1">Incorrect login and password.</div>
                <CSVLink className="buttonDownload"  id="dwnld1" data={ this.state.json2}>Download</CSVLink>
                <div id="myBar1"></div>
              </div>
              <div className="card">
                <h2>Example 2</h2>
                <h5>Applicant Query</h5>

                <button className="button" value="example2" onClick={this.login.bind(this)}>Run</button>
                <div className="error" id= "err2">Incorrect login and password.</div>
                <CSVLink className="buttonDownload" id="dwnld2" data={this.state.json2}>Download</CSVLink>
                <div id="myBar2"></div>
              </div>
              <div className="card">
                <h2>Example 3</h2>
                <h5>Staff Query</h5>

                <button className="button" value="example3" onClick={this.login.bind(this)}>Run</button>
                <div className="error" id= "err3">Incorrect login and password.</div>
                <CSVLink className="buttonDownload" id="dwnld3" data={this.state.json2}>Download</CSVLink>
                <div id="myBar3"></div>
              </div>
              <div className="card">
                <h2>Example 4</h2>
                <h5>Sales Query</h5>
                <button className="button" value="example4" onClick={this.login.bind(this)}>Run</button>
                <div className="error" id= "err4">Incorrect login and password.</div>
                <CSVLink className="buttonDownload" id="dwnld4" data={this.state.json2}>Download</CSVLink>
                <div id="myBar4"></div>
              </div>
            </div>
          </div>
          <div id="id01" className="modal">
            <div className="modal-content animate" action="/action_page.php">
              <div className="imgcontainer">
                <span onClick={this.removeLogin.bind(this)} className="close" title="Close Modal">&times;</span>
              </div>

               <div className="login_container">
                <label htmlFor="uname"><b>Username</b></label>
                <input type="text" placeholder="Enter Username" name="uname" required id="uname"></input>
                <label htmlFor="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" required id="pass"></input>
                <button id="submitButton" type="submit-stuff" onClick={this.move.bind(this)}>Login</button>
              </div>

            </div>
          </div>
          <div className="footer">
            <p>Rocket Software 2019</p>
            </div>
      </div>
    );
  }
}
