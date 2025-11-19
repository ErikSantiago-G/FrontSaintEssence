export interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ErrorsForm {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}
