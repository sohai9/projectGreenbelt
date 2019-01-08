import React, { Component } from "react";
import Nav from "../components/Nav/Nav";
import Container from "../components/Container/Container";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import "./../App.css";
import points from "../cards";

//Google Maps
const Map = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={12.8}
      defaultCenter={{ lat: 30.256073, lng: -97.804777 }}
      defaultOptions={{
        scrollwheel: false,
        zoomControl: true,
        styles: [
          {
            featureType: "water",
            stylers: [
              { saturation: 43 },
              { lightness: -11 },
              { hue: "#0088ff" }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
              { hue: "#ff0000" },
              { saturation: -100 },
              { lightness: 99 }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#808080" }, { lightness: 54 }]
          },
          {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [{ color: "#ece2d9" }]
          },
          {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [{ color: "#ccdca1" }]
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#767676" }]
          },
          {
            featureType: "road",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#ffffff" }]
          },
          { featureType: "poi", stylers: [{ visibility: "on" }] },
          {
            featureType: "landscape.natural",
            elementType: "geometry.fill",
            stylers: [{ visibility: "on" }, { color: "#b8cb93" }]
          },
          { featureType: "poi.park", stylers: [{ visibility: "on" }] },
          {
            featureType: "poi.sports_complex",
            stylers: [{ visibility: "on" }]
          },
          { featureType: "poi.medical", stylers: [{ visibility: "on" }] },
          {
            featureType: "poi.business",
            stylers: [{ visibility: "simplified" }]
          }
        ]
      }}
    >
      <Marker
        onClick={() => props.handleMarkerClick(1)}
        position={{ lat: 30.264173, lng: -97.773195 }}
        title="Trail Head"

        /* icon="https://i0.wp.com/naturenearby.org/wp-content/uploads/2016/08/ico-feature_hiking.png?ssl=1" */
        /* options={{ icon: { url: 'https://i0.wp.com/naturenearby.org/wp-content/uploads/2016/08/ico-feature_hiking.png?ssl=1'} }} */
      />
      <Marker
        onClick={() => props.handleMarkerClick(2)}
        position={{ lat: 30.257926, lng: -97.787518 }}
        title="Spyglass"
      />
      <Marker
        onClick={() => props.handleMarkerClick(3)}
        position={{ lat: 30.255326, lng: -97.783981 }}
        title="Barton Hills"
      />
      <Marker
        onClick={() => props.handleMarkerClick(4)}
        position={{ lat: 30.249326, lng: -97.79515 }}
        title="Gus Fruh"
      />
      <Marker
        onClick={() => props.handleMarkerClick(5)}
        position={{ lat: 30.243766, lng: -97.800123 }}
        title="Loop 360"
      />
      <Marker
        onClick={() => props.handleMarkerClick(6)}
        position={{ lat: 30.244221, lng: -97.809666 }}
        title="Gaines/Twin Falls"
      />
      <Marker
        onClick={() => props.handleMarkerClick(7)}
        position={{ lat: 30.275147, lng: -97.825273 }}
        title="Trail's End"
      />
    </GoogleMap>
  )),
  function handleClick(e) {
    e.preventDefault();
    console.log("The marker was clicked.");
  }
);

class Main extends Component {
  // Constructor and state
  state = {
    currentAccessPoint: {}
  };
  // Lifecycle function
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    console.log(points);
  }

  // Custom function
  handleMarkerClick = number => {
    let point = {};

    // Grab the proper access point from the json
    for (let i = 0; i < points.length; i++) {
      if (number === points[i].id) {
        point = points[i];
      }
    }

    // Setting access point information in the state
    this.setState({
      currentAccessPoint: point
    });
  };

  // Render function
  render() {
    const { currentAccessPoint } = this.state;
    return (
      <div>
        <Nav />
        <div className="Map">
          <Map
            handleMarkerClick={this.handleMarkerClick}
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCh_URgHgmsx6M6uNR7BQ0J9udoszW9zIg"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={
              <div
                style={{
                  height: `100%`,
                  borderRadius: "6px",
                  overflow: "hidden"
                }}
              />
            }
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
        <Container accessPoint={currentAccessPoint} />
      </div>
    );
  }
}

export default Main;