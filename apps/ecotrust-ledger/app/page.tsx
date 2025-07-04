"use client";

import { useState } from "react";
import { Camera, Image, X, LoaderCircle, CheckCircle, AlertCircle, Smartphone } from "lucide-react";
import { useIsMobile } from "../../../hooks/use-mobile";

export default function Home() {
    const isMobile = useIsMobile();

    // State to hold the single selected file
    const [file, setFile] = useState<File | null>(null);
    // State to track when a file is being dragged over the drop zone
    const [isDragging, setIsDragging] = useState(false);
    // State to manage the upload process
    const [uploading, setUploading] = useState(false);
    const [extractedText, setExtractedText] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // If the user is on a desktop, show a message and don't render the app
    if (!isMobile) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 text-center">
                <Smartphone className="w-16 h-16 text-gray-400 mb-4" />
                <h1 className="text-2xl font-bold text-gray-800">Mobile Only</h1>
                <p className="text-gray-500 mt-2">
                    This application is designed for mobile devices.
                    <br />
                    Please open it on your smartphone to continue.
                </p>
            </main>
        );
    }

    // Handles file selection from the input element
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // We only care about the first file if multiple are selected
        if (event.target.files && event.target.files.length > 0) {
            // Replace the current file state with the new file
            setFile(event.target.files[0]);
            setExtractedText(null);
            setError(null);
        }
    };

    // Removes the selected file
    const handleRemoveFile = () => {
        setFile(null); // Clear the file
        setExtractedText(null);
        setError(null);
    };

    // Handles the drag-over event
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };

    // Handles the drag-leave event
    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
    };

    // Handles the drop event
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
        // We only care about the first file if multiple are dropped
        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            // Replace the current file state with the new file from the drop
            setFile(event.dataTransfer.files[0]);
            setExtractedText(null);
            setError(null);
        }
    };

    // Handles the file upload process
    const handleUpload = async () => {
        console.log("handleUpload triggered.");

        if (!file) {
            console.log("No file selected, exiting handleUpload.");
            return;
        };

        // Reset state and start loading
        setUploading(true);
        setExtractedText(null);
        setError(null);

        const formData = new FormData();
        formData.append('file', file);
        console.log("FormData created, starting fetch to /api/upload.");

        try {
            // Send the file to our backend API route
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            console.log("Fetch response received:", response);

            const data = await response.json();
            console.log("Response data parsed:", data);

            if (!response.ok) {
                // If the server returns an error, display it
                console.error("Server returned an error:", data.error);
                throw new Error(data.error || 'Something went wrong');
            }

            // Set the extracted text from the AI
            console.log("Upload successful, setting extracted text.");
            setExtractedText(data.text);

        } catch (err: any) {
            // Set any other errors (e.g., network issues)
            console.error("An error occurred in the catch block:", err);
            setError(err.message);
        } finally {
            // Stop the loading state
            console.log("handleUpload finished, setting uploading to false.");
            setUploading(false);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Live Field Data Capture</h1>
                    <p className="text-gray-500 mt-2">Use your device to take a photo of handwritten notes and documents for instant processing.</p>
                </div>

                {/* File Drop Zone */}
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors duration-300 ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white hover:bg-gray-100"}`}
                >
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                        accept="image/*"
                        capture="environment"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                        <div className="flex flex-col items-center">
                            <Camera className="w-12 h-12 text-gray-400 mb-4" />
                            <p className="text-lg font-semibold text-gray-700">Tap to Capture</p>

                        </div>
                    </label>
                </div>

                {/* Image Preview */}
                {file && (
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Image Preview</h2>
                        <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
                            <div className="flex items-center">
                                <Image className="w-6 h-6 text-gray-500 mr-3" />
                                <span className="text-gray-700 font-medium">{file.name}</span>
                            </div>
                            <button onClick={handleRemoveFile} className="text-gray-400 hover:text-red-500" disabled={uploading}>
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Upload Button */}
                {file && (
                    <div className="mt-8 text-center">
                        <button
                            onClick={handleUpload}
                            className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-300 disabled:bg-gray-400 flex items-center justify-center mx-auto"
                            disabled={!file || uploading}
                        >
                            {uploading ? <LoaderCircle className="animate-spin mr-2" /> : null}
                            {uploading ? 'Analyzing...' : 'Analyze Image'}
                        </button>
                    </div>
                )}

                {/* Results Section */}
                {error && (
                    <div className="mt-8 p-4 bg-red-100 border border-red-200 text-red-700 rounded-lg flex items-center">
                        <AlertCircle className="mr-3" />
                        <div>
                            <h3 className="font-bold">Error</h3>
                            <p>{error}</p>
                        </div>
                    </div>
                )}

                {extractedText && (
                    <div className="mt-8 p-4 bg-green-100 border border-green-200 rounded-lg">
                        <div className="flex items-center mb-2">
                            <CheckCircle className="text-green-600 mr-2" />
                            <h3 className="font-bold text-lg text-green-800">Extracted Text</h3>
                        </div>
                        <pre className="whitespace-pre-wrap bg-white p-3 rounded-md text-gray-700 font-mono text-sm">{extractedText}</pre>
                    </div>
                )}
            </div>
        </main>
    );
} 