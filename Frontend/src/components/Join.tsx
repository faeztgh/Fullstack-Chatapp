import React from "react";

const Join = ({
    join,
    setName,
}: {
    join: () => void;
    setName: (name: string) => void;
}) => {
    return (
        <div className="my-auto h-screen mx-auto flex align-center items-center justify-center flex-col w-full bg-gradient-to-br from-slate-100 to-white">
            <div className="max-w-4xl flex flex-col">
                <input
                    className=" rounded-md p-4 border mr-0  text-gray-800 border-gray-200 bg-white"
                    placeholder="What is your name?"
                    onChange={(e) => setName(e.target.value)}
                ></input>
                <button
                    className="px-8 rounded-md mt-5 bg-yellow-400  text-gray-800 font-bold p-4 uppercase border-yellow-500"
                    onClick={join}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Join;
