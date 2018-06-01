import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Nav from '../../components/Nav/Nav';
import { fetchUser } from '../../redux/actions/userActions';
import ShelfItem from '../ShelfItem/ShelfItem';

import '../ShelfPage/ShelfPage.css';

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = {
  fetchUser,
};

class ShelfPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shelfList: [],
    };
  }

  deleteItem = item => {
    axios.delete('/api/shelf', {params: {id: item.id, person_id: item.person_id}})
    .then((response) => {
        console.log(response);
        this.getAllItems();
    })
    .catch((error) => {
        console.log('error on delete: ', error);
        alert('You can only delete items you added');
    })
  };

  getAllItems = () => {
    axios.get('/api/shelf')
      .then((response) => {
        console.log(response.data);
        this.setState({
          shelfList: response.data,
        });
      })
      .catch((error) => {
        console.log('error on get: ', error);
      })
  };

  componentDidMount() {
    this.props.fetchUser();
    this.getAllItems();
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div className="Shelf">
          {this.state.shelfList.map(item =>
          <ShelfItem key= {item.id}
          item = {item}
          delete = {this.deleteItem} />
          )}
        </div>
      );
    }

    return (
      <div>
        <Nav />
        {content}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps, mapDispatchToProps)(ShelfPage);