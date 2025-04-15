import { iPage } from "ngx-jrt-controls";

//Name : Sourav V
//Created Date : 09/04/2025
//Remark : all data variable used in memo component is exported as separte interface according to its purpose (editing,search) 
//version : v1 - 09/04/202

// export type data_memo = { mode: string, record: iMemoD, index: number };

export interface iMemoD {
  memo_id: number;
  memo_parent_id: number;
  memo_parent_type: string;
  memo_remarks_id: number;
  memo_remarks_name: string;
  memo_date: string;
  // memo_memo: string;
  memo_order: number;

  rec_version: number;
  rec_company_id: number;
  rec_branch_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
}

export interface iMemo {
  memo_id: number;
  memo_parent_id: number;
  memo_parent_type: string;
  memo_remarks_id: number;
  memo_remarks_code: string;
  memo_remarks_name: string;
  memo_date: string;
  memo_memo: string;
  memo_details: iMemo[];


  rec_version: number;
  rec_company_id: number;
  rec_branch_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
}

export interface iMemo_Search {

  rec_company_id: number;
  rec_branch_id: number;
}

export interface iMemoModel {
  selected_row_id: number;
  records: iMemo[],
  errorMessage: string,
  searchRecord: iMemo_Search,
  pageRecord: iPage,
  sort_column: string;
  sort_order: string;
};

