// DataStorage.ts - Utility for storing and retrieving student and order data

// Types
export interface Student {
  id: string;
  name: string;
  email: string;
  classroom?: string;
}

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  category: string;
  customizations?: {
    modifications: string[];
    instructions: string;
  };
}

export interface Order {
  id: number;
  studentId: string;
  studentName: string;
  classroom: string;
  timestamp: string;
  status: "new" | "preparing" | "ready" | "completed";
  items: OrderItem[];
  total: string;
  prepTime?: string;
}

// Local storage keys
const STUDENTS_KEY = "firebird_students";
const ORDERS_KEY = "firebird_orders";
const CURRENT_USER_KEY = "firebird_current_user";

// Student data functions
export const saveStudent = (student: Student): void => {
  const students = getStudents();
  const existingIndex = students.findIndex((s) => s.id === student.id);

  if (existingIndex >= 0) {
    students[existingIndex] = student;
  } else {
    students.push(student);
  }

  localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
};

export const getStudents = (): Student[] => {
  const data = localStorage.getItem(STUDENTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const getStudentById = (id: string): Student | undefined => {
  const students = getStudents();
  return students.find((student) => student.id === id);
};

export const saveCurrentUser = (student: Student): void => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(student));
};

export const getCurrentUser = (): Student | null => {
  const data = localStorage.getItem(CURRENT_USER_KEY);
  return data ? JSON.parse(data) : null;
};

export const clearCurrentUser = (): void => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

// Order data functions
export const saveOrder = (order: Order): void => {
  const orders = getOrders();
  const existingIndex = orders.findIndex((o) => o.id === order.id);

  if (existingIndex >= 0) {
    orders[existingIndex] = order;
  } else {
    orders.push(order);
  }

  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
};

export const getOrders = (): Order[] => {
  const data = localStorage.getItem(ORDERS_KEY);
  return data ? JSON.parse(data) : [];
};

export const getOrdersByStudentId = (studentId: string): Order[] => {
  const orders = getOrders();
  return orders.filter((order) => order.studentId === studentId);
};

export const updateOrderStatus = (
  orderId: number,
  status: "new" | "preparing" | "ready" | "completed",
  prepTime?: string,
): void => {
  const orders = getOrders();
  const orderIndex = orders.findIndex((o) => o.id === orderId);

  if (orderIndex >= 0) {
    orders[orderIndex].status = status;
    if (prepTime) {
      orders[orderIndex].prepTime = prepTime;
    }
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }
};

// Clear all data (for testing)
export const clearAllData = (): void => {
  localStorage.removeItem(STUDENTS_KEY);
  localStorage.removeItem(ORDERS_KEY);
  localStorage.removeItem(CURRENT_USER_KEY);
};

// Store student information from form
export const saveStudentInfo = (studentData: any) => {
  localStorage.setItem("studentData", JSON.stringify(studentData));
};

export const getStudentInfo = () => {
  try {
    const data = localStorage.getItem("studentData");
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error loading student data from localStorage:", error);
    return null;
  }
};
