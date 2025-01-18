import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
     <div>
      <Header></Header>
     </div>
     <p>
      Hello world
     </p>
     <Button>Pulsame</Button>
     <Footer />
    </div>
  );
}
