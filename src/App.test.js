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

const clickOnSubmitButton = () => {
  const submitBtnElement = screen.getByRole('button', {name: /submit/i});
  userEvent.click(submitBtnElement);
}

test('inputs should be initially empty', () => {
  // 1) Rendering The Component We Want to Test by beforEach()
  // 2) Finding The Element
  // 3) Assertion
  expect(screen.getByRole("textbox").value).toBe("");
  expect(screen.getByLabelText("Password").value).toBe("");
  expect(screen.getByLabelText("Confirm Password").value).toBe("");
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
  expect(screen.queryByText(/the email you input is invalid/i)).not.toBeInTheDocument();
  
  typeIntoForm({email: "testest.com"});
  clickOnSubmitButton();

  // eslint-disable-next-line testing-library/prefer-presence-queries
  expect(screen.queryByText(/the email you input is invalid/i)).toBeInTheDocument();
})

test('should show password error if is less then 5 character', () => {
  typeIntoForm({email: "test@test.com"});
  expect(screen.queryByText(/The password you entred should contain 5 or more character./i)).not.toBeInTheDocument();

  typeIntoForm({passwordInputElement: "qwer"});
  clickOnSubmitButton();

  // eslint-disable-next-line testing-library/prefer-presence-queries
  expect(screen.queryByText(/The password you entred should contain 5 or more character./i)).toBeInTheDocument()
})

test('should show confirm password error if passwords dont match', () => {
  typeIntoForm({email: "test@test.com", password: "12345"});
  expect(screen.queryByText(/the passwords don't match try again./i)).not.toBeInTheDocument();
  
  typeIntoForm({confirmPassword: "123456"});
  clickOnSubmitButton();

  // eslint-disable-next-line testing-library/prefer-presence-queries
  expect(screen.queryByText(/the passwords don't match try again./i)).toBeInTheDocument()
})

test('should show no error message if every input is valid', () => {  
  typeIntoForm({email: "test@test.com", password: "12345", confirmPassword: "12345"});
  clickOnSubmitButton();

  expect(screen.queryByText(/the passwords don't match try again./i)).not.toBeInTheDocument()
  expect(screen.queryByText(/The password you entred should contain 5 or more character./i)).not.toBeInTheDocument()
  expect(screen.queryByText(/the email you input is invalid/i)).not.toBeInTheDocument()
})