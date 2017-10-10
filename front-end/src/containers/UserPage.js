import React, {Component} from 'react';
import '../css/UserPage.css';

import { connect } from 'react-redux';
import { fetchStoriesUserPage } from '../actions';

import StoryList from '../components/StoryList';

class UserPage extends Component {

  componentWillMount() {
    this.props.loadStories();
  }

  render() {
    const ownStories = Object.keys(this.props.stories)
    .filter(key => this.props.stories[key].editor === 'E-A')
    .reduce((accum, el) => {
      accum[el] = this.props.stories[el]
      return accum;
    },{});
    return (
      <div className="UserPage">
        <StoryList stories={ownStories}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  stories: state.entities.stories,
});

const mapDispatchToProps = (dispatch) => ({
  loadStories: () => dispatch(fetchStoriesUserPage())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);