import 'dotenv/config';
import handler from './dune.js';


// Get total transactions from Dune API
export async function getTotalTxs() {
  try {
    let responseData = null;
    
    // Create request object with hardcoded query ID
    const req = {
      method: 'GET',
      query: {
        query_id: '2641455'
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

    
    const totalTxs = responseData.result.rows[0].total_transactions;
    const formattedTxs = Math.floor(totalTxs); // Remove everything after decimal point
    console.log('original total transactions:', totalTxs);
    console.log('formatted total transactions (decimal removed):', formattedTxs);
    return formattedTxs;
    
  } catch (error) {
    console.error('Error calling handler:', error);
    throw error;
  }
}


await getTotalTxs();