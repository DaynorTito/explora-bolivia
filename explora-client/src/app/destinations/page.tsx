import { Destination } from "@/types/destination";
import DestinationCard from "@/components/destinations/DestinationCard";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

async function getDestinations(searchParams: URLSearchParams): Promise<Destination[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const url = `${baseUrl}/destino-turistico?${searchParams.toString()}`;
  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch destinations");
  }

  return res.json();
}

const DestinationsPage = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[]>>;
}) => {
  const awaitedSearchParams = await searchParams;

  const queryParams = new URLSearchParams();

  for (const [key, value] of Object.entries(awaitedSearchParams)) {
    if (value) {
      queryParams.set(key, Array.isArray(value) ? value.join(",") : value.toString());
    }
  }

  const destinations = await getDestinations(queryParams);

  return (
    <>
      <Header />
      <div className="w-full min-h-screen bg-gray-50">
        <div className="w-full max-w-[1920px] mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Destinos Turísticos</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((destination: Destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DestinationsPage;
