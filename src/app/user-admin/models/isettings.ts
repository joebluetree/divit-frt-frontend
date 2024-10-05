import { iPage } from "ngx-jrt-controls";

export interface iSettings {
  id: number;
  category: string;
  caption: string;
  remarks: string;
  type: string;
  table: string;
  value: string;
  code: string;
  name: string;
  order: number;

  rec_version: number;

  rec_company_id: number;
  rec_branch_id: number;

  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
}

export interface iSettings_Search {
  caption: string;
  rec_company_id: number;
}

export interface iSettingsModel {
  selected_row_id: number;
  records: iSettings[],
  errorMessage: string,
  searchRecord: iSettings_Search,
  pageRecord: iPage,
  sort_column: string;
  sort_order: string;
};


