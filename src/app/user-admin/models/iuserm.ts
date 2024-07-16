import { iPage } from "ngx-jrt-controls";
import { iUserBranches } from "./iuserbranches";

export interface iUserm {
  user_id: number;
  user_code: string;
  user_name: string;
  user_password: string;
  user_email: string;
  user_is_admin: string;
  rowversion: string;
  rec_company_id: number;
  rec_branch_id: number;
  rec_branch_name: string;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
  userbranches: iUserBranches[];

}

export interface iUser_Search {
  user_name: string;
  user_is_admin: string;
  rec_company_id: number;
}

export interface iUserModel {
  selected_row_id: number;
  records: iUserm[],
  errorMessage: string,
  searchRecord: iUser_Search,
  pageRecord: iPage,
  sort_column: string;
  sort_order: string;
};


