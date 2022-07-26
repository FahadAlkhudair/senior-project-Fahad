import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import config from '../../../config';
import Card from 'react-bootstrap/Card';
import DonationManagementService from '../../../services/donor.management.service';
import ProfileService from '../../../services/profile.service';
import {isEmpty} from 'lodash';

// Return map bounds based on list of places
const getMapBounds = (map, maps, places) => {
  const bounds = new maps.LatLngBounds();

  places.forEach((place) => {
    bounds.extend(new maps.LatLng(
      place.coordinates.coordinates[1],
      place.coordinates.coordinates[0],
    ));
  });
  return bounds;
};

// Re-center map when resizing the window
const bindResizeListener = (map, maps, bounds) => {
  maps.event.addDomListenerOnce(map, 'idle', () => {
    maps.event.addDomListener(window, 'resize', () => {
      map.fitBounds(bounds);
    });
  });
};

// Fit map to its bounds after the api is loaded
const apiIsLoaded = (map, maps, places) => {
  // Get bounds by our places
  const bounds = getMapBounds(map, maps, places);
  // Fit map to bounds
  map.fitBounds(bounds);
  // Bind the resize listener
  bindResizeListener(map, maps, bounds);
};

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

function getPosition(el) {
    var xPos = 0;
    var yPos = 0;
   
    while (el) {
      if (el.tagName == "BODY") {
        // deal with browser quirks with body/window/document and page scroll
        var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
        var yScroll = el.scrollTop || document.documentElement.scrollTop;
   
        xPos += (el.offsetLeft - xScroll + el.clientLeft);
        yPos += (el.offsetTop - yScroll + el.clientTop);
      } else {
        // for all other non-BODY elements
        xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
        yPos += (el.offsetTop - el.scrollTop + el.clientTop);
      }
   
      el = el.offsetParent;
    }
    return {
      x: xPos,
      y: yPos
    };
  }

const AnyReactComponent = ({ selectCampaign, showInfo, hideInfo }) => (
    <div className='marker'>
      <svg onClick={selectCampaign} onMouseOver={showInfo} onMouseOut={hideInfo} aria-hidden="true" color='red' focusable="false" data-prefix="fas" data-icon="location-pin" className="svg-inline--fa fa-location-pin p-0 align-self-center pin" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192H384z"></path></svg>
    </div>
  );
  
  class CampaignsMap extends React.Component {
    static defaultProps = {
      center: {lat: 29.028318, lng: -81.303116},
      zoom: 9
    };

    constructor(props){
        super(props);
        this.getCampaigns = this.getCampaigns.bind(this);
        this.hideInfo =this.hideInfo.bind(this);
        this.showInfo = this.showInfo.bind(this);
        this.selectCampaign = this.selectCampaign.bind(this);
        this.container = React.createRef();
        this.state={
            center: this.props.center,
            campaigns:[],
            selectedCampaign: undefined
        };
    }

    componentDidMount(){
        ProfileService
        .getLocation()
        .then(location=>{
            this.getCampaigns(location);
            this.setState({
                center: {
                    lat: location[1],
                    lng:location[0]
                }
            });
        });
    }

    getCampaigns(location){
        DonationManagementService
        .getAllCampaigns({startFrom: formatDate(new Date()), lng: location[0], lat: location[1], radius: 50000 })
        .then(data=>{
            console.log(data);
            this.setState({
                campaigns: data
            });
        });
    }

    showInfo(event, campaign){
        var parentPosition = getPosition(this.container.current);
        var rect = event.target.getBoundingClientRect();
        var xPosition =rect.x - parentPosition.x; // event.clientX - parentPosition.x- (theThing.clientWidth / 2);
        var yPosition = rect.y - parentPosition.y; //-event.currentTarget.clientHeight; //- (theThing.clientHeight / 2);

        this.setState({
            selectedCampaign: campaign,
            infoLocation: {x: xPosition,y: yPosition},
            showInfo: true
        });
    
    }

    hideInfo(){
        this.setState({
            selectedCampaign: undefined,
            showInfo: false
        });
    }

    selectCampaign(campaign){
        console.log(campaign);
    }
  
    render() {
        const { campaigns, selectedCampaign } =this.state;
        return (
            <>
            <div className='map-container' ref={this.container}>
            {selectedCampaign && (
                    <Card className='info' style={{
                        position:'absolute',
                        display: this.state.showInfo? 'block': 'none',
                        zIndex:1000,
                        left: this.state.infoLocation.x,
                        top: this.state.infoLocation.y,
                        transform: 'translate(-50%, -100%)'
                        }}>
                        <Card.Body>
                            <div className='d-flex flex-column p-2'>
                                <small><b>{selectedCampaign.location}</b></small>
                                <small>{selectedCampaign.street}, {selectedCampaign.city},</small>
                                <small>{selectedCampaign.state} {selectedCampaign.zipCode}</small>
                            </div>                        
                            </Card.Body>
                    </Card>
            )}
                <GoogleMapReact
                    bootstrapURLKeys={{key: config.API_KEY}}
                    defaultCenter={this.state.center}
                    defaultZoom={this.props.zoom}
                >
                    {campaigns.map((campaign,index) => (
                        <AnyReactComponent
                            key={index}
                            lat={campaign.coordinates.coordinates[1]}
                            lng={campaign.coordinates.coordinates[0]}
                            showInfo={(e)=>this.showInfo(e,campaign)}
                            hideInfo = {this.hideInfo}
                            selectCampaign = {()=>this.selectCampaign(campaign)}
                        />
                    ))}
                </GoogleMapReact>
            </div>
            </>
        );
    }
}

export default CampaignsMap;
