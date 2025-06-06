import { iPage } from "ngx-jrt-controls";

export interface iGenRemarkm {
    remk_id: number;
    remk_parent_id?: number;
    remk_parent_type?: string;
    remk_desc?: string;
    remk_order?: number;
    remk_remarks?: iGenRemarkm[];

    rec_version: number;
    rec_locked?: string;
    rec_company_id: number;
    rec_company_name?: string;
    rec_branch_id: number;
    rec_branch_name?: string;
    rec_created_by?: string;
    rec_created_date?: string;
    rec_edited_by?: string;
    rec_edited_date?: string;
}

export interface iGenRemarkm_Search {
  remk_parent_type: string;
  remk_desc: string;
  rec_company_id: number;
  rec_branch_id: number;
}

export interface iGenRemarkmModel {
  selected_row_id: number;
  records: iGenRemarkm[],
  errorMessage: string,
  searchRecord: iGenRemarkm_Search,
  pageRecord: iPage,
  sort_column: string;
  sort_order: string;
};