import { Grid, TextField, IconButton, Typography } from "@material-ui/core";
import { Save } from "@material-ui/icons";
import { observer } from "mobx-react";
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../store/RootStore";

const JoinFormView = observer((props:any) => {

    const membershipStore = useStore().membershipStore;
    const {clubId} = useParams();
    const navigate = useNavigate();

    return(
        <form noValidate>
        <Grid container spacing={2} justifyContent="center" alignItems="stretch">
        <Grid >
          <TextField
            size="medium"
            margin="normal"
            id="outlined-basic"
            label="Club nickname"
            variant="outlined"
            defaultValue="Choose your nickname"
            onChange={(event) => membershipStore.setMembershipProps('nickname', event.target.value)}
            />
        </Grid >
        <Grid>
          <IconButton children={<><Typography color="primary"><Save fontSize="large" /></Typography></>} onClick={async () => 
            { await membershipStore.addMembershipAndSetMembershipId(clubId!)
              await membershipStore.fetchMembershipIdAndRole();
              navigate("/club")
            }}/>
        </Grid>
      </Grid>
    </form>

    );
})
export default JoinFormView;