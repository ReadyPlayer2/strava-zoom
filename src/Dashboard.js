import React, { Component } from 'react';
import Cookies from 'js-cookie';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activities: []
        }
    }

    componentDidMount() {
        this.getActivities().then(res => {
            this.setState({
                activities: res
            })
        }).catch(err => {
            console.log(err);
        })
    }

    getActivities = async () => {
        var access_token = Cookies.get('str-zoom-access_token');
        var refresh_token = Cookies.get('str-zoom-refresh_token')

        const settings = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': access_token,
                'refresh-token': refresh_token
            }
        };

        var response = await fetch('/activities', settings);
        const data = await response.json();
        console.log(data);
        return data;
    }

    displayActivity(activity) {
        return (
            <p>{activity['name']}</p>
        )
    }

    render() {
        // this.getActivities();
        return (
            <div>
                <header>
                    <p>-- strava-zoom --</p>
                    <div>
                        {this.state.activities.map(activity => (
                            this.displayActivity(activity)
                        ))}
                    </div>
                    <p>Powered by Strava.</p>
                </header>
            </div>
        )
    }
}

export default Dashboard;