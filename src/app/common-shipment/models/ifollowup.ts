import { iPage } from "ngx-jrt-controls";

export interface iFollowUp {
    cf_id: number;
    cf_mbl_id?: number;
    cf_mbl_refno?: string;
    cf_mbl_ref_date?: string;
    cf_user_id?: number;
    cf_user_name?: string;

    cf_remarks?: string;
    cf_followup_date?: string;
    cf_assigned_id?: number;
    cf_assigned_name?: string;
    cf_handled_id?: number;
    cf_handled_name?: string;
    followup: iFollowUp[];

    rec_version: number;
    rec_company_id: number;
    rec_branch_id: number;
    rec_created_by: string;
    rec_created_date: string;
    rec_edited_by: string;
    rec_edited_date: string;
  }


  export interface iFollowUp_Search {
    rec_company_id: number;
    rec_branch_id: number;
  }
  
  export interface iFollowUpModel {
    selected_row_id: number;
    records: iFollowUp[],
    errorMessage: string,
    searchRecord: iFollowUp_Search,
    pageRecord: iPage,
    sort_column: string;
    sort_order: string;
  };
  