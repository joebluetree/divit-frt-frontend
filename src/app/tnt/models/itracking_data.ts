
export interface iTracking_data {
  tnt_track_id: number;
  tnt_trackm_id: number;
  tnt_trackd_id: number;
  tnt_event_date: string;
  tnt_date: string;

  tnt_container: string;
  tnt_transport_mode: string;
  tnt_event_type: string;
  tnt_status_code: string;
  tnt_status_name: string;
  tnt_port_code: string;
  tnt_port_name: string;
  tnt_port_location: string;
  tnt_vessel: string;
  tnt_vessel_imon: string;
  tnt_voyage: string;

  tnt_row_type: string;

  rowversion: string;
  rec_company_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
}

