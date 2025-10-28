import { iPage } from 'ngx-jrt-controls'
import { iOpBalm } from './iopbalm';
//iOpBal
//iOpBalModel

export interface iOpBal_Search {
  jv_docno: string;
  jv_year: number;
  jv_type: string;
  jv_debit_total: number;
  jv_credit_total: number;
  jv_balance: number;

  rec_branch_id: number;
  rec_company_id: number;
}

export interface iOpBalModel {
  selected_row_id: number;
  records: iOpBalm[],
  errorMessage: string,
  searchRecord: iOpBal_Search,
  pageRecord: iPage,
  sort_column: string;
  sort_order: string;
};
