export default interface DBAddCommentRequest {
  text: string;
  avatar: {fileName: string; filePath: string};
  userName: string;
  email: string;
  homePage: string;
}
