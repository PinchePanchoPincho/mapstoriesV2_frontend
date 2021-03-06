import React, {Component} from 'react';
import '../css/HomePage.css';

import { connect } from 'react-redux';
import { fetchStoriesHomePage } from '../actions';
import StoryList from '../components/StoryList';
import Loader from '../components/Loader';

class HomePage extends Component {

  state = {
    loading: true,
  };

  componentWillMount() {
    this.props.loadStories(1);
    this.props.page.searchResults.length = 0;
  }

  componentDidMount() {
    this.setState({
      loading: false,
    })
  }

  renderSearch = (publishedStories) => {
    const searchedStories = this.props.page.searchResults
    .reduce((accum, el) => {
      if (publishedStories[el]) accum[el] = this.props.stories[el];
      return accum;
    },{});
    return <StoryList className="Searched" stories={searchedStories}/>;
  }

  renderList = () => {
    const searchResultsLength = this.props.page.searchResults.length;
    const publishedStories = this.props.page.pageResults
    .reduce((accum, el) => {
      accum[el] = this.props.stories[el];
      return accum;
    },{});
    return (searchResultsLength === 0 & this.props.shouldSearch) ? (
      <div className="NoStories">
        No stories match your search.
      </div>
    ) : (
      this.props.shouldSearch ?
      this.renderSearch(publishedStories)
      : <StoryList className="Searched" stories={publishedStories}/>
    )
  }

  renderComponent = () => {
    return this.state.loading ? (
      <Loader text="loading..."/>
    ) : (
      this.props.page.pageResults.length === 0 ?
        <div className="NoStories">
          No Stories have been published yet.
        </div>
      : this.renderList()
    )
  }

  render() {
    return (
      <div className="HomePage">
        {this.renderComponent()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  stories: state.entities.stories,
  page: state.pages.storiesList,
  shouldSearch: state.pages.activateSearch
});

const mapDispatchToProps = (dispatch) => ({
  loadStories: (page) => dispatch(fetchStoriesHomePage(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
