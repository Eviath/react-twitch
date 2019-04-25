import axios from 'axios'

export const authTwitch = function () {
  let data = JSON.stringify({
    client_id: process.env.REACT_APP_TWITCH_CLIENT,
    client_secret: process.env.REACT_APP_TWITCH_SECRET,
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
          isLoading: false,
          access_token: res.data.access_token
        })
      })
};


