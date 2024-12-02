import { getQuery } from 'h3';

/**
 * This endpoint fetches the current electricity prices in Germany.
 * We're using it to proxy the data from the energy-charts API due to CORS restrictions.
 *
 * API DOCS: https://api.energy-charts.info
 */
export default defineEventHandler(async (event) => {

  // extract parameters from the event
  const query = getQuery(event);

  // remove the endpoint from the query parameters
  const getQueryParameter = (obj: any) => Object.fromEntries(Object.entries(obj).slice(1));

  // Construct the API URL using the query parameters
  const apiUrl = new URL(`https://api.energy-charts.info/${query.endpoint}`);

  // Append the query parameters to the API URL
  Object.entries(getQueryParameter(query)).forEach(([key, value]) => {
    if (typeof value === "string") {
      apiUrl.searchParams.append(key, value);
    }
  });

  // Fetch
  try {
    const response = await fetch(apiUrl.toString());
    if (!response.ok) {
      return {
        statusCode: response.status,
        body: { message: response.statusText },
      };
    }
    const data = await response.json();
    return {
      status: 200,
      message: 'fetched successfully',
      data,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: { message: 'Internal Server Error' },
    };
  }
});