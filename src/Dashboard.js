import React, { Component } from 'react';
import Cookies from 'js-cookie';

class Dashboard extends Component {

    getActivities = async () => {
        var token = Cookies.get('str-zoom-access_token');

        const settings = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        };

        var response = await fetch('/activities', settings);
        const data = await response.json();
        console.log(data);
        return data;
    }

    render() {
        this.getActivities();
        return (
            <div>
                <header>
                    <p>-- strava-zoom --</p>

                    <p>Powered by Strava.</p>
                </header>
            </div>
        )
    }
}

export default Dashboard;