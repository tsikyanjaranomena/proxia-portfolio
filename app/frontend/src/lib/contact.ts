export const CONTACT_EMAIL = "sales@proxiatech.com";
export const CONTACT_PHONE = "+261 34 96 967 90";
export const CONTACT_PHONE_HREF = "+261349696790";
export const CONTACT_LOCATION = "PRO 100 ANKAZOBE BY PASS";

export const CONTACT_FORM_ENDPOINT =
  import.meta.env.VITE_CONTACT_FORM_ENDPOINT ??
  `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;
