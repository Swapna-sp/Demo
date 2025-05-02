import TravelSearchSection from "../components/TravelSearchSection"; 
import TravelPackages from "../components/TravelPackages";

const PackagePage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Packages</h1>
      <TravelSearchSection />
      <TravelPackages apiUrl="https://us-central1-fir-hosting-2a037.cloudfunctions.net/getTravelPackages" />
    </div>
  );
};

export default PackagePage;
