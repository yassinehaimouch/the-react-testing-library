import { render, screen } from '@testing-library/react';
import App from './App';

test('inputs should be initially empty', () => {
  // 1) Rendering The Component We Want to Test
  render(<App />);

  // 2) Finding The Element
  const emailInputElement = screen.getByRole("textbox");

  // 3) Assertion
  expect(emailInputElement.value).toBe("");
});