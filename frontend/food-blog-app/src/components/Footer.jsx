const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row justify-between gap-10">
        {/* Brand Info */}
        <div className="space-y-3 max-w-sm">
          <h2 className="text-2xl font-bold text-white">Food Blog</h2>
          <p className="text-sm leading-relaxed">
            Food Blog is a community-driven platform where food lovers share
            their favorite recipes, discover new cuisines, and cook with passion
            every day.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">My Recipes</li>
            <li className="hover:text-white cursor-pointer">Favourites</li>
            <li className="hover:text-white cursor-pointer">Login</li>
          </ul>
        </div>

        {/* Contact / Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Get in Touch
          </h3>
          <ul className="space-y-2 text-sm">
            <li>Email: support@foodblog.com</li>
            <li>Location: India</li>
            <li>Follow us on social media</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-4 text-center text-sm">
        © {new Date().getFullYear()} Food Blog. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
