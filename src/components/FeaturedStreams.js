import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
const clientId = 'ofnmc9arbsv2hfb72z7azqedk9ljjc';
axios.defaults.headers.common['Client-ID'] = clientId;

export class FeaturedStreams extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoading: false,
            streams: [],
        };
        this.getStreams = this.getStreams.bind(this);
    }

    componentDidMount() {
        this.getStreams();
        setInterval(this.getStreams, 5000);
    }

    // Get api streams
    async getStreams() {
        // We're using axios instead of Fetch
      await axios
        // The API we're requesting data from
            .get("https://api.twitch.tv/helix/streams?first=4")
            // Once we get a response, we'll map the API endpoints to our props
            // Let's make sure to change the loading state to display the data
            .then(results => {
                console.log(results);
                this.setState({
                    streams: results.data.data,
                    isLoading: false
                });
            })
            // We can still use the `.catch()` method since axios is promise-based
            .catch(error => this.setState({ error, isLoading: false }));
    }



    render() {
        // set streams state as variable
        let streams = this.state.streams;
        const streamsList = streams.map((stream) =>
            <li>
                <p>{stream.user_name} | {stream.title}</p>
                <p>{stream.viewer_count}</p>
            </li>
        );

        return (
            <div className="FeaturedStreams">
                <ul>
                    {streamsList }
                </ul>
            </div>
        );
    }
}


