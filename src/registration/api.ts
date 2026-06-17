import { RegistrationPayload } from "./schemas";

const TAKEN_EMAILS = new Set(["zajety@test.pl", "taken@example.com"]);

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

function delay(ms = 700) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function registerUser(data: RegistrationPayload) {
  await delay();

  if (TAKEN_EMAILS.has(data.email.toLowerCase())) {
    throw new ApiError(409, "Ten adres e-mail jest już zarejestrowany");
  }

  if (data.email.toLowerCase().includes("error500")) {
    throw new ApiError(500, "Błąd serwera, spróbuj ponownie");
  }

  return { success: true as const };
}
