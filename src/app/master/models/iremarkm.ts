import { iPage } from "ngx-jrt-controls";

export interface iRemarkd {
  remd_id: number,
  remd_remarkm_id: number,
  remd_desc1: string;
  remd_order: number,

  rec_version: number;
  rec_company_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;

}

export interface iRemarkm {
  rem_id: number;
  rem_name: string;
  rem_remarks: iRemarkd[];

  rec_version: number;
  rec_company_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
}

export interface iRemarkm_Search {
  rem_name: string;
  rec_company_id: number;
}

export interface iRemarkmModel {
  selected_row_id: number;
  records: iRemarkm[],
  errorMessage: string,
  searchRecord: iRemarkm_Search,
  pageRecord: iPage,
  sort_column: string;
  sort_order: string;
};

