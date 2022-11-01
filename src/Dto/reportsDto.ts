export interface ReportCategoryDto {
  id: number;
  name: string;
}
export interface ReportDto {
  id: number;
  categoryId: number;
  name: string;
  tags: string[];
}
