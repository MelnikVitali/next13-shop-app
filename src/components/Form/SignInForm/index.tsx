'use client';
import { type FC } from 'react';
import { Container, Grid, Box, Typography, Stack, Link as MuiLink, Alert } from '@mui/material';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { signInYupSchema } from '@/utils/yupSchemas';
import { useSignInSubmit } from '@/hooks/useSignInSubmit';
import SocialLoginButtons from '@/components/Form/SocialLoginButtons';
import PasswordInput from '@/components/Form/FormInputs/PasswordInput';
import TextInput from '@/components/Form/FormInputs/TextInput';
import { styles } from './styles';

export interface IFormInputsSignIn {
  email: string;
  password: string;
}

const SignInForm: FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputsSignIn>({
    resolver: yupResolver<IFormInputsSignIn>(signInYupSchema),
  });

  const [loading, error, onSubmit] = useSignInSubmit();

  return (
    <Container maxWidth={false} sx={styles.wrapper}>
      <Grid container sx={styles.wrapperForm}>
        <Grid item sx={{ maxWidth: '70rem', width: '100%' }}>
          <Grid container sx={styles.formContainer}>
            <Grid item container rowSpacing={5} sx={styles.signInFormContainer}>
              <Grid item xs={12} sm={6} sx={{ borderRight: { sm: '1px solid #ddd' } }}>
                <Box
                  component='form'
                  noValidate
                  autoComplete='off'
                  sx={styles.formBox}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Typography
                    variant='h6'
                    component='h1'
                    sx={{ textAlign: 'center', mb: '1.5rem' }}
                  >
                    Log into your account
                  </Typography>
                  <TextInput name='email' control={control} errors={errors} label='Email' />
                  <PasswordInput
                    name='password'
                    control={control}
                    errors={errors}
                    label='Password'
                  />
                  <LoadingButton
                    loading={loading}
                    type='submit'
                    variant='contained'
                    color='secondary'
                    sx={styles.loadingButton}
                  >
                    Login
                  </LoadingButton>
                  {error && (
                    <Alert variant='outlined' severity='error' sx={{ marginTop: '1rem' }}>
                      {error}
                    </Alert>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant='h6' component='p' sx={styles.withAnotherProvider}>
                  Log in with another provider:
                </Typography>
                <SocialLoginButtons />
              </Grid>
            </Grid>

            <Grid container justifyContent='center'>
              <Stack sx={{ mt: '3rem', textAlign: 'center' }}>
                <Typography sx={{ fontSize: '0.9rem', mb: '1rem' }}>
                  Need an account?{' '}
                  <MuiLink
                    component={Link}
                    prefetch={false}
                    href='/auth/register'
                    sx={styles.signupLink}
                  >
                    Sign up here
                  </MuiLink>
                </Typography>
                <Typography sx={{ fontSize: '0.9rem' }}>
                  Forgot your{' '}
                  <MuiLink
                    component={Link}
                    prefetch={false}
                    href='/auth/forgot-password'
                    sx={styles.forgotLink}
                  >
                    password?
                  </MuiLink>
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignInForm;
