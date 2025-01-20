import { iPage } from "ngx-jrt-controls";

export interface iMail_Serverm {
  mail_id: number;
  mail_name: string;
  mail_smtp_name: string;
  mail_smtp_port: string;
  mail_is_ssl: string;
  mail_is_auth: string;
  mail_is_spa: string;
  mail_bulk_tot: number;
  mail_bulk_sub: number;
  mail_smtp_username: string;
  mail_smtp_pwd: string;

  rec_version: number;
  rec_company_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
}

export interface iMailServerm_Search {
  mail_name: string;
  rec_company_id: number;
}

export interface iMailServermModel {
  selected_row_id: number;
  records: iMail_Serverm[],
  errorMessage: string,
  searchRecord: iMailServerm_Search,
  pageRecord: iPage,
  sort_column: string;
  sort_order: string;
};
