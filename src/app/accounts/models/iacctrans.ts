import { iPage } from 'ngx-jrt-controls'
import { iAccLedgerd, iAccLedgerh } from './iaccledger';
//iOpBal
//iOpBalModel
export type data_ledgerd  = { mode : string,  record : iAccLedgerd , index : number  };

export interface iAccTrans_Search {
  jvh_docno: string;
  jvh_type: string;
  jvh_year: number;
  jvh_debit_total: number;
  jvh_credit_total: number;
  jvh_balance: number;

  rec_branch_id: number;
  rec_company_id: number;
}

export interface iAccTransModel {
  selected_row_id: number;
  records: iAccLedgerh[],
  errorMessage: string,
  searchRecord: iAccTrans_Search,
  pageRecord: iPage,
  sort_column: string;
  sort_order: string;
};
