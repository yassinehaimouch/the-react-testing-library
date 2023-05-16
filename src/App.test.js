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