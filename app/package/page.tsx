import TravelPackages from "../components/TravelPackages";
import TravelSearchForm from "../components/TravelSearchForm";

const PackagePage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Packages</h1>
      <TravelSearchForm />
     <TravelPackages apiUrl={process.env.NEXT_PUBLIC_PACKAGE_API_URL!} />
    </div>
  );
};

export default PackagePage;
