import { iPage } from "ngx-jrt-controls";

export interface iTrackm {
  track_id: number;
  track_book_no: string;
  track_cntr_no: string;
  track_order: number;

  rowversion: string;
  rec_company_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
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
