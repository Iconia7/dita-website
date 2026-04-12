import Navbar from "@/components/default-navbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto min-h-screen">
      <Navbar />
      <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
