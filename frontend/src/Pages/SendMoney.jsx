//SendMoney-frontend
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { apiClient, endpoints } from "../Api/apiClient";

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);

    const [sucessmsg, setSucessmsg] = useState("");
    const [errormsg, setErrormsg] = useState("");

    return <div class="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
            <div
                class="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
            >
                <div class="flex flex-col space-y-1.5 p-6">
                <h2 class="text-3xl font-bold text-center">Send Money</h2>
                </div>
                <div class="p-6">
                <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <span class="text-2xl text-white">{name.trim().toUpperCase()[0]}</span>
                    </div>
                    <h3 class="text-2xl font-semibold">{name}</h3>
                </div>
                <div class="space-y-4">
                    <div class="space-y-2">
                    <label
                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        for="amount"
                    >
                        Amount (in Rs)
                    </label>
                    <input
                        onChange={(e) => {
                            setAmount(e.target.value);
                        }}
                        type="number"
                        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        placeholder="Enter amount"
                    />
                    </div>
                    <button onClick={async() => {
                        try {
                            const response = await apiClient.post(
                                endpoints.transfer,
                                {
                                    to: id.trim(),
                                    amount: Number(amount)
                                }
                            );
                            console.log(response.data);
                            setSucessmsg("Transaction Successful!");
                            setTimeout(() => {
                                setSucessmsg("");
                            }, 6000);
                        } catch (err) {
                            setErrormsg("Transaction Failed. Please try again.");
                            setTimeout(() => {
                                setErrormsg("");
                            }, 6000);
                            console.error("Error: ", err);
                        }
                    }} class="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                        Initiate Transfer
                    </button>
                </div>
                </div>
                {sucessmsg && (<div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-300 p-4 rounded-md">
                        <p className="text-green-800">{sucessmsg}</p>
                    </div>)}
                    {errormsg && (
                    <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-300 p-4 rounded-md">
                        <p className="text-red-800">{errormsg}</p>
                    </div>
                )}
        </div>
      </div>
    </div>
}
