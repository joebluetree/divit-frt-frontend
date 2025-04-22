import { iPage } from "ngx-jrt-controls";

export interface iDelvOrder {
  do_id: number;
  do_cfno?: string;
  do_parent_id?: number;
  do_truck_id?: number;
  do_truck_code?: string;
  do_truck_name?: string;
  do_truck_attn?: string;
  do_truck_tel?: string;
  do_truck_fax?: string;
  do_truck_cc?: string;
  do_pickup?: string;
  do_addr1?: string;
  do_addr2?: string;
  do_addr3?: string;
  do_date?: string;
  do_time?: string;
  do_attn?: string;
  do_tel?: string;

  do_from_id?: number;
  do_from_code?: string;
  do_from_name?: string;
  do_from_addr1?: string;
  do_from_addr2?: string;
  do_from_addr3?: string;
  do_from_addr4?: string;

  do_to_id?: number;
  do_to_code?: string;
  do_to_name?: string;
  do_to_addr1?: string;
  do_to_addr2?: string;
  do_to_addr3?: string;
  do_to_addr4?: string;

  do_uom1_id?: number;
  do_uom1_name?: string;
  do_desc1?: string;
  do_tot_piece1?: number;
  do_wt1?: number;
  do_cbm_cft1?: number;

  do_uom2_id?: number;
  do_uom2_name?: string;
  do_desc2?: string;
  do_tot_piece2?: number;
  do_wt2?: number;
  do_cbm_cft2?: number;

  do_uom3_id?: number;
  do_uom3_name?: string;
  do_desc3?: string;
  do_tot_piece3?: number;
  do_wt3?: number;
  do_cbm_cft3?: number;

  do_uom4_id?: number;
  do_uom4_name?: string;
  do_desc4?: string;
  do_tot_piece4?: number;
  do_wt4?: number;
  do_cbm_cft4?: number;

  do_remark_1?: string;
  do_remark_2?: string;
  do_remark_3?: string;
  do_remark_4?: string;
  do_danger_goods?: string;
  do_terms_ship?: string;
  do_vessel?: string;
  do_voyage?: string;

  do_freight?: string;
  do_is_exw?: string;
  do_is_fob?: string;
  do_is_fca?: string;
  do_is_cpu?: string;
  do_is_ddu?: string;
  do_is_frt_others?: string;
  do_freight_remark?: string;

  do_export_doc?: string;
  do_is_comm_inv?: string;
  do_is_lc?: string;
  do_is_coo?: string;
  do_is_pl?: string;
  do_is_expdec?: string;
  do_is_exp_others?: string;
  do_export_doc_remark?: string;

  do_order_no?: string;
  do_order_date?: string;
  do_category?: string;
  do_is_delivery_sent?: string;
  do_delivery_date?: string;

  rec_version: number;
  rec_company_id?: number;
  rec_branch_id?: number;
  rec_created_by?: string;
  rec_created_date?: string;
  rec_edited_by?: string;
  rec_edited_date?: string;
}

export interface iDelvOrder_Search {
  rec_company_id: number;
  rec_branch_id: number;
}

export interface iDelvOrderModel {
  selected_row_id: number;
  records: iDelvOrder[],
  errorMessage: string,
  searchRecord: iDelvOrder_Search,
  pageRecord: iPage,
  sort_column: string;
  sort_order: string;
};
