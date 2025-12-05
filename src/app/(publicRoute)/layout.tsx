import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { IChildren } from "@/types";

export default function PublicLayout({ children }: IChildren) {
  return <main>
    <Navbar />
    {children}
    <Footer />
  </main>;
}
