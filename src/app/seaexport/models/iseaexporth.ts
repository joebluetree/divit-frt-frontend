import { iPage } from "ngx-jrt-controls";

//Name : Sourav V
//Created Date : 24/02/2025
//Remark : all data variable used in qtnm-lcl component is exported as separte interface according to its purpose (editing,search) 
//version : v1 - 24-02-2025

export interface iContainer {
  cntr_id: number,
  cntr_hbl_id: number,
  cntr_mbl_id: number,
  cntr_catg: string,
  cntr_no: string,
  cntr_type_id: number,
  cntr_type_name: string,
  cntr_sealno: string,
  cntr_pieces: number,
  cntr_packages_unit_id: number,
  cntr_packages_unit_name: string,
  // cntr_packages: number,
  // cntr_teu: number,
  cntr_cbm: number,
  // cntr_weight_uom: string,
  cntr_weight: number,
  cntr_order: number,

  rec_version: number;
  rec_company_id: number;
  rec_branch_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;

}

export interface iSea_exportH {
  hbl_id: number;
  hbl_mbl_id: number;
  hbl_mbl_refno: string;
  hbl_cfno: number;
  hbl_houseno: string;
  hbl_shipment_stage_id: number;
  hbl_shipment_stage_name: string;
  hbl_bltype: string;
  hbl_mode: string;
  hbl_shipper_id: number;
  hbl_shipper_code: string;
  hbl_shipper_name: string;
  hbl_shipper_add1: string;
  hbl_shipper_add2: string;
  hbl_shipper_add3: string;
  hbl_shipper_add4: string;
  hbl_shipper_add5: string;
  hbl_consignee_id: number;
  hbl_consignee_code: string;
  hbl_consignee_name: string;
  hbl_consignee_add1: string;
  hbl_consignee_add2: string;
  hbl_consignee_add3: string;
  hbl_consignee_add4: string;
  hbl_consignee_add5: string;
  hbl_notify_id: number;
  hbl_notify_code: string;
  hbl_notify_name: string;
  hbl_notify_add1: string;
  hbl_notify_add2: string;
  hbl_notify_add3: string;
  hbl_notify_add4: string;
  hbl_notify_add5: string;
  hbl_exp_ref1: string;
  hbl_exp_ref2: string;
  hbl_exp_ref3: string;
  hbl_agent_id: number;
  hbl_agent_name: string;
  hbl_origin: string;
  hbl_rout1: string;
  hbl_rout2: string;
  hbl_rout3: string;
  hbl_rout4: string;
  hbl_pre_carriage: string;
  hbl_place_receipt: string;
  hbl_pol_name: string;
  hbl_pod_name: string;
  hbl_place_delivery: string;
  hbl_pofd_name: string;
  hbl_type_move: string;
  hbl_is_cntrized: string;
  hbl_frt_status_name: string;
  hbl_handled_id: number;
  hbl_handled_name: string;
  hbl_salesman_id: number;
  hbl_salesman_name: string;
  hbl_goods_nature: string;
  hbl_commodity: string;
  hbl_is_arranged: string;
  hbl_obl_telex: string;
  hbl_obl_slno: string;
  hbl_format_id: number;
  hbl_format_name: string;
  hbl_draft_format_id: number;
  hbl_draft_format_name: string;
  hbl_lbs: number;
  hbl_weight: number;
  hbl_cft: number;
  hbl_cbm: number;
  hbl_pcs: number;
  hbl_packages: number;
  hbl_uom_id: number;
  hbl_uom_name: string;
  hbl_print_kgs: string;
  hbl_print_lbs: string;
  hbl_clean: string;
  hbl_remark1: string;
  hbl_remark2: string;
  hbl_remark3: string;
  hbl_by1: string;
  hbl_by2: string;
  hbl_issued_place: string;
  hbl_issued_date: string;
  hbl_delivery_date: string;
  hbl_originals: number;

  hbl_mbl_no: string;
  hbl_mbl_pol_etd: string;
  hbl_mbl_pod_eta: string;

  desc_ctr: number;
  desc_parent_id: number;

  desc_id1: number;
  desc_id2: number;
  desc_id3: number;
  desc_id4: number;
  desc_id5: number;
  desc_id6: number;
  desc_id7: number;
  desc_id8: number;
  desc_id9: number;
  desc_id10: number;
  desc_id11: number;
  desc_id12: number;
  desc_id13: number;
  desc_id14: number;
  desc_id15: number;
  desc_id16: number;
  desc_id17: number;

  desc_mark1: string;
  desc_mark2: string;
  desc_mark3: string;
  desc_mark4: string;
  desc_mark5: string;
  desc_mark6: string;
  desc_mark7: string;
  desc_mark8: string;
  desc_mark9: string;
  desc_mark10: string;
  desc_mark11: string;
  desc_mark12: string;
  desc_mark13: string;
  desc_mark14: string;
  desc_mark15: string;
  desc_mark16: string;
  desc_mark17: string;

  desc_package1: string;
  desc_package2: string;
  desc_package3: string;

  desc_description1: string;
  desc_description2: string;
  desc_description3: string;
  desc_description4: string;
  desc_description5: string;
  desc_description6: string;
  desc_description7: string;
  desc_description8: string;
  desc_description9: string;
  desc_description10: string;
  desc_description11: string;
  desc_description12: string;
  desc_description13: string;
  desc_description14: string;
  desc_description15: string;
  desc_description16: string;
  desc_description17: string;

  house_cntr: iContainer[];

  rec_version: number;
  rec_company_id: number;
  rec_branch_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
}

export interface iSea_exportH_Search {
  hbl_houseno: string;
  hbl_from_date: string;
  hbl_to_date: string;
  rec_company_id: number;
  rec_branch_id: number;
}

export interface iSea_exportHModel {
  selected_row_id: number;
  records: iSea_exportH[],
  errorMessage: string,
  searchRecord: iSea_exportH_Search,
  pageRecord: iPage,
  sort_column: string;
  sort_order: string;
};

