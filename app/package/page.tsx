import TravelPackages from "../components/TravelPackages";
import TravelSearchForm from "../components/TravelSearchForm";

const PackagePage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Packages</h1>
      <TravelSearchForm />
      <TravelPackages apiUrl="https://gettravelpackages-5oz2r3w4ya-uc.a.run.app" />
    </div>
  );
};

export default PackagePage;
