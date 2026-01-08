import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
    message?: string;
    fullScreen?: boolean;
    size?: "sm" | "md" | "lg";
}

const LoadingSpinner = ({
    message,
    fullScreen = false,
    size = "md"
}: LoadingSpinnerProps) => {
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-6 h-6 sm:w-8 sm:h-8",
        lg: "w-10 h-10 sm:w-12 sm:h-12"
    };

    return (
        <div
            className={`flex flex-col items-center justify-center p-4 sm:p-6 text-center bg-transparent ${fullScreen ? "min-h-screen" : "min-h-[200px] sm:min-h-[300px]"
                }`}
        >
            <Loader2
                className={`${sizeClasses[size]} animate-spin mx-auto text-[#BD001F]`}
            />
            {message && (
                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 font-medium">
                    {message}
                </p>
            )}
        </div>
    );
};

export default LoadingSpinner;