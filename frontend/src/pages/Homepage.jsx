import Chatbot from "../components/chatbot";
import RecommendedProducts from "../components/RecommendedProducts";
import FlashSales from "../components/FlashSales";

const Homepage = ({ user }) => {
  return (
    <div>
      <FlashSales />
      {user && <RecommendedProducts userId={user.id} />}
      <Chatbot userId={user?.id} />
    </div>
  );
};

export default Homepage;
