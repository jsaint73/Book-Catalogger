import React, { userState } from "react";
import axios from "axios";

const LoginPage = () => {
  const [username, setUsername] = userState("");
  const [password, setPassword] = userState("");
  const auth = useAuth();
  const navigate = useNavigation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/login", {
        username,
        password,
      });
      auth.login(response.data.token);
      navigate('/');
    } catch (error) {
      console.error(
        "login failed",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
