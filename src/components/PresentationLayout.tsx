import { ArrowRight } from "lucide-react";
import StudentPhone from "./StudentPhone";
import StaffPhone from "./StaffPhone";
import ReviewPhone from "./ReviewPhone";

export default function PresentationLayout() {
  return (
    <div
      className="min-h-screen p-6 md:p-10"
      style={{
        background:
          "url(https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1200&q=80) center/cover",
        backgroundAttachment: "fixed",
      }}
    >
      <div
        className="absolute inset-0 bg-black bg-opacity-80"
        style={{ backdropFilter: "blur(2px)" }}
      ></div>
      <div className="relative z-10">
        <header className="max-w-6xl mx-auto mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-yellow-400">
            Firebird Café
          </h1>
          <p className="text-stone-300 max-w-3xl mx-auto">
            A premium dining experience at Jack E. Singley Academy for students
            to order gourmet food, staff to manage orders with precision, and
            administrators to curate quality feedback.
          </p>
          <div className="mt-6 flex justify-center">
            <div className="h-1 w-32 bg-yellow-800 rounded-full"></div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-12">
            <div className="flex flex-col items-center">
              <StudentPhone />
              <div className="mt-4 text-center">
                <h3 className="font-semibold text-lg text-yellow-400">
                  Student Interface
                </h3>
                <p className="text-sm text-stone-400">
                  Browse menu, customize orders, and provide feedback
                </p>
              </div>
            </div>

            <div className="relative flex flex-col items-center">
              {/* Connection arrows - visible on medium screens and up */}
              <div className="hidden md:block absolute left-0 top-1/3 transform -translate-x-full">
                <ArrowRight className="w-8 h-8 text-yellow-800" />
              </div>
              <div className="hidden md:block absolute right-0 top-2/3 transform translate-x-full rotate-180">
                <ArrowRight className="w-8 h-8 text-stone-600" />
              </div>

              <StaffPhone />
              <div className="mt-4 text-center">
                <h3 className="font-semibold text-lg text-stone-300">
                  Staff Database
                </h3>
                <p className="text-sm text-stone-400">
                  Process orders and update preparation status
                </p>
              </div>
            </div>

            <div className="relative flex flex-col items-center">
              {/* Connection arrow - visible on medium screens and up */}
              <div className="hidden md:block absolute left-0 top-1/2 transform -translate-x-full">
                <ArrowRight className="w-8 h-8 text-stone-700" />
              </div>

              <ReviewPhone />
              <div className="mt-4 text-center">
                <h3 className="font-semibold text-lg text-stone-300">
                  Review Database
                </h3>
                <p className="text-sm text-stone-400">
                  Manage and moderate student feedback
                </p>
              </div>
            </div>
          </div>

          {/* Data flow explanation */}
          <div className="mt-16 bg-stone-800 rounded-lg p-6 shadow-md border border-stone-700">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">
              System Data Flow
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-stone-700 p-4 rounded-lg border border-stone-600">
                <h3 className="font-semibold mb-2 flex items-center text-yellow-300">
                  <span className="bg-yellow-800 text-yellow-100 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">
                    1
                  </span>
                  Student Orders
                </h3>
                <p className="text-sm text-stone-300">
                  Students browse menu, customize items, and place orders with
                  their student ID verification.
                </p>
              </div>

              <div className="bg-stone-700 p-4 rounded-lg border border-stone-600">
                <h3 className="font-semibold mb-2 flex items-center text-stone-300">
                  <span className="bg-stone-600 text-stone-200 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">
                    2
                  </span>
                  Staff Processing
                </h3>
                <p className="text-sm text-stone-300">
                  Staff receive orders, set preparation times, and mark orders
                  as ready when completed.
                </p>
              </div>

              <div className="bg-stone-700 p-4 rounded-lg border border-stone-600">
                <h3 className="font-semibold mb-2 flex items-center text-stone-300">
                  <span className="bg-stone-600 text-stone-200 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">
                    3
                  </span>
                  Feedback Loop
                </h3>
                <p className="text-sm text-stone-300">
                  Students provide ratings and comments, which staff review and
                  approve for system improvement.
                </p>
              </div>
            </div>
          </div>

          {/* Benefits section */}
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold mb-6 text-yellow-400">
              Benefits for Our School
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-stone-800 p-5 rounded-lg shadow-md border border-stone-700">
                <div className="bg-yellow-900 w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center">
                  <span className="text-yellow-300 text-xl font-bold">⏱️</span>
                </div>
                <h3 className="font-semibold mb-2 text-yellow-300">
                  Reduced Wait Times
                </h3>
                <p className="text-sm text-stone-300">
                  Students spend less time in cafeteria lines
                </p>
              </div>

              <div className="bg-stone-800 p-5 rounded-lg shadow-md border border-stone-700">
                <div className="bg-yellow-900 w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center">
                  <span className="text-yellow-300 text-xl font-bold">📊</span>
                </div>
                <h3 className="font-semibold mb-2 text-yellow-300">
                  Better Inventory
                </h3>
                <p className="text-sm text-stone-300">
                  Improved food planning and reduced waste
                </p>
              </div>

              <div className="bg-stone-800 p-5 rounded-lg shadow-md border border-stone-700">
                <div className="bg-yellow-900 w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center">
                  <span className="text-yellow-300 text-xl font-bold">👍</span>
                </div>
                <h3 className="font-semibold mb-2 text-yellow-300">
                  Student Satisfaction
                </h3>
                <p className="text-sm text-stone-300">
                  Increased happiness with cafeteria services
                </p>
              </div>

              <div className="bg-stone-800 p-5 rounded-lg shadow-md border border-stone-700">
                <div className="bg-yellow-900 w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center">
                  <span className="text-yellow-300 text-xl font-bold">🔄</span>
                </div>
                <h3 className="font-semibold mb-2 text-yellow-300">
                  Continuous Improvement
                </h3>
                <p className="text-sm text-stone-300">
                  Data-driven menu and service enhancements
                </p>
              </div>
            </div>

            {/* Additional detailed benefits */}
            <div className="mt-8 bg-stone-800 rounded-lg p-6 shadow-md border border-stone-700 text-left">
              <h3 className="text-xl font-bold mb-4 text-yellow-400 text-center">
                Technology & Payment Solutions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-stone-700 p-4 rounded-lg border border-stone-600">
                    <h4 className="font-semibold mb-2 flex items-center text-yellow-300">
                      <span className="bg-yellow-800 text-yellow-100 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">
                        1
                      </span>
                      Student Account System
                    </h4>
                    <p className="text-sm text-stone-300">
                      Students create secure accounts with their school email,
                      storing their student ID, classroom, and preferences for
                      faster future orders. All data is encrypted and complies
                      with educational privacy standards.
                    </p>
                  </div>

                  <div className="bg-stone-700 p-4 rounded-lg border border-stone-600">
                    <h4 className="font-semibold mb-2 flex items-center text-yellow-300">
                      <span className="bg-yellow-800 text-yellow-100 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">
                        2
                      </span>
                      Digital Payment Options
                    </h4>
                    <p className="text-sm text-stone-300">
                      Multiple payment methods including pre-loaded student meal
                      accounts, school ID integration, and parent-approved
                      digital wallet options. Parents can monitor purchases and
                      set spending limits through a dedicated portal.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-stone-700 p-4 rounded-lg border border-stone-600">
                    <h4 className="font-semibold mb-2 flex items-center text-yellow-300">
                      <span className="bg-yellow-800 text-yellow-100 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">
                        3
                      </span>
                      Data Analytics & Reporting
                    </h4>
                    <p className="text-sm text-stone-300">
                      Advanced analytics track popular menu items, peak ordering
                      times, and student preferences. Cafeteria staff receive
                      automated inventory alerts and detailed reports to
                      optimize menu planning and reduce food waste.
                    </p>
                  </div>

                  <div className="bg-stone-700 p-4 rounded-lg border border-stone-600">
                    <h4 className="font-semibold mb-2 flex items-center text-yellow-300">
                      <span className="bg-yellow-800 text-yellow-100 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">
                        4
                      </span>
                      Seamless Integration
                    </h4>
                    <p className="text-sm text-stone-300">
                      The system integrates with existing school infrastructure
                      including student information systems, cafeteria POS
                      systems, and nutritional tracking software. Cloud-based
                      architecture ensures reliability with offline
                      functionality during network outages.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-16 text-center text-stone-400 text-sm">
            <p>Jack E. Singley Academy</p>
            <p>Irving Independent School District</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
