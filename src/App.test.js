import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

test('inputs should be initially empty', () => {
  // 1) Rendering The Component We Want to Test
  render(<App />);

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
  render(<App />);

  const emailInputElement = screen.getByRole('textbox', {name: /email/i});
  userEvent.type(emailInputElement, "test@test.com");

  expect(emailInputElement.value).toBe("test@test.com");
})

test('should be able to type password', () => {
  render(<App/>);

  const passwordInputElement = screen.getByLabelText('Password');
  userEvent.type(passwordInputElement, 'password!');

  expect(passwordInputElement.value).toBe('password!');
})

test('should be able to type confirm password', () => {
  render(<App/>);

  const confirmPasswordInputElement = screen.getByLabelText("Confirm Password");
  userEvent.type(confirmPasswordInputElement, 'password!');

  expect(confirmPasswordInputElement.value).toBe('password!');
})

test('should show error message on invalid email', () => {
  render(<App/>);

  const emailErrorElement = screen.queryByText(/the email you input is invalid/i);
  const emailInputElement = screen.getByRole('textbox', {name: /email/i});
  const submitBtnElement = screen.getByRole('button', {name: /submit/i});

  expect(emailErrorElement).not.toBeInTheDocument();

  userEvent.type(emailInputElement, 'testtest.com');
  userEvent.click(submitBtnElement);

  const emailErrorElementAgain = screen.queryByText(/the email you input is invalid/i);
  expect(emailErrorElementAgain).toBeInTheDocument();
})

test('should show password error if is less then 5 character', () => {
  render(<App />);

  const emailInputElement = screen.getByRole("textbox", {name: /email/i});
  const passwordInputElement = screen.getByLabelText("Password");
  const passwordErrorElement = screen.queryByText(/The password you entred should contain 5 or more character./i);
  const submitBtnElement = screen.getByRole("button", {name: /submit/i});

  userEvent.type(emailInputElement, "test@test.com")
  expect(passwordErrorElement).not.toBeInTheDocument();

  userEvent.type(passwordInputElement, "qwer");
  userEvent.click(submitBtnElement);

  const passwordErrorElementAgain = screen.queryByText(/The password you entred should contain 5 or more character./i);
  expect(passwordErrorElementAgain).toBeInTheDocument()
})

test('should show confirm password error if passwords dont match', () => {
  render(<App />);

  const emailInputElement = screen.getByRole("textbox", {name: /email/i});
  const confirmPasswordInputElement = screen.getByLabelText("Confirm Password");
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordErrorElement = screen.queryByText(/the passwords don't match try again./i);
  const submitBtnElement = screen.getByRole("button", {name: /submit/i});

  userEvent.type(emailInputElement, "test@test.com")
  userEvent.type(passwordInputElement, "12345")
  expect(confirmPasswordErrorElement).not.toBeInTheDocument();

  userEvent.type(confirmPasswordInputElement, "123456");
  userEvent.click(submitBtnElement);

  const confirmPasswordErrorElementAgain = screen.queryByText(/the passwords don't match try again./i);
  expect(confirmPasswordErrorElementAgain).toBeInTheDocument()
})

test('should show no error message if every input is valid', () => {
  render(<App />);

  const emailInputElement = screen.getByRole("textbox", {name: /email/i});
  const confirmPasswordInputElement = screen.getByLabelText("Confirm Password");
  const passwordInputElement = screen.getByLabelText("Password");
  const submitBtnElement = screen.getByRole("button", {name: /submit/i});
  
  userEvent.type(emailInputElement, "test@test.com");
  userEvent.type(passwordInputElement, "12345");
  userEvent.type(confirmPasswordInputElement, "12345");
  userEvent.click(submitBtnElement);
  
  const emailErrorElement = screen.queryByText(/the email you input is invalid/i);
  const passwordErrorElement = screen.queryByText(/The password you entred should contain 5 or more character./i);
  const confirmPasswordErrorElementAgain = screen.queryByText(/the passwords don't match try again./i);

  expect(confirmPasswordErrorElementAgain).not.toBeInTheDocument()
  expect(passwordErrorElement).not.toBeInTheDocument()
  expect(emailErrorElement).not.toBeInTheDocument()
})