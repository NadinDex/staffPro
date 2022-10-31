export interface DiscussionDto {
  id: number;
  title: string;
  text: string;
  authorId: number;
  comments?: DiscusCommentDto[];
  addedOn?: Date;
}
export interface DiscusCommentDto {
  id: number;
  discussionId: number;
  text: string;
  authorId: number;
  addedOn: Date;
}
