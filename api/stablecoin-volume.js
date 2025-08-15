import 'dotenv/config';
import handler from './dune.js';


// Get total transactions from Dune API
export async function getStablecoinVolume() {
  try {
    let responseData = null;
    
    // Create request object with hardcoded query ID
    const req = {
      method: 'GET',
      query: {
        query_id: '5636048'
      }
    };
    
    // Create response object to capture the data
    const res = {
      setHeader: () => {},
      status: (code) => ({
        json: (data) => {
          responseData = data;
          return data;
        },
        end: () => {}
      }),
      json: (data) => {
        responseData = data;
        return data;
      }
    };
    
    // Call the handler
    await handler(req, res);

    
    const stablecoinVolume = responseData.result.rows[0].total_volume_last_month;
    const formattedStablecoinVolume = (stablecoinVolume / 10000000000000000000000).toFixed(1); // Format to show 1.7
    console.log('original DAUs:', stablecoinVolume);
    console.log('formatted DAUs (shortened):', formattedStablecoinVolume);
    return formattedStablecoinVolume;
    
  } catch (error) {
    console.error('Error calling handler:', error);
    throw error;
  }
}


await getStablecoinVolume();