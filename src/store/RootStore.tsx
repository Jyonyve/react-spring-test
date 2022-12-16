import { createContext, useContext } from "react";
import ClubStore from "./ClubStore";
import { MemberStore } from "./MemberStore";

class RootStore {

    clubStore : typeof ClubStore;
    memberStore : typeof MemberStore;
    
    constructor() {
      this.clubStore = ClubStore;
      this.memberStore = MemberStore;
    }
  }
  const StoreContext = createContext(new RootStore());

export const useStores = () => useContext(StoreContext);  