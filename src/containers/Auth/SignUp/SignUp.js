import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { FormWrapper, StyledForm } from "../../../hoc/layout/elements";
import styled from "styled-components";
import Input from "../../../components/UI/Forms/Input/Input";
import Button from "../../../components/UI/Forms/Button/Button";
import Heading from "../../../components/UI/Headings/Heading";
import * as actions from "../../../store/actions/index";
import Message from "../../../components/UI/Message/Message";

// console.log(actions.signUp);

const MessageWrapper = styled.div`
  position: absolute;
  bottom: 0;
`;

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("Your first name is required")
    .min(3, "Too short")
    .max(25, "Too long"),
  lastName: Yup.string()
    .required("Your last name is required")
    .min(3, "Too short")
    .max(25, "Too long"),
  email: Yup.string()
    .email("Invalid email")
    .required("The email is required"),
  password: Yup.string()
    .required("The password is required")
    .min(8, "The password is too short"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], `Password doesn't match`)
    .required("You need to confirm the password")
});

const SignUp = ({ login, loading, error, cleanUp }) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
      }}
      validationSchema={SignUpSchema}
      onSubmit={async (values, { setSubmitting }) => {
        await login(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, isValid }) => (
        <FormWrapper>
          <Heading noMargin size='h1' color='white'>
            Sign up for your account
          </Heading>
          <Heading bold size='h4' color='white'>
            Fill in the details to register you new account
          </Heading>
          <StyledForm>
            <Field
              type='text'
              name='firstName'
              placeholder='Your first name...'
              component={Input}
            />

            <Field
              type='text'
              name='lastName'
              placeholder='Your last name...'
              component={Input}
            />

            <Field
              type='email'
              name='email'
              placeholder='Your email...'
              component={Input}
            />

            <Field
              type='password'
              name='password'
              placeholder='Your password...'
              component={Input}
            />

            <Field
              type='password'
              name='confirmPassword'
              placeholder='Re type Your password...'
              component={Input}
            />

            <Button
              disabled={!isValid || isSubmitting}
              loading={loading ? "Signing up..." : null}
              type='submit'
            >
              Sign Up
            </Button>
            <MessageWrapper>
              <Message error show={error}>
                {error}
              </Message>
            </MessageWrapper>
          </StyledForm>
        </FormWrapper>
      )}
    </Formik>
  );
};

const mapStateToProps = ({ auth }) => ({
  auth: auth.loading,
  error: auth.error
});

const mapDispatchToProps = {
  login: actions.signUp,
  cleanUp: actions.clean
  // test: value => console.log(value)
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
