import { iPage } from "ngx-jrt-controls";

export interface iYearm {
  year_id: number;
  year_code: number;
  year_name: string;
  year_start_date: string;
  year_end_date: string;
  year_closed: string;
  year_default: string;
  rec_company_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;

}

export interface iYear_Search {
  year_name: string;
  rec_company_id: number;
}

export interface iYearModel {
  selected_row_id: number;
  records: iYearm[],
  errorMessage: string,
  searchRecord: iYear_Search,
  pageRecord: iPage,
  sort_column: string;
  sort_order: string;
};


