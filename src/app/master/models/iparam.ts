import { iPage } from "ngx-jrt-controls";

export interface iParam {
  param_id: number;
  param_type: string;
  param_code: string;
  param_name: string;
  param_order: number;
  rec_company_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
}

export interface iParam_Search {
  param_type: string;
  param_code: string;
  param_name: string;
  rec_company_id: number;
}

export interface iParamModel {
  selected_row_id: number;
  records: iParam[],
  errorMessage: string,
  searchRecord: iParam_Search,
  pageRecord: iPage,
  sort_column: string;
  sort_order: string;
};
