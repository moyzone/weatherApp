import React from "react";
import ReactDom from "react-dom";
import WeatherHome from '../components/weatherHome'
import { render, screen,cleanup } from '@testing-library/react';

afterEach(cleanup);

it("renders without crashing",()=>{
    const div=document.createElement("div")
    ReactDom.render(
        <WeatherHome/>
       ,div)
});

test('renders learn react link', () => {
    render(<WeatherHome />);
    const linkElement = screen.getByText(/Forecast/i);
    expect(linkElement).toBeInTheDocument();
  
  });
  