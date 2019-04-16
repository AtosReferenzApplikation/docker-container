export interface MessageContent {
  parentId?: string;
  contentType?: any;
  subject?: string;
  content: string;
  attachments?: File[];
  form?: any;
}
