import employeeModel from '../../model/employeeModel';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    try {
      const user = await employeeModel.findOne({ email });
      if (user) {
        if (user.password === password) {
          return res.json('success');
        } else {
          return res.json('password is incorrect');
        }
      } else {
        return res.json('no records');
      }
    } catch (err) {
      return res.status(500).json({ error: 'Server error' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
