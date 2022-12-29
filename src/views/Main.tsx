import MainService from "../service/MainService"
import { Table, TableContainer, TableRow, TableCell, Paper, TableBody } from '@material-ui/core';
import React , {useState, useEffect} from 'react';

import {
  Button,
  Grid,
  Icon,
  styled,
} from "@mui/material";
import { Span } from "../templete/app/components/Typography";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { NavLink } from "react-router-dom";


const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

export class StateType {
  username :string = '';
  firstName :string = '';
  creditCard :string = '';
  mobile :string = '';
  password :string = '';
  confirmPassword :string = '';
  gender :string = '';
  date : Date = new Date();
  email :string = '';
}
  
export const Main = () => {

    let [message, setMessage] = useState("")
    let rawM :string = '';        
    Promise.resolve(MainService.getHelloWorld()).then(res =>  rawM = res)
    console.log(rawM);
    useEffect ( () => {setMessage(rawM)} , [rawM]);

    const [state, setState] = useState<StateType>(new StateType());

    useEffect(() => {
      ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
        if (value !== state!.password) {
          return false;
        }

        return true;
      });
    return () => ValidatorForm.removeValidationRule("isPasswordMatch");
    }, [state]);

    const handleSubmit = (event : any) => {
      // console.log("submitted");
      // console.log(event);
    };

    const handleChange = (event : any) => {
      event.persist();
      setState({ ...state, [event.target.name]: event.target.value });
    };

    return (
      <><div>
        <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <TextField
                type="email"
                name="email"
                label="Email"
                value={state.email || ""}
                onChange={handleChange}
                validators={["required", "isEmail"]}
                errorMessages={["this field is required", "email is not valid"]} />

              <TextField
                name="password"
                type="password"
                label="Password"
                value={state.password || ""}
                onChange={handleChange}
                validators={["required"]}
                errorMessages={["this field is required"]} />
            </Grid>
          </Grid>

          <Button color="primary" variant="contained" type="submit">
            <Icon>send</Icon>
            <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
          </Button>
          <Button color="secondary" variant="contained" type="button" >
            <Icon>send</Icon>
            <NavLink to="/login/oauth2/code/google"></NavLink>
            <Span sx={{ pl: 1, textTransform: "capitalize" }}>Google Login</Span>
          </Button>
        </ValidatorForm>
      </div>
      <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell align='center'> Welcome, {message ? message : `This Comment is`} from React!</TableCell>
              </TableRow>
            </TableBody>
          </Table>
      </TableContainer></>        
    )
}