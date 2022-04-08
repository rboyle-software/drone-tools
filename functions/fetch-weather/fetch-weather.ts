import { Handler } from '@netlify/functions';
import fetch from 'node-fetch';


export const handler: Handler = async (event, context) => {

  const zipcode = event.queryStringParameters?.zip;

  const requestUrl = `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_KEY}&q=${zipcode}&aqi=no`;


  try {
    const response = await fetch(requestUrl);
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  }
  catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message
      })
    }
  }

}
