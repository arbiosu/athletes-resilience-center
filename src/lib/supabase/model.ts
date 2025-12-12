'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { type TablesInsert } from './database';
import type {
  PostInsert,
  PostResult,
  QueryPostsOptions,
  QueryPostsResult,
} from './types';
import type { User, AuthError } from '@supabase/supabase-js';
import { createServiceClient } from './service';

interface CheckUserResponse {
  user: User | null;
  err: AuthError | null;
}

export async function checkUser(): Promise<CheckUserResponse> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    return {
      user: null,
      err: error,
    };
  }

  return {
    user: data.user,
    err: null,
  };
}

export async function getAllCoaches() {
  const supabase = await createClient();
  return await supabase
    .from('coaches')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });
}

export async function getCoachById(coachId: string) {
  const supabase = await createClient();
  return await supabase
    .from('coaches')
    .select('*')
    .eq('id', coachId)
    .eq('is_active', true)
    .single();
}

export async function getAvailableSlots(
  coachId: string,
  startDate: string,
  endDate: string,
  sessionDuration: number = 60
) {
  const supabase = await createClient();
  return await supabase.rpc('get_available_slots', {
    p_coach_id: coachId,
    p_start_date: startDate,
    p_end_date: endDate,
    p_session_duration_minutes: sessionDuration,
  });
}

export async function createBooking(booking: TablesInsert<'bookings'>) {
  const supabase = await createClient();
  return await supabase.from('bookings').insert(booking).select().single();
}

export async function getBookingById(bookingId: string) {
  const supabase = await createClient();
  return await supabase
    .from('bookings')
    .select('*, coaches(*)')
    .eq('id', bookingId)
    .single();
}

export async function queryPosts(
  options: QueryPostsOptions = { sort: { order: 'desc' } }
): Promise<QueryPostsResult> {
  try {
    const supabase = await createClient();
    const selectColumns = options.select?.length
      ? options.select.join(', ')
      : '*';
    let query = supabase.from('posts').select(selectColumns as '*', {
      count: options.count,
      head: options.onlyCount ?? false,
    });

    if (options.filter?.id) {
      query = query.eq('id', options.filter.id);
    }
    if (options.filter?.isPublished !== undefined) {
      query = query.eq('is_published', options.filter.isPublished);
    }
    if (options.filter?.slug) {
      query.eq('slug', options.filter.slug);
    }

    const sortColumn = options.sort?.column ?? 'published_at';
    const sortOrder = options.sort?.order ?? 'desc';

    query.order(sortColumn, { ascending: sortOrder === 'asc' });

    if (options.limit) {
      query = query.limit(options.limit);
    }

    if (options.range) {
      const from = options.range.pageIndex ?? 0;
      const to = options.range.pageSize ?? 100;
      query = query.range(from, to);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Supabase query error in queryPosts: ', error);
      return {
        data: null,
        error: `Failed to query posts. Code: ${error.code || 'UNKNOWN'}`,
        count: null,
      };
    }

    return {
      data: data,
      error: null,
      count: count,
    };
  } catch (err) {
    console.error('Unexpected error in queryPosts: ', err);
    return {
      data: null,
      error: '[queryPosts] An unexpected error occurred.',
      count: null,
    };
  }
}

export async function createPost(post: PostInsert): Promise<PostResult> {
  try {
    const finalPostData: PostInsert = {
      ...post,
    };
    const supabase = await createServiceClient();
    const { data, error } = await supabase
      .from('posts')
      .insert(finalPostData)
      .select()
      .single();

    if (error || !data) {
      console.error('Supabase insert error in createPost: ', error);
      return {
        data: null,
        error: `Failed to create Post. Code: ${error?.code || 'UNKOWN'}`,
      };
    }
    console.log(
      `Post created successfully with ID: ${data.id}. Revalidating paths...`
    );
    revalidatePath('/', 'layout');
    return {
      data: data,
      error: null,
    };
  } catch (err) {
    console.error('Unexpected error in createPosts:', err);
    return {
      data: null,
      error: 'SERVER_ERROR: An unexpected server error occurred.',
    };
  }
}

export async function editPost(post: PostInsert): Promise<PostResult> {
  try {
    const supabase = await createServiceClient();
    const { data: insertedData, error: insertError } = await supabase
      .from('posts')
      .update({ ...post })
      .eq('id', post.id!)
      .select()
      .single();
    if (insertError || !insertedData) {
      console.error(`Failed to edit Post with id ${post.id}`);
      return {
        data: null,
        error: `Failed to create Post. Code: ${insertError?.code || 'UNKNOWN'}`,
      };
    }
    console.log(
      `Post with id ${insertedData.id} updated successfully. Revalidating paths...`
    );
    revalidatePath('/', 'layout');

    return {
      data: insertedData,
      error: null,
    };
  } catch (err) {
    console.error('Unexpected error in editPost:', err);
    return {
      data: null,
      error: 'SERVER_ERROR: An unexpected server error occurred.',
    };
  }
}

export async function deletePostById(id: string) {
  try {
    const supabase = await createServiceClient();
    const { data: deleteData, error: deleteError } = await supabase
      .from('posts')
      .delete()
      .eq('id', id)
      .select()
      .single();
    if (deleteError || !deleteData) {
      console.error(
        `Failed to delete post with id ${id}: ${deleteError?.code}`
      );
      return {
        data: null,
        error: `Failed to delete post. Code: ${deleteError?.code || 'UNKNOWN'}`,
      };
    }
    revalidatePath('/', 'layout');
    return {
      data: deleteData,
      error: null,
    };
  } catch (err) {
    console.error('Unexpected error in editPost:', err);
    return {
      data: null,
      error: 'SERVER_ERROR: An unexpected server error occurred.',
    };
  }
}
