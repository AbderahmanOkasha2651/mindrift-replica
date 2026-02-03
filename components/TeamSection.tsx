import React from 'react';

const PEOPLE = [
  {
    name: 'Karim',
    title: 'Strength Coach',
    quote:
      'GymUnity helps me share training methods that keep athletes consistent and focused.',
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=900&auto=format&fit=crop',
    bg: 'bg-[#10C46E]',
  },
  {
    name: 'Mona',
    title: 'Nutrition Specialist',
    quote:
      'Every plan we build is grounded in real-world coaching and daily habits.',
    image:
      'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=900&auto=format&fit=crop',
    bg: 'bg-[#4DA6FF]',
  },
  {
    name: 'Omar',
    title: 'Performance Analyst',
    quote:
      'Tracking progress and recovery data makes training feel purposeful and smart.',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=900&auto=format&fit=crop',
    bg: 'bg-[#F4B23A]',
  },
];

export const TeamSection: React.FC = () => {
  return (
    <section className="w-full bg-[#F6EFE7] text-[#1E1E1E]">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-16">
        <h2 className="text-4xl font-semibold leading-tight text-[#1E1E1E]">
          Meet the minds
          <br />
          behind GymUnity
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PEOPLE.map((person) => (
            <div key={person.name} className="overflow-hidden rounded-[28px] border border-black/10 bg-white">
              <div className={`relative h-56 ${person.bg}`}>
                <img
                  src={person.image}
                  alt={person.name}
                  className="h-full w-full object-cover grayscale"
                />
              </div>
              <div className="space-y-3 p-6">
                <div>
                  <p className="text-base font-semibold text-[#1E1E1E]">{person.name}</p>
                  <p className="text-sm text-[#4D443C]">{person.title}</p>
                </div>
                <p className="text-sm leading-relaxed text-[#4D443C]">
                  {person.quote}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
