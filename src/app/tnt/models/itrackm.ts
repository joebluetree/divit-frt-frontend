import { iPage } from "ngx-jrt-controls";
import { iTracking_data } from './itracking_data';

export interface iTrackm {
  track_id: number;
  track_book_no: string;
  track_cntr_no: string;

  track_api_type: string;
  track_request_id: string;

  track_pol_code: string;
  track_pol_name: string;
  track_pol_etd: string;

  track_pod_code: string;
  track_pod_name: string;
  track_pod_eta: string;

  track_vessel_code: string;
  track_vessel_name: string;
  track_voyage: string;

  track_carrier_id: number;
  track_carrier_name: string;
  track_carrier_scac: string;


  rec_version: number;
  rec_company_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;

  tracking_data: iTracking_data[];
}

export interface iTrackm_Search {
  track_book_no: string;
  track_cntr_no: string;
  rec_company_id: number
}

export interface iTrackmModel {
  selected_row_id: number;
  records: iTrackm[];
  errorMessage: string;
  searchRecord: iTrackm_Search;
  pageRecord: iPage;
  sort_column: string;
  sort_order: string;
}
