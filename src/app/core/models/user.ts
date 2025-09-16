import { iSettings } from "../../user-admin/models/isettings";
import { iMenum } from "./imenum";
import { iModulem } from "./imodulem";


export interface iUser {
  user_id: number;
  user_code: string;
  user_name: string;
  user_email: string;
  user_password: string;
  user_token: string;
  user_company_id: number;
  user_branch_id: number;
  user_module_list: iModulem[];
  user_menu_list: iMenum[];
  user_company_settings: iSettings[];
  user_branch_settings: iSettings[];

}
