"use client";

import { Search, Sliders, PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import SearchAndFilters from "../destinations/SearchAndFilters";
import { Suspense } from "react";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isDestinationDetail =
    pathname?.includes("/destinations/") && pathname !== "/destinations";
  const isMainDestinationsPage = pathname === "/destinations";

  return (
    <header className="w-full bg-[#618725] text-white shadow-md">
      <div className="w-full max-w-[1920px] mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <Link href="/destinations" className="flex items-center gap-4">
            <Image
              src="/images/boliviaLogo.png"
              alt="Explora Bolivia Logo"
              width={90}
              height={110}
              className="h-auto"
            />
            <h1 className="text-2xl font-bold">Explora Bolivia</h1>
          </Link>

          {!isDestinationDetail && (
            <div className="w-full md:w-auto flex md:flex-grow">
              <div className="flex-1">
                <Suspense>
                  <SearchAndFilters />
                </Suspense>
              </div>
            </div>
          )}

          {isMainDestinationsPage && (
            <div className="flex justify-center md:justify-end">
              <Button
                onClick={() => router.push("/destinations/create")}
                className="bg-[#4a681c] hover:bg-[#3d5618] flex items-center gap-2"
              >
                <PlusCircle size={20} />
                Crear Destino
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
