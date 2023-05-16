import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
  // eslint-disable-next-line testing-library/no-render-in-setup
  render(<App/>);
})

const typeIntoForm = ({email, password, confirmPassword}) => {
  const emailInputElement = screen.getByRole('textbox', {name: /email/i});
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement = screen.getByLabelText("Confirm Password");

  if(email){
    userEvent.type(emailInputElement, email);
  }
  if(password){
    userEvent.type(passwordInputElement, password);
  }
  if(confirmPasswordInputElement){
    userEvent.type(confirmPasswordInputElement, confirmPassword);
  }

  return {emailInputElement, passwordInputElement, confirmPasswordInputElement};
}

test('inputs should be initially empty', () => {
  // 1) Rendering The Component We Want to Test by beforEach()
  // 2) Finding The Element
  const emailInputElement = screen.getByRole("textbox");
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement = screen.getByLabelText("Confirm Password");

  // 3) Assertion
  expect(emailInputElement.value).toBe("");
  expect(passwordInputElement.value).toBe("");
  expect(confirmPasswordInputElement.value).toBe("");
});

test('should be able to type an email', () => {
  const {emailInputElement} = typeIntoForm({email: "test@test.com"});
  expect(emailInputElement.value).toBe("test@test.com");
})

test('should be able to type password', () => {
  const {passwordInputElement} = typeIntoForm({password: 'password!'});
  expect(passwordInputElement.value).toBe('password!');
})

test('should be able to type confirm password', () => {
  const {confirmPasswordInputElement} = typeIntoForm({confirmPassword: 'password!'});
  expect(confirmPasswordInputElement.value).toBe('password!');
})

test('should show error message on invalid email', () => {
  const emailErrorElement = screen.queryByText(/the email you input is invalid/i);
  const submitBtnElement = screen.getByRole('button', {name: /submit/i});
  
  expect(emailErrorElement).not.toBeInTheDocument();
  
  typeIntoForm({email: "testest.com"});
  userEvent.click(submitBtnElement);

  const emailErrorElementAgain = screen.queryByText(/the email you input is invalid/i);
  expect(emailErrorElementAgain).toBeInTheDocument();
})

test('should show password error if is less then 5 character', () => {
  const passwordErrorElement = screen.queryByText(/The password you entred should contain 5 or more character./i);
  const submitBtnElement = screen.getByRole("button", {name: /submit/i});

  typeIntoForm({email: "test@test.com"});
  expect(passwordErrorElement).not.toBeInTheDocument();

  typeIntoForm({passwordInputElement: "qwer"});
  userEvent.click(submitBtnElement);

  const passwordErrorElementAgain = screen.queryByText(/The password you entred should contain 5 or more character./i);
  expect(passwordErrorElementAgain).toBeInTheDocument()
})

test('should show confirm password error if passwords dont match', () => {
  const confirmPasswordErrorElement = screen.queryByText(/the passwords don't match try again./i);
  const submitBtnElement = screen.getByRole("button", {name: /submit/i});

  typeIntoForm({email: "test@test.com", password: "12345"});
  expect(confirmPasswordErrorElement).not.toBeInTheDocument();
  
  typeIntoForm({confirmPassword: "123456"});
  userEvent.click(submitBtnElement);

  const confirmPasswordErrorElementAgain = screen.queryByText(/the passwords don't match try again./i);
  expect(confirmPasswordErrorElementAgain).toBeInTheDocument()
})

test('should show no error message if every input is valid', () => {
  const submitBtnElement = screen.getByRole("button", {name: /submit/i});
  
  typeIntoForm({email: "test@test.com", password: "12345", confirmPassword: "12345"});
  userEvent.click(submitBtnElement);
  
  const emailErrorElement = screen.queryByText(/the email you input is invalid/i);
  const passwordErrorElement = screen.queryByText(/The password you entred should contain 5 or more character./i);
  const confirmPasswordErrorElementAgain = screen.queryByText(/the passwords don't match try again./i);

  expect(confirmPasswordErrorElementAgain).not.toBeInTheDocument()
  expect(passwordErrorElement).not.toBeInTheDocument()
  expect(emailErrorElement).not.toBeInTheDocument()
})