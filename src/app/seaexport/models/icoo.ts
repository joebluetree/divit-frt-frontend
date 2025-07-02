import { iPage } from "ngx-jrt-controls";

//Name : Sourav V
//Created Date : 19/06/2025
//Remark : all data variable used in Cert. of origin component is exported as separte interface according to its purpose (editing,search) 
//version : v1 - 19/06/2025

export interface iCoO {
  mbld_id: number;
  mbld_parent_id: number;
  mbld_exp_ref: string;
  mbld_mode: string;
  mbld_shipper_id: number;
  mbld_shipper_code: string;
  mbld_shipper_name: string;
  mbld_shipper_add1: string;
  mbld_shipper_add2: string;
  mbld_shipper_add3: string;
  mbld_shipper_add4: string;
  mbld_shipper_add5: string;
  mbld_consignee_id: number;
  mbld_consignee_code: string;
  mbld_consignee_name: string;
  mbld_consignee_add1: string;
  mbld_consignee_add2: string;
  mbld_consignee_add3: string;
  mbld_consignee_add4: string;
  mbld_consignee_add5: string;
  mbld_notify_id: number;
  mbld_notify_code: string;
  mbld_notify_name: string;
  mbld_notify_add1: string;
  mbld_notify_add2: string;
  mbld_notify_add3: string;
  mbld_notify_add4: string;
  mbld_notify_add5: string;
  mbld_agent_id: number;
  mbld_agent_name: string;
  mbld_place_receipt: string;
  mbld_pol_name: string;
  mbld_pod_name: string;
  mbld_place_delivery: string;
  mbld_move_type: string;
  mbld_is_cntrized: string;
  mbld_handled_id: number;
  mbld_handled_name: string;
  mbld_print_vsl_voy: string;
  mbld_lbs: number;
  mbld_weight: number;
  mbld_cft: number;
  mbld_cbm: number;
  mbld_print_kgs: string;
  mbld_print_lbs: string;
  mbld_clean: string;
  mbld_remark1: string;
  mbld_remark2: string;
  mbld_remark3: string;

  desc_parent_id: number;
  
  marks1: iCargo_desc[];
  marks2: iCargo_desc[];
  marks3: iCargo_desc[];
  marks4: iCargo_desc[];
  marks5: iCargo_desc[];
  marks6: iCargo_desc[];
  marks7: iCargo_desc[];
  marks8: iCargo_desc[];
  marks9: iCargo_desc[];
  marks10: iCargo_desc[];
  marks11: iCargo_desc[];
  marks12: iCargo_desc[];
  marks13: iCargo_desc[];
  marks14: iCargo_desc[];
  marks15: iCargo_desc[];
  marks16: iCargo_desc[];
  marks17: iCargo_desc[];

  rec_version: number;
  rec_company_id: number;
  rec_branch_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
}
export interface iCargo_desc {
  desc_id: number;
  desc_ctr: number;
  desc_mark: string;
  desc_package: string; 
  desc_description: string;
}

export interface iCoO_Search {
  mbld_houseno: string;
  mbld_from_date: string;
  mbld_to_date: string;
  rec_company_id: number;
  rec_branch_id: number;
}

export interface iCoOModel {
  selected_row_id: number;
  records: iCoO[],
  errorMessage: string,
  searchRecord: iCoO_Search,
  pageRecord: iPage,
  sort_column: string;
  sort_order: string;
};

