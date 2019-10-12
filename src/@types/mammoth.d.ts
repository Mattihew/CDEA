declare module "mammoth" {
  interface Result {
    value: string;
    messages: string[];
  }

  interface Input {
    path?: string;
    buffer?: Buffer;
  }

  export function convertToHtml(input: Input): Promise<Result>;
}
