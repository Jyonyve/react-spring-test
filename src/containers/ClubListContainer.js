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
    let clubs = this.props.clubStore.setClubList();
    return clubs;
  }

  render(){

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