// validate input
export const isValidInput = (input: string): boolean => {
  return input.length > 0;
};

// validate email address
export const isValidEmail = (email: string): boolean => {
  return email.length > 4 && email.includes("@") && email.includes(".");
};

// validate password
export const isValidPassword = (password: string): boolean => {
  return password.length > 4 && password.length < 16;
};
