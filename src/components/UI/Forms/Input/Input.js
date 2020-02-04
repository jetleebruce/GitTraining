import React from "react";
import styled from "styled-components";

const InputWrapper = styled.div`
  width: 100%;
  position: relative;
  dispaly: flex;
  flex-direction: column;
  margin-bottom: 3.5rem;

  &:last-of-type {
    margin-bottom: 5rem;
  }
`;

const Error = styled.div`
  padding: 0rem 2rem;
  position: absolute;
  bottom: 0;
  left: 0;
  visability: ${({ show }) => (show ? "visibile" : "hidden")};
  opacity: ${({ show }) => (show ? "1" : "0")};
  transform: translateY(${({ show }) => (show ? "20px" : "10px")});
  transition: all 0.1s;
  color: var(--color-errorRed);
  font-weight: 500;
  font-size: 1.2rem;
`;

const StyledInput = styled.input`
  padding: 1rem 2rem;
  width: 100%;
  background-color: var(--color-mainLight);
  color: var(--color-white);
  font-weight: 500;
  font-size: 1.2rem;
  border-radius: 2rem;
  border: none;

  &::placeholder {
    color: var(--color-white);
  }
`;

const Input = ({ field, form: { touched, errors }, ...props }) => {
  return (
    <InputWrapper>
      <StyledInput {...field} {...props} />
      <Error show={errors[field.name] && touched[field.name]}>
        {errors[field.name]}
      </Error>
    </InputWrapper>
  );
};

export default Input;
