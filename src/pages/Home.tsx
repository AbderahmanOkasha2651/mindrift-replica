import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Layers, Globe, GraduationCap, Play } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { TeamSection } from '../../components/TeamSection';

const COMMUNITY_STATS = [
  {
    label: '10K+ Athletes',
    icon: Users,
    color: 'bg-[#C9A9FF] text-[#2C1F4A]',
  },
  {
    label: '50 Training Programs',
    icon: Layers,
    color: 'bg-[#78E6B8] text-[#0F2C1F]',
  },
  {
    label: '15 Specialties',
    icon: Globe,
    color: 'bg-[#7CC4FF] text-[#0C2A45]',
  },
  {
    label: '70% Certified Coaches',
    icon: GraduationCap,
    color: 'bg-[#FFC36A] text-[#4A2B00]',
  },
];

export const Home: React.FC = () => {
  return (
    <div className="bg-black text-white">
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/17840/pexels-photo.jpg"
            alt="Gym equipment"
            className="h-full w-full object-cover opacity-95"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.2),_transparent_60%)]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
          <div className="absolute inset-0 bg-black/15"></div>
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
      </section>

      <section className="bg-[#F7EFE7] px-6 py-20 text-[#1B1B1B] sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#6F5E54]">
                Community
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-[#1B1B1B] sm:text-4xl">
                Join a network of athletes building stronger routines together.
              </h2>
              <p className="mt-4 max-w-lg text-sm text-[#5F5149]">
                GymUnity connects athletes, coaches, and communities to keep training
                consistent, safe, and motivating.
              </p>
            </div>

            <div className="space-y-4">
              {COMMUNITY_STATS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 rounded-2xl bg-white/70 px-4 py-3 shadow-sm"
                  >
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full ${item.color}`}>
                      <Icon size={22} />
                    </div>
                    <p className="text-lg font-semibold text-[#1B1B1B]">{item.label}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_1.4fr]">
            <div>
              <h3 className="text-3xl font-semibold text-[#1B1B1B] sm:text-4xl">
                Your experience makes the difference
              </h3>
              <p className="mt-4 max-w-md text-sm text-[#5F5149]">
                See how GymUnity members apply real-world knowledge and why we need
                thoughtful contributors across every discipline.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-3xl bg-[#E9E0D7] shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1600&auto=format&fit=crop"
                alt="Coach speaking in a studio"
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-full bg-black/70 px-4 py-2 text-xs font-medium text-white">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                  <Play size={16} />
                </span>
                Member story highlight
              </div>
            </div>
          </div>
        </div>
      </section>

      <TeamSection />

      <footer className="bg-black px-6 py-14 text-white sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 border-t border-white/10 pt-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-4">
            <div className="text-xs font-semibold tracking-[0.35em] text-white/60 uppercase">
              GymUnity
            </div>
            <p className="max-w-sm text-sm text-white/70">
              Train smarter, stay accountable, and connect with a community of athletes and coaches.
            </p>
            <div className="text-xs text-white/50">
              © {new Date().getFullYear()} GymUnity. All rights reserved.
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm text-white/80 sm:grid-cols-3">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/60">Platform</p>
              <a className="block hover:text-white" href="/dashboard">Dashboard</a>
              <a className="block hover:text-white" href="/ai-coach">AI Coach</a>
              <a className="block hover:text-white" href="/news">News</a>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/60">Account</p>
              <a className="block hover:text-white" href="/login">Login</a>
              <a className="block hover:text-white" href="/register">Register</a>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/60">Support</p>
              <a className="block hover:text-white" href="/news/preferences">Preferences</a>
              <a className="block hover:text-white" href="/news/explore">Explore</a>
              <a className="block hover:text-white" href="mailto:support@gymunity.ai">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
