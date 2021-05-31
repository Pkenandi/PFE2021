export class Mail {
  dest: string;
  from: string;
  topic: string;
  body: string;


  constructor(dest: string, from: string, topic: string, body: string) {
    this.dest = dest;
    this.from = from;
    this.topic = topic;
    this.body = body;
  }
}
