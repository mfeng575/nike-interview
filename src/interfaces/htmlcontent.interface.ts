export interface HtmlContent {
  template: Array<string | Template>;
  input: string;
  output: Array<string>;
}

export interface Template {
  dataText: string;
  fallbackText: string;
}