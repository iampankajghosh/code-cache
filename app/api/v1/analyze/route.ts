import { NextRequest, NextResponse } from "next/server";
import { extractText, getDocumentProxy } from "unpdf";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const preferred_location = formData.get("preferred_location") as string;
    const expected_salary = formData.get("expected_salary") as string;
    const resume_file = formData.get("resume_file") as File;

    if (!preferred_location || !expected_salary || !resume_file) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Convert the File to a Buffer directly
    const arrayBuffer = await resume_file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Extract text from the PDF using the buffer
    const pdfBuffer = new Uint8Array(buffer);
    const pdf = await getDocumentProxy(pdfBuffer);
    const { totalPages, text } = await extractText(pdf, { mergePages: true });

    return NextResponse.json({
      message: "Analyze successful",
      data: {
        preferred_location,
        expected_salary,
        total_pages: totalPages,
        extracted_text: text,
      },
    });
  } catch (error) {
    console.error("Analyze error", error);
    return NextResponse.json({ error: "Analyze error" }, { status: 500 });
  }
}
