import { NextResponse } from "next/server";
import { dummyData } from "../route";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // destructure params from second argument
) {
    const { id } = await params;
  // optional delay simulation
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Find the timesheet
  const timesheet = dummyData.find((item) => String(item.id) === id);

  if (!timesheet) {
    return NextResponse.json(
      { error: `Timesheet with ID ${id} not found` },
      { status: 404 }
    );
  }

  return NextResponse.json(timesheet);
}
