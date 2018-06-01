import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { fetchUser } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = {
  fetchUser,
};

class TotalItemsForUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            totalItems: [],
        }
    }

    componentDidMount() {
        console.log('this.state:', this.state)
        this.props.fetchUser();
        this.getTotalItems();
    }


   getTotalItems = () => {
        axios.get('/api/shelf/count').then((response) => {
    // getTotalItems = () => {
    //     axios({
    //         method: 'GET',
    //         url: '/api/count'
    //     })
            // .then((response) => {
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
                {JSON.stringify(this.state.totalItems)}
            </div>
        )
    }
};

export default connect (mapStateToProps, mapDispatchToProps)(TotalItemsForUser);