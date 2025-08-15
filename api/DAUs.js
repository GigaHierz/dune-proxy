import 'dotenv/config';
import handler from './dune.js';


// Get total transactions from Dune API
export async function getDAUs() {
  try {
    let responseData = null;
    
    // Create request object with hardcoded query ID
    const req = {
      method: 'GET',
      query: {
        query_id: '3667484'
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

    
    const daus = responseData.result.rows[0].active_users_count;
    const formattedDAUs = Math.floor(daus / 1000); // Shorten by three positions (divide by 1000)
    console.log('original DAUs:', daus);
    console.log('formatted DAUs (shortened by 3 positions):', formattedDAUs);
    return formattedDAUs;
    
  } catch (error) {
    console.error('Error calling handler:', error);
    throw error;
  }
}


await getDAUs();