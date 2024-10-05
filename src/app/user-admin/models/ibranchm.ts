import { iPage } from "ngx-jrt-controls";

export interface iBranchm {
  branch_id: number;
  branch_code: string;
  branch_name: string;
  branch_address1: string;
  branch_address2: string;
  branch_address3: string;


  rec_version: number;
  rec_company_id: number;
  rec_branch_id: number;
  rec_branch_name: string;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
}

export interface iBranch_Search {
  branch_name: string;
  rec_company_id: number;
}

export interface iBranchModel {
  selected_row_id: number;
  records: iBranchm[],
  errorMessage: string,
  searchRecord: iBranch_Search,
  pageRecord: iPage,
  sort_column: string;
  sort_order: string;
};




