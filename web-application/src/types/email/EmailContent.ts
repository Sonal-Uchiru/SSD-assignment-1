import { getCode } from "../../utils/generator/CodeGenerator";

export class EmailContent {
  email: string;
  code: string;
  time: Date;

  constructor(email: string) {
    this.email = email;
    this.code = getCode();
    this.time = new Date();
  }
}
