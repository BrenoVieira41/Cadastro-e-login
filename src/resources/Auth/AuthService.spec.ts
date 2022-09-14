import AuthService from "./AuthService";

describe('Auth', () => {
  it('should be able to login user', async () => {

    const login = {
      email: "test@test.com",
      password: "1Test*"
    }

    const loginUser = await AuthService.login(login.email, login.password);
    expect(loginUser).toHaveProperty('token');
  });
});
