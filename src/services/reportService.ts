import { supabase } from '../lib/utils/supabaseClient'; // Check this path and file
import { Report } from '@/types/report';

export const reportService = {
  async getReports(): Promise<Report[]> {
    const { data, error } = await supabase
      .from('reports')
      .select('*');

    if (error) throw new Error(error.message);

    return data;
  },

  async updateReportStats(reportId: string | number, stats: Partial<Report['stats']>) {
    const { error } = await supabase
      .from('report_stats')
      .upsert({
        report_id: reportId,
        ...stats
      });

    if (error) throw error;
  },

  async toggleBookmark(userId: string, reportId: string | number) {
    const { error } = await supabase
      .from('user_bookmarks')
      .upsert({
        user_id: userId,
        report_id: reportId
      });

    if (error) throw error;
  }
};