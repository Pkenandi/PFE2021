export class Mail {
  dest: string;
  body: string;
  subject: string;

  constructor(dest, body, subject) {
    this.body = body;
    this.dest = dest;
    this.subject = subject;
  }
}
