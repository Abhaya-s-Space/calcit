import axios from "axios";
import { COIN_MARKET_API_KEY } from "../../constants/apiKey";

/**
 * Fetches the latest cryptocurrency prices from CoinMarketCap API.
 * @returns The latest cryptocurrency listings.
 */
export async function fetchLatestCryptoPrices() {
  const apiKey = COIN_MARKET_API_KEY;

  if (!apiKey) {
    throw new Error(
      "API key is missing. Make sure to set it in the .env file."
    );
  }

  try {
    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        headers: {
          "X-CMC_PRO_API_KEY": apiKey, // Use the API key from .env
        },
      }
    );

    // Log the data for reference
    return response.data;
  } catch (error) {
    console.error("Error fetching data from CoinMarketCap:", error);
    throw error;
  }
}

/**
 * Fetches the conversion rate from CoinMarketCap API and converts a cryptocurrency amount.
 * @param amount - The amount of cryptocurrency to convert (must be a number).
 * @param fromCurrency - The currency you want to convert from (e.g., 'BTC', 'ETH').
 * @param toCurrency - The currency you want to convert to (e.g., 'USD', 'GBP', 'LTC').
 * @returns The converted amount or error message.
 */
export async function convertCryptoCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string
  //   name: string // Add name to use for filtering the correct currency in the response
) {
  const apiKey = COIN_MARKET_API_KEY;

  // Ensure parameters are valid
  if (!amount || typeof amount !== "number") {
    throw new Error(
      'Invalid "amount" parameter: must be a number greater than 0.'
    );
  }
  if (!fromCurrency || !toCurrency) {
    throw new Error(
      'Invalid parameters: "fromCurrency", "toCurrency", and "name" must be valid.'
    );
  }

  try {
    // Log the parameters to ensure they're correctly set
    console.log(
      "Amount:",
      amount,
      "From:",
      fromCurrency,
      "To:",
      toCurrency
      //   "Name:",
      //   name
    );

    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v2/tools/price-conversion",
      {
        params: {
          amount: amount,
          symbol: fromCurrency,
          convert: toCurrency,
        },
        headers: {
          "X-CMC_PRO_API_KEY": apiKey,
        },
      }
    );

    // Check if the data was returned successfully
    const conversionDataArray = response.data.data;

    if (conversionDataArray && conversionDataArray.length > 0) {
      // Filter to find the correct currency by its name
      const currencyData = conversionDataArray[0];

      if (
        currencyData &&
        currencyData.quote &&
        currencyData.quote[toCurrency]
      ) {
        const convertedAmount = currencyData.quote[toCurrency].price;
        return convertedAmount;
      } else {
        throw new Error(
          `Conversion data for ${toCurrency} not found in response.`
        );
      }
    } else {
      throw new Error("No conversion data found.");
    }
  } catch (error) {
    console.error("Error fetching conversion data from CoinMarketCap:", error);
    throw error;
  }
}
