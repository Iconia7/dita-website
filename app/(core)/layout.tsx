import Navbar from "@/components/main-navbar";

export default function CoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20">{children}</main>
    </>
  );
}
