import { useState, useEffect } from "react";
import { Button, ButtonGroup } from "@mui/material";
import "./BackgroundChanger.css";

const colorways = [
    ["#f0e68c", "#f5deb3", "#ffe4b5"], // Original One
    ["#FF6F61", "#F5C156", "#FFAB91", "#FFA69E"],  // Sunset Vibes
    ["#FF9A8B", "#FF6A88", "#FFCC00", "#FFC93C"],  // Tropical Punch
    ["#39FF14", "#FFDF00", "#FF007F", "#00FFFF"],  // Neon Lights
    ["#FFAD60", "#FFD56B", "#F77F00", "#FF9F1C"],  // Summer Breeze
    ["#FF6F61", "#FFDB58", "#6A0572", "#5B84B1"],  // Electric Dreams
    ["#FFDD57", "#FF7E5F", "#FFAB40", "#00A676"],  // Fresh Citrus
    ["#FF6384", "#FFCD56", "#36A2EB", "#4BC0C0"],  // Candy Pop
    ["#FFD700", "#FF69B4", "#7FFF00", "#00BFFF"],  // Bold Pastels
    ["#00D4FF", "#0084FF", "#00A3E0", "#34A1EB"],  // Vibrant Blues
    ["#B2FF59", "#69F0AE", "#00E676", "#40C4FF"]   // Tech Glow
];

export function BackgroundChanger(): JSX.Element {
    const [colorwayIndex, setColorwayIndex] = useState(0);

    // Function to go to the next colorway
    const nextColorway = () => {
        setColorwayIndex((prevIndex) => (prevIndex + 1) % colorways.length);
    };

    // Function to go to the previous colorway
    const previousColorway = () => {
        setColorwayIndex((prevIndex) => (prevIndex - 1 + colorways.length) % colorways.length);
    };

    // Function to reset to the original background
    const resetBackground = () => {
        setColorwayIndex(0);  // Reset to original colorway
    };

    // Update the background of the App
    useEffect(() => {
        const currentColors = colorways[colorwayIndex];
        const appElement = document.querySelector('.App') as HTMLElement; // Cast to HTMLElement
        if (appElement) {
            appElement.style.background = `linear-gradient(135deg, ${currentColors[0]}, ${currentColors[1]}, ${currentColors[2]})`;
        }
    }, [colorwayIndex]);

    return (
        <div className="BackgroundChanger">
            <br/>
            <ButtonGroup variant="outlined">
                <Button
                    variant="outlined"
                    sx={{ color: 'black', borderColor: 'black' }}
                    onClick={previousColorway}
                >
                    Previous Colorway
                </Button>
                <Button
                    variant="outlined"
                    sx={{ color: 'black', borderColor: 'black' }}
                    onClick={nextColorway}
                >
                    Next Colorway
                </Button>
                <Button
                    variant="outlined"
                    sx={{ color: 'black', borderColor: 'black' }}
                    onClick={resetBackground}
                >
                    Back To Original
                </Button>
            </ButtonGroup>
        </div>
    );
}
