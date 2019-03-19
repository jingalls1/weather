import React from "react";
import TextField from "@material-ui/core/TextField";
import { jsonData } from "./data.js";
import LineChart from "react-linechart";
import Button from "@material-ui/core/Button";

export default class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zip: 0,
      data: [],
      temp: 0,
      press: 0,
      humid: 0,
      mintemp: 0,
      maxtemp: 0,
      windspeed: 0,
      winddeg: 0,
      weathercondit: "empty",
      weatherdescrip: "empty",
      city: "???",
      cc: "",
      units: "",
      lineData: [
        {
          color: "steelblue",
          points: [{ x: 0, y: 0 }, { x: 1.5, y: 4 }]
        }
      ]
    };
  }

  handleSelect = e => {
    //console.log('target value is',e.target.value);
    if (e.target.value === "1") {
      console.log("You selected standard!");
      this.setState({ units: "" });
    } else if (e.target.value === "2") {
      console.log("You selected imperial!");
      this.setState({ units: "&units=imperial" });
    } else if (e.target.value === "3") {
      console.log("You selected metric!");
      this.setState({ units: "&units=metric" });
    }
  };

  handleZipChange = e => {
    //who there
    let zip = e.target.value;
    this.setState({ zip });
  };

  handleCCChange = e => {
    let cc = e.target.value;
    this.setState({ cc });
  };

  handleCheckBox = e => {
    //console.log(e.target.checked)
    if (e.target.checked === true) {
      console.log("The textbox is checked!");
      //setInterval() is in milliseconds, so 1000 milliseconds is 1 second
      this.theinterval = setInterval(() => {
        console.log("weather fetched again");
        this.weatherTrack();
      }, 60 * 1000);
    } else if (e.target.checked === false) {
      console.log("the textbox is unchecked :(");
      clearInterval(this.theinterval);
    }
  };

  weatherTrack = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?zip=${this.state.zip},${
        this.state.cc
      }&APPID=8e44c500eae35929bb2690f0b5c52ac5${this.state.units}`,
      { headers: { Accept: "application/json;" } }
    )
      .then(response => response.json())
      .then(data => {
        //debugger;
        if (this.state.data.length < 60) {
          let dataArr = this.state.data.slice();
          dataArr.push(data);
          let lineDataPoint = this.state.lineData.slice();
          lineDataPoint[0].points.push({
            x: data.wind.deg,
            y: data.wind.speed
          });
          this.setState({
            data: dataArr,
            lineData: lineDataPoint
          });
        } else {
          //do something here
          let dataArrCopy = this.state.data.slice();
          dataArrCopy.shift();
          dataArrCopy.push(data);
        }
      });
  };
  /*
  updateWeather = () => {
    let temp = this.state.data.main.temp;
    this.setState({ temp });
    let press = this.state.data.main.pressure;
    this.setState({ press });
    let humid = this.state.data.main.humidity;
    this.setState({ humid });
    let mintemp = this.state.data.main.temp_min;
    this.setState({ mintemp });
    let maxtemp = this.state.data.main.temp_max;
    this.setState({ maxtemp });
    let windspeed = this.state.data.wind.speed;
    this.setState({ windspeed });
    let winddeg = this.state.data.wind.deg;
    this.setState({ winddeg });
    let weathercondit = this.state.data.weather[0].main;
    this.setState({ weathercondit });
    let weatherdescrip = this.state.data.weather[0].description;
    this.setState({ weatherdescrip });
    let city = this.state.data.name;
    this.setState({ city });
    this.setState({
      lineData: [
        {
          color: "steelblue",
          points: [{ x: 0, y: 0 }, { x: winddeg, y: windspeed }]
        }
      ]
    });
  };
  */

  /*
  this.setState({
    data,
    temp: this.state.data.main.temp,
    press : this.state.data.main.pressure,
    humid : this.state.data.main.humidity,
    mintemp : this.state.data.main.temp_min,
    maxtemp : this.state.data.main.temp_max,
    windspeed : this.state.data.wind.speed,
    winddeg: this.state.data.wind.deg,
    weathercondit : this.state.data.weather[0].main,
    weatherdescrip : this.state.data.weather[0].description,
    city : this.state.data.name,
    lineData: [
      {
        color: "steelblue",
        points: [{ x: 0, y: 0 }, { x: winddeg, y: windspeed }]
      }
    ]
  })
  */

  getWeather = () => {
    console.log("you clicked get weather!!");
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?zip=${this.state.zip},${
        this.state.cc
      }&APPID=8e44c500eae35929bb2690f0b5c52ac5${this.state.units}`,
      { headers: { Accept: "application/json;" } }
    )
      .then(response => response.json())
      .then(data =>
        this.setState({
          data: [data],
          temp: data.main.temp,
          press: data.main.pressure,
          humid: data.main.humidity,
          mintemp: data.main.temp_min,
          maxtemp: data.main.temp_max,
          windspeed: data.wind.speed,
          winddeg: data.wind.deg,
          weathercondit: data.weather[0].main,
          weatherdescrip: data.weather[0].description,
          city: data.name,
          lineData: [
            {
              color: "steelblue",
              points: [{ x: 0, y: 0 }, { x: data.wind.deg, y: data.wind.speed }]
            }
          ]
        })
      );
    //console.log(Object.keys(this.state.data).length)

    //this.updateWeather().bind(this)
    //.then(response => response.text())
    //.then(text => console.log(text));
  };

  combineWeather = () => {
    console.log("you clicked the Get the Weather button");
    this.getWeather();
    this.updateWeather();
  };

  render() {
    //this.updateWeather().bind(this);
    /*
    if (Object.keys(this.state.data).length > 0) {
      console.log('theres shit in the object!');
    }
    */
    return (
      <div>
        <div
          className="weather"
          onClick={() => window.open("https://openweathermap.org/api")}
        >
          Weather API{" "}
        </div>
        <div
          className="powered"
          onClick={() => window.open("https://openweathermap.org/api")}
        >
          {" "}
          Powered by OpenWeatherMap{" "}
        </div>
        <br />
        <br />
        <div className="CenterDiv">
          <div className="Table">
            <div className="Row">
              <div className="Cell1"> Zip Code: </div>
              <input className="Cell" onChange={e => this.handleZipChange(e)} />
            </div>
            <div className="Row">
              <div className="Cell1"> Country Code: </div>
              <input className="Cell" onChange={e => this.handleCCChange(e)} />
              <span className="smallLetters"> Ex: 'us' </span>
            </div>
          </div>
        </div>
        <br />
        <div className="CenterDiv">
          <div className="Table">
            <div className="Row">
              <span className="Cell2"> Change Units: </span>
              <select className="Cell" onChange={this.handleSelect}>
                <option value="1"> Standard </option>
                <option value="2"> Imperial </option>
                <option value="3"> Metric </option>
              </select>
            </div>
            <div className="Row">
              <div className="Cell2"> Track: </div>
              <input
                className="Cell3"
                type="checkbox"
                onChange={this.handleCheckBox}
              />
            </div>
          </div>
        </div>
        <br />
        <br />
        {/*<button onClick={this.getWeather} className="Clickable">
          {" "}
          Get the Weather{" "}
        </button>*/}
        <Button
          color=""
          variant="contained"
          className="Clickable"
          onClick={this.getWeather}
        >
          {" "}
          Get the Weather{" "}
        </Button>
        <br />
        <br />
        <div className="bold">
          {" "}
          Current Weather Conditions for {this.state.city}{" "}
        </div>
        <br />
        <div className="WeatherData">
          <div className="Table">
            <div className="Row">
              {" "}
              <div className="Cell1">Temperature:</div>{" "}
              <div className="Cell">{this.state.temp}</div>
            </div>

            <div className="Row">
              {" "}
              <div className="Cell1">Pressure:</div>{" "}
              <div className="Cell">{this.state.press}</div>
            </div>

            <div className="Row">
              {" "}
              <div className="Cell1">Humidity:</div>{" "}
              <div className="Cell">{this.state.humid}</div>
            </div>
            <div className="Row">
              {" "}
              <div className="Cell1">Min Temperature:</div>{" "}
              <div className="Cell">{this.state.mintemp}</div>
            </div>
            <div className="Row">
              {" "}
              <div className="Cell1">Max Temperature:</div>{" "}
              <div className="Cell">{this.state.maxtemp}</div>
            </div>
            <div className="Row">
              {" "}
              <div className="Cell1">Wind:</div>{" "}
              <div className="Cell">
                {this.state.windspeed} at {this.state.winddeg} degrees
              </div>
            </div>
            <div className="Row">
              {" "}
              <div className="Cell1">Weather Conditions:</div>{" "}
              <div className="Cell">
                {this.state.weathercondit} ({this.state.weatherdescrip})
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <div style={{ fontWeight: 900 }}>
          {" "}
          Wind Speed + Degrees Linechart in {this.state.city}:{" "}
        </div>
        {/* https://www.npmjs.com/package/react-linechart */}
        <LineChart
          width={window.innerWidth - 150}
          height={400}
          data={this.state.lineData}
          yLabel="Wind Speed"
          xLabel="Wind Degrees"
          interpolate="cardinal"
          xMax={this.state.winddeg + 200}
          yMax={this.state.windspeed + 5}
        />
        <br />
        <br />
      </div>
    );
  }
}
