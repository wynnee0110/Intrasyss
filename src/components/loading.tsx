// components/LoadingScreen.tsx
export default function LoadingScreen({
  message = "Loading...",
  subMessage,
}: {
  message?: string;
  subMessage?: string;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 flex flex-col items-center justify-center">
      {/* Badge / logo */}
      <div className="w-20 h-20 rounded-3xl bg-white shadow-md border border-blue-100 flex items-center justify-center mb-6">
        <span className="text-xl font-semibold text-blue-700">USTP</span>
      </div>

      {/* Animated dots */}
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-bounce" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-bounce [animation-delay:120ms]" />
        <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-bounce [animation-delay:240ms]" />
      </div>

      <p className="text-base font-medium text-slate-700">{message}</p>
      {subMessage && (
        <p className="text-xs text-slate-500 mt-1">{subMessage}</p>
      )}
    </div>
  );
}
