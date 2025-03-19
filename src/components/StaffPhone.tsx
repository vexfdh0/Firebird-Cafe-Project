import { useState, useEffect } from "react";
import PhoneDisplay from "./PhoneDisplay";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Clock, CheckCircle } from "lucide-react";

// No initial orders
const initialOrders: any[] = [];

export default function StaffPhone() {
  const [screen, setScreen] = useState("orders");
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [prepTime, setPrepTime] = useState("");
  const [customPrepTime, setCustomPrepTime] = useState("");

  // Listen for new orders from StudentPhone
  useEffect(() => {
    // Function to handle new orders from event
    const handleNewOrder = (event: CustomEvent) => {
      console.log("New order received in StaffPhone via event:", event.detail);
      const newOrder = event.detail;
      setOrders((prevOrders) => [...prevOrders, newOrder]);
    };

    // Function to check localStorage for new orders
    const checkLocalStorage = () => {
      const newOrderAvailable = localStorage.getItem("newOrderAvailable");

      if (newOrderAvailable === "true") {
        console.log("New orders detected in localStorage");
        const pendingOrders = JSON.parse(
          localStorage.getItem("pendingOrders") || "[]",
        );

        if (pendingOrders.length > 0) {
          // Add all pending orders that aren't already in the orders state
          setOrders((prevOrders) => {
            const existingOrderIds = new Set(
              prevOrders.map((order) => order.id),
            );
            const newOrders = pendingOrders.filter(
              (order) => !existingOrderIds.has(order.id),
            );

            console.log(
              `Adding ${newOrders.length} new orders from localStorage`,
            );
            return [...prevOrders, ...newOrders];
          });

          // Clear the pending orders
          localStorage.setItem("pendingOrders", JSON.stringify([]));
        }

        // Reset the flag
        localStorage.setItem("newOrderAvailable", "false");
      }
    };

    // Add event listener for real-time updates
    window.addEventListener("newOrder", handleNewOrder as EventListener);
    console.log("Event listener for newOrder added");

    // Check localStorage immediately on mount
    checkLocalStorage();

    // Set up interval to periodically check localStorage
    const intervalId = setInterval(checkLocalStorage, 2000);

    return () => {
      window.removeEventListener("newOrder", handleNewOrder as EventListener);
      clearInterval(intervalId);
      console.log("Event listener for newOrder removed and interval cleared");
    };
  }, []);

  const renderScreen = () => {
    switch (screen) {
      case "orders":
        return (
          <div className="p-4 bg-gradient-to-b from-blue-50 to-white min-h-full">
            <h2 className="text-lg font-bold mb-4">Order Management</h2>

            <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
              <Badge className="cursor-pointer bg-gray-200 text-gray-800 hover:bg-gray-300">
                All
              </Badge>
              <Badge className="cursor-pointer bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                New
              </Badge>
              <Badge className="cursor-pointer bg-blue-100 text-blue-800 hover:bg-blue-200">
                Preparing
              </Badge>
              <Badge className="cursor-pointer bg-green-100 text-green-800 hover:bg-green-200">
                Ready
              </Badge>
              <Badge className="cursor-pointer bg-gray-100 text-gray-800 hover:bg-gray-200">
                Completed
              </Badge>
            </div>

            {orders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-yellow-100 rounded-full p-6 mb-4">
                  <Clock className="w-12 h-12 text-yellow-800" />
                </div>
                <h3 className="text-lg font-medium mb-2 text-stone-800">
                  No Orders Yet
                </h3>
                <p className="text-stone-600 max-w-xs">
                  When students place orders, they will appear here for you to
                  manage.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.id} className="overflow-hidden">
                    <CardHeader className="p-3 pb-0 flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Order #{order.id}</h3>
                        <p className="text-sm text-gray-600">
                          {order.timestamp}
                        </p>
                      </div>
                      <Badge
                        className={
                          order.status === "new"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "preparing"
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "ready"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                        }
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </Badge>
                    </CardHeader>

                    <CardContent className="p-3">
                      <div className="text-sm space-y-1">
                        <p>
                          <span className="font-medium">Student:</span>{" "}
                          {order.studentName}
                        </p>
                        <p>
                          <span className="font-medium">ID:</span>{" "}
                          {order.studentId}
                        </p>
                        <p>
                          <span className="font-medium">Classroom:</span>{" "}
                          {order.classroom}
                        </p>
                        <p className="font-medium mt-2">Items:</p>
                        <ul className="list-disc list-inside">
                          {order.items.map((item, idx) => (
                            <li key={idx} className="mb-1">
                              <div>
                                {item.name} (${item.price.toFixed(2)})
                                {item.customizations && (
                                  <div className="ml-5 text-xs text-gray-500">
                                    {item.customizations.modifications.length >
                                      0 && (
                                      <div>
                                        <span className="font-medium">
                                          Mods:{" "}
                                        </span>
                                        {item.customizations.modifications.join(
                                          ", ",
                                        )}
                                      </div>
                                    )}
                                    {item.customizations.instructions && (
                                      <div>
                                        <span className="font-medium">
                                          Notes:{" "}
                                        </span>
                                        {item.customizations.instructions}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>

                    <CardFooter className="p-3 pt-0">
                      <Button
                        className={`w-full ${order.status === "new" ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"} text-white`}
                        onClick={() => {
                          setSelectedOrder(order);
                          setScreen(
                            order.status === "new"
                              ? "set-prep-time"
                              : "order-details",
                          );
                        }}
                      >
                        {order.status === "new"
                          ? "Process Order"
                          : "View Details"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        );

      case "set-prep-time":
        return (
          <div className="p-4 bg-gradient-to-b from-blue-50 to-white min-h-full">
            <Button
              variant="ghost"
              size="sm"
              className="mb-4"
              onClick={() => setScreen("orders")}
            >
              &larr; Back to Orders
            </Button>

            <h2 className="text-lg font-bold mb-4">Set Preparation Time</h2>

            {selectedOrder && (
              <div className="mb-6">
                <Card className="mb-4">
                  <CardHeader className="p-3 pb-0">
                    <h3 className="font-medium">Order #{selectedOrder.id}</h3>
                    <p className="text-sm text-gray-600">
                      {selectedOrder.timestamp}
                    </p>
                  </CardHeader>

                  <CardContent className="p-3">
                    <div className="text-sm space-y-1">
                      <p>
                        <span className="font-medium">Student:</span>{" "}
                        {selectedOrder.studentName}
                      </p>
                      <p>
                        <span className="font-medium">Items:</span>
                      </p>
                      <ul className="list-disc list-inside">
                        {selectedOrder.items.map((item, idx) => (
                          <li key={idx} className="mb-1">
                            <div>
                              {item.name}
                              {item.customizations && (
                                <div className="ml-5 text-xs text-gray-500">
                                  {item.customizations.modifications.length >
                                    0 && (
                                    <div>
                                      <span className="font-medium">
                                        Mods:{" "}
                                      </span>
                                      {item.customizations.modifications.join(
                                        ", ",
                                      )}
                                    </div>
                                  )}
                                  {item.customizations.instructions && (
                                    <div>
                                      <span className="font-medium">
                                        Notes:{" "}
                                      </span>
                                      {item.customizations.instructions}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium block mb-1">
                      Estimated Preparation Time
                    </label>
                    <div className="flex space-x-2 mb-3">
                      <Button
                        variant="outline"
                        className={
                          prepTime === "5 minutes"
                            ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                            : ""
                        }
                        onClick={() => {
                          setPrepTime("5 minutes");
                          setCustomPrepTime("");
                        }}
                      >
                        5 min
                      </Button>
                      <Button
                        variant="outline"
                        className={
                          prepTime === "10 minutes"
                            ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                            : ""
                        }
                        onClick={() => {
                          setPrepTime("10 minutes");
                          setCustomPrepTime("");
                        }}
                      >
                        10 min
                      </Button>
                      <Button
                        variant="outline"
                        className={
                          prepTime === "15 minutes"
                            ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                            : ""
                        }
                        onClick={() => {
                          setPrepTime("15 minutes");
                          setCustomPrepTime("");
                        }}
                      >
                        15 min
                      </Button>
                    </div>

                    <div className="mb-3">
                      <label className="text-sm font-medium block mb-1">
                        Custom Time (minutes)
                      </label>
                      <div className="flex space-x-2">
                        <Input
                          type="number"
                          min="1"
                          max="60"
                          placeholder="Enter minutes"
                          value={customPrepTime}
                          onChange={(e) => {
                            setCustomPrepTime(e.target.value);
                            if (e.target.value) {
                              const newPrepTime = `${e.target.value} minutes`;
                              setPrepTime(newPrepTime);
                              // This would update the student's screen in a real app
                              // For demo purposes, we're just setting the local state
                            } else {
                              setPrepTime("");
                            }
                          }}
                          className="flex-1"
                        />
                        {customPrepTime && (
                          <Button
                            variant="outline"
                            onClick={() => {
                              setCustomPrepTime("");
                              setPrepTime("");
                            }}
                          >
                            Clear
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    disabled={!prepTime}
                    onClick={() => {
                      // Update order status and prep time
                      const updatedOrders = orders.map((order) =>
                        order.id === selectedOrder.id
                          ? { ...order, status: "preparing", prepTime }
                          : order,
                      );
                      setOrders(updatedOrders);

                      // Send prep time update to student phone
                      try {
                        // Create a global event that can be caught by StudentPhone
                        const prepTimeEvent = new CustomEvent(
                          "prepTimeUpdate",
                          {
                            detail: {
                              orderId: selectedOrder.id,
                              prepTime,
                              status: "preparing",
                            },
                            bubbles: true,
                            cancelable: true,
                          },
                        );

                        // Dispatch the event on window object
                        window.dispatchEvent(prepTimeEvent);
                        console.log(
                          "Prep time event dispatched successfully",
                          prepTime,
                        );

                        // Store in localStorage as backup communication method
                        localStorage.setItem("currentOrderPrepTime", prepTime);
                        localStorage.setItem("currentOrderStatus", "preparing");
                      } catch (error) {
                        console.error(
                          "Error dispatching prep time event:",
                          error,
                        );
                      }

                      setScreen("orders");
                    }}
                  >
                    Begin Preparation
                  </Button>
                </div>
              </div>
            )}
          </div>
        );

      case "order-details":
        return (
          <div className="p-4 bg-gradient-to-b from-blue-50 to-white min-h-full">
            <Button
              variant="ghost"
              size="sm"
              className="mb-4"
              onClick={() => setScreen("orders")}
            >
              &larr; Back to Orders
            </Button>

            <h2 className="text-lg font-bold mb-4">Order Details</h2>

            {selectedOrder && (
              <div className="mb-6">
                <Card className="mb-4">
                  <CardHeader className="p-3 pb-0 flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Order #{selectedOrder.id}</h3>
                      <p className="text-sm text-gray-600">
                        {selectedOrder.timestamp}
                      </p>
                    </div>
                    <Badge
                      className={
                        selectedOrder.status === "new"
                          ? "bg-yellow-100 text-yellow-800"
                          : selectedOrder.status === "preparing"
                            ? "bg-blue-100 text-blue-800"
                            : selectedOrder.status === "ready"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                      }
                    >
                      {selectedOrder.status.charAt(0).toUpperCase() +
                        selectedOrder.status.slice(1)}
                    </Badge>
                  </CardHeader>

                  <CardContent className="p-3">
                    <div className="text-sm space-y-1">
                      <p>
                        <span className="font-medium">Student:</span>{" "}
                        {selectedOrder.studentName}
                      </p>
                      <p>
                        <span className="font-medium">ID:</span>{" "}
                        {selectedOrder.studentId}
                      </p>
                      <p>
                        <span className="font-medium">Classroom:</span>{" "}
                        {selectedOrder.classroom}
                      </p>

                      {selectedOrder.prepTime && (
                        <div className="flex items-center gap-2 mt-2">
                          <Clock className="w-4 h-4 text-yellow-800" />
                          <span className="font-medium">Prep Time:</span>
                          <span>{selectedOrder.prepTime}</span>
                        </div>
                      )}

                      <p className="font-medium mt-2">Items:</p>
                      <ul className="list-disc list-inside">
                        {selectedOrder.items.map((item, idx) => (
                          <li key={idx} className="mb-1">
                            <div>
                              {item.name} (${item.price.toFixed(2)})
                              {item.customizations && (
                                <div className="ml-5 text-xs text-gray-500">
                                  {item.customizations.modifications.length >
                                    0 && (
                                    <div>
                                      <span className="font-medium">
                                        Mods:{" "}
                                      </span>
                                      {item.customizations.modifications.join(
                                        ", ",
                                      )}
                                    </div>
                                  )}
                                  {item.customizations.instructions && (
                                    <div>
                                      <span className="font-medium">
                                        Notes:{" "}
                                      </span>
                                      {item.customizations.instructions}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {selectedOrder.status === "preparing" && (
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => {
                      // Update order status
                      const updatedOrders = orders.map((order) =>
                        order.id === selectedOrder.id
                          ? { ...order, status: "ready" }
                          : order,
                      );
                      setOrders(updatedOrders);

                      // Send ready status update to student phone
                      try {
                        // Create a global event that can be caught by StudentPhone
                        const readyEvent = new CustomEvent("prepTimeUpdate", {
                          detail: {
                            orderId: selectedOrder.id,
                            status: "ready",
                          },
                          bubbles: true,
                          cancelable: true,
                        });

                        // Dispatch the event on window object
                        window.dispatchEvent(readyEvent);
                        console.log(
                          "Ready status event dispatched successfully",
                        );

                        // Store in localStorage as backup communication method
                        localStorage.setItem("currentOrderStatus", "ready");
                      } catch (error) {
                        console.error(
                          "Error dispatching ready status event:",
                          error,
                        );
                      }

                      setScreen("orders");
                    }}
                  >
                    Mark as Ready for Pickup
                  </Button>
                )}

                {selectedOrder.status === "ready" && (
                  <Button
                    className="w-full bg-stone-700 hover:bg-stone-800 text-white"
                    onClick={() => {
                      // Update order status
                      const updatedOrders = orders.map((order) =>
                        order.id === selectedOrder.id
                          ? { ...order, status: "completed" }
                          : order,
                      );
                      setOrders(updatedOrders);

                      // Send completed status update to student phone
                      try {
                        // Create a global event that can be caught by StudentPhone
                        const completedEvent = new CustomEvent(
                          "prepTimeUpdate",
                          {
                            detail: {
                              orderId: selectedOrder.id,
                              status: "completed",
                            },
                            bubbles: true,
                            cancelable: true,
                          },
                        );

                        // Dispatch the event on window object
                        window.dispatchEvent(completedEvent);
                        console.log(
                          "Completed status event dispatched successfully",
                        );

                        // Store in localStorage as backup communication method
                        localStorage.setItem("currentOrderStatus", "completed");
                      } catch (error) {
                        console.error(
                          "Error dispatching completed status event:",
                          error,
                        );
                      }

                      setScreen("orders");
                    }}
                  >
                    Mark as Completed
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
    <PhoneDisplay title="Firebird Staff" color="bg-blue-800">
      {renderScreen()}
    </PhoneDisplay>
  );
}
