export interface ContactEnquiryPayload {
  name: string;
  phone: string;
  email: string;
  interest: string;
  message: string;
  company: string;
}

function isSuccessfulResponse(value: unknown): boolean {
  return (
    typeof value === "object" &&
    value !== null &&
    "success" in value &&
    value.success === true
  );
}

export async function saveContactEnquiry(
  payload: ContactEnquiryPayload,
): Promise<boolean> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) return false;

    const result: unknown = await response.json();
    return isSuccessfulResponse(result);
  } catch (error) {
    console.error("Contact enquiry could not be saved", error);
    return false;
  }
}
