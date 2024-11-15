import empModel from '../../model/employeeModel';

export default async function handler(req, res) {
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
}
