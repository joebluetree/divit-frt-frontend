import { iPage } from "ngx-jrt-controls";

export interface iRights_header {
  id: number;
  comp_id: number;
  branch_id: number;
  user_id: number;
  records: iRights[];
}

export interface iRights {
  rights_id: number;
  rights_parent_id: number;
  rights_user_id: number;
  rights_user_name: string;
  rights_menu_id: number;
  rights_menu_name: string;
  rights_module_name: string;
  rights_selected: string;
  rights_company: string;
  rights_admin: string;
  rights_add: string;
  rights_edit: string;
  rights_view: string;
  rights_delete: string;
  rights_print: string;
  rights_doc_upload: string;
  rights_doc_view: string;
  rights_approver: string;
  rights_value: string;
  rec_company_id: number;
  rec_branch_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
}

export interface iRights_Search {
  user_name: string;
}

export interface iRightsModel {
  selected_row_id: number;
  records: iRights[],
  errorMessage: string,
  searchRecord: iRights_Search,
  pageRecord: iPage,
  sort_column: string;
  sort_order: string;
};
