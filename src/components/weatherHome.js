import React, { useEffect, useState } from 'react'
import './weatherHome.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'

const WeatherHome=()=>{
    const today=new Date();

    const [period,setPeriod]=useState("Today")
    const [weather,setWeather]=useState();

    let defaultCity="London",todayTemp="21";

    useEffect(()=>{
       loadweather(period);
       console.log(weather)
    },[])

    useEffect(()=>{
        loadweather(period);
     },[period])
 

    const loadweather=async (choice)=>{
        if(choice==="Today"){
            const response=await fetch('http://api.openweathermap.org/data/2.5/weather?q=London&appid=048c43a2f7e00f37c3b4044df2ec3128')
            let data=await response.json();
            
            defaultCity=data.name;
            todayTemp=data.main.temp;

            setWeather(data);
            return data;
        }
        else if(choice==="Week"){
            const response=await fetch('http://api.openweathermap.org/data/2.5/forecast?q=London&appid=048c43a2f7e00f37c3b4044df2ec3128')
            let data=await response.json();
            setWeather(data);
            return data;
        }
        else{
            const response=await fetch('http://api.openweathermap.org/data/2.5/forecast/daily?q=London&units=metric&cnt=16&appid=048c43a2f7e00f37c3b4044df2ec3128')
            let data=await response.json();
            setWeather(data);
            return data;
        }
    }

    return(
        <div className='main'>
            <div className='leftPanel'>
                <div className='dateholder'>
                    {today.getDate()+'-'+today.getMonth()+'-'+today.getFullYear()}
                </div>
                <br/>
                <div className='tempDetails'>
                    <div className='temp'>
                        {todayTemp} &#176;
                    </div>
                    <div className='city'>
                        {defaultCity}
                    </div>
                </div>
            </div>
            <div className='rightPanel'>
                <div className='rightPanelContainer'>
                    <div className='forecastSection'>
                        <div className='forecastHeading'>
                            Forecast
                        </div>
                        <div className='forecastClouds'>

                        </div>
                    </div>
                    <div className='timeframeSection'>
                    <Tabs defaultActiveKey="Today" id="uncontrolled-tab-example" className="mb-3" onSelect={(k) => setPeriod(k)}>
                            
                            <Tab eventKey="Today" title="Today">
                                {
                                    weather?
                                        weather.main?
                                            (<div className="todayTab">
                                                {"Today's temperature is "+weather.main.temp}
                                                <br/>
                                                {"Feels like :"+ weather.main.feels_like}
                                            </div>)
                                        :<>Loading..</>
                                    :<>Loading..</>
                                }
                            </Tab>

                            <Tab eventKey="Week" title="5 days">
                                {
                                    weather?
                                        weather.list?
                                            weather.list[0].dt_txt?
                                            (                                            
                                                <div className="weekTab">
                                                <ListGroup as="ol">
                                                {
                                                weather.list.map((weatherItem)=>{
                                                    return( 
                                                        <ListGroup.Item
                                                            as="li"
                                                            className="d-flex justify-content-between align-items-start"
                                                        >
                                                            <div className="ms-2 me-auto">
                                                            <div className="fw-bold">{"Date : "+weatherItem.dt_txt}</div>
                                                            {"Expected Weather : "+weatherItem.weather[0].main}
                                                            </div>
                                                            <Badge bg="primary" pill>
                                                            {weatherItem.main.temp + " degree"}
                                                            </Badge>
                                                        </ListGroup.Item>
                                                    )
                                                    })
                                                    }                                                                      
                                                    </ListGroup>
                                                </div>
                                            ):<>Loading..</>:<>Loading..</>
                                    :<>Loading..</>
                                }
                            </Tab>
                            <Tab eventKey="Month" title="16 Days" >
                                <div className="monthTab">
                                {
                                    weather?
                                        weather.list?
                                            weather.list[0].dt_txt?<>Loading..</>:
                                                (
                                                    <div className="weekTab">
                                                    <ListGroup as="ol">
                                                    {
                                                    weather.list.map((weatherItem)=>{
                                                        return( 
                                                            <ListGroup.Item
                                                                as="li"
                                                                className="d-flex justify-content-between align-items-start"
                                                            >
                                                                <div className="ms-2 me-auto">
                                                                <div className="fw-bold">{"Date : "+weatherItem.dt}</div>
                                                                {"Expected Weather : "+weatherItem.weather[0].main}
                                                                </div>
                                                                <Badge bg="primary" pill>
                                                                {+weatherItem.temp.min + " degree"}
                                                                </Badge>
                                                            </ListGroup.Item>
                                                        )
                                                    })
                                                    }                                                                      
                                                    </ListGroup>
                                                </div>
                                            ):<>Loading..</>
                                    :<>Loading..</>
                                }
                                </div>
                            </Tab>
                    </Tabs>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default WeatherHome;