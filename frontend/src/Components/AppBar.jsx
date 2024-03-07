import { useNavigate } from "react-router-dom"
import Button from "./Button"

export function AppBar() {
    const navigate = useNavigate();
    return (
        <div className="flex justify-between h-14 shadow-md sticky top-0 bg-white">
            <div className="flex flex-col justify-center h-full ml-4 text-xl text-purple-600 font-bold">
                PayPlus
            </div>
            <div className="flex mr-4 gap-4">
                <div className="flex flex-col justify-center mb-3 mr-8">
                    <Button lebel={"Log Out"} onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/signin");
                    }} />
                </div>
                <div className="bg-slate-300 h-12 w-12 rounded-full flex justify-center mt-1 mr-2 drop-shadow-xl">
                    <div className="flex flex-col justify-center h-full font-bold text-xl ">
                        U
                    </div>
                </div>
            </div>

        </div>
    )
}
