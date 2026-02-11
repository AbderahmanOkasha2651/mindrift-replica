import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { ApiUser, BASE_URL } from '../lib/api';
import { AICoachPlanCard, SuggestedPlan } from '../components/AICoachPlanCard';

type ChatRole = 'user' | 'assistant';

interface ChatMessage {
  role: ChatRole;
  content: string;
  createdAt: string;
  plan?: SuggestedPlan;
}

interface ChatContext {
  goal: string;
  level: string;
  days_per_week: number;
  equipment: string;
  injuries: string | null;
}

interface ChatResponse {
  reply: string;
  suggested_plan?: SuggestedPlan | null;
}

const readStoredUser = (): ApiUser | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  const raw = localStorage.getItem('user');
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw) as ApiUser;
  } catch {
    return null;
  }
};

const DEFAULT_CONTEXT: ChatContext = {
  goal: 'muscle gain',
  level: 'beginner',
  days_per_week: 4,
  equipment: 'gym',
  injuries: '',
};

export const AICoach: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser] = React.useState<ApiUser | null>(() => readStoredUser());
  const userId = currentUser?.id ?? 'unknown';
  const historyKey = `ai_chat_user_${userId}`;
  const contextKey = `ai_chat_context_user_${userId}`;

  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [context, setContext] = React.useState<ChatContext>(DEFAULT_CONTEXT);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const scrollRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const storedHistory = localStorage.getItem(historyKey);
    if (storedHistory) {
      try {
        setMessages(JSON.parse(storedHistory) as ChatMessage[]);
      } catch {
        setMessages([]);
      }
    } else {
      setMessages([]);
    }

    const storedContext = localStorage.getItem(contextKey);
    if (storedContext) {
      try {
        setContext(JSON.parse(storedContext) as ChatContext);
      } catch {
        setContext(DEFAULT_CONTEXT);
      }
    } else {
      setContext(DEFAULT_CONTEXT);
    }
  }, [contextKey, historyKey]);

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    localStorage.setItem(historyKey, JSON.stringify(messages));
  }, [historyKey, messages]);

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    localStorage.setItem(contextKey, JSON.stringify(context));
  }, [contextKey, context]);

  React.useEffect(() => {
    if (!scrollRef.current) {
      return;
    }
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]);

  const handleReset = () => {
    setMessages([]);
    setError(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(historyKey);
    }
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) {
      return;
    }

    setError(null);
    setInput('');

    const userMessage: ChatMessage = {
      role: 'user',
      content: trimmed,
      createdAt: new Date().toISOString(),
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setIsLoading(true);

    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    if (!token) {
      setIsLoading(false);
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/ai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: trimmed,
          context: {
            ...context,
            injuries: context.injuries ? context.injuries : null,
          },
          history: nextMessages.map(({ role, content, createdAt }) => ({
            role,
            content,
            createdAt,
          })),
        }),
      });

      if (response.status === 401) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        navigate('/login');
        return;
      }

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || 'Failed to reach AI coach.');
      }

      const data = (await response.json()) as ChatResponse;
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: data.reply,
        createdAt: new Date().toISOString(),
        plan: data.suggested_plan ?? undefined,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Network error. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      {/* Background video for cinematic feel; muted + playsInline for autoplay across devices */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .ai-coach-bg-video { display: none; }
        }
      `}</style>
      <video
        className="ai-coach-bg-video absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        src="/Realistic_Home_Workout_Cinematic_Video.mp4"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-black/85" aria-hidden="true" />

      <div className="relative px-6 pt-28 pb-12 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="w-full rounded-3xl border border-white/10 bg-black/50 p-5 backdrop-blur-xl lg:w-72 lg:sticky lg:top-28 lg:self-start">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Workout Context</h2>
                <Button variant="ghost" className="text-xs" onClick={handleReset}>
                  Reset chat
                </Button>
              </div>
              <div className="mt-4 space-y-4 text-sm text-white/80">
                <label className="block">
                  <span className="text-xs uppercase tracking-wide text-white/60">Goal</span>
                  <select
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-sm text-white"
                    value={context.goal}
                    onChange={(event) => setContext((prev) => ({ ...prev, goal: event.target.value }))}
                  >
                    <option value="muscle gain">Muscle gain</option>
                    <option value="fat loss">Fat loss</option>
                    <option value="strength">Strength</option>
                    <option value="endurance">Endurance</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-xs uppercase tracking-wide text-white/60">Experience</span>
                  <select
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-sm text-white"
                    value={context.level}
                    onChange={(event) => setContext((prev) => ({ ...prev, level: event.target.value }))}
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-xs uppercase tracking-wide text-white/60">Days per week</span>
                  <input
                    type="number"
                    min={1}
                    max={7}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-sm text-white"
                    value={context.days_per_week}
                    onChange={(event) =>
                      setContext((prev) => ({
                        ...prev,
                        days_per_week: Number(event.target.value),
                      }))
                    }
                  />
                </label>
                <label className="block">
                  <span className="text-xs uppercase tracking-wide text-white/60">Equipment</span>
                  <select
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-sm text-white"
                    value={context.equipment}
                    onChange={(event) =>
                      setContext((prev) => ({ ...prev, equipment: event.target.value }))
                    }
                  >
                    <option value="gym">Gym</option>
                    <option value="home">Home</option>
                    <option value="bodyweight">Bodyweight</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-xs uppercase tracking-wide text-white/60">
                    Injury notes
                  </span>
                  <textarea
                    rows={3}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-sm text-white"
                    placeholder="Optional"
                    value={context.injuries ?? ''}
                    onChange={(event) =>
                      setContext((prev) => ({ ...prev, injuries: event.target.value }))
                    }
                  />
                </label>
              </div>
            </div>

            <div className="flex min-h-[640px] flex-1 flex-col rounded-3xl border border-white/10 bg-black/55 backdrop-blur-xl">
              <div className="border-b border-white/10 px-6 py-4">
                <h1 className="text-2xl font-semibold text-white">GymUnity AI Coach</h1>
                <p className="mt-1 text-xs text-white/60">
                  Ask for workouts, weekly plans, or quick exercise swaps.
                </p>
              </div>

              <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
                {messages.length === 0 && !isLoading && (
                  <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-white/70">
                    Start the conversation by sharing your goals or asking for a plan.
                  </div>
                )}
                {messages.map((message, index) => (
                  <div
                    key={`${message.createdAt}-${index}`}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        message.role === 'user'
                          ? 'bg-mindrift-green text-gray-900'
                          : 'bg-black/60 text-white'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      {message.role === 'assistant' && message.plan && (
                        <AICoachPlanCard plan={message.plan} />
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl bg-black/60 px-4 py-3 text-sm text-white/60">
                      GymUnity AI Coach is typing...
                    </div>
                  </div>
                )}
              </div>

              {error && (
                <div className="mx-6 mb-4 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              )}

              <div className="border-t border-white/10 px-6 py-5">
                <div className="flex items-end gap-3">
                  <textarea
                    rows={2}
                    className="min-h-[48px] flex-1 resize-none rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-mindrift-green/40"
                    placeholder="Message your AI coach..."
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <Button
                    className="h-12 px-6 text-sm !bg-mindrift-green !hover:bg-mindrift-greenHover"
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                  >
                    Send
                  </Button>
                </div>
                <div className="mt-2 text-xs text-white/50">
                  Press Enter to send, Shift+Enter for a new line.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
