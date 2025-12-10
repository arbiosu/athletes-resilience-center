'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { type TablesInsert } from './database';
import type { User, AuthError } from '@supabase/supabase-js';

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

export async function getPostById(postId: string) {
  const supabase = await createClient();
  return await supabase.from('posts').select().eq('id', postId).single();
}

export async function createPost(post: TablesInsert<'posts'>) {
  const supabase = await createClient();
  return await supabase.from('posts').insert(post).select().single();
}

export async function upsertPost(post: TablesInsert<'posts'>) {
  const supabase = await createClient();
  return await supabase
    .from('posts')
    .upsert({ id: post.id, ...post })
    .select()
    .single();
}

export async function deletePostById(id: string) {
  try {
    const supabase = await createClient();
    const { data: deleteData, error: deleteError } = await supabase
      .from('posts')
      .delete()
      .eq('id', id)
      .select()
      .single();
    if (deleteError || !deleteData) {
      console.error(`Failed to delete post with id ${id}`);
      return {
        data: null,
        error: `Failed to delete post. Code: ${deleteError?.code || 'UNKNOWN'}`,
      };
    }
    // -- Success --
    revalidatePath('/', 'layout');
    return {
      data: deleteData,
      error: null,
    };
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return {
        data: null,
        error: `Failed to delete post: ${error.message}`,
      };
    }
  }
}
