import { iPage } from "ngx-jrt-controls";

export interface iAccGroupm {
  grp_id: number;
  grp_name: string;
  grp_main_group: string;
  grp_order: number;
  rec_version: number;
  rec_company_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
}

export interface iAccGroupm_Search {
  grp_name: string;
  grp_main_group: string;
  rec_company_id: number;
}

export interface iAccGroupmModel {
  selected_row_id: number;
  records: iAccGroupm[],
  errorMessage: string,
  searchRecord: iAccGroupm_Search,
  pageRecord: iPage,
  sort_column: string;
  sort_order: string;
};

