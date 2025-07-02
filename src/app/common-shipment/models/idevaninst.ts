import { iPage } from "ngx-jrt-controls";

//Name : Sourav V
//Created Date : 25/06/2025
//Remark : all data variable used in memo component is exported as separte interface according to its purpose (editing,search) 
//version : v1 - 25/06/2025

export interface iDevanInst {
  di_id: number;
  di_parent_id: number;
  di_parent_type: string;
  di_refno: string;
  di_request_to_id: number;
  di_request_to_code: string;
  di_request_to_name: string;
  di_request_to_add1: string;
  di_request_to_add2: string;
  di_request_to_add3: string;
  di_request_to_add4: string;
  di_cargo_loc_id: number;
  di_cargo_loc_code: string;
  di_cargo_loc_name: string;
  di_cargo_loc_add1: string;
  di_cargo_loc_add2: string;
  di_cargo_loc_add3: string;
  di_cargo_loc_add4: string;
  di_remark1: string;
  di_remark2: string;
  di_remark3: string;
  di_is_devan_sent: string;
  di_devan_date: string;
  
  rec_version: number;
  rec_company_id: number;
  rec_branch_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
}

export interface iDevanInst_Search {

  rec_company_id: number;
  rec_branch_id: number;
}

export interface iDevanInstModel {
  selected_row_id: number;
  records: iDevanInst[],
  errorMessage: string,
  searchRecord: iDevanInst_Search,
  pageRecord: iPage,
  sort_column: string;
  sort_order: string;
};

