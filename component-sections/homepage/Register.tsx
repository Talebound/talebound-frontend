'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { VerticalSemitransparent } from '../../components/VerticalSemitransparent/VerticalSemitransparent';
import Input from '../../components/Input/Input';
import { HelperType } from '../../utils/form/nextUiTypes';
import { validateEmail } from '../../utils/form/validateEmail';
import { validateUsername } from '../../utils/form/validateUsername';
import { validatePassword, validatePasswordAgain } from '../../utils/form/validatePassword';
import PageTermsOfService from '../../screens/terms-of-service/PageTermsOfService';
import PagePrivacyPolicy from '../../screens/privacy-policy/PagePrivacyPolicy';
import { ClickableSpan } from '../../components/ClickableSpan/ClickableSpan';
import { useCreateUser } from '../../api/useCreateUser';
import { Client } from 'react-hydration-provider';
import { styled } from '../../styles/stitches.config';
import { useInput } from '../../hooks/useInput';
import { Button } from '../../components/Button/Button';
import { TitleH4 } from '../../components/Typography/Title';
import { Text } from '../../components/Typography/Text';
import Checkbox from '../../components/Checkbox/Checkbox';
import Modal from '../../components/Modal/Modal';

const RegisterBackground = styled('div', {
  position: 'relative',
  width: '$full',
  height: '600px',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  margin: '-$sm',
  maskImage:
    'linear-gradient(45deg, rgba(255, 255, 255, 0) 0%, #ffffff 35%, #ffffff 65%,  rgba(255, 255, 255, 0) 100%)',
  backgroundImage: '$$backgroundImage',

  '@xsMax': {
    maskImage: 'none',
  },
});

const RegisterBox = styled(VerticalSemitransparent, {
  gap: '$sm',
  position: 'absolute',
  top: '$0',
  bottom: '$0',
  left: '50%',
  transform: 'translate(-50%, 0%)',
  padding: '$2xl $xl',
  fontWeight: '$bold',
  fontSize: '$xs',
  color: '$white600',
  textDecoration: 'none',
  minWidth: '33%',

  '@xsMax': {
    left: '$0',
    right: '$0',
    transform: 'translate(0%, 0%)',
  },

  '& .nextui-input-helper-text-container': {
    width: '$full',
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

const RegisterHeader = styled('h2', {
  color: '$white',
});

const RegisterLabel = styled('label', {
  color: '$primary800',
  fontFamily: '$heading',
  fontSize: '$md',
  textTransform: 'uppercase',
});

const FieldWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  marginBottom: '$md',
});

interface HomepageRegisterProps {
  background?: boolean;
}

const Register: React.FC<HomepageRegisterProps> = ({ background = false }) => {
  const [checked, setChecked] = useState(false);

  const createUser = useCreateUser();

  const { value: usernameValue, onChange: onChangeUsername } = useInput('');
  const { value: emailValue, onChange: onChangeEmail } = useInput('');
  const { value: password1Value, onChange: onChangePassword1 } = useInput('');
  const { value: password2Value, onChange: onChangePassword2 } = useInput('');

  const helperUsername: HelperType = useMemo(
    () => validateUsername(usernameValue),
    [usernameValue],
  );
  const helperEmail: HelperType = useMemo(() => validateEmail(emailValue), [emailValue]);
  const helperPassword1: HelperType = useMemo(
    () => validatePassword(password1Value),
    [password1Value],
  );
  const helperPassword2: HelperType = useMemo(
    () => validatePasswordAgain(password1Value, password2Value),
    [password1Value, password2Value],
  );

  /**
   * Link to open modal is inside a label, so we need to reverse the checkbox state
   * If we try to prevent default instead, modal won't open
   */
  const handleModalOpen = useCallback(() => {
    setChecked((p) => !p);
  }, []);

  const handleCheckbox = useCallback((v: boolean) => {
    setChecked(v);
  }, []);

  const buttonDisabled = useMemo(() => !checked || createUser.isLoading, [checked, createUser]);

  const submitNewUser = useCallback(() => {
    if (buttonDisabled) return;
    if (usernameValue === '' || emailValue === '' || password1Value === '' || password2Value === '')
      return;

    createUser.mutate({
      username: usernameValue,
      email: emailValue,
      password: password1Value,
    });

    console.log('submitNewUser', usernameValue, emailValue, password1Value, password2Value);
  }, [buttonDisabled, usernameValue, emailValue, password1Value, password2Value]);

  return (
    <Client>
      <RegisterBackground
        id="register"
        css={{ $$backgroundImage: background ? 'url("../assets/images/register-bg.png")' : '' }}
      >
        <RegisterBox>
          {createUser.isSuccess && (
            <>
              <RegisterHeader>User created!</RegisterHeader>
              <TitleH4 color="white" css={{ textAlign: 'center' }}>
                Please, check your email for verification link and sign in
              </TitleH4>
            </>
          )}
          {!createUser.isSuccess && (
            <>
              <RegisterHeader>Sign up</RegisterHeader>

              <FieldWrapper>
                <RegisterLabel id="reg-username">
                  Username
                  <Input
                    onChange={onChangeUsername}
                    type="text"
                    fullWidth
                    required
                    // helperColor={helperUsername.color}
                    // helperText={helperUsername.text}
                    aria-labelledby="reg-username"
                    transparent
                  />
                </RegisterLabel>
              </FieldWrapper>

              <FieldWrapper>
                <RegisterLabel id="reg-email">
                  Email
                  <Input
                    onChange={onChangeEmail}
                    type="text"
                    name="reg-email"
                    id="reg-email"
                    fullWidth
                    required
                    // helperColor={helperEmail.color}
                    // helperText={helperEmail.text}
                    aria-labelledby="reg-email"
                    transparent
                  />
                </RegisterLabel>
              </FieldWrapper>

              <FieldWrapper>
                <RegisterLabel id="reg-pass1">
                  Password
                  <Input
                    type={'password'}
                    onChange={onChangePassword1}
                    fullWidth
                    required
                    // helperColor={helperPassword1.color}
                    // helperText={helperPassword1.text}
                    aria-labelledby="reg-pass1"
                    transparent
                  />
                </RegisterLabel>
              </FieldWrapper>

              <FieldWrapper>
                <RegisterLabel id="reg-pass2">
                  Password again
                  <Input
                    type={'password'}
                    onChange={onChangePassword2}
                    name="reg-pass2"
                    id="reg-pass2"
                    fullWidth
                    required
                    // helperColor={helperPassword2.color}
                    // helperText={helperPassword2.text}
                    aria-labelledby="reg-pass2"
                    transparent
                  />
                </RegisterLabel>
              </FieldWrapper>
              <Checkbox
                id="req_checkbox"
                checked={checked}
                onCheckedChange={handleCheckbox}
                transparent
              >
                <Text size="xs" color="white">
                  I agree to the{' '}
                  <Modal
                    trigger={
                      <ClickableSpan onClick={handleModalOpen}>Terms of Service</ClickableSpan>
                    }
                    content={<PageTermsOfService />}
                  />{' '}
                  and I have read the{' '}
                  <Modal
                    trigger={
                      <ClickableSpan onClick={handleModalOpen}>Privacy Policy</ClickableSpan>
                    }
                    content={<PagePrivacyPolicy />}
                  />
                </Text>
              </Checkbox>
              <div>
                <Button color="primary" size="md" onClick={submitNewUser} disabled={buttonDisabled}>
                  <Text weight="bold" size="lg" color="white">
                    {createUser.isLoading ? 'Creating...' : 'Sign up'}
                  </Text>
                </Button>
              </div>

              {createUser.isError && (
                <Text color="danger">
                  Error when creating user. Please check the fields and try again.
                </Text>
              )}
            </>
          )}
        </RegisterBox>
      </RegisterBackground>
    </Client>
  );
};

export default Register;
