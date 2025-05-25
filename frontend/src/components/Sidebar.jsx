import React, { use } from 'react'
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { Users } from "lucide-react";
import { get } from 'mongoose';


const Sidebar = () => {

const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
const { onlineUsers } = [];

useEffect(() => {
    getUsers();
}, [getUsers]);


if (isUsersLoading) return <SidebarSkeleton />;

return <div>Sidebar</div>
  
}

export default Sidebar