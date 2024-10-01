

export interface iModulem {
  module_id: number;
  module_name: string;
  module_is_installed: string;

  module_parent_id: number;
  module_parent_name: string;

  module_order: number;
  rec_company_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
}
