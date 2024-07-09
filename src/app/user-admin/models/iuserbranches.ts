import { iPage } from "ngx-jrt-controls";

export interface iUserBranches {
  ub_id: number;
  ub_user_id: number;
  ub_user_name: string;
  ub_selected: string;
  rec_company_id: number;
  rec_branch_id: number;
  rec_branch_name: string;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
}

export interface iUserBranches_Search {
  user_name: string;
  rec_company_id: number;
}

export interface iUserBranchesModel {
  selected_row_id: number;
  records: iUserBranches[],
  errorMessage: string,
  searchRecord: iUserBranches_Search,
  pageRecord: iPage,
  sort_column: string;
  sort_order: string;
};


