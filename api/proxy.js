const axios = require('axios');

module.exports = async (req, res) => {
  try {
    const path = req.url.replace('/api/proxy', '');

    const response = await axios({
      url: `https://api.cloudflare.com/client/v4/accounts/${process.env.REACT_APP_ACCOUNT_ID}/ai/run${path}`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}`,
      },
      data: req.body,
      timeout: 30000,
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
};