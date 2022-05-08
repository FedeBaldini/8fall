import { ErrorCode } from "./ErrorCode.enum";

export interface Exception {
  error: {
    code: ErrorCode;
    message: string;
  };
}
