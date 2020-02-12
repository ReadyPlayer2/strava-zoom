import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { DataTable } from 'carbon-components-react';

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

    render() {
        return (
            <div>
                <header>
                    <p>-- strava-zoom --</p>
                </header>
                {(
                <DataTable
                    headers={[
                        {
                            header: "Activity",
                            key: "name"
                        },
                        {
                            header: "Distance (m)",
                            key: "distance"
                        },
                        {
                            header: "Time",
                            key: "elapsed_time"
                        },
                        {
                            header: "Type",
                            key: "type"
                        }
                    ]}
                    locale="en"
                    rows={this.state.activities.map((activity) => {
                        // table rows must have a String id, but strava gives us a number so toString it
                        // let tempActivity = activity;
                        // tempActivity['id'] = tempActivity['id'].toString();
                        // return tempActivity;
                        return { ...activity, id: activity.id.toString() };
                    })}
                />
                )}
                <footer>
                    <p>Powered by Strava.</p>
                </footer>
            </div>
        )
    }
}

export default Dashboard;