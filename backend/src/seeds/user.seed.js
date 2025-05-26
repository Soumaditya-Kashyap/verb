import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUsers = [
  // Female Users
  {
    email: "priya.sharma@example.com",
    fullName: "Priya Sharma",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/57.jpg" //added
  },
  {
    email: "isha.mehta@example.com",
    fullName: "Isha Mehta",
    password: "123456",
    profilePic: "https://ui-avatars.com/api/?name=Isha+Mehta&size=128&background=3B82F6&color=FFF" //keep IM
  },
  {
    email: "kavya.reddy@example.com",
    fullName: "Kavya Reddy",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/15.jpg" //added
  },
  {
    email: "aarushi.jain@example.com",
    fullName: "Aarushi Jain",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/66.jpg" //added
  },
  // Male Users
  {
    email: "aditya.roy@example.com",
    fullName: "Aditya Roy",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/12.jpg" //added
  },
  {
    email: "rahul.singh@example.com",
    fullName: "Rahul Singh",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/50.jpg" //added
  },
  {
    email: "amit.kapoor@example.com",
    fullName: "Amit Kapoor",
    password: "123456",
    profilePic: "",//vacant
  },
  {
    email: "vivek.sharma@example.com",
    fullName: "Vivek Sharma",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/45.jpg" //added
  },
  {
    email: "arjun.patel@example.com",
    fullName: "Arjun Patel",
    password: "123456",
    profilePic: "https://ui-avatars.com/api/?name=Arjun+Patel&size=128&background=8B5CF6&color=FFF" //keep AP
  },

];

const seedDatabase = async () => {
  try {
    await connectDB();

    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
seedDatabase();
