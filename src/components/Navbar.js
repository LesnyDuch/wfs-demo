import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import './Navbar.css';
import fetchProcessingRequest from "../store/fetchProcessingRequest";


class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      apiKey: '',
      requestID: ''
    }
  }

  /**
   * Stores a fields content into the component state
   * @param field Field's name
   * @param e Typing event
   */
  handleFieldChange(field, e) {
    this.setState({[field]: e.target.value});
  }

  /**
   * Invokes a fetch action for a processing request
   * @param  e Click event
   */
  fetchProcessing (e) {
    this.props.fetchProcessingRequest(this.state.requestID, this.state.apiKey);
  }

  /**
   * Checks whether the form has been filled out
   */
  canSubmit() {
    return this.state.apiKey !== '' && this.state.requestID !== '';
  }

  render() {
    return (
      <div className="Navbar">
          <nav className="white">
            <a href="#/" className="brand-logo"><img className="brand-logo--img" alt="Logo" src="https://worldfrom.space/wp-content/uploads/2019/09/cropped-World-from-space-Logo-1.png"></img></a>
            <div className="navbar">
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                {/* The order of lis has to be reversed due to CSS shenanigans */}
                <li><a href="#/" className={"btn-large " + (this.canSubmit() ? 'waves-effect waves-light' : 'disabled')} onClick={e => this.fetchProcessing(e)}>Find Request<i className="material-icons right">cloud</i></a></li>
                <li className="navbar__separator"></li>
                <li>
                  <form className="navbar__inline-form">
                    <div className="input-field col s6 navbar__custom-input">
                      <input id="api-key" type="text" placeholder="ENTER API KEY" value={this.state.apiKey} onChange={e => this.handleFieldChange('apiKey', e)}></input>
                    </div>
                    <div className="input-field col s6 navbar__custom-input">
                      <input id="request-id" type="text" placeholder="ENTER PROCESSING REQUEST ID" value={this.state.requestID} onChange={e => this.handleFieldChange('requestID', e)}></input>
                    </div>          
                  </form>
                </li>
                <li className="navbar__separator"></li>
                <li className="navbar__left-filler"></li>
              </ul>
            </div>
        </nav>
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => bindActionCreators({
  fetchProcessingRequest: (requestID, apiKey) => fetchProcessingRequest(dispatch, requestID, apiKey)
}, dispatch)

export default connect(null, mapDispatchToProps)(Navbar);
