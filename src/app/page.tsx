import HomePage from "@/app/pages/home/page";
import PagesLayout from "./pages/layout";

const Home = () => {
  return (
    <div>
      <PagesLayout>
        <HomePage />
      </PagesLayout>
    </div>
  );
};

export default Home;
