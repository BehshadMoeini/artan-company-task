export interface Content {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContentFormValues {
  title: string;
  description: string;
}
