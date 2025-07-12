import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
    LayoutDashboard, 
    Users, 
    GraduationCap, 
    UserCog, 
    MessageSquare, 
    DollarSign,
    Handshake, 
    FileEdit, 
    LogOut,
    Menu,
    X,
    Briefcase as BriefcaseIcon
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const AdminLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const { logout, user } = useAuth();

    const menuItems = [
        { 
            path: '/admin/dashboard', 
            name: 'Dashboard', 
            icon: <LayoutDashboard className="w-5 h-5" />,
            allowedRoles: ['admin'] 
        },
        // { 
        //     path: '/admin/users', 
        //     name: 'Users', 
        //     icon: <Users className="w-5 h-5" />,
        //     allowedRoles: ['admin'] 
        // },
        { 
            path: '/admin/students', 
            name: 'Student Applications', 
            icon: <GraduationCap className="w-5 h-5" />,
            allowedRoles: ['admin'] 
        },
        { 
            path: '/admin/trainers', 
            name: 'Trainer Applications', 
            icon: <UserCog className="w-5 h-5" />,
            allowedRoles: ['admin'] 
        },
        { 
            path: '/admin/contacts', 
            name: 'Contact Messages', 
            icon: <MessageSquare className="w-5 h-5" />,
            allowedRoles: ['admin'] 
        },
        { 
            path: '/admin/donations', 
            name: 'Donations', 
            icon: <DollarSign className="w-5 h-5" />,
            allowedRoles: ['admin'] 
        },
        { 
            path: '/admin/partners', 
            name: 'Partners', 
            icon: <Handshake className="w-5 h-5" />,
            allowedRoles: ['admin'] 
        },
        { 
            path: '/admin/hire-requests', 
            name: 'Hire Requests', 
            icon: <BriefcaseIcon className="w-5 h-5" />,
            allowedRoles: ['admin', 'editor'] 
        },
        { 
            path: '/admin/blog', 
            name: 'Blog Posts', 
            icon: <FileEdit className="w-5 h-5" />,
            allowedRoles: ['admin', 'editor'] 
        },
        { 
            path: '/admin/cohort-settings', 
            name: 'Cohort Settings', 
            icon: <FileEdit className="w-5 h-5" />,
            allowedRoles: ['admin'] 
        },
        { 
            path: '/admin/cohort-management',
            name: 'Cohort Management',             
            icon: <FileEdit className="w-5 h-5" />,
            allowedRoles: ['admin'] 
        }
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const filteredMenuItems = menuItems.filter(item => 
        item.allowedRoles.includes(user?.role)
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile Sidebar Toggle */}
            <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
            >
                {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div 
                    className="lg:hidden fixed inset-0 bg-gray-600 bg-opacity-50 z-20"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-30 transform transition-transform duration-300 ease-in-out 
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
            >
                <div className="h-full flex flex-col">
                    {/* Logo */}
                    <div className="px-6 py-4 border-b">
                        <Link to="/" className="text-2xl font-bold text-teal-600">
                            Tecvinson
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto px-4 py-4">
                        <ul className="space-y-1">
                            {filteredMenuItems.map((item) => {
                                const isActive = location.pathname.startsWith(item.path);
                                return (
                                    <li key={item.path}>
                                        <Link
                                            to={item.path}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                                                ${isActive
                                                    ? 'bg-teal-50 text-teal-600'
                                                    : 'text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            {item.icon}
                                            {item.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* User Section */}
                    <div className="p-4 border-t bg-gray-50">
                        <div className="flex items-center justify-between px-4 py-3">
                            <div>
                                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                                title="Logout"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="lg:pl-64">
                <div className="min-h-screen">
                    <main className="p-6">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
