import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm, Controller } from "react-hook-form";
import SelectRole from "./select_role";
import TextComponent from '../../components/textField/index';
import { signUpFields } from "../../constants/userForm";
import { RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { createNewEmployee } from '../../features/auth/actions';

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn() {
    const classes = useStyles();
    const { control, formState: { errors }, handleSubmit } = useForm();
    const auth = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch();
    const onSubmit = (data: any) => {
        // alert(JSON.stringify(data));
        dispatch(createNewEmployee(data))
        // console.log(data.name);
    };
    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {
                        signUpFields.map((value, index)=>(
                            <Controller
                                name={value.name}
                                render={({ field }) => (
                                    <TextComponent
                                        label={value.label}
                                        field={field}
                                        errors={errors}
                                        name={value.name}
                                        type={value.type}
                                        variant={value.variant}
                                    />
                                )}
                                control={control}
                                rules={value.rules}
                            />
                        ))
                    }
                    <Controller
                        name="role"
                        render={({field})=>(
                            <SelectRole {...field}/>
                            )}
                        control={control}
                        rules={{
                            required: 'this field is required'
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        size="large"
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                {/* Forgot password? */}
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Already have an account Log In ?"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}