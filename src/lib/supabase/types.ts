import { type Tables, TablesInsert } from '@/lib/supabase/database';

export type Count = 'exact' | 'planned' | 'estimated';
export type SortOrder = 'asc' | 'desc';

export type Post = Tables<'posts'>;
export type PostInsert = TablesInsert<'posts'>;

export interface QueryPostsOptions {
  count?: Count;
  onlyCount?: boolean;
  filter?: {
    id?: string;
    isPublished?: boolean;
    slug?: string;
  };
  select?: (keyof Post)[];
  sort?: {
    column?: keyof Post;
    order: SortOrder;
  };
  limit?: number;
  range?: {
    pageIndex?: number;
    pageSize?: number;
  };
}

export interface QueryPostsResult {
  data: Post[] | null;
  error: string | null;
  count: number | null;
}

export interface PostResult {
  data: Post | null;
  error: string | null;
}
