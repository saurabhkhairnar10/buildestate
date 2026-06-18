import { ContactData } from "@/types/Contacttypes";

// Used to seed the database the first time /api/contact runs,
// and as a frontend fallback while loading or if the API call fails.
export const DEFAULT_CONTACT: ContactData = {
  phone: "+917038665975",
  email: "saurabhkhairnar0@gmail.com",
  address: "123, Builder Street, Pune, Maharashtra – 411001",
  hours: "Mon–Sat, 9am–7pm",
  whatsappMessage: "Hello, I'm interested in your properties. Please share more details.",
};