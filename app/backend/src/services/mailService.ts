import nodemailer, { type SendMailOptions } from "nodemailer";
import type { ContactForm } from "../types/ContactForm.js";
import { transporter } from "../config/transporter.js";
import type { ProjectForm } from "../types/ProjectForm.js";
import { escapeHtml, escapeMultiline } from "../utils/escapeHtml.js";

export async function sendContactEmail( form: ContactForm ): Promise<void> {
  const mailOptions: SendMailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.CONTACT_EMAIL,
    replyTo: form.email,
    subject: `Contact form: ${form.subject}`,
    html: `
      <p><strong>Nom :</strong> ${escapeHtml(form.name)}</p>
      <p><strong>Email :</strong> ${escapeHtml(form.email)}</p>
      <p><strong>Messages :</strong> ${escapeMultiline(form.message)}</p>
    `
  };

  await transporter.sendMail(mailOptions);
}

export async function sendProjectEmail( form: ProjectForm ): Promise<void> {
  const mailOptions: SendMailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.CONTACT_EMAIL,
    replyTo: form.email,
    subject: `Project form`,
    html: `
      <p><strong>Nom :</strong> ${escapeHtml(form.name)}</p>
      <p><strong>Email :</strong> ${escapeHtml(form.email)}</p>
      <p>
        <strong>Organisation :</strong> 
        ${form.organisation ? escapeHtml(form.organisation) : "<span style=\"font-style: italic;\"> Non renseignée </span>"}
      </p>
      <p>
        <strong>Téléphone :</strong> 
        ${form.telephone ? escapeHtml(form.telephone) : "<span style=\"font-style: italic;\"> Non renseignée </span>"}
      </p>
      <p><strong>Avancement :</strong> ${escapeHtml(form.avancement)}</p>
      <p><strong>Services :</strong> ${escapeHtml(form.services)}</p>
      <p><strong>Deadline :</strong> ${escapeHtml(form.deadline)}</p>
      <p><strong>Description :</strong><br>
      ${escapeMultiline(form.description)}<br>
    `,
  };

  await transporter.sendMail(mailOptions);
}