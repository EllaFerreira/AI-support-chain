export interface JiraResponse {
  expand: string;
  startAt: number;
  maxResults: number;
  total: number;
  issues: Issue[];
}

export interface Issue {
  expand: string;
  id: string;
  self: string;
  key: string;
  fields: Fields;
}

export interface Fields {
  summary: string;
  comment: Comment;
  status: Status;
}

export interface Comment {
  comments: any[];
  self: string;
  maxResults: number;
  total: number;
  startAt: number;
}

export interface Status {
  self: string;
  description: string;
  iconUrl: string;
  name: string;
  id: string;
  statusCategory: StatusCategory;
}

export interface StatusCategory {
  self: string;
  id: number;
  key: string;
  colorName: string;
  name: string;
}
