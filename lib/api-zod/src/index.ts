import { 
  RegisterStudentBody as ApiRegister,
  SendOtpBody as ApiSendOtp,
  SubmitAssessmentBody as ApiSubmitAssesment,
  UpdateStudentBody as ApiUpdateStudent,
  VerifyOtpBody as ApiVerifyOtp
} from "./generated/api";

import type { 
  RegisterStudentBody as TypeRegister,
  SendOtpBody as TypeSendOtp,
  SubmitAssessmentBody as TypeSubmitAssesment,
  UpdateStudentBody as TypeUpdateStudent,
  VerifyOtpBody as TypeVerifyOtp
} from "./generated/types";

export const RegisterStudentBody = ApiRegister;
export type RegisterStudentBody = TypeRegister;

export const SendOtpBody = ApiSendOtp;
export type SendOtpBody = TypeSendOtp;

export const SubmitAssessmentBody = ApiSubmitAssesment;
export type SubmitAssessmentBody = TypeSubmitAssesment;

export const UpdateStudentBody = ApiUpdateStudent;
export type UpdateStudentBody = TypeUpdateStudent;

export const VerifyOtpBody = ApiVerifyOtp;
export type VerifyOtpBody = TypeVerifyOtp;

export * from "./generated/api";
export * from "./generated/types";
