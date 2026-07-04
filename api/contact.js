export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed. Please use POST.' });
  }

  try {
    const { name, email, message } = req.body || {};

    // Validate inputs
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'All fields (name, email, message) are required.' });
    }

    // Read the secret access key from Vercel environment variables
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      return res.status(500).json({
        success: false,
        message: 'Web3Forms Access Key is not configured on Vercel. Please add WEB3FORMS_ACCESS_KEY in your Vercel Project Settings under Environment Variables.'
      });
    }

    // Submit data to Web3Forms API
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: name,
        email: email,
        message: message,
        from_name: 'Vivek Portfolio Contact Form',
        subject: `New Message from ${name} via Portfolio`
      })
    });

    const responseText = await response.text();
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse Web3Forms response as JSON. Status:', response.status);
      console.error('Response body:', responseText);
      return res.status(502).json({
        success: false,
        message: `Web3Forms server returned an invalid response (HTML/Text instead of JSON). Status: ${response.status}. Please check Vercel logs for details.`
      });
    }

    if (response.ok && data.success) {
      return res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } else {
      return res.status(response.status || 400).json({
        success: false,
        message: data.message || 'Web3Forms API failed to process submission.'
      });
    }
  } catch (error) {
    console.error('Error in contact serverless API:', error);
    return res.status(500).json({ success: false, message: 'Failed to send message. Internal Server Error.' });
  }
}
