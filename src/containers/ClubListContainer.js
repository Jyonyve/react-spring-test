import autobind from 'autobind-decorator';
import {  inject, observer } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';
import React, { Component } from 'react';
import ClubListView from '../views/ClubListView';

@inject('rootStore')
@observer
@autobind
class ClubListContainer extends Component {

  clubStore = this.props.rootStore.clubStore;
  accessToken= this.props.accessToken;
  
  onSetClub(club){
    this.clubStore.setClub(club);
  }

  onSetClubs(){
    this.clubStore.setClubs();
  }

  flatClubs(){
    return this.clubStore.getClubs().flat(Infinity);
  }

  render(){
    
    let searchText = this.clubStore.searchText;
    let clubs = getSnapshot(this.clubStore.clubs)
    console.log(clubs)
    clubs = clubs.filter( club => club.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);

    return (
      <ClubListView 
        clubs = {clubs}
        onSetClub = {this.onSetClub}
        onSetClubs = {this.onSetClubs}
      />
      
    )
  }
}

export default ClubListContainer;