import { iPage } from 'ngx-jrt-controls'
export interface iAcctm {
  acc_id: number;
  acc_code: string;
  acc_short_name: string;
  acc_name: string;
  acc_type: string;
  acc_row_type: string;

  acc_maincode_temp_id: number;
  acc_maincode_temp_name: string;

  acc_maincode_id: number;
  acc_maincode: string;
  acc_maincode_name: string;

  acc_grp_id: number;
  acc_grp_name: number;
  rec_company_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
}

export interface iAcctm_Search {
  acc_row_type: string;
  acc_name: string;
  rec_company_id: number;
}

export interface iAcctmModel {
  selected_row_id: number;
  records: iAcctm[],
  errorMessage: string,
  searchRecord: iAcctm_Search,
  pageRecord: iPage,
  sort_column: string;
  sort_order: string;
};
