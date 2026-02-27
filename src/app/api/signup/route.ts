import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSupabase } from "@/lib/supabase";

const BASE_COUNT = 63482;

export async function POST(request: Request) {
  try {
    const { email, source } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@") || !email.includes(".")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const supabase = getSupabase();

    const { error } = await supabase
      .from("early_access_user_emails")
      .insert({ email: email.trim().toLowerCase(), source: source || "unknown" });

    if (error && error.code !== "23505") {
      return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }

    const { count } = await supabase
      .from("early_access_user_emails")
      .select("*", { count: "exact", head: true });
    revalidatePath("/");
    return NextResponse.json({ success: true, count: BASE_COUNT + (count ?? 0) });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
