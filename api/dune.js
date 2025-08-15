export default async function handler(req, res) {
    // Enable CORS for Framer
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
  
    const { query_id } = req.query;
    
    if (!query_id) {
      return res.status(400).json({ error: 'Query ID is required' });
    }
  
    try {
      const response = await fetch(`https://api.dune.com/api/v1/query/${query_id}/results`, {
        headers: {
          'X-Dune-API-Key': process.env.DUNE_API_KEY,
          'Content-Type': 'application/json'
        }
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Dune API error');
      }
  
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }