import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

export const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.2),_transparent_60%)]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black"></div>
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-24 pt-32 text-center">
        <p className="text-xs font-medium tracking-[0.45em] text-white/60 uppercase">
          GymUnity Platform
        </p>
        <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">Train smarter. Build together.</h1>
        <p className="mt-4 max-w-xl text-sm text-white/70">
          Access programs, track progress, and join the community. Log in or create an
          account to get started.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link to="/login">
            <Button className="px-6 py-3 text-base !bg-mindrift-green !hover:bg-mindrift-greenHover">
              Log in
            </Button>
          </Link>
          <Link to="/register">
            <Button className="px-6 py-3 text-base bg-white/10 text-white hover:bg-white/20">
              Create account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
