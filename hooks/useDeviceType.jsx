import { useState, useEffect } from "react";

export const useDeviceType = () => {
    const [deviceType, setDeviceType] = useState(getDeviceType());

    function getDeviceType() {
        const width = window.innerWidth;
        if (width <= 768) return "mobile";
        else if (width > 768 && width <= 1024) return "tablet";
        return "monitor";
    }

    useEffect(() => {
        const handleResize = () => {
            const newDeviceType = getDeviceType();
            console.log("Resized width:", window.innerWidth, "Device Type:", newDeviceType); // Logging resized width and device type
            setDeviceType(newDeviceType);
        };

        window.addEventListener("resize", handleResize);
        
        // Initial log when the hook is first run
        console.log("Initial width:", window.innerWidth, "Initial Device Type:", deviceType);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return deviceType;
}
