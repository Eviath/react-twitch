import axios from 'axios'

export const authTwitch = function () {
  let data = JSON.stringify({
    client_id: 'ofnmc9arbsv2hfb72z7azqedk9ljjc',
    client_secret: 'qfjcszp77b0a70odi3cuyctgpu77my',
    grant_type: "client_credentials"
  });

  axios.post('https://id.twitch.tv/oauth2/token', data, {
        headers: {
          'Content-Type': 'application/json',
        }
      }
  )
      .then((res) => {
        this.setState({
          access_token: res.data.access_token
        })
      })
};