const client = require('@sendgrid/client');
client.setApiKey(process.env.SENDGRID_API_KEY);

// TODO: Add your own list ID and recipient ID
const list_id = 4900;
const recipient_id = "ZGkrHSypTsudrGkmdpJJ";
const headers = {
  "on-behalf-of": "The subuser's username. This header generates the API call as if the subuser account was making the call."
};

const request = {
  url: `https://api.sendgrid.com/v3/contactdb/lists/${list_id}/recipients/${recipient_id}`,
  method: 'POST',
  headers: headers
}

client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
  .catch(error => {
    console.error(error);
  });
