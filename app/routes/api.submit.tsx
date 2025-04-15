import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { supabase } from "~/lib/supabase";

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }
  
  try {
    const formData = await request.formData();
    
    // Extract form data
    const serviceName = formData.get("service_name") as string;
    const code = formData.get("code") as string;
    const description = formData.get("description") as string;
    const userBenefit = formData.get("user_benefit") as string;
    const referrerBenefit = formData.get("referrer_benefit") as string;
    const categoryId = formData.get("category") as string;
    const email = formData.get("email") as string;
    
    // Optional fields
    const url = formData.get("url") as string || null;
    const terms = formData.get("terms") as string || null;
    const logoUrl = formData.get("logo_url") as string || null;
    const screenshotUrl = formData.get("screenshot_url") as string || null;
    
    // Validate required fields
    if (!serviceName || !code || !description || !userBenefit || !referrerBenefit || !categoryId || !email) {
      return json({ error: "Missing required fields" }, { status: 400 });
    }
    
    // Store submission in a pending table or flag it for review
    const { data, error } = await supabase
      .from("referral_submissions")
      .insert([
        {
          service_name: serviceName,
          code,
          description,
          user_benefit: userBenefit,
          referrer_benefit: referrerBenefit,
          category_id: categoryId,
          url,
          terms,
          logo_url: logoUrl,
          screenshot_url: screenshotUrl,
          submitter_email: email,
          status: "pending" // Pending review
        }
      ]);
    
    if (error) {
      console.error("Error submitting referral code:", error);
      return json({ error: "Failed to submit referral code" }, { status: 500 });
    }
    
    return json({ success: true, message: "Referral code submitted successfully and pending review" });
    
  } catch (error) {
    console.error("Error processing submission:", error);
    return json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
