import autobind from 'autobind-decorator';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import ClubListView from '../views/ClubListView';


@inject('clubStore')
@observer
@autobind
class ClubListContainer extends Component {

  onSelectedClub(club){
    this.props.clubStore.selectedClub(club);
  }

  onSetClubList(){
    this.props.clubStore.setClubList();
  }

  render(){

    
    //let clubs = this.props.clubStore.clubs;
    // const {searchText} =this.props.clubStore.searchText;

    // const arrClubs = Array(clubs)
    // .filter( club => club['name'].toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
    // .sort((a, b) =>  a.name - b.name);

    return (
      
      <ClubListView 
        clubs = {this.props.clubStore.clubs}
        onSelectedClub = {this.onSelectedClub}
        onSetClubList = {this.onSetClubList}
      />
      
    )
  }
}

export default ClubListContainer;