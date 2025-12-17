import "../globals.css";


export default function LoginLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        {children}
      </main>
    </div>
  );
}
