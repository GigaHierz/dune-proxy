// api/stablecoin-volume.js
export default async function handler(req, res) {
    // Enable CORS for external websites
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
  
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    try {
      const response = await fetch(`https://api.dune.com/api/v1/query/5636048/results`, {
        headers: {
          'X-Dune-API-Key': process.env.DUNE_API_KEY,
          'Content-Type': 'application/json'
        }
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Dune API error');
      }
  
      const stablecoinVolume = data.result.rows[0].total_volume_last_month;
      const formattedStablecoinVolume = (stablecoinVolume / 10000000000000000000000).toFixed(1); // Format to show 1.7
      
      res.status(200).json({
        success: true,
        data: {
          original: stablecoinVolume,
          formatted: formattedStablecoinVolume,
          label: 'Stablecoin Volume Last Month'
        }
      });
      
    } catch (error) {
      console.error('Error fetching Stablecoin Volume:', error);
      res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  }