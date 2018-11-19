export interface IAppUser {
  id: number;
  username: string;
  email: string;
  password: string;
  last_name: string;
  first_name: string;
  is_active: Boolean;
  is_superuser: Boolean;
  is_staff: Boolean;
  date_joined: Date;
}
