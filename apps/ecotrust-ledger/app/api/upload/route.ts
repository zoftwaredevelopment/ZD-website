// Import necessary modules from Next.js and the Google Cloud Vision library
import { NextRequest, NextResponse } from "next/server";

// This is the main function that handles POST requests to this API route
export async function POST(req: NextRequest) {
  // Check if the Google API Key is available in the environment variables.
  // This is a crucial security step.
  if (!process.env.GOOGLE_API_KEY) {
    return NextResponse.json(
      { error: "Google API Key is not configured" },
      { status: 500 }
    );
  }

  try {
    // Get the form data from the incoming request
    const formData = await req.formData();
    // Get the file from the form data (the key 'file' must match the key used in the frontend)
    const file = formData.get("file") as File | null;

    console.log("Backend: Received file:", file?.name, file?.size, file?.type); // Log file details

    // If no file is received, return an error
    if (!file) {
      console.log("Backend: No file found in form data.");
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert the file into a buffer
    const buffer = await file.arrayBuffer();

    // Log the size of the buffer. If this is 0, the file content is empty.
    console.log("Backend: Buffer size:", buffer.byteLength);

    // If the buffer is empty, there's no need to call the Vision API
    if (buffer.byteLength === 0) {
      console.log("Backend: File received but content is empty.");
      return NextResponse.json(
        { error: "File content is empty." },
        { status: 400 }
      );
    }

    // Convert the buffer to a base64 string for the API request
    const imageBase64 = Buffer.from(buffer).toString("base64");

    // Prepare the request payload for the Google Vision API
    const requestPayload = {
      requests: [
        {
          image: {
            content: imageBase64,
          },
          features: [
            {
              type: "DOCUMENT_TEXT_DETECTION",
            },
          ],
        },
      ],
    };

    // The Vision API endpoint URL
    const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${process.env.GOOGLE_API_KEY}`;

    // Use fetch to send the request to the Google Vision API
    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(requestPayload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // If the request to Google was not successful, throw an error
    if (!response.ok) {
      const errorBody = await response.json();
      console.error("Google Vision API Error:", errorBody);
      throw new Error(
        `Google Vision API responded with status ${response.status}`
      );
    }

    // Parse the JSON response from Google
    const responseData = await response.json();

    // Log the entire response from Google Vision API for debugging
    console.log("Backend: Full response from Google Vision API:");
    console.log(JSON.stringify(responseData, null, 2));

    // Extract the full text annotation from the first response
    // The structure is { responses: [ { fullTextAnnotation: { text: '...' } } ] }
    const text = responseData.responses[0]?.fullTextAnnotation?.text;

    // If no text is found, it's not an error, but we should inform the user
    if (!text) {
      console.log("Backend: No text found in the document.");
      return NextResponse.json({ text: "No text found in the document." });
    }

    // Return the extracted text to the frontend
    return NextResponse.json({ text });
  } catch (error: any) {
    // Return a generic error message if something goes wrong
    console.error(
      "Backend: An error occurred in the catch block:",
      error.message
    );
    return NextResponse.json(
      { error: error.message || "An internal server error occurred." },
      { status: 500 }
    );
  }
}
