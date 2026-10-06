/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @license Apache-2.0
 */

import nodemailer from "nodemailer";
import config from "@/config";

export const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: config.SMTP_USER,
		pass: config.SMTP_PASS,
	},
});