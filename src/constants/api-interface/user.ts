export interface User {
  _id: string;
  username: string;
  password: string;
  email: string;
  role: "Employee" | "Admin" | "Manager";
  status: "Pending" | "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
}

export interface AvatarType {
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string;
  provider: string;
  provider_metadata: string;
  createdAt: string;
  updatedAt: string;
}

export interface Formats {
  thumbnail: Thumbnail;
}

export interface Thumbnail {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}
