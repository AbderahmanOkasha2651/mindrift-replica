import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/Button';
import { ApiUser, login, me } from '../src/lib/api';

interface LoginProps {
  onBack: () => void;
  onSubmit: (user: ApiUser) => void;
}

export const Login: React.FC<LoginProps> = ({ onBack, onSubmit }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    try {
      const token = await login({ email, password });
      localStorage.setItem('access_token', token.access_token);
      const user = await me();
      localStorage.setItem('user', JSON.stringify(user));
      onSubmit(user);
      navigate('/dashboard');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed.';
      setError(message);
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?q=80&w=2400&auto=format&fit=crop"
          alt="Gym equipment"
          className="object-cover w-full h-full opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/85"></div>
        <div className="absolute inset-0 bg-black/35"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center w-full min-h-screen px-4 pt-24 pb-12">
        <div className="w-full max-w-md p-6 sm:p-8 bg-white/10 border border-white/20 rounded-3xl backdrop-blur-md shadow-[0_0_40px_rgba(0,0,0,0.45)]">
          <p className="mb-2 text-xs font-medium tracking-[0.35em] text-white/60 uppercase">
            Welcome back
          </p>
          <h1 className="mb-6 text-3xl font-semibold text-white">
            Sign in
          </h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 text-sm font-medium text-white/80">Email address</label>
              <input
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full px-4 py-3 text-sm text-white bg-white/10 border border-white/20 rounded-xl placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-mindrift-green/60 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-white/80">Password</label>
              <input
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full px-4 py-3 text-sm text-white bg-white/10 border border-white/20 rounded-xl placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-mindrift-green/60 focus:border-transparent"
                required
              />
            </div>
            <Button type="submit" className="w-full py-3 text-base !bg-mindrift-green !hover:bg-mindrift-greenHover">
              Sign in
            </Button>
            {error && <p className="text-sm text-red-300">{error}</p>}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={onBack}
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                Back to home
              </button>
              <Link to="/register" className="text-xs text-white/50 hover:text-white/80 transition-colors">
                New here? Create an account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
