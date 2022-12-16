import { useState } from "react";
import ClubEditFormContainer from "./clubContainers/ClubEditFormContainer";
import ClubListContainer from "./clubContainers/ClubListContainer";

export function RootContainer() {
    
   const clubEditFormContainer : typeof ClubEditFormContainer|undefined = ClubEditFormContainer;
   const clubListContainer : typeof ClubListContainer|undefined = ClubListContainer;
   //const memberEditFormContainer : typeof MemberEditFormContainer = MemberEditFormContainer; 
}