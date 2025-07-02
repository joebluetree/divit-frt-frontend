import { iPage } from "ngx-jrt-controls";

//Name : Sourav V
//Created Date : 01/07/2025
//Remark : all data variable used in Custom Hold component is exported as separte interface according to its purpose (editing,search) 
//version : v1 - 01/07/2025

export interface iCustomHold {
  custom_id: number;
  custom_parent_id: number;
  custom_refno: string;
  custom_houseno: string;
  custom_title: string;
  custom_comm_inv_yn: string;
  custom_comm_inv: string;
  custom_fumi_cert_yn: string;
  custom_fumi_cert: string;
  custom_insp_chrg_yn: string;
  custom_insp_chrg: string;
  custom_remarks: string;
  
  rec_version: number;
  rec_company_id: number;
  rec_branch_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
}

export interface iCustomHold_Search {

  rec_company_id: number;
  rec_branch_id: number;
}

export interface iCustomHoldModel {
  selected_row_id: number;
  records: iCustomHold[],
  errorMessage: string,
  searchRecord: iCustomHold_Search,
  pageRecord: iPage,
  sort_column: string;
  sort_order: string;
};

