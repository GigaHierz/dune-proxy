// api/celo-tvl.js
export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
  
    try {
      const response = await fetch(`https://api.dune.com/api/v1/query/3970986/results`, {
        headers: {
          'X-Dune-API-Key': process.env.DUNE_API_KEY,
          'Content-Type': 'application/json'
        }
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Dune API error');
      }
  
      // Filter for celo blockchain only
      const celoData = data.result.rows.find(row => row.blockchain === 'celo');
      
      if (!celoData) {
        throw new Error('Celo data not found');
      }
  
      const celoTvl = celoData.daily_tvl_usd;
      const formattedTvl = (celoTvl / 1000000).toFixed(2); // Format as millions
      
      res.status(200).json({
        success: true,
        data: {
          blockchain: 'celo',
          original: celoTvl,
          formatted: formattedTvl,
          label: 'Celo Daily TVL (M USD)'
        }
      });
      
    } catch (error) {
      console.error('Error fetching Celo TVL:', error);
      res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  }