import { Response } from "express";

class ResponseHandler {

  static success(res: Response, code: number, data: any = null, message = "success") {
    return res.status(code).json({ status: true, code, message, data });
  }

  static badRequest(res: Response, code: number, message: string) {
    return res.status(code).json({ status: false, code, message, data: null });
  }

  static throwError(message: string, code = 400) {
    throw { code, message }
  }
}

export default ResponseHandler;
