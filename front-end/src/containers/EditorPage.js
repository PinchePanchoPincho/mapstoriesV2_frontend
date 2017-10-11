import React, {Component} from 'react';
import '../css/EditorPage.css';

import Map from '../components/Map';
import EventInfo from '../components/EventInfo';
import RaisedButton from 'material-ui/RaisedButton';

class EditorPage extends Component {

  render () {
    const styleButton = {
      marginRight: 30,
      marginBottom: 30,
    }
    return (
      <div className="EditorPage">
        <EventInfo/>
      </div>
    )
  }
}

export default EditorPage;
