export default interface ChangeUserData {
  id: number;
  name: string;
  email: string;
  oldPassword?: string;
  newPassword?: string;
  // connectTelegramBot: boolean;
};
