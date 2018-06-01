import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { fetchUser } from '../../redux/actions/userActions';
import axios from 'axios';
import './AddItem.css';

const mapStateToProps = state => ({
  user: state.user,
});

// const mapDispatchToProps = {
//   fetchUser,
// };

class AddItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      newItem: {
        description: '',
        image_url: '',
        // person_id: this.props.user.id,
      }
    }
  }

  //cURRY *basketball emoji
  handleChange = propertyName => event => {
    this.setState({
      newItem: {
        ...this.state.newItem,
        [propertyName]: event.target.value,
      }
    });
  }

  //action dispatch to SAGA 
  addNewItem = event => {
    event.preventDefault();
    const action = { type: 'ADD_ITEM', payload: this.state.newItem }
    this.props.dispatch(action);
    // axios.post('/api/shelf', this.state.newItem).then(response => {
    //     console.log(response);
    // }).catch(error => {
    //     console.log(error);
    // })
    //clear fields after submission
    this.setState({
      newItem: {
        description: '',
        image_url: '',
      }
    });
  }


  componentDidMount() {
    this.props.dispatch(fetchUser());
  }

  //you better be logged in or ELSE
  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div className="add-item-container">

          <form onSubmit={this.addNewItem}>
            add a description: <input className="input" onChange={this.handleChange('description')} value={this.state.newItem.description} placeholder='description here' />
            <br />
            add an image url: <input className="input" onChange={this.handleChange('image_url')} value={this.state.newItem.image_url} placeholder='image url here' />
          <input className="button" type="submit" value="DEPLOY IT" />
          </form>
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
// comment blah
// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(AddItem);