import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <h1>Welcome to HiForms</h1>
        <p>.... code .....</p>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
