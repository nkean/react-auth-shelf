import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { fetchUser } from '../../redux/actions/userActions';
import Nav from '../../components/Nav/Nav';
import './TotalItemsForUser.css';


class TotalItemsForUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            totalItems: [],
        }
    }

    componentDidMount() {
        console.log('this.state:', this.state)
        this.getTotalItems();
    }


    getTotalItems = () => {
        axios.get('/api/shelf/count').then((response) => {
            console.log('GET response from /count:', response);
            this.setState({
                totalItems: response.data
            })
        })
            .catch((error) => {
                console.log('error on GET from /count:', error)
            })
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <Nav />
                {/* {JSON.stringify(this.state.totalItems)} */}
                <div id="totalItemsList">
                    <table>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Number of items</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.totalItems.map((item) =>
                                <tr key={item.id}>
                                    <td>{item.username}</td>
                                    <td>{item.count}</td></tr>)}
                        </tbody>
                    </table>

                </div>
            </div>
        )
    }
};

export default connect()(TotalItemsForUser);