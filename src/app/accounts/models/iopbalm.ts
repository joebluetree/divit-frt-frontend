import { iPage } from 'ngx-jrt-controls'

export interface iOpBalm {
  jv_id: number;
  jv_header_id: number;
  jv_docno: string;
  jv_date: string;
  jv_year: number;
  jv_acc_code: string;
  jv_acc_name: string;
  jv_famt: number;
  jv_cur_code: string;
  jv_exrate: number;
  jv_dcamt: number;
  jv_debit: number;
  jv_credit: number;
  jv_refno: string;
  jv_refdate: string;
  jv_shipment_ref: string;
  jv_shipment_date: string;
  jv_narration: string;

  rec_version: number;
  rec_company_id: number;
  rec_branch_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
}