import { useState, useEffect } from "react";
import PhoneDisplay from "./PhoneDisplay";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { CheckCircle, Star, ThumbsDown, ThumbsUp, X } from "lucide-react";

const initialReviews: any[] = [];

export default function ReviewPhone() {
  const [screen, setScreen] = useState("reviews");
  const [reviews, setReviews] = useState(initialReviews);
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("pending");

  // Listen for new reviews from StudentPhone
  useEffect(() => {
    // Function to handle new reviews from event
    const handleNewReview = (event: CustomEvent) => {
      console.log(
        "New review received in ReviewPhone via event:",
        event.detail,
      );
      const newReview = event.detail;
      setReviews((prevReviews) => [...prevReviews, newReview]);
    };

    // Function to check localStorage for new reviews
    const checkLocalStorage = () => {
      const newReviewAvailable = localStorage.getItem("newReviewAvailable");

      if (newReviewAvailable === "true") {
        console.log("New reviews detected in localStorage");
        const pendingReviews = JSON.parse(
          localStorage.getItem("pendingReviews") || "[]",
        );

        if (pendingReviews.length > 0) {
          // Add all pending reviews that aren't already in the reviews state
          setReviews((prevReviews) => {
            const existingReviewIds = new Set(
              prevReviews.map((review) => review.id),
            );
            const newReviews = pendingReviews.filter(
              (review) => !existingReviewIds.has(review.id),
            );

            console.log(
              `Adding ${newReviews.length} new reviews from localStorage`,
            );
            return [...prevReviews, ...newReviews];
          });

          // Clear the pending reviews
          localStorage.setItem("pendingReviews", JSON.stringify([]));
        }

        // Reset the flag
        localStorage.setItem("newReviewAvailable", "false");
      }
    };

    // Add event listener for real-time updates
    window.addEventListener("newReview", handleNewReview as EventListener);
    console.log("Event listener for newReview added");

    // Check localStorage immediately
    checkLocalStorage();

    // Set up interval to periodically check localStorage
    const intervalId = setInterval(checkLocalStorage, 2000);

    return () => {
      window.removeEventListener("newReview", handleNewReview as EventListener);
      clearInterval(intervalId);
      console.log("Event listener for newReview removed and interval cleared");
    };
  }, []);

  const renderScreen = () => {
    switch (screen) {
      case "reviews":
        return (
          <div className="p-4 bg-gradient-to-b from-purple-50 to-white min-h-full">
            <h2 className="text-lg font-bold mb-4">Review Management</h2>

            <Tabs
              defaultValue="pending"
              className="w-full"
              onValueChange={setActiveTab}
            >
              <TabsList className="w-full mb-4">
                <TabsTrigger value="pending" className="flex-1">
                  Pending
                  <Badge className="ml-2 bg-yellow-100 text-yellow-800">
                    {reviews.filter((r) => r.status === "pending").length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="approved" className="flex-1">
                  Approved
                  <Badge className="ml-2 bg-green-100 text-green-800">
                    {reviews.filter((r) => r.status === "approved").length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="rejected" className="flex-1">
                  Rejected
                  <Badge className="ml-2 bg-red-100 text-red-800">
                    {reviews.filter((r) => r.status === "rejected").length}
                  </Badge>
                </TabsTrigger>
              </TabsList>

              {["pending", "approved", "rejected"].map((status) => (
                <TabsContent key={status} value={status} className="space-y-4">
                  {reviews.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="bg-stone-200 rounded-full p-6 mb-4">
                        <Star className="w-12 h-12 text-yellow-800" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">
                        No Reviews Yet
                      </h3>
                      <p className="text-gray-500 max-w-xs">
                        When students submit reviews after completing their
                        orders, they will appear here.
                      </p>
                    </div>
                  ) : (
                    reviews
                      .filter((review) => review.status === status)
                      .map((review) => (
                        <Card key={review.id} className="overflow-hidden">
                          <CardHeader className="p-3 pb-0">
                            <div className="flex justify-between items-center">
                              <h3 className="font-medium">
                                {review.studentName}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {review.date}
                              </p>
                            </div>
                            <div className="flex items-center mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                          </CardHeader>

                          <CardContent className="p-3">
                            <p className="text-sm">{review.comment}</p>
                          </CardContent>

                          <CardFooter className="p-3 pt-0">
                            <Button
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                              onClick={() => {
                                setSelectedReview(review);
                                setScreen("review-details");
                              }}
                            >
                              View Details
                            </Button>
                          </CardFooter>
                        </Card>
                      ))
                  )}

                  {reviews.length > 0 &&
                    reviews.filter((review) => review.status === status)
                      .length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        No {status} reviews
                      </div>
                    )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        );

      case "review-details":
        return (
          <div className="p-4 bg-gradient-to-b from-purple-50 to-white min-h-full">
            <Button
              variant="ghost"
              size="sm"
              className="mb-4"
              onClick={() => setScreen("reviews")}
            >
              &larr; Back to Reviews
            </Button>

            <h2 className="text-lg font-bold mb-4">Review Details</h2>

            {selectedReview && (
              <div className="mb-6">
                <Card className="mb-4">
                  <CardHeader className="p-3 pb-0">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">
                        {selectedReview.studentName}
                      </h3>
                      <Badge
                        className={
                          selectedReview.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : selectedReview.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                        }
                      >
                        {selectedReview.status.charAt(0).toUpperCase() +
                          selectedReview.status.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      Student ID: {selectedReview.studentId}
                    </p>
                    <p className="text-sm text-gray-600">
                      Date: {selectedReview.date}
                    </p>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < selectedReview.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </CardHeader>

                  <CardContent className="p-3">
                    <div className="p-3 bg-stone-100 rounded-lg">
                      <p>"{selectedReview.comment}"</p>
                    </div>
                  </CardContent>
                </Card>

                {selectedReview.status === "pending" && (
                  <div className="flex space-x-2">
                    <Button
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => {
                        setReviews(
                          reviews.map((review) =>
                            review.id === selectedReview.id
                              ? { ...review, status: "approved" }
                              : review,
                          ),
                        );
                        setScreen("reviews");
                      }}
                    >
                      <ThumbsUp className="w-4 h-4 mr-2" />
                      Approve
                    </Button>

                    <Button
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => {
                        setReviews(
                          reviews.map((review) =>
                            review.id === selectedReview.id
                              ? { ...review, status: "rejected" }
                              : review,
                          ),
                        );
                        setScreen("reviews");
                      }}
                    >
                      <ThumbsDown className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                )}

                {selectedReview.status !== "pending" && (
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => {
                      setReviews(
                        reviews.map((review) =>
                          review.id === selectedReview.id
                            ? { ...review, status: "pending" }
                            : review,
                        ),
                      );
                      setScreen("reviews");
                    }}
                  >
                    Reset to Pending
                  </Button>
                )}
              </div>
            )}
          </div>
        );

      default:
        return <div>Unknown screen</div>;
    }
  };

  return (
    <PhoneDisplay title="Review Database" color="bg-purple-800">
      {renderScreen()}
    </PhoneDisplay>
  );
}
