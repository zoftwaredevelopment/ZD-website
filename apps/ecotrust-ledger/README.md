# Ecotrust Ledger - MVP Prototype

This directory contains the prototype for the **Ecotrust Ledger**, an application designed to streamline environmental compliance fieldwork through AI-powered handwriting recognition.

## Project Overview

The goal of this MVP (Minimum Viable Product) is to prove the core concept: using a mobile device to capture images of handwritten documents, process them with AI to extract text, and display the results. This serves as the foundation for a larger system to digitize, analyze, and manage compliance data efficiently.

## Key Achievements

This prototype successfully demonstrates the following capabilities:

1.  **Monorepo Integration**: The application is set up as a package within the `ZD-website` pnpm monorepo, ensuring a scalable and organized codebase.

2.  **Mobile-First Design**: The user interface is clean, simple, and designed specifically for mobile devices. It prioritizes a seamless user experience for fieldwork scenarios.

3.  **Live Photo Capture**: To ensure high-quality images and bypass issues with various file formats, the application prompts the user to capture a live photo directly from their device's camera (`capture="environment"`).

4.  **AI-Powered OCR**: It integrates with **Google Cloud Vision AI** to perform powerful Optical Character Recognition (OCR) on the captured images, accurately converting handwriting into digital text.

5.  **Secure Backend API**: A dedicated API endpoint (`/api/upload`) was created to securely handle the image data. It receives the image from the client, sends it to the Google Vision API, and returns the extracted text.

6.  **End-to-End Workflow**: The prototype provides a complete, working flow:

    - User captures a photo on their mobile device.
    - The app displays a loading state while processing.
    - The extracted text is displayed on the screen.
    - Error handling is in place for failed API requests.

7.  **Desktop Graceful Degradation**: Desktop users are presented with a message indicating that the application is intended for mobile use, ensuring a clear and intentional user experience.

