import React from "react";
import { Progress } from "@nextui-org/react";

export default function ProgressBar({ value, maxValue }) {
    return (
        <div className="flex items-center w-full">
            <Progress
                aria-label="Progress bar komponenta"
                value={value}
                maxValue={maxValue}
                className="flex-grow"
            />
            <span className="ml-4 whitespace-nowrap">
                {value} / {maxValue}
            </span>
        </div>
    );
}
