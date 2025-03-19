import { useState, useEffect, useRef } from "react";
import PhoneDisplay from "./PhoneDisplay";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import {
  AlertCircle,
  Bell,
  CheckCircle,
  ChevronRight,
  Clock,
  Eye,
  EyeOff,
  Mail,
  ShoppingCart,
  Star,
  User,
  Send,
  MoreVertical,
  Info,
} from "lucide-react";

interface FoodItem {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  availableDays?: string;
  isVegetarian?: boolean;
  nutrition?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    sugar: number;
  };
}

const foodItems: FoodItem[] = [
  {
    id: 1,
    name: "Breakfast Burrito",
    price: 3.5,
    category: "breakfast",
    description: "Scrambled eggs, cheese, and bacon wrapped in a warm tortilla",
    image:
      "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300&q=80",
    availableDays: "Monday & Thursday",
    nutrition: {
      calories: 450,
      protein: 18,
      carbs: 35,
      fat: 25,
      sugar: 2,
    },
  },
  {
    id: 2,
    name: "Chicken Sandwich",
    price: 4.25,
    category: "lunch",
    description:
      "Grilled chicken breast with lettuce, tomato, and mayo on a brioche bun",
    image:
      "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=300&q=80",
    availableDays: "Tuesday & Friday",
    nutrition: {
      calories: 520,
      protein: 28,
      carbs: 42,
      fat: 22,
      sugar: 4,
    },
  },
  {
    id: 3,
    name: "Fruit Cup",
    price: 2.0,
    category: "snacks",
    description:
      "Fresh seasonal fruits including strawberries, melon, and grapes",
    image:
      "https://images.unsplash.com/photo-1568909344668-6f14a07b56a0?w=300&q=80",
    availableDays: "Monday & Wednesday",
    isVegetarian: true,
    nutrition: {
      calories: 120,
      protein: 1,
      carbs: 30,
      fat: 0,
      sugar: 25,
    },
  },
  {
    id: 4,
    name: "Pizza Slice",
    price: 3.75,
    category: "lunch",
    description: "Hand-tossed cheese pizza with premium tomato sauce",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&q=80",
    availableDays: "Tuesday & Thursday",
    isVegetarian: true,
    nutrition: {
      calories: 285,
      protein: 12,
      carbs: 36,
      fat: 10,
      sugar: 3,
    },
  },
  {
    id: 5,
    name: "Yogurt Parfait",
    price: 2.5,
    category: "breakfast",
    description: "Creamy vanilla yogurt layered with granola and fresh berries",
    image:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&q=80",
    availableDays: "Monday & Wednesday",
    isVegetarian: true,
    nutrition: {
      calories: 220,
      protein: 8,
      carbs: 32,
      fat: 6,
      sugar: 18,
    },
  },
  {
    id: 6,
    name: "Chocolate Chip Cookie",
    price: 1.5,
    category: "snacks",
    description: "Freshly baked cookie with premium chocolate chips",
    image:
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300&q=80",
    availableDays: "Wednesday & Friday",
    isVegetarian: true,
    nutrition: {
      calories: 180,
      protein: 2,
      carbs: 24,
      fat: 9,
      sugar: 15,
    },
  },
  {
    id: 7,
    name: "Bottled Water",
    price: 1.0,
    category: "drinks",
    description: "Pure spring water in a recyclable bottle",
    image:
      "https://images.unsplash.com/photo-1616118132534-381148898bb4?w=300&q=80",
    availableDays: "Monday - Friday",
    isVegetarian: true,
    nutrition: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      sugar: 0,
    },
  },
  {
    id: 8,
    name: "Apple Juice",
    price: 1.75,
    category: "drinks",
    description: "100% pure pressed apple juice, no added sugar",
    image:
      "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300&q=80",
    availableDays: "Monday - Friday",
    isVegetarian: true,
    nutrition: {
      calories: 120,
      protein: 0,
      carbs: 30,
      fat: 0,
      sugar: 28,
    },
  },
  {
    id: 9,
    name: "Chocolate Milk",
    price: 1.5,
    category: "drinks",
    description: "Creamy milk with premium chocolate flavor",
    image:
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&q=80",
    availableDays: "Monday - Friday",
    nutrition: {
      calories: 160,
      protein: 8,
      carbs: 26,
      fat: 2.5,
      sugar: 24,
    },
  },
  {
    id: 10,
    name: "Oatmeal Raisin Cookie",
    price: 1.5,
    category: "snacks",
    description: "Soft-baked cookie with rolled oats and sweet raisins",
    image:
      "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=300&q=80",
    availableDays: "Tuesday & Thursday",
    isVegetarian: true,
    nutrition: {
      calories: 170,
      protein: 2,
      carbs: 26,
      fat: 7,
      sugar: 12,
    },
  },
  {
    id: 11,
    name: "Veggie Wrap",
    price: 4.0,
    category: "lunch",
    description: "Fresh vegetables and hummus in a spinach tortilla",
    image:
      "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300&q=80",
    availableDays: "Wednesday & Friday",
    isVegetarian: true,
  },
  {
    id: 12,
    name: "Granola Bar",
    price: 1.25,
    category: "snacks",
    description: "Crunchy oats, honey, and dried fruits in a convenient bar",
    image:
      "https://images.unsplash.com/photo-1631256572618-8c3e8a3b07d0?w=300&q=80",
    availableDays: "Monday - Friday",
    isVegetarian: true,
  },
  {
    id: 13,
    name: "Gourmet Coffee",
    price: 2.5,
    category: "drinks",
    description: "Premium arabica beans, freshly brewed",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&q=80",
    availableDays: "Monday - Friday",
    isVegetarian: true,
  },
  {
    id: 14,
    name: "Avocado Toast",
    price: 4.5,
    category: "breakfast",
    description: "Smashed avocado on artisan bread with sea salt and pepper",
    image:
      "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=300&q=80",
    availableDays: "Tuesday & Thursday",
    isVegetarian: true,
  },
  {
    id: 15,
    name: "Caprese Salad",
    price: 4.25,
    category: "lunch",
    description: "Fresh mozzarella, tomatoes, and basil with balsamic glaze",
    image:
      "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=300&q=80",
    availableDays: "Monday & Wednesday",
    isVegetarian: true,
  },
  {
    id: 16,
    name: "Iced Tea",
    price: 1.75,
    category: "drinks",
    description: "Freshly brewed and chilled black tea with optional lemon",
    image:
      "https://images.unsplash.com/photo-1556679343-c1306ee3f376?w=300&q=80",
    availableDays: "Tuesday & Friday",
    isVegetarian: true,
  },
  {
    id: 17,
    name: "Blueberry Muffin",
    price: 2.25,
    category: "breakfast",
    description:
      "Moist muffin packed with fresh blueberries and topped with sugar",
    image:
      "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=300&q=80",
    availableDays: "Monday & Wednesday",
    isVegetarian: true,
  },
  {
    id: 18,
    name: "Turkey Club Sandwich",
    price: 5.25,
    category: "lunch",
    description: "Sliced turkey, bacon, lettuce, and tomato on toasted bread",
    image:
      "https://images.unsplash.com/photo-1567234669003-dce7a7a88821?w=300&q=80",
    availableDays: "Wednesday & Friday",
  },
  {
    id: 19,
    name: "Grilled Cheese Sandwich",
    price: 3.25,
    category: "lunch",
    description: "Melted American and cheddar cheese on buttery toasted bread",
    image:
      "https://images.unsplash.com/photo-1528736235302-52922df5c122?w=300&q=80",
    availableDays: "Monday & Thursday",
    isVegetarian: true,
  },
  {
    id: 20,
    name: "Caesar Salad",
    price: 4.5,
    category: "lunch",
    description:
      "Crisp romaine lettuce with parmesan, croutons and Caesar dressing",
    image:
      "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=300&q=80",
    availableDays: "Tuesday & Thursday",
    isVegetarian: true,
  },
  {
    id: 21,
    name: "Cinnamon Roll",
    price: 2.75,
    category: "breakfast",
    description:
      "Freshly baked sweet roll with cinnamon-sugar filling and vanilla glaze",
    image:
      "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=300&q=80",
    availableDays: "Monday & Wednesday",
    isVegetarian: true,
  },
  {
    id: 22,
    name: "Mango Smoothie",
    price: 3.5,
    category: "drinks",
    description:
      "Blended fresh mangoes, yogurt, and a hint of lime for a tropical treat",
    image:
      "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=300&q=80",
    availableDays: "Tuesday & Friday",
    isVegetarian: true,
  },
];

export default function StudentPhone() {
  const [screen, setScreen] = useState("login");
  const [cart, setCart] = useState<any[]>([]);
  const [customizations, setCustomizations] = useState<{
    [key: number]: { modifications: string[]; instructions: string };
  }>({}); // Store customizations by item ID
  const [orderStatus, setOrderStatus] = useState("new");
  const [rating, setRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [notification, setNotification] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [readyTime, setReadyTime] = useState("");
  const [remainingTime, setRemainingTime] = useState("");
  const [showNutrition, setShowNutrition] = useState<number | null>(null);
  const countdownIntervalRef = useRef<number | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [registerMode, setRegisterMode] = useState(false);
  const [formData, setFormData] = useState(() => {
    // Try to load saved student data from localStorage
    const savedData = localStorage.getItem("studentData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        console.log("Loaded saved student data:", parsedData);
        return parsedData;
      } catch (error) {
        console.error("Error parsing saved student data:", error);
      }
    }
    // Default empty form data if nothing is saved
    return {
      email: "",
      password: "",
      confirmPassword: "",
      studentId: "",
      fullName: "",
      classroom: "",
    };
  });
  const [orderNumber, setOrderNumber] = useState("");

  // Calculate remaining time and update countdown
  useEffect(() => {
    // Clear any existing interval
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }

    if (prepTime && orderStatus === "preparing") {
      // Parse prep time (assuming format like "10 minutes")
      const minutes = parseInt(prepTime.split(" ")[0]);
      if (!isNaN(minutes)) {
        // Calculate ready time
        const ready = new Date();
        ready.setMinutes(ready.getMinutes() + minutes);
        setReadyTime(
          ready.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        );

        // Start countdown
        const updateCountdown = () => {
          const now = new Date();
          const diff = ready.getTime() - now.getTime();

          if (diff <= 0) {
            setRemainingTime("Ready any moment");
            if (countdownIntervalRef.current) {
              clearInterval(countdownIntervalRef.current);
              countdownIntervalRef.current = null;
            }
          } else {
            const minutes = Math.floor(diff / 60000);
            const seconds = Math.floor((diff % 60000) / 1000);
            setRemainingTime(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
          }
        };

        updateCountdown(); // Run immediately
        countdownIntervalRef.current = window.setInterval(
          updateCountdown,
          1000,
        );
      }
    }

    return () => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
        countdownIntervalRef.current = null;
      }
    };
  }, [prepTime, orderStatus]);

  // Listen for prep time updates from StaffPhone
  useEffect(() => {
    const handlePrepTimeUpdate = (event: CustomEvent) => {
      console.log("Prep time update received:", event.detail);
      if (event.detail && event.detail.prepTime) {
        setPrepTime(event.detail.prepTime);
      }
      if (event.detail && event.detail.status) {
        setOrderStatus(event.detail.status);
      }
    };

    // Check localStorage for updates
    const checkLocalStorage = () => {
      const storedPrepTime = localStorage.getItem("currentOrderPrepTime");
      const storedOrderStatus = localStorage.getItem("currentOrderStatus");

      if (storedPrepTime) {
        setPrepTime(storedPrepTime);
      }

      if (storedOrderStatus) {
        setOrderStatus(storedOrderStatus);
      }
    };

    // Add event listener for real-time updates
    window.addEventListener(
      "prepTimeUpdate",
      handlePrepTimeUpdate as EventListener,
    );
    console.log("Event listener for prepTimeUpdate added");

    // Check localStorage immediately on mount
    checkLocalStorage();

    // Set up interval to periodically check localStorage
    const intervalId = setInterval(checkLocalStorage, 2000);

    return () => {
      window.removeEventListener(
        "prepTimeUpdate",
        handlePrepTimeUpdate as EventListener,
      );
      clearInterval(intervalId);
      console.log(
        "Event listener for prepTimeUpdate removed and interval cleared",
      );
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("Input changed:", name, value);
    setFormData((prev) => {
      console.log("Previous form data:", prev);
      const updated = {
        ...prev,
        [name]: value,
      };
      console.log("Updated form data:", updated);
      return updated;
    });
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewComment(e.target.value);
  };

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000);
  };

  // Function to submit review to review database
  const submitReview = () => {
    const reviewData = {
      id: Math.floor(Math.random() * 1000) + 1,
      studentName: formData.fullName,
      studentId: formData.studentId,
      rating: rating,
      comment: reviewComment,
      timestamp: new Date().toLocaleString(),
      status: "pending", // All reviews start as pending until approved
    };

    console.log("Submitting review to database:", reviewData);

    try {
      // Create a global event that can be caught by ReviewPhone
      const reviewEvent = new CustomEvent("newReview", {
        detail: reviewData,
        bubbles: true,
        cancelable: true,
      });

      // Dispatch the event on window object
      window.dispatchEvent(reviewEvent);
      console.log("Review event dispatched successfully", reviewData);

      // Store review in localStorage as backup communication method
      const existingReviews = JSON.parse(
        localStorage.getItem("pendingReviews") || "[]",
      );
      existingReviews.push(reviewData);
      localStorage.setItem("pendingReviews", JSON.stringify(existingReviews));
      console.log("Review saved to localStorage");

      // Set a flag to indicate new reviews are available
      localStorage.setItem("newReviewAvailable", "true");
    } catch (error) {
      console.error("Error dispatching review event:", error);
    }

    setScreen("rated");
  };

  const renderScreen = () => {
    switch (screen) {
      case "login":
        return (
          <div className="flex flex-col items-center justify-center h-full p-4 space-y-6 bg-gradient-to-b from-stone-100 to-stone-50">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-yellow-800 opacity-75 blur"></div>
              <img
                src="https://api.dicebear.com/7.x/bottts-neutral/svg?seed=coffee&backgroundColor=f59e0b"
                alt="App Logo"
                className="relative w-24 h-24 mb-4 bg-stone-100 rounded-full p-2"
              />
            </div>
            <h2 className="text-xl font-bold text-center text-stone-900">
              Firebird Café
            </h2>
            <p className="text-sm text-center text-stone-600 mb-4">
              Jack E. Singley Academy
            </p>

            {registerMode ? (
              <div className="w-full space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="School Email"
                    className="pl-10"
                    type="email"
                    autoComplete="off"
                  />
                </div>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="pl-10"
                    autoComplete="off"
                  />
                </div>
                <div className="relative">
                  <AlertCircle className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleInputChange}
                    placeholder="Student ID"
                    className="pl-10"
                    maxLength={6}
                    autoComplete="off"
                  />
                </div>
                <div className="relative">
                  <AlertCircle className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    name="classroom"
                    value={formData.classroom}
                    onChange={handleInputChange}
                    placeholder="Classroom Number (e.g. B204)"
                    className="pl-10"
                    autoComplete="off"
                  />
                </div>
                <div className="relative">
                  <div className="absolute left-3 top-3 h-4 w-4 text-gray-400">
                    {showPassword ? <Eye /> : <EyeOff />}
                  </div>
                  <Input
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    className="pl-10"
                    type={showPassword ? "text" : "password"}
                    autoComplete="off"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1 h-8 w-8"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <div className="relative">
                  <div className="absolute left-3 top-3 h-4 w-4 text-gray-400">
                    {showPassword ? <Eye /> : <EyeOff />}
                  </div>
                  <Input
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm Password"
                    className="pl-10"
                    type={showPassword ? "text" : "password"}
                    autoComplete="off"
                  />
                </div>
                <Button
                  className="w-full bg-yellow-800 hover:bg-yellow-900 text-white"
                  onClick={() => {
                    console.log(
                      "Register button clicked with form data:",
                      formData,
                    );
                    if (!formData.email.endsWith("@stu.irvingisd.net")) {
                      showNotification("Please use your school email");
                      return;
                    }
                    if (formData.password !== formData.confirmPassword) {
                      showNotification("Passwords don't match");
                      return;
                    }
                    if (formData.studentId.length !== 6) {
                      showNotification("Student ID must be 6 digits");
                      return;
                    }
                    if (!formData.fullName) {
                      showNotification("Please enter your full name");
                      return;
                    }
                    if (!formData.classroom) {
                      showNotification("Please enter your classroom number");
                      return;
                    }
                    // Store user data in localStorage for persistence
                    localStorage.setItem(
                      "studentData",
                      JSON.stringify(formData),
                    );
                    console.log("Student data saved to localStorage");
                    setScreen("menu");
                  }}
                >
                  Register
                </Button>
                <p className="text-xs text-center text-gray-500">
                  Already have an account?{" "}
                  <button
                    className="text-yellow-600 hover:underline"
                    onClick={() => setRegisterMode(false)}
                  >
                    Sign in
                  </button>
                </p>
              </div>
            ) : (
              <div className="w-full space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="School Email"
                    className="pl-10"
                    type="email"
                    autoComplete="off"
                  />
                </div>
                <div className="relative">
                  <div className="absolute left-3 top-3 h-4 w-4 text-gray-400">
                    {showPassword ? <Eye /> : <EyeOff />}
                  </div>
                  <Input
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    className="pl-10"
                    type={showPassword ? "text" : "password"}
                    autoComplete="off"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1 h-8 w-8"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <Button
                  className="w-full bg-yellow-800 hover:bg-yellow-900 text-white"
                  onClick={() => {
                    console.log(
                      "Sign in button clicked with form data:",
                      formData,
                    );
                    if (!formData.email.endsWith("@stu.irvingisd.net")) {
                      showNotification("Please use your school email");
                      return;
                    }
                    if (!formData.password) {
                      showNotification("Please enter your password");
                      return;
                    }
                    // Store user data in localStorage for persistence
                    localStorage.setItem(
                      "studentData",
                      JSON.stringify(formData),
                    );
                    console.log("Student data saved to localStorage");
                    setScreen("menu");
                  }}
                >
                  Sign in
                </Button>
                <p className="text-xs text-center text-gray-500">
                  Don't have an account?{" "}
                  <button
                    className="text-yellow-600 hover:underline"
                    onClick={() => setRegisterMode(true)}
                  >
                    Register
                  </button>
                </p>
              </div>
            )}

            <p className="text-xs text-center text-gray-500 mt-4">
              Use your @stu.irvingisd.net email
            </p>
          </div>
        );

      case "menu":
        return (
          <div className="p-4 bg-gradient-to-b from-stone-100 to-stone-50 min-h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Firebird Café Menu</h2>
              {cart.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 bg-yellow-50 border-yellow-200 hover:bg-yellow-100"
                  onClick={() => setScreen("cart")}
                >
                  <ShoppingCart className="w-4 h-4 text-yellow-600" />
                  <span className="font-bold text-yellow-600">
                    {cart.length}
                  </span>
                </Button>
              )}
            </div>

            <Tabs defaultValue="lunch" className="w-full">
              <TabsList className="w-full mb-4">
                <TabsTrigger value="breakfast" className="flex-1">
                  Breakfast
                </TabsTrigger>
                <TabsTrigger value="lunch" className="flex-1">
                  Lunch
                </TabsTrigger>
                <TabsTrigger value="snacks" className="flex-1">
                  Snacks
                </TabsTrigger>
                <TabsTrigger value="drinks" className="flex-1">
                  Drinks
                </TabsTrigger>
              </TabsList>

              {["breakfast", "lunch", "snacks", "drinks"].map((category) => (
                <TabsContent
                  key={category}
                  value={category}
                  className="space-y-4"
                >
                  {foodItems
                    .filter((item) => item.category === category)
                    .map((item) => (
                      <Card key={item.id} className="overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-32 object-cover"
                        />
                        <CardHeader className="p-3 pb-0">
                          <CardTitle className="text-base flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              {item.name}
                              {item.isVegetarian && (
                                <span
                                  title="Vegetarian"
                                  className="text-green-600 text-xs bg-green-100 px-1 rounded-full"
                                >
                                  🌱
                                </span>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowNutrition(
                                  showNutrition === item.id ? null : item.id,
                                );
                              }}
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </CardTitle>
                          <CardDescription>
                            ${item.price.toFixed(2)}
                            <p className="text-xs text-gray-500 mt-1">
                              {item.description}
                            </p>
                            {item.availableDays && (
                              <p className="text-xs text-yellow-600 mt-1 font-medium">
                                Available: {item.availableDays}
                              </p>
                            )}
                            {showNutrition === item.id && item.nutrition && (
                              <div className="mt-2 p-2 bg-stone-50 rounded-md border border-stone-200 text-xs">
                                <div className="flex items-center gap-1 mb-1 text-stone-700">
                                  <Info className="h-3 w-3" />
                                  <span className="font-medium">
                                    Nutrition Facts
                                  </span>
                                </div>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                                  <p>
                                    <span className="font-medium">
                                      Calories:
                                    </span>{" "}
                                    {item.nutrition.calories}
                                  </p>
                                  <p>
                                    <span className="font-medium">
                                      Protein:
                                    </span>{" "}
                                    {item.nutrition.protein}g
                                  </p>
                                  <p>
                                    <span className="font-medium">Carbs:</span>{" "}
                                    {item.nutrition.carbs}g
                                  </p>
                                  <p>
                                    <span className="font-medium">Fat:</span>{" "}
                                    {item.nutrition.fat}g
                                  </p>
                                  <p>
                                    <span className="font-medium">Sugar:</span>{" "}
                                    {item.nutrition.sugar}g
                                  </p>
                                </div>
                              </div>
                            )}
                          </CardDescription>
                        </CardHeader>
                        <CardFooter className="p-3 pt-0 flex justify-between">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setScreen(`customize-${item.id}`)}
                          >
                            Customize
                          </Button>
                          <Button
                            size="sm"
                            className="bg-yellow-800 hover:bg-yellow-900 text-white"
                            onClick={() => {
                              setCart([...cart, item]);
                              showNotification(`Added ${item.name} to cart`);
                            }}
                          >
                            Add to Cart
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </TabsContent>
              ))}
            </Tabs>

            {notification && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-[80%] max-w-[280px] bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded-md shadow-md flex items-center gap-2 z-50 animate-in fade-in duration-300">
                <Bell className="h-5 w-5" />
                <span className="text-sm font-medium">{notification}</span>
              </div>
            )}
          </div>
        );

      case "cart":
        return (
          <div className="p-4 bg-gradient-to-b from-stone-100 to-stone-50 min-h-full">
            <Button
              variant="ghost"
              size="sm"
              className="mb-4"
              onClick={() => setScreen("menu")}
            >
              &larr; Back to Menu
            </Button>

            <h2 className="text-lg font-bold mb-4">Your Cart</h2>

            {cart.length === 0 ? (
              <p className="text-center text-gray-500 my-8">
                Your cart is empty
              </p>
            ) : (
              <>
                <div className="space-y-3 mb-4">
                  {cart.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 border rounded-lg bg-stone-50"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          ${item.price.toFixed(2)}
                        </p>
                        <div className="text-xs text-gray-500 mt-1">
                          {item.description}
                        </div>
                        {customizations[item.id] && (
                          <div className="mt-1">
                            {customizations[item.id].modifications.length >
                              0 && (
                              <div className="text-xs text-gray-500">
                                <span className="font-medium">
                                  Modifications:{" "}
                                </span>
                                {customizations[item.id].modifications.join(
                                  ", ",
                                )}
                              </div>
                            )}
                            {customizations[item.id].instructions && (
                              <div className="text-xs text-gray-500">
                                <span className="font-medium">
                                  Instructions:{" "}
                                </span>
                                {customizations[item.id].instructions}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-yellow-600 border-yellow-200 hover:bg-yellow-50"
                          onClick={() => {
                            const newCart = [...cart];
                            newCart.splice(index, 1);
                            setCart(newCart);
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">
                      $
                      {cart
                        .reduce((total, item) => total + item.price, 0)
                        .toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Tax (8.25%):</span>
                    <span className="font-medium">
                      $
                      {(
                        cart.reduce((total, item) => total + item.price, 0) *
                        0.0825
                      ).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>
                      $
                      {(
                        cart.reduce((total, item) => total + item.price, 0) *
                        1.0825
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full bg-yellow-800 hover:bg-yellow-900 text-white"
                  onClick={() => setScreen("checkout")}
                >
                  Proceed to Checkout
                </Button>
              </>
            )}
          </div>
        );

      case "checkout":
        return (
          <div className="p-4 bg-gradient-to-b from-stone-100 to-stone-50 min-h-full">
            <Button
              variant="ghost"
              size="sm"
              className="mb-4"
              onClick={() => setScreen("cart")}
            >
              &larr; Back to Cart
            </Button>

            <h2 className="text-lg font-bold mb-4">Checkout</h2>

            <div className="space-y-4 mb-6">
              <div>
                <h3 className="text-sm font-medium mb-2">
                  Student Information
                </h3>
                <div className="p-3 border rounded-lg bg-stone-50">
                  {formData.fullName &&
                  formData.studentId &&
                  formData.classroom ? (
                    <>
                      <p className="font-medium">{formData.fullName}</p>
                      <p className="text-sm text-gray-600">{formData.email}</p>
                      <p className="text-sm text-gray-600">
                        Student ID: {formData.studentId}
                      </p>
                      <p className="text-sm text-gray-600">
                        Classroom: {formData.classroom}
                      </p>
                    </>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-sm text-yellow-600 font-medium">
                        Please enter your information below:
                      </p>
                      <div>
                        <label className="text-xs font-medium block mb-1 text-gray-700">
                          Full Name
                        </label>
                        <Input
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          className="text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium block mb-1 text-gray-700">
                          Student ID
                        </label>
                        <Input
                          name="studentId"
                          value={formData.studentId}
                          onChange={handleInputChange}
                          placeholder="6-digit ID"
                          className="text-sm"
                          maxLength={6}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium block mb-1 text-gray-700">
                          Classroom
                        </label>
                        <Input
                          name="classroom"
                          value={formData.classroom}
                          onChange={handleInputChange}
                          placeholder="e.g. B204"
                          className="text-sm"
                          required
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Order Summary</h3>
                <div className="p-3 border rounded-lg bg-stone-50">
                  <div className="space-y-2">
                    {cart.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-sm">{item.name}</span>
                        <span className="text-sm font-medium">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t mt-3 pt-3">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>
                        $
                        {cart
                          .reduce((total, item) => total + item.price, 0)
                          .toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax (8.25%):</span>
                      <span>
                        $
                        {(
                          cart.reduce((total, item) => total + item.price, 0) *
                          0.0825
                        ).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between font-bold mt-1">
                      <span>Total:</span>
                      <span>
                        $
                        {(
                          cart.reduce((total, item) => total + item.price, 0) *
                          1.0825
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Button
              className="w-full bg-yellow-800 hover:bg-yellow-900 text-white"
              disabled={
                !formData.fullName || !formData.studentId || !formData.classroom
              }
              onClick={() => {
                // Save student data to localStorage
                localStorage.setItem("studentData", JSON.stringify(formData));

                // Generate order number
                const newOrderNumber = `FB-${Math.floor(Math.random() * 900) + 100}`;
                setOrderNumber(newOrderNumber);

                // Create an order object
                const orderData = {
                  id: Math.floor(Math.random() * 1000) + 1,
                  studentName: formData.fullName,
                  studentId: formData.studentId,
                  classroom: formData.classroom,
                  items: cart,
                  total: (
                    cart.reduce((total, item) => total + item.price, 0) * 1.0825
                  ).toFixed(2),
                  timestamp: new Date().toLocaleString(),
                  status: "new",
                  customizations: customizations,
                  orderNumber: newOrderNumber,
                };

                console.log("Submitting order:", orderData);

                try {
                  // Create a global event that can be caught by StaffPhone
                  const orderEvent = new CustomEvent("newOrder", {
                    detail: orderData,
                    bubbles: true,
                    cancelable: true,
                  });

                  // Dispatch the event on window object
                  window.dispatchEvent(orderEvent);
                  console.log("Order event dispatched successfully", orderData);

                  // Store order in localStorage as backup communication method
                  const existingOrders = JSON.parse(
                    localStorage.getItem("pendingOrders") || "[]",
                  );
                  existingOrders.push(orderData);
                  localStorage.setItem(
                    "pendingOrders",
                    JSON.stringify(existingOrders),
                  );
                  console.log("Order saved to localStorage");

                  // Set a flag to indicate new orders are available
                  localStorage.setItem("newOrderAvailable", "true");
                  localStorage.setItem(
                    "currentOrderId",
                    orderData.id.toString(),
                  );
                  localStorage.setItem("currentOrderStatus", "new");
                } catch (error) {
                  console.error("Error dispatching order event:", error);
                }

                setScreen("preparing");
              }}
            >
              Place Order
            </Button>
          </div>
        );

      case "preparing":
        return (
          <div className="p-4 bg-gradient-to-b from-stone-100 to-stone-50 min-h-full flex flex-col items-center justify-center">
            <div className="w-full max-w-md mx-auto text-center">
              <div className="mb-6">
                <div className="relative mx-auto w-24 h-24 mb-4">
                  <div className="absolute inset-0 rounded-full bg-yellow-100 animate-ping opacity-25"></div>
                  <div className="relative flex items-center justify-center w-24 h-24 bg-yellow-50 rounded-full border-2 border-yellow-200">
                    {orderStatus === "ready" ? (
                      <CheckCircle className="w-12 h-12 text-green-500" />
                    ) : (
                      <Clock className="w-12 h-12 text-yellow-600 animate-pulse" />
                    )}
                  </div>
                </div>

                <h2 className="text-xl font-bold mb-2">
                  {orderStatus === "ready"
                    ? "Your Order is Ready!"
                    : orderStatus === "preparing"
                      ? "Preparing Your Order"
                      : "Order Received"}
                </h2>

                {orderStatus === "ready" ? (
                  <p className="text-gray-600 mb-6">
                    Please pick up your order at the counter.
                  </p>
                ) : orderStatus === "preparing" ? (
                  <div className="text-gray-600 mb-6 space-y-2">
                    {prepTime && <p>Estimated preparation time: {prepTime}</p>}
                    {readyTime && (
                      <p className="font-medium">Ready by: {readyTime}</p>
                    )}
                    {remainingTime && (
                      <div className="bg-yellow-50 p-2 rounded-md border border-yellow-200 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-yellow-600" />
                        <p className="font-medium text-yellow-800">
                          Time remaining: {remainingTime}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-600 mb-6">
                    Your order has been received. Staff will begin preparation
                    soon.
                  </p>
                )}

                {orderStatus === "ready" && (
                  <div className="space-y-3 mb-4">
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => {
                        // Update order status to completed
                        localStorage.setItem("currentOrderStatus", "completed");
                        setOrderStatus("completed");
                        setTimeout(() => setScreen("receipt"), 1000);
                      }}
                    >
                      Confirm Pickup
                    </Button>
                  </div>
                )}

                <div className="mt-8 p-4 border rounded-lg bg-stone-50">
                  <h3 className="font-medium mb-2">Order Summary</h3>
                  <div className="space-y-2">
                    {cart.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.name}</span>
                        <span>${item.price.toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-medium">
                        <span>Total:</span>
                        <span>
                          $
                          {(
                            cart.reduce(
                              (total, item) => total + item.price,
                              0,
                            ) * 1.0825
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "rate":
        return (
          <div className="p-4 bg-gradient-to-b from-stone-100 to-stone-50 min-h-full">
            <h2 className="text-lg font-bold mb-4 text-center">
              Rate Your Experience
            </h2>

            <div className="mb-6 flex justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="mx-1"
                >
                  <Star
                    className={`w-8 h-8 ${rating >= star ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                  />
                </button>
              ))}
            </div>

            <p className="text-center mb-4 text-gray-600">
              {rating === 1 && "Poor"}
              {rating === 2 && "Fair"}
              {rating === 3 && "Good"}
              {rating === 4 && "Very Good"}
              {rating === 5 && "Excellent"}
            </p>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Share your thoughts (optional)
              </label>
              <div className="relative">
                <textarea
                  value={reviewComment}
                  onChange={handleTextareaChange}
                  placeholder="Tell us about your experience..."
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent min-h-[100px] resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setScreen("menu")}
              >
                Skip
              </Button>
              <Button
                className="flex-1 bg-yellow-800 hover:bg-yellow-900 text-white"
                onClick={submitReview}
                disabled={rating === 0}
              >
                Submit
              </Button>
            </div>
          </div>
        );

      case "receipt":
        return (
          <div className="p-4 bg-gradient-to-b from-stone-100 to-stone-50 min-h-full">
            <h2 className="text-lg font-bold mb-4 text-center">
              Order Complete
            </h2>

            <div className="mb-6 p-4 border rounded-lg bg-green-50 border-green-200">
              <div className="flex justify-center mb-4">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              <h3 className="text-center font-medium mb-2">Thank You!</h3>
              <p className="text-center text-sm text-gray-600 mb-2">
                Your order has been completed.
              </p>
              <p className="text-center text-sm font-bold text-yellow-800 mb-4">
                Order #:{" "}
                {orderNumber || `FB-${Math.floor(Math.random() * 900) + 100}`}
              </p>

              <div className="border-t border-green-200 pt-3 mt-3">
                <div className="bg-white p-3 rounded-lg border border-green-100 mb-4">
                  <h4 className="font-medium mb-2 text-green-800">
                    Customer Information
                  </h4>
                  <div className="text-sm space-y-1">
                    <p>
                      <span className="font-medium">Name:</span>{" "}
                      {formData.fullName}
                    </p>
                    <p>
                      <span className="font-medium">Student ID:</span>{" "}
                      {formData.studentId}
                    </p>
                    <p>
                      <span className="font-medium">Classroom:</span>{" "}
                      {formData.classroom}
                    </p>
                    <p>
                      <span className="font-medium">Order Date:</span>{" "}
                      {new Date().toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-medium">Order Time:</span>{" "}
                      {new Date().toLocaleTimeString()}
                    </p>
                  </div>
                </div>

                <h4 className="font-medium mb-2">Order Summary</h4>
                <div className="space-y-2">
                  {cart.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <div>
                        <span>{item.name}</span>
                        {customizations[item.id] && (
                          <div className="text-xs text-gray-500">
                            {customizations[item.id].modifications.length >
                              0 && (
                              <span>
                                {customizations[item.id].modifications.join(
                                  ", ",
                                )}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      <span>${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>
                        $
                        {cart
                          .reduce((total, item) => total + item.price, 0)
                          .toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax (8.25%):</span>
                      <span>
                        $
                        {(
                          cart.reduce((total, item) => total + item.price, 0) *
                          0.0825
                        ).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between font-medium mt-1">
                      <span>Total:</span>
                      <span>
                        $
                        {(
                          cart.reduce((total, item) => total + item.price, 0) *
                          1.0825
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-green-200 text-center text-xs text-gray-500">
                  <p>Thank you for dining at Firebird Café!</p>
                  <p>Jack E. Singley Academy</p>
                </div>
              </div>
            </div>

            <Button
              className="w-full bg-yellow-800 hover:bg-yellow-900 text-white mb-3"
              onClick={() => setScreen("rate")}
            >
              Rate Your Experience
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setCart([]);
                setScreen("menu");
              }}
            >
              Return to Menu
            </Button>
          </div>
        );

      case "rated":
        return (
          <div className="p-4 bg-gradient-to-b from-stone-100 to-stone-50 min-h-full flex flex-col items-center justify-center text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
            <h2 className="text-xl font-bold mb-2">Thank You!</h2>
            <p className="text-gray-600 mb-6">
              Your feedback helps us improve our service.
            </p>
            <Button
              className="bg-yellow-800 hover:bg-yellow-900 text-white"
              onClick={() => {
                setScreen("menu");
                setCart([]);
                setRating(0);
                setReviewComment("");
              }}
            >
              Return to Menu
            </Button>
          </div>
        );

      default:
        // Handle customization screens
        if (screen.startsWith("customize-")) {
          const itemId = parseInt(screen.split("-")[1]);
          const item = foodItems.find((i) => i.id === itemId);

          if (!item) return <div>Item not found</div>;

          // Get existing customizations or create new ones
          const existingCustomizations = customizations[itemId] || {
            modifications: [],
            instructions: "",
          };

          const toggleModification = (mod: string) => {
            const mods = [...existingCustomizations.modifications];
            const index = mods.indexOf(mod);
            if (index > -1) {
              mods.splice(index, 1);
            } else {
              mods.push(mod);
            }

            setCustomizations({
              ...customizations,
              [itemId]: {
                ...existingCustomizations,
                modifications: mods,
              },
            });
          };

          const updateInstructions = (instructions: string) => {
            setCustomizations({
              ...customizations,
              [itemId]: {
                ...existingCustomizations,
                instructions,
              },
            });
          };

          return (
            <div className="p-4 bg-gradient-to-b from-stone-100 to-stone-50 min-h-full">
              <Button
                variant="ghost"
                size="sm"
                className="mb-4"
                onClick={() => setScreen("menu")}
              >
                &larr; Back to Menu
              </Button>

              <div className="flex items-center mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md mr-3"
                />
                <div>
                  <h2 className="text-lg font-bold">{item.name}</h2>
                  <p className="text-sm text-gray-600">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Modifications</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "No Cheese",
                      "Extra Cheese",
                      "No Sauce",
                      "Extra Sauce",
                      "No Onions",
                      "No Tomatoes",
                    ].map((mod) => (
                      <div
                        key={mod}
                        className={`p-2 border rounded-md text-sm cursor-pointer ${existingCustomizations.modifications.includes(mod) ? "bg-yellow-100 border-yellow-300" : "bg-white"}`}
                        onClick={() => toggleModification(mod)}
                      >
                        {mod}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">
                    Special Instructions
                  </h3>
                  <textarea
                    value={existingCustomizations.instructions}
                    onChange={(e) => updateInstructions(e.target.value)}
                    placeholder="Any special requests?"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent min-h-[80px] resize-none text-sm"
                  />
                </div>
              </div>

              <Button
                className="w-full bg-yellow-800 hover:bg-yellow-900 text-white"
                onClick={() => {
                  setCart([...cart, item]);
                  setScreen("menu");
                  showNotification(`Added ${item.name} to cart`);
                }}
              >
                Add to Cart
              </Button>
            </div>
          );
        }

        return <div>Unknown screen</div>;
    }
  };

  return (
    <PhoneDisplay title="Firebird Student" color="bg-yellow-800">
      {renderScreen()}
    </PhoneDisplay>
  );
}
