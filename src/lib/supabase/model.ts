import { createClient } from '@/lib/supabase/server';
import { TablesInsert } from './database';

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
