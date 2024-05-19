import React, { useEffect, useState } from 'react';
import './weatherHome.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';

const WeatherHome = () => {
    const today = new Date();

    const [period, setPeriod] = useState("Today");
    const [weather, setWeather] = useState(null);
    const [todayTemp, setTodayTemp] = useState(null);
    const [defaultCity, setDefaultCity] = useState("London");

    useEffect(() => {
        loadWeather(period);
    }, []);

    useEffect(() => {
        loadWeather(period);
    }, [period]);

    const loadWeather = async (choice) => {
        if (choice === "Today") {
            const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=048c43a2f7e00f37c3b4044df2ec3128');
            let data = await response.json();

            setDefaultCity(data.name);
            setTodayTemp((data.main.temp - 273.15).toFixed(2)); 

            setWeather(data);
            return data;
        } else if (choice === "Week") {
            const response = await fetch('https://api.openweathermap.org/data/2.5/forecast?q=London&appid=048c43a2f7e00f37c3b4044df2ec3128');
            let data = await response.json();
            setWeather(data);
            return data;
        } else {
            const response = await fetch('https://api.openweathermap.org/data/2.5/forecast/daily?q=London&units=metric&cnt=16&appid=048c43a2f7e00f37c3b4044df2ec3128');
            let data = await response.json();
            setWeather(data);
            return data;
        }
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
    };
        

    return (
        <div className="main">
            <div className="leftPanel">
                <div className='dateholder'>
                    {today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear()}
                </div>
                <br />
                <div className='tempDetails'>
                    <div className='temp'>
                        {todayTemp !== null ? `${todayTemp} °C` : "Loading..."}
                    </div>
                    <div className='temp'>
                        {defaultCity}
                    </div>
                </div>
            </div>
            <div className="rightPanel">
                <div className='rightPanelContainer'>
                    <div className='forecastSection'>
                        <div className='forecastHeading'>
                            Forecast
                        </div>
                    </div>
                    <div className='timeframeSection'>
                        <Tabs defaultActiveKey="Today" id="uncontrolled-tab-example" className="mb-3" onSelect={(k) => setPeriod(k)}>

                            <Tab eventKey="Today" title="Today">
                                {
                                    weather ?
                                        weather.main ?
                                            (<div className="todayTab">
                                                {"Today's temperature is " + (weather.main.temp - 273.15).toFixed(2) + " °C"}
                                                <br />
                                                {"Feels like: " + (weather.main.feels_like - 273.15).toFixed(2) + " °C"}
                                            </div>)
                                            : <>Loading..</>
                                        : <>Loading..</>
                                }
                            </Tab>

                            <Tab eventKey="Week" title="5 days">
                                {
                                    weather ?
                                        weather.list ?
                                            weather.list[0].dt_txt ?
                                                (
                                                    <div className="weekTab">
                                                        <ListGroup as="ol">
                                                            {
                                                                weather.list.map((weatherItem) => {
                                                                    return (
                                                                        <ListGroup.Item
                                                                            as="li"
                                                                            className="d-flex justify-content-between align-items-start listGroupItem"
                                                                            key={weatherItem.dt_txt}
                                                                        >
                                                                            <div className="ms-2 me-auto">
                                                                                <div className="fw-bold">{"Date: " + formatDate(weatherItem.dt)}</div>
                                                                                {"Expected Weather: " + weatherItem.weather[0].main}
                                                                            </div>
                                                                            <Badge bg="primary" pill>
                                                                                {(weatherItem.main.temp - 273.15).toFixed(2) + " °C"}
                                                                            </Badge>
                                                                        </ListGroup.Item>
                                                                    )
                                                                })
                                                            }
                                                        </ListGroup>
                                                    </div>
                                                ) : <>Loading..</> : <>Loading..</>
                                        : <>Loading..</>
                                }
                            </Tab>
                            <Tab eventKey="Month" title="16 Days">
                                <div className="monthTab">
                                    {weather &&
                                        weather.list &&
                                        weather.list[0] &&
                                        weather.list[0].dt ? (
                                        <div className="weekTab">
                                            <ListGroup as="ol">
                                                {weather.list.map((weatherItem) => {
                                                    const minTemp = weatherItem.temp && weatherItem.temp.min ? (weatherItem.temp.min - 273.15).toFixed(2) + " °C" : "N/A";
                                                    return (
                                                        <ListGroup.Item
                                                            as="li"
                                                            className="d-flex justify-content-between align-items-start listGroupItem"
                                                            key={weatherItem.dt}
                                                        >
                                                            <div className="ms-2 me-auto">
                                                                <div className="fw-bold">{"Date: " + formatDate(weatherItem.dt)}</div>
                                                                {"Expected Weather: " + weatherItem.weather[0].main}
                                                            </div>
                                                            <Badge bg="primary" pill>
                                                                {minTemp}
                                                            </Badge>
                                                        </ListGroup.Item>
                                                    )
                                                })}
                                            </ListGroup>
                                        </div>
                                    ) : (
                                        <div>Loading...</div>
                                    )
                                    }
                                </div>
                            </Tab>

                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeatherHome;
