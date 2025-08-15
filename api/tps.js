import 'dotenv/config';
import handler from './dune.js';


// Get total transactions from Dune API
export async function getTPS() {
  try {
    let responseData = null;
    
    // Create request object with hardcoded query ID
    const req = {
      method: 'GET',
      query: {
        query_id: '5636113'
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

    
    const tps = responseData.result.rows[0].latest_weekly_avg_tps;
    const formattedTPS = Math.trunc(tps * 10)/ 10; 
    console.log('original TPS:', tps);
    console.log('formatted TPS (shortened by 3 positions):', formattedTPS);
    return formattedTPS;
    
  } catch (error) {
    console.error('Error calling handler:', error);
    throw error;
  }
}


await getTPS();