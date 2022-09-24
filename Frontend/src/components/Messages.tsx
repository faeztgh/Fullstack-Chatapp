import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
const Messages = ({
    messages,
    currUserName,
}: {
    messages: Array<{ name: string; text: string }>;
    currUserName: string;
}) => {
   
    return (
        <>
            {messages.map((messageObj, idx) => {
                return (
                    <div className="grid grid-cols-12 gap-y-2" key={idx}>
                        {messageObj.name === currUserName ? (
                            <div className="col-start-6 col-end-13 p-3 rounded-lg">
                                <div className="flex items-center justify-start flex-row-reverse ">
                                    <button
                                        data-tip
                                        data-for="userToolTip"
                                        className="flex cursor-pointer uppercase font-bold items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                                    >
                                        {messageObj.name &&
                                            messageObj.name.charAt(0)}
                                    </button>

                                    <ReactTooltip
                                        id="userToolTip"
                                        place="top"
                                        effect="solid"
                                    >
                                        {messageObj.name && messageObj.name}
                                    </ReactTooltip>

                                    <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                                        <div>{messageObj.text}</div>
                                        <div className="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500">
                                            Seen
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="col-start-1 col-end-8 p-3 rounded-lg">
                                <div className="flex flex-row items-center">
                                    <button
                                        className="flex uppercase cursor-pointer font-bold items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                                        data-tip
                                        data-for="userToolTip"
                                    >
                                        {messageObj.name &&
                                            messageObj.name.charAt(0)}
                                    </button>
                                    {
                                        <ReactTooltip
                                            id="userToolTip"
                                            place="top"
                                            effect="solid"
                                        >
                                            {messageObj.name && messageObj.name}
                                        </ReactTooltip>
                                    }
                                    <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                        <div>{messageObj.text}</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </>
    );
};

export default Messages;
