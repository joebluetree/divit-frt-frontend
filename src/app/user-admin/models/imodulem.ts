import { iPage } from "ngx-jrt-controls";


export interface iModulem {
  module_id: number;
  module_name: string;
  module_is_installed: string;
  module_order: number;
  rowversion: string;
  rec_company_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
}

export interface iModule_Search {
  module_name: string;
  module_is_installed: string;
  rec_company_id: number;
}

export interface iModuleModel {
  selected_row_id: number;
  records: iModulem[],
  errorMessage: string,
  searchRecord: iModule_Search,
  pageRecord: iPage,
  sort_column: string;
  sort_order: string;
};


