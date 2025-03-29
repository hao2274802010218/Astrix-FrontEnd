import React, { createContext, useContext, useState } from "react";

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
    const [whoAreYou, setRole] = useState(localStorage.getItem("role") || "");
    const [whatYouName, setName] = useState(localStorage.getItem("username") || "");
    const [whatYouId, setId] = useState(localStorage.getItem("id") || "");
    const [ActiveIndex, setActiveIndex] = useState(1);

    return (
        <RoleContext.Provider
            value={{
                whoAreYou,
                setRole,
                whatYouName,
                setName,
                whatYouId,
                setId,
                ActiveIndex,
                setActiveIndex,
            }}
        >
            {children}
        </RoleContext.Provider>
    );
};

export const useRole = () => {
    const context = useContext(RoleContext);
    return { whoAreYou: context.whoAreYou, setRole: context.setRole };
};

export const useName = () => {
    const context = useContext(RoleContext);
    return { whatYouName: context.whatYouName, setName: context.setName };
};

export const useId = () => {
    const context = useContext(RoleContext);
    return { whatYouId: context.whatYouId, setId: context.setId };
};

export const useActiveIndex = () => {
    const context = useContext(RoleContext);
    return { ActiveIndex: context.ActiveIndex, setActiveIndex: context.setActiveIndex };
};