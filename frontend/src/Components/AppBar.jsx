import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { apiClient, endpoints } from "../Api/apiClient"

export function AppBar() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await apiClient.get(endpoints.getUser);
                
                if (response.data) {
                    setUser(response.data);
                }
            } catch (error) {
                console.log("Could not fetch user data");
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="h-16 shadow-md sticky top-0 z-10 bg-white">
            <div className="max-w-7xl mx-auto px-0 flex justify-between items-center h-full">
                <div className="flex items-center h-full">
                    <div 
                        className="flex items-center text-xl text-purple-700 font-bold cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => navigate('/')}
                        title="Go to Home"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2 text-purple-700" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                            <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                        </svg>
                        PayPlus
                    </div>
                </div>
                <div className="flex items-center gap-5">
                    {user && (
                        <div className="text-sm text-gray-600 hidden sm:block">
                            Welcome, {user.firstName}
                        </div>
                    )}
                    <button 
                        onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/signin");
                        }}
                        title="Log out of your account"
                        className="bg-white text-purple-700 hover:bg-purple-50 border border-purple-700 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Logout</span>
                    </button>
                    <div className="bg-purple-100 h-10 w-10 rounded-full flex justify-center items-center shadow-sm border border-purple-200" title="User profile">
                        <div className="font-bold text-lg text-purple-700">
                            {user ? user.firstName[0] : "U"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
