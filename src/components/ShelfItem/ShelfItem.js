import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../redux/actions/userActions';
import '../ShelfItem/ShelfItem.css';

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = {
  fetchUser,
};

class ShelfItem extends Component {

  render() {
    return (
      <div>
        <div className="card">
          <img src={this.props.item.image_url} />
          <div className="container">
            <p>{this.props.item.description}</p>
            <button onClick={() => this.props.delete(this.props.item.id)}>Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps, mapDispatchToProps)(ShelfItem);