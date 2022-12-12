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

 
  render(){

    let {clubs, searchText} = this.props.clubStore;

    clubs = clubs.filter( club => club.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);

    clubs.sort(function(a, b){
      return a.name - b.name;
    });

    return (
      <ClubListView 
        clubs = {clubs}
        onSelectedClub = {this.onSelectedClub}
      />
    )
  }
}

export default ClubListContainer;