const LOGIN_URI = process.env.NODE_ENV !== "production" ? "http://localhost:8000/login" : "";
// TODO 👆

const Login = () => {
  return <a href={LOGIN_URI}>Login with spotify</a>;
};

export default Login;
