export function AppBar() {
    return (
        <div className="flex justify-between h-14 shadow-md">
            <div className="flex flex-col justify-center h-full ml-4 text-xl text-purple-600 font-bold">
                PayPlus
            </div>
            <div className="flex mr-4 gap-4">
                <div className="flex flex-col justify-center h-full">
                    Hello
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
