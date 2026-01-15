import { useNavigate } from "react-router-dom";
import food1 from "../assets/foodImage1.jpg";

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;
  return (
    <div className="flex flex-col min-h-screen font-sans antialiased text-gray-900">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white pt-16 md:pt-24">
          <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">
            {/* Left Content */}
            <div className="max-w-2xl space-y-8 text-center md:text-left z-10">
              <div className="inline-block px-4 py-1.5 mb-2 text-sm font-semibold tracking-wide text-emerald-600 uppercase bg-emerald-50 rounded-full">
                Discover & Create
              </div>

              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                Master the Art of{" "}
                <span className="text-emerald-500">Cooking</span>
              </h1>

              <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-lg">
                Join our community of food lovers. Share your secret family
                recipes or discover new flavors from around the world with our
                curated collections.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button
                  className="px-8 py-4 bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 hover:bg-emerald-600 hover:-translate-y-1 transition-all duration-300"
                  onClick={() => {
                    if (!user) {
                      navigate("/login");
                    } else if (role === "host") {
                      navigate("/addRecipe");
                    } else {
                      navigate("/recipes");
                    }
                  }}
                >
                  {role === "host" ? "Share Your Recipe" : "Go to Recipes"}
                </button>
              </div>
            </div>

            {/* Right Image with Decorative Elements */}
            <div className="relative w-full md:w-1/2 flex justify-center">
              {/* Decorative Background Blob */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

              <div className="relative group">
                <img
                  src={food1}
                  alt="Delicious healthy food"
                  className="w-72 h-72 md:w-[450px] md:h-[450px] rounded-[3rem] object-cover shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* SVG WAVE - Transition to next section */}
          <div>
            <svg
              viewBox="0 0 1440 320"
              xmlns="http://www.w3.org/2000/svg"
              className="block w-full"
            >
              <path
                fill="#ecfdf5"
                fillOpacity="1"
                d="M0,192L48,186.7C96,181,192,171,288,160C384,149,480,139,576,144C672,149,768,171,864,176C960,181,1056,171,1152,160C1248,149,1344,139,1392,133.3L1440,128L1440,320L0,320Z"
              />
            </svg>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
