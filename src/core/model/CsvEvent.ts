export type DayOfWeek = 'MO' | 'DI' | 'MI' | 'DO' | 'FR' | 'SA' | 'SO';
export type LvType = 'VO' | 'UE' | 'VU';

interface CsvEvent {
  dayOfWeek: DayOfWeek;
  date: string;
  start_time: string;
  end_time: string;
  duration: number;

  lv_id: number;
  lv_type: LvType;
  lv_group: string;

  title: string;
  location: string;

  note?: string;
}
export default CsvEvent;
