import { createClient } from '@supabase/supabase-js';
import {
  happyLifeSupabaseUrl,
  happyLifeSupabaseAnonKey,
} from '/utils/supabase/happylifeInfo';

const happyUrl =
  import.meta.env.VITE_HAPPYLIFE_SUPABASE_URL ?? happyLifeSupabaseUrl;
const happyKey =
  import.meta.env.VITE_HAPPYLIFE_SUPABASE_ANON_KEY ?? happyLifeSupabaseAnonKey;

const happySupabase = createClient(happyUrl, happyKey);

/**
 * 조건에 맞는 pvm_data 건수 조회
 */
export async function fetchPvmCount({ cancerType, stage, authorType, dateFrom, dateTo }) {
  let query = happySupabase.from('pvm_data').select('*', { count: 'exact', head: true });
  query = applyFilters(query, { cancerType, stage, authorType, dateFrom, dateTo });
  const { count, error } = await query;
  console.log('쿼리 결과:', count, '에러:', error);
  console.log('건수:', count);
  if (error) throw new Error(`건수 조회 오류: ${error.message}`);
  return count ?? 0;
}

/**
 * 조건에 맞는 pvm_data 집계 조회 (최대 500건)
 */
export async function fetchPvmData({ cancerType, stage, authorType, dateFrom, dateTo }) {
  let query = happySupabase.from('pvm_data').select('*').limit(500);
  query = applyFilters(query, { cancerType, stage, authorType, dateFrom, dateTo });
  const { data, error } = await query;
  if (error) throw new Error(`데이터 조회 오류: ${error.message}`);
  return data ?? [];
}

function applyFilters(query, { cancerType, stage, authorType, dateFrom, dateTo }) {
  const filters = {};
  if (cancerType && cancerType !== 'all') {
    query = query.ilike('pvm_02_cancer', `%${cancerType}%`);
    filters.pvm_02_cancer = `ilike %${cancerType}%`;
  }
  if (stage && stage !== 'all') {
    query = query.eq('pvm_05_stage', stage);
    filters.pvm_05_stage = stage;
  }
  if (authorType && authorType !== 'all') {
    query = query.eq('pvm_06_author', authorType);
    filters.pvm_06_author = authorType;
  }
  if (dateFrom) {
    query = query.gte('pvm_01_date', dateFrom);
    filters['pvm_01_date >='] = dateFrom;
  }
  if (dateTo) {
    query = query.lte('pvm_01_date', dateTo);
    filters['pvm_01_date <='] = dateTo;
  }
  console.log('[pvmClient] 적용된 필터:', filters);
  return query;
}
