import { iPage } from 'ngx-jrt-controls'

export interface iAccLedgerd {
  jv_id: number;
  jv_header_id: number;
  jv_year: number;
  jv_vrno: string;
  jv_docno: string;
  jv_type: string;
  jv_date: string;
  jv_refno: string;
  jv_refdate: string;
  jv_acc_id: number;
  jv_acc_code: string;
  jv_acc_name: string;
  jv_status: string;
  jv_famt: number;
  jv_cur_id: number;
  jv_cur_code: string;
  jv_exrate: number;
  jv_drcr: string;
  jv_dcamt: number;
  jv_debit: number;
  jv_credit: number;
  jv_inv_id: number;
  jv_inv_code: string;
  jv_remarks: string;
  jv_narration: string;
  jv_doc_type: string;
  jv_bank: string;
  jv_chqno: string;
  jv_chq_date: string;
  jv_master_date: string;
  jv_is_payroll: string;
  jv_tax_amt: number;
  jv_tax_per: number;
  jv_ctr: number;

  rec_version: number;
  rec_company_id: number;
  rec_branch_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
}

export interface iAccLedgerh {
  jvh_id: number;
  jvh_year: number;
  jvh_year_name: string;
  jvh_vrno: number;
  jvh_docno: string;
  jvh_type: string;
  jvh_date: string;
  jvh_refno: string;
  jvh_refdate: string;
  jvh_status: string;
  jvh_remarks: string;
  jvh_narration: string;
  jvh_master_date: string;
  jvh_is_payroll: string;
  jvh_shipment_ref: string;
  jvh_shipment_date: string;
  jvh_credit: number;
  jvh_debit: number;
  jvh_amount: number;

  ledger_detail: iAccLedgerd;
  ledger_details: iAccLedgerd[];

  rec_version: number;
  rec_error: string;
  rec_locked: string;
  rec_branch_id: number;
  rec_company_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string ;
}