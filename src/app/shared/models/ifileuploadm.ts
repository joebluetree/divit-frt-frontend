import { iPage } from "ngx-jrt-controls";

export interface iFileUploadm {
  files_id: number;
  files_parent_id?: number;
  files_parent_type?: string;
  files_slno?: number;
  files_type_id?: number;
  files_type?: string;
  files_desc?: string;
  files_ref_no?: string;
  files_path?: string;
  files_sub_id?: number;
  files_size?: string;
  files_processed?: string;
  files_status?: string;
  files_search?: string;
  rec_deleted_by?: string;
  rec_deleted_date?: string;
  fileupload?: iFileUploadm[];

  rec_version: number;
  rec_locked?: string;
  rec_created_by?: string;
  rec_created_date?: string;
  rec_edited_by?: string;
  rec_edited_date?: string;
  rec_company_id: number;
  rec_branch_id: number;
}

export interface iFileUploadm_Search {
  files_type: string;
  files_ref_no: string;
  files_desc: string;
  rec_company_id: number;
  rec_branch_id: number;
}

export interface iFileUploadmModel {
  selected_row_id: number;
  records: iFileUploadm[],
  errorMessage: string,
  searchRecord: iFileUploadm_Search,
  pageRecord: iPage,
  sort_column: string;
  sort_order: string;
};

