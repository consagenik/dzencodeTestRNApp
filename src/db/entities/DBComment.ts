export default interface DBComment {
  id: number;
  text: string;
  avatar: {file_name: string; file_data: string};
  userName: string;
  email: string;
  homePage: string | undefined;
  comments: DBComment[];
  createdAt: string;
}
