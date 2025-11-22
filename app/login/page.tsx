import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import("../../components/login/LoginForm"), {
  loading: () => <p>Loading...</p>,
});

const LogingPage = () => {
  return (
    <div className="h-screen bg-linear-to-br from-cyan-300 to-purple-400 flex items-center justify-center">
      <LoginForm />
    </div>
  );
};

export default LogingPage;
