import empModel from '../../model/employeeModel';

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://front-end-hosting-wine.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
    if (req.method === 'OPTIONS') {
      return res.status(200).end(); // Respond with 200 for OPTIONS preflight request
    }
  
    // Handle POST request
    if (req.method === 'POST') {
        try {
          const newEmployee = await empModel.create(req.body);
          res.json(newEmployee);
        } catch (err) {
          res.status(500).json({ error: 'Failed to register employee' });
        }
      } else {
        res.status(405).json({ error: 'Method Not Allowed' });
      }
  };