import autobind from 'autobind-decorator';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { rootStore } from '../store/RootStore';
import ClubListView from '../views/ClubListView';


@inject('rootstore')
@observer
@autobind
class ClubListContainer extends Component {

  constructor(props){
    super(props);
    this.onSetClubs();
  }

  onSetClub(club){
    rootStore.clubStore.setClub(club);
  }

  onSetClubs(){
    rootStore.clubStore.setClubs();
  }

  render(){
    
    let {clubs, searchText} = rootStore.clubStore;

    let filterClubs = clubs.filter( club => club.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);

    return (
      <ClubListView 
        clubs = {filterClubs}
        onSelectedClub = {this.onSetClub}
        onSetClubs = {this.onSetClubs}
      />
      
    )
  }
}

export default ClubListContainer;