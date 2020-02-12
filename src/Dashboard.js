import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { DataTable } from 'carbon-components-react';
const {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    TableHeader,
  } = DataTable;

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
                            header: "Time (s)",
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
                    render={({ rows, headers, getHeaderProps }) => (
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                    {headers.map(header => (
                                        <TableHeader {...getHeaderProps({ header })}>
                                        {header.header}
                                        </TableHeader>
                                    ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map(row => (
                                    <TableRow key={row.id}>
                                        {row.cells.map(cell => (
                                        <TableCell key={cell.id}>{cell.value}</TableCell>
                                        ))}
                                    </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        )}
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