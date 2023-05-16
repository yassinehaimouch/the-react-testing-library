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