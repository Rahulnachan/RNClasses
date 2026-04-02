import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { HomeIcon } from "@heroicons/react/24/solid";

const Breadcrumbs = () => {

  // Get current URL
  const location = useLocation();

  // Split URL into parts
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Convert kebab-case to Title Case
  const getDisplayName = (name) => {
    return name
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-50 border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <ol className="flex items-center space-x-2 text-sm">

          {/* Home icon */}
          <li>
            <Link to="/" className="text-gray-500 hover:text-blue-600 transition-colors">
              <HomeIcon className="w-4 h-4" />
            </Link>
          </li>

          {/* Dynamic breadcrumb links */}
          {pathnames.map((name, index) => {

            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            const displayName = getDisplayName(name);

            return (
              <li key={name} className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>

                {isLast ? (
                  <span className="text-gray-900 font-medium">
                    {displayName}
                  </span>
                ) : (
                  <Link
                    to={routeTo}
                    className="text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    {displayName}
                  </Link>
                )}
              </li>
            );
          })}

        </ol>
      </div>
    </motion.nav>
  );
};

export default Breadcrumbs;
