import { Blogtyp } from '../../../blogs/domains/blogtyp.entity';

export type CreatePost = {
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  createdAt: string;
};

export type CreatePostWithIdAndWithNameBlog = {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  createdAt: string;
  name: string;
};

export type CreatePostTypeorm = {
  title: string;
  shortDescription: string;
  content: string;
  createdAt: string;
  blogtyp: Blogtyp;
};
