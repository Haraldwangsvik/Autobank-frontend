import { useAuth } from "react-oidc-context";

const LoginPage = () => {
  const auth = useAuth();
  const { signinRedirect } = auth;

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Du ma logge inn for a fortsette
        </h2>
        <button
          onClick={() => signinRedirect()}
          className="bg-online-orange text-online-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-online-orange-400 transition-colors"
        >
          Logg inn med Online
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
