import React  from 'react';
import { TextField, InputAdornment  } from '@material-ui/core';
import  SearchIcon  from '@material-ui/icons/Search';
import { observer} from 'mobx-react'
import { rootStore } from '../store/RootStore';

const SearchbarContainer = observer((props)=> {

  const locationNow = window.location.pathname;

  function onChangeSearchText(searchText){
    switch(locationNow){
      case `/club` :
        rootStore.clubStore.setSearchText(searchText);
        break;
      case `/member` :
        rootStore.memberStore.setSearchText(searchText);
        break;
      default :
        throw new Error(`no store!`);
    }
  }

    return (
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        onChange = {(event) => onChangeSearchText(event.target.value)}
      />
    )
})

export default SearchbarContainer;