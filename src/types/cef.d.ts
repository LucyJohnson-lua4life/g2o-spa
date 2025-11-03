// Type definitions for CEF browser interface
interface Window {
    runLoginFailed?: () => void;
    runLoginSuccess?: () => void;
    // Add other CEF-callable functions here
}

declare const browser: {
    call: (functionName: string, ...args: any[]) => void;
};