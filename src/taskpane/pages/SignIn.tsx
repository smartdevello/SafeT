import * as React from "react";
import LoadingBackdrop from "../components/ui-components/LoadingBackDrop";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  AlertColor,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Toast from "../components/ui-components/Toast";
import useInput from "../../hooks/use-http";
import { Login, getOrganizations } from "../../api/safeT";
import { useAppDispatch } from "../../store";
import { BackdropActions } from "../../store/backdrop-slice";
const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");

interface Organization {
  org_id: string;
  org_name: string;
  contact_id: string;
  full_name: string;
}

export default function SignIn() {
  const [companyChecked, setCompanyChecked] = React.useState(false);
  const [showOrganization, setShowOrganization] = React.useState(false);
  const [toastShow, setToastShow] = React.useState(false);
  const [toastSeverity, setToastSeverity] = React.useState<AlertColor>("info");
  const [toastMessage, setToastMessage] = React.useState("");
  const dispatch = useAppDispatch();
  const [org, setOrg] = React.useState<Organization>({
    org_id: "",
    org_name: "",
    contact_id: "",
    full_name: "",
  });

  const [orgList, setOrgList] = React.useState<Organization[]>([
    {
      org_id: "a0C550000001a0tEAA",
      org_name: "Pemiscots & Consulting",
      contact_id: "a045500000D65CKAAZ",
      full_name: "Smart Dev",
    },
  ]);

  const {
    value: email,
    hasError: emailHasError,
    valueChangeHandler: emailChanged,
    inputBlurHandler: emailBlurHandler,
  } = useInput(isEmail);
  const {
    value: password,
    hasError: passwordHasError,
    valueChangeHandler: passwordChanged,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(isNotEmpty);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!companyChecked) {
      dispatch(BackdropActions.setIsLoading(true));
      try {
        const data = await getOrganizations({
          email: email,
          password: "bluehippo13",
        });
        console.log("getOrganizations", data);
        for (const item of data) {
          const newOrgList: Organization[] = [];

          console.log(item["organizations"]);
          for (const key in item["organizations"]) {
            newOrgList.push({
              org_id: key,
              org_name: item["organizations"][key].org_name,
              contact_id: item["organizations"][key].contact_id,
              full_name: item["organizations"][key].full_name,
            });
          }
          setOrgList(newOrgList);
        }
        setShowOrganization(true);
      } catch (err) {
        setToastMessage("Something went wrong");
        setToastSeverity("error");
        setToastShow(true);
        console.error(err);
      }
      dispatch(BackdropActions.setIsLoading(false));
    } else {
      dispatch(BackdropActions.setIsLoading(true));
      let success = true;
      let errorMessage = "";
      try {
        const data = await Login({
          org_id: org.org_id,
          username: email,
          password: password,
        });

        console.log(data);
        if (data?.error) {
          success = false;
          errorMessage = data.error;
        }
      } catch (err) {
        console.error(err);
        errorMessage = err.message;
        success = false;
      }
      if (success) {
        setToastMessage("You logged in successfully");
        setToastSeverity("success");
        setToastShow(true);
      } else {
        setToastMessage(errorMessage ?? "Your email or password is not correct");
        setToastSeverity("error");
        setToastShow(true);
      }

      dispatch(BackdropActions.setIsLoading(false));
    }
  };
  const handleORGChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const org = orgList.find((org) => org.org_name == event.target.value);
    setOrg(org);
    setCompanyChecked(true);
  };
  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 10 }}>
      <LoadingBackdrop open={false} />
      <Toast open={toastShow} setOpen={setToastShow} severity={toastSeverity} message={toastMessage} />
      <CssBaseline />
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={emailChanged}
            onBlur={emailBlurHandler}
            error={emailHasError}
            helperText={!emailHasError ? "" : "Please input correct email"}
          />
          {showOrganization && (
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="simple-select-label">Select your CRM</InputLabel>
              <Select
                labelId="simple-select-org-label"
                id="select-org"
                label="Select your Organization"
                onChange={handleORGChange}
                value={org.org_name}
              >
                {orgList.map((org) => (
                  <MenuItem key={org.org_id} value={org.org_name}>
                    {org.org_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {companyChecked && (
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={passwordChanged}
              onBlur={passwordBlurHandler}
              error={passwordHasError}
              helperText={!passwordHasError ? "" : "Password can't be empty"}
            />
          )}
          {/* <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" /> */}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {!companyChecked ? "Search for Company" : "Sign In"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
