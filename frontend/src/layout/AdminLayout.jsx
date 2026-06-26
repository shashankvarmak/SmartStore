import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import Top_bar from '../components/layout/top_bar';
import { Outlet } from 'react-router-dom';

function AdminLayout() {
    return (
        <>
            <Sidebar />
            <Top_bar />
            <Outlet />

        </>

        )
    }
export default AdminLayout;