import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
 import React,{Component} from "react"
export class MapView extends Component {
  render() {
    return (
      <Map google={this.props.google} zoom={14}   style={{width: '50%',marginTop:20, height: '50%'}}>
 
      <Marker onClick={this.onMarkerClick}
              name={'Current location'} />

      {/* <InfoWindow onClose={this.onInfoWindowClose}>
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
      </InfoWindow> */}
    </Map>
    );
  }
}
 
export default GoogleApiWrapper({ apiKey: ''})(
  MapView)