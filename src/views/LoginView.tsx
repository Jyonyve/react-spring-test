import { Table, TableContainer, TableRow, TableCell, Paper, TableBody } from '@material-ui/core';
import React from 'react';
import {useState, useEffect} from 'react'

import {
  Button,
  Grid,
  styled,
  TableHead,
} from "@mui/material";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";


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
  
export const LoginView = () => {

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
      <TableContainer component={Paper}>
          <Table>
            <TableHead>
            </TableHead>
            <TableBody>
            <TableRow>
                <TableCell align='center'>
                  <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                    <Grid container spacing={6}>
                      <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }} >
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
                  </ValidatorForm>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='center'>
                  <Button color="primary" variant="contained" type="submit">
                    <span>Submit</span>
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>    
    )
}