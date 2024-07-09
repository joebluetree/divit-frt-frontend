import { iPage } from "ngx-jrt-controls";

export interface iCompanym {
  comp_id: number;
  comp_code: string;
  comp_name: string;
  comp_address1: string;
  comp_address2: string;
  comp_address3: string;


  rec_company_id: number;
  rec_branch_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
}

export interface iCompany_Search {
  comp_name: string;
  rec_company_id: number;
}


export interface iCompanyModel {
  selected_row_id: number;
  records: iCompanym[],
  errorMessage: string,
  searchRecord: iCompany_Search,
  pageRecord: iPage,
  sort_column: string;
  sort_order: string;
};

