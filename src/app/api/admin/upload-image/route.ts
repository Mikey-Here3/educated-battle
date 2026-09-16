import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";

// Server-side Cloudinary upload using signed upload API (no npm package needed)
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided." }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ success: false, error: "File must be an image." }, { status: 400 });
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ success: false, error: "Image must be under 5MB." }, { status: 400 });
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "didhvfvtu";
    const apiKey = process.env.CLOUDINARY_API_KEY || "783916382747355";
    const apiSecret = process.env.CLOUDINARY_API_SECRET || "nmv86FH9P4rEsCyQ8jwdPQ4YhPA";

    if (!cloudName || !apiKey || !apiSecret) {
      console.error("Cloudinary credentials missing.");
      return NextResponse.json({ success: false, error: "Image storage not configured." }, { status: 500 });
    }

    // Build signed upload parameters
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const folder = "educated-gamer/tournaments";

    // Alphabetical order for Cloudinary signed upload: folder, timestamp
    const signaturePayload = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto.createHash("sha1").update(signaturePayload).digest("hex");

    // Convert File to ArrayBuffer then Buffer for the form upload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Build multipart form to send to Cloudinary
    const uploadForm = new FormData();
    uploadForm.append("file", new Blob([buffer], { type: file.type }), file.name);
    uploadForm.append("api_key", apiKey);
    uploadForm.append("timestamp", timestamp);
    uploadForm.append("signature", signature);
    uploadForm.append("folder", folder);

    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const uploadRes = await fetch(uploadUrl, {
      method: "POST",
      body: uploadForm,
    });


    if (!uploadRes.ok) {
      const errBody = await uploadRes.text();
      console.error("Cloudinary upload failed:", errBody);
      return NextResponse.json({ success: false, error: "Image upload to Cloudinary failed." }, { status: 502 });
    }

    const result = await uploadRes.json();

    if (!result.secure_url) {
      console.error("Cloudinary returned no secure_url:", result);
      return NextResponse.json({ success: false, error: "Invalid response from image storage." }, { status: 502 });
    }

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error: any) {
    console.error("Upload image API error:", error);
    return NextResponse.json({ success: false, error: "Server error during image upload." }, { status: 500 });
  }
}
