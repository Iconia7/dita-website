import Navbar from "@/components/main-navbar";
import Footer from "@/components/footer";
import AppCTA from "@/components/app-cta";

export default function CoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <AppCTA />
      <Footer />
    </>
  );
}
