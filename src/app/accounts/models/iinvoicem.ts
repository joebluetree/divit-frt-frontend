import { iPage } from 'ngx-jrt-controls'

export interface iInvoiced {
  invd_id: number;
  invd_parent_id: number;
  invd_acc_id: number;
  invd_acc_code: string;
  invd_acc_name: string;
  invd_remarks1: string;
  invd_qty: number;
  invd_frate: number;
  invd_ftotal: number;
  invd_cur_id: number;
  invd_cur_code: string;
  invd_exrate: number;
  invd_rate: number;
  invd_total: number;
  invd_remarks: string;
  rec_deleted: string;
  invd_order: number;

  rec_version: number;
  rec_company_id: number;
  rec_branch_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
}

export interface iInvoicem {
  inv_id: number;
  inv_cfno: number;
  inv_no: string;
  inv_date: string;
  inv_cust_id: number;
  inv_cust_code: string;
  inv_cust_name: string;
  inv_acc_id: number;
  inv_acc_name: string;
  inv_mbl_refno: string;
  inv_arrnotice: string;
  inv_cust_refno: string;
  inv_quoteno: string;

  inv_mbl_code: string;
  inv_houseno: string;
  inv_shipper: string;
  inv_consignee: string;
  inv_pcs: number;
  inv_uom_id: number;
  inv_uom_code: string;
  inv_lbs: number;
  inv_kgs: number;
  inv_cbm: number;
  inv_cft: number;
  inv_ftotal: number;
  inv_cur_id: number;
  inv_cur_code: string;
  inv_exrate: number;
  inv_total: number;
  inv_paid: number;

  exrate_decimal: number;
  inv_remarks1: string;
  inv_remarks2: string;
  inv_remarks3: string;
  inv_cost_type: string;
  inv_arap: string;
  inv_type: string;
  inv_mbl_id: number;
  inv_hbl_id: number;
  rec_deleted: string;
  rec_files_count?: number;
  rec_files_attached?: string;
  rec_check_count: number;
  rec_check_attached: string;
  
  invoiced: iInvoiced[];
  invoicem_list: iInvoicem[];

  rec_version: number;
  rec_locked: string;
  rec_branch_id: number;
  rec_company_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string ;
}

export interface iInvoicem_Search {
  rec_deleted: string;
  inv_mbl_stage: string;
  inv_mbl_refno: string;
  inv_inc_total: number;
  inv_exp_total: number;
  inv_revenue: number;
  inv_ar_balance: number;
  inv_ap_balance: number;
  inv_loss_memo: string;
  inv_loss_approved: string;
  inv_profit_req: string;
  inv_bo_status: string;
  inv_remarks: string;
  parent_id: number;
  inv_arap: string;

  parent_type: string;
  rec_branch_id: number;
  rec_company_id: number;
}

// export interface iInvoicem_Summary {
//   inv_mbl_stage: string;
//   inv_mbl_refno: string;
//   inv_inc_total: number;
//   inv_exp_total: number;
//   inv_revenue: number;
//   inv_ar_balance: number;
//   inv_ap_balance: number;
//   inv_loss_memo: string;
//   inv_loss_approved: string;
//   inv_profit_req: string;
//   inv_bo_status: string;
//   inv_remarks: string;
// }

export interface iInvoicemModel {
  selected_row_id: number;
  records: iInvoicem[],
  summary: any;
  errorMessage: string,
  searchRecord: iInvoicem_Search,
  pageRecord: iPage,
  sort_column: string;
  sort_order: string;
};
