export interface ContactData {
  phone: string;
  email: string;
  address: string;
  hours: string;
  whatsappMessage: string;
}

export interface ContactApiResponse {
  success: boolean;
  data?: ContactData;
  message?: string;
}